require 'yt'

class Fetcher
  def self.fetch!
    info = YAML::load_file('config/ytsecrets.yml')
    Yt.configure do |config|
      config.client_id = info['youtube']['client_id']
      config.client_secret = info['youtube']['client_secret']
    end

    info['youtube']['refresh_tokens'].each do |channel, token|
      account = Yt::Account.new(owner_name: channel, refresh_token: token)
      account.videos.each do |youtube_video|
        video = Video.find_or_initialize_by(youtube_id: youtube_video.id)
        video.update_attributes!(
          title: youtube_video.title,
          channel: account.channel.title,
          publish_time: youtube_video.scheduled_at || youtube_video.status.publish_at || youtube_video.published_at,
          status: youtube_video.scheduled? ? 'scheduled' : youtube_video.privacy_status
        )
      end
    end
    true
  end

  def self.check!()
    info = YAML::load_file('config/ytsecrets.yml')
    account = Yt::Account.new(owner_name: 'gisikwGames', refresh_token: info['youtube']['refresh_tokens']['gisikwGames'])
    Yt.configure do |config|
      config.client_id = info['youtube']['client_id']
      config.client_secret = info['youtube']['client_secret']
    end
    account.videos.first(10)
  end
end
