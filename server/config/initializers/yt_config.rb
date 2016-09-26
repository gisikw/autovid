YT_SECRETS = YAML::load_file(Rails.root.join('config/ytsecrets.yml'))
Yt.configure do |config|
  config.client_id = YT_SECRETS['youtube']['client_id']
  config.client_secret = YT_SECRETS['youtube']['client_secret']
end

def yt_account(channel)
  Yt::Account.new(
    owner_name: channel,
    refresh_token: YT_SECRETS['youtube']['refresh_tokens'][channel]
  )
end
