Rails.application.routes.draw do
  get 'dashboard/index'

  resources :categories, param: :slug, path: '/', only: [] do
    resources :listings, path: '/'
  end

  resources :users, only: [:create]
  resources :sessions, only: [:create]

  get "up" => "rails/health#show", as: :rails_health_check

  get "/register", to: "users#new"
  get "/login", to: "sessions#new"
  get "/logout", to: "sessions#destroy"

  root to: "dashboard#index"
end
