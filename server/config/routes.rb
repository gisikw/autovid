require 'sidekiq/web'
require 'sidekiq/cron/web'

Rails.application.routes.draw do
  mount Sidekiq::Web => '/sidekiq'
  get '/videos', to: 'videos#index'
  get '/series', to: 'series#index'
end
