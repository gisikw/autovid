require 'yt'

class VideosController < ApplicationController
  def index

    start_date = Date.today.beginning_of_week(:monday).beginning_of_day
    end_date = start_date + 15.days

    render json: Video.where(publish_time: start_date..end_date)
  end
end
