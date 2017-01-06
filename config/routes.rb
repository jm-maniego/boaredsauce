Rails.application.routes.draw do
  devise_for :users, :path => 'd'
  devise_scope :user do
    authenticated :user do
      root to: "polls#index"
    end

    unauthenticated do
      root 'devise/registrations#new', as: :unauthenticated_root
    end
  end

  resources :users, only: [:show], controller: 'users'
  resources :polls
  namespace :api, defaults: {format: :json} do
    resources :polls do
      member do
        post :answer
        delete :remove_answer, path: "/answer"
      end
    end
    resources :users, only: [:show]
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
