class SeriesController < ApplicationController
  def index
   render json: Series.all
  end
end
