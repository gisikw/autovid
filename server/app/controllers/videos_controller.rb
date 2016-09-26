class VideosController < ApplicationController
  def index
    start_date = Date.today.beginning_of_week(:monday).beginning_of_day
    start_date -= 14.days
    end_date = start_date + 29.days
    render json: Video.where('publish_time > ?', start_date)
  end

  def create
    Video.create(video_params)
  end

  def show
    render json: Video.find(params[:id])
  end

  def update
    video = Video.find(params[:id])
    video.update_attributes(video_params)
  end

  def destroy
    Video.find(params[:id]).destroy!
  end

  private

  def video_params
    params.require(:video).permit(:title, :publishTime, :channel, :status, :youtube_id)
  end

end
