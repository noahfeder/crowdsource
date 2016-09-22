Rails.application.routes.draw do
  root to: 'binaries#index'
  resources :binaries, only [:index, :show]
end
