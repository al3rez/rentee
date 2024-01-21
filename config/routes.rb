Rails.application.routes.draw do
  resources :users, only: [:create]
  resources :sessions, only: [:create]

  get "up" => "rails/health#show", as: :rails_health_check

  get "/register", to: "users#new"
  get "/login", to: "sessions#new"
  get "/logout", to: "sessions#destroy"

  resources :categories, param: :slug, path: '/', only: [] do
    resources :listings, path: '/' do
      get :search, on: :collection
    end
  end

  resources :listings, only: [:new, :create, :update]

  root to: "dashboard#index"
end
