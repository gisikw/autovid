class Video < ApplicationRecord

  def as_json(params = {})
    {
      title: title,
      publishTime: publish_time.to_i,
      channel: channel,
      status: status,
      youtube_id: youtube_id,
      id: id,
    }
  end

end
