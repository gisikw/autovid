class SeriesController < ApplicationController
  def index
   render json: Series.all
  end

  def create
    Series.create!(series_params)
  end

  def show
    render json: Series.find(params[:id])
  end

  def update
    series = Series.find(params[:id])
    series.update(series_params)
  end

  def destroy
    Series.find(params[:id]).destroy!
  end

  private

  def series_params
    if params[:publish_at]
      params[:publish_at] = DateTime.parse(params[:publish_at])
    else
      params[:publish_at] = Time.now
    end
    params.require(:series).permit(:title, :prefix, :channel, :description, :tags, :publish_at, :release_number)
  end
end
