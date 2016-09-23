# == Route Map
#
#   Prefix Verb  URI Pattern             Controller#Action
#     root GET   /                       binaries#index
# binaries GET   /binaries(.:format)     binaries#index
#          POST  /binaries(.:format)     binaries#create
#   binary GET   /binaries/:id(.:format) binaries#show
#          PATCH /binaries/:id(.:format) binaries#update
#          PUT   /binaries/:id(.:format) binaries#update
#

Rails.application.routes.draw do
  root to: 'binaries#index'
  resources :binaries, only: [:index, :show, :update, :create]
end
