class YouTubeUpdateWorker
  include Sidekiq::Worker

  def perform
    info = YAML::load_file('config/ytsecrets.yml')
    Yt.configure do |config|
      config.client_id = info['youtube']['client_id']
      config.client_secret = info['youtube']['client_secret']
    end

    info['youtube']['refresh_tokens'].each do |channel, token|
      account = Yt::Account.new(owner_name: channel, refresh_token: token)
      account.videos.each do |youtube_video|
        begin
          video = Video.find_or_initialize_by(youtube_id: youtube_video.id)
          status = youtube_video.privacy_status
          status = 'scheduled' if youtube_video.scheduled?
          status = 'uploading' if youtube_video.uploading?
          video.update_attributes!(
            title: youtube_video.title,
            channel: account.channel.title,
            publish_time: youtube_video.scheduled_at || youtube_video.status.publish_at || youtube_video.published_at,
            status: status
          )
        rescue Yt::Errors::NoItems
          # Video doesn't exist
        end
      end
    end
  end
end
