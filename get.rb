require 'yaml'
require 'yt'

info = YAML::load_file('secrets.yml')

Yt.configure do |config|
  config.client_id = info['youtube']['client_id']
  config.client_secret = info['youtube']['client_secret']
end

info['youtube']['refresh_tokens'].each do |channel, token|
  account = Yt::Account.new(owner_name: channel, refresh_token: token)
  puts "#{account.name}: #{account.videos.size}"
end
