class Uploader

  def self.upload!
    YouTubeUploader.perform_async('KSP042')
  end

end
