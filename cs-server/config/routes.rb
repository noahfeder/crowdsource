# == Route Map
#
#   Prefix Verb  URI Pattern             Controller#Action
#   logout GET   /logout(.:format)       sessions#destroy
#    login GET   /login(.:format)        sessions#create
#     root GET   /                       binaries#index
# binaries GET   /binaries(.:format)     binaries#index
#          POST  /binaries(.:format)     binaries#create
#   binary GET   /binaries/:id(.:format) binaries#show
#          PATCH /binaries/:id(.:format) binaries#update
#          PUT   /binaries/:id(.:format) binaries#update
#

Rails.application.routes.draw do
  post '/logout' => 'sessions#destroy'

  post '/login' => 'sessions#create'

  root to: 'binaries#index'
  resources :binaries, only: [:index, :show, :update, :create]
end
