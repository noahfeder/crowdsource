class BinariesController < ApplicationController
  def index
    @binaries = Binary.all
    render json: @binaries
  end

  def show
    @binary = Binary.last
    render json: @binary
  end
end
