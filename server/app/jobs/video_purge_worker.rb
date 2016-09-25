class VideoPurgeWorker
  include Sidekiq::Worker
  sidekiq_options retry: false

  def perform
    info = YAML::load_file('config/ytsecrets.yml')
    Yt.configure do |config|
      config.log_level = :debug
      config.client_id = info['youtube']['client_id']
      config.client_secret = info['youtube']['client_secret']
    end

    info['youtube']['refresh_tokens'].each do |channel, token|
      account = Yt::Account.new(owner_name: channel, refresh_token: token)
      Video.where(channel: account.channel.title).each do |video|
        begin
          video.destroy! if Yt::Video.new(id: video.youtube_id, auth: account).deleted?
        rescue Yt::Errors::NoItems
          video.destroy!
        end
      end
    end

    return true
  end

end
