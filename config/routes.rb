Rails.application.routes.draw do
  namespace :admin do
    resources :categories
    resources :listings
    resources :users

    root to: 'categories#index'
  end
  resources :users, only: [:create]
  resources :sessions, only: [:create]

  get 'up' => 'rails/health#show', as: :rails_health_check

  get '/register', to: 'users#new'
  get '/login', to: 'sessions#new'
  get '/logout', to: 'sessions#destroy'

  resources :categories, param: :slug, path: '/', only: [] do
    resources :listings, path: '/' do
      get :search, on: :collection
    end
  end

  resources :listings, only: %i[new create update]

  root to: 'dashboard#index'
end
