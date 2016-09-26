class YouTubeTagger
  include Sidekiq::Worker
  sidekiq_options unique: :until_executed

  def perform
    name = available_video_name
    return if !name
    video = find_youtube_video_for(name)
    return if !video
    upload_thumbnail_for(name, video)
    update_metadata_for(name, video)
    move_to_archive_folder(name)
  end

  def available_video_name
    Dir.glob(tag_path('*.mp4')).each do |path|
      name = File.basename(path, '.mp4')
      if File.exist?(tag_path("#{name}.jpg")) &&
         Series.exists?(prefix: name[0,3])
        return name
      end
    end
    nil
  end

  def find_youtube_video_for(name)
    account_for(name).videos.each do |video|
      begin
        if video.title == "Automatic Upload: #{name}" &&
           !video.deleted? && !video.failed? && !video.uploading?
          return video
        end
      rescue Yt::Errors::NoItems
      end
    end
    return false
  end

  def upload_thumbnail_for(name, video)
    video.upload_thumbnail(tag_path("#{name}.jpg"))
  end

  def update_metadata_for(name, video)
    series = Series.where(prefix: name[0,3]).first
    episode_number = name[3..-1].to_i
    next_publish_at = series.publish_at +
                      (episode_number - series.release_number).weeks
    video.update(
      title: "#{name} - ready",
      description: series.description,
      tags: series.tags.split(','),
      publish_at: next_publish_at.utc.iso8601(3),
      category_id: '22',
    )
  end

  def move_to_archive_folder(name)
    FileUtils.mv(tag_path("#{name}.mp4"), archive_path("#{name}.mp4"))
    FileUtils.mv(tag_path("#{name}.jpg"), archive_path("#{name}.jpg"))
  end

  def account_for(name)
    series = Series.where(prefix: name[0,3]).first
    account = yt_account(series.channel)
  end

  def tag_path(file)
    File.join(Rails.configuration.tag_folder,file)
  end

  def archive_path(file)
    File.join(Rails.configuration.archive_folder,file)
  end
end
