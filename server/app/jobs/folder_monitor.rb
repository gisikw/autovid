class FolderMonitor
  include Sidekiq::Worker
  sidekiq_options retry: false
  VIDEO_UPLOAD_FOLDER = Rails.root.join('videos')

  def perform
    Dir.glob(File.join(VIDEO_UPLOAD_FOLDER, '*.mp4')).each do |file|
      name = File.basename(file, '.mp4')
      if File.exist?(File.join(VIDEO_UPLOAD_FOLDER, "#{name}.jpg"))
        YouTubeUploader.perform_async(name)
      end
    end
  end
end
