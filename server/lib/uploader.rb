class Uploader

  def self.upload!
    YouTubeUploader.perform_async(
      channel: 'gisikwVlogs',
      video_file: Rails.root.join('testclip.mp4'),
      thumbnail_file: Rails.root.join('NMS001.jpg'),
      title: 'Test Video 2',
      description: 'This is a test video',
      privacy_status: 'Private',
      tags: ['coolness', 'testing', 'Kevin is awesome'],
      publish_at: 1.week.from_now
    )
  end

end
