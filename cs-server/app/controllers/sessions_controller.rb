class SessionsController < ApplicationController
  protect_from_forgery except: [:create, :destroy]
  def create
    @params = JSON.load request.body
    puts @params
    username = @params["username"]
    password = @params["password"]
    @user = User.find_by_username(username).try(:authenticate, password)
    if !@user
      render json: {error: true, message: "Invalid username/password"}
    else
      render json: {error: false, message: "Success"}
    end
  end

  def destroy
  end
end
