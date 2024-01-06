Rails.application.routes.draw do
  resources :listings
  resources :categories
  resources :users, only: [:create]
  resources :sessions, only: [:create]

  get "up" => "rails/health#show", as: :rails_health_check

  get "/register", to: "users#new"
  get "/login", to: "sessions#new"
  get "/logout", to: "sessions#destroy"

  root to: "sessions#new"
end
