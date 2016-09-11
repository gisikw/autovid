class YouTubeUploader
  include Sidekiq::Worker

  def perform(options)
    options.symbolize_keys!
    info = YAML::load_file(Rails.root.join('config/ytsecrets.yml'))
    Yt.configure do |config|
      config.client_id = info['youtube']['client_id']
      config.client_secret = info['youtube']['client_secret']
    end

    account = Yt::Account.new(
      owner_name: options[:channel],
      refresh_token: info['youtube']['refresh_tokens'][options[:channel]]
    )

    vid = account.upload_video(
      options[:video_file],
      options.slice(:title, :description, :privacy_status, :tags)
    )

    vid.upload_thumbnail options[:thumbnail_file]
    vid.update publish_at: Time.parse(options[:publish_at]).utc.iso8601(3)
  end
end
