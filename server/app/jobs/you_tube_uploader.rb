class YouTubeUploader
  include Sidekiq::Worker
  sidekiq_options unique: :until_executed

  def perform
    name = available_video_name
    return if !name

    failed_uploads_for(name).each do |bad_id|
      destroy_upload(bad_id, name)
    end

    if valid_upload_for(name)
      move_to_tag_folder(name)
    else
      upload(name)
    end

    return true
  end

  def available_video_name
    Dir.glob(upload_path('*.mp4')).each do |path|
      name = File.basename(path, '.mp4')
      if File.exist?(upload_path("#{name}.jpg")) &&
         Series.exists?(prefix: name[0,3])
        return name
      end
    end
    nil
  end

  def failed_uploads_for(name)
    account_for(name).videos.select do |video|
      begin
        video.title == "Automatic Upload: #{name}" &&
        (video.deleted? || video.failed? || video.uploading?)
      rescue Yt::Errors::NoItems
        false
      end
    end.map(&:id)
  end

  def destroy_upload(id, name)
    Yt::Video.new(id: id, auth: account_for(name)).delete
  end

  def valid_upload_for(name)
    account_for(name).videos.each do |video|
      begin
        if video.title == "Automatic Upload: #{name}" &&
           !video.deleted? && !video.failed? && !video.uploading?
          return true
        end
      rescue Yt::Errors::NoItems
      end
    end
    return false
  end

  def move_to_tag_folder(name)
    FileUtils.mv(upload_path("#{name}.mp4"), tag_path("#{name}.mp4"))
    FileUtils.mv(upload_path("#{name}.jpg"), tag_path("#{name}.jpg"))
  end

  def upload(name)
    id = account_for(name).upload_video(
      upload_path("#{name}.mp4"),
      title: "Automatic Upload: #{name}",
      privacy_status: 'Private'
    ).id

    # FIXME: Find a better way to do this
    loop do
      break if Yt::Video.new(id: id, auth: account_for(name)).processed?
      sleep 60
    end
  end

  def account_for(name)
    series = Series.where(prefix: name[0,3]).first
    account = yt_account(series.channel)
  end

  def upload_path(file)
    File.join(Rails.configuration.upload_folder,file)
  end

  def tag_path(file)
    File.join(Rails.configuration.tag_folder,file)
  end
end
