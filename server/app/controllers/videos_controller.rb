require 'yt'

class VideosController < ApplicationController
  def index

    start_date = Date.today.beginning_of_week(:monday).beginning_of_day
    start_date -= 7.days # tmp
    end_date = start_date + 29.days

    render json: Video.where('publish_time > ?', start_date)
  end
end
