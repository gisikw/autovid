class YouTubeUploader
  include Sidekiq::Worker
  sidekiq_options unique: :until_executed
  VIDEO_UPLOAD_FOLDER = Rails.root.join('videos')

  def perform(name)
    series = Series.where(prefix: name[0..2]).first
    video_file = File.join(VIDEO_UPLOAD_FOLDER, "#{name}.mp4")
    thumbnail_file = File.join(VIDEO_UPLOAD_FOLDER, "#{name}.jpg")
    return unless series && File.exist?(video_file) && File.exist?(thumbnail_file)

    info = YAML::load_file(Rails.root.join('config/ytsecrets.yml'))
    Yt.configure do |config|
      config.client_id = info['youtube']['client_id']
      config.client_secret = info['youtube']['client_secret']
    end

    account = Yt::Account.new(
      owner_name: series.channel,
      refresh_token: info['youtube']['refresh_tokens'][series.channel]
    )

    vid = account.upload_video(
      video_file,
      {
        title: "Automatic Upload: #{name}",
        description: series.description,
        privacy_status: 'Private',
        tags: series.tags.split(',')
      }
    )

    vid.upload_thumbnail thumbnail_file

    episode_number = name[3..-1].to_i
    next_publish_at = series.publish_at + (episode_number - series.release_number).weeks

    vid.update publish_at: next_publish_at.utc.iso8601(3)

    series.publish_at = next_publish_at
    series.release_number = episode_number
    series.save

    File.delete(video_file, thumbnail_file)
  end
end
