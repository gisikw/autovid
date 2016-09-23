class Series < ApplicationRecord
  def as_json(params = {})
    {
      title: title,
      prefix: prefix,
      channel: channel,
      description: description,
      tags: tags,
      publish_at: publish_at.to_i,
      release_number: release_number
    }
  end
end
