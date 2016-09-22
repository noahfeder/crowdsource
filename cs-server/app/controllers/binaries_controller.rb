class BinariesController < ApplicationController
  protect_from_forgery except: [:index, :show, :update]
  def index
    @binaries = Binary.all
    render json: @binaries
  end

  def show
    @binary = Binary.find(params[:id])
    render json: @binary
  end

  def update
    @binary = Binary.find(params[:id])
    @choice = params[:choice]
    @binary.votesA += 1 if @choice == 'A'
    @binary.votesB += 1 if @choice == 'B'
    @binary.save
    render json: @binary
  end
end
