class BinariesController < ApplicationController
  def index
    @binaries = Binary.all
    render json: @binaries
  end

  def show
    @binary = Binary.find(params[:id])
    render json: @binary
  end
end
