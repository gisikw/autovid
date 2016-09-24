class Video < ApplicationRecord

  def as_json(params = {})
    {
      title: title,
      publishTime: publish_time.to_i,
      channel: channel,
      status: status,
      id: youtube_id,
    }
  end

end
