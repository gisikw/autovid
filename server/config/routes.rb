require 'sidekiq/web'
require 'sidekiq/cron/web'

Rails.application.routes.draw do
  mount Sidekiq::Web => '/sidekiq'
  resources 'videos'
  resources 'series'
  # get '/videos', to: 'videos#index'
  # get '/series', to: 'series#index'
end
