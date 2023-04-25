Rails.application.routes.draw do

  namespace :api do 
    namespace :v1 do 
      resources :referrals, only: %i[show create update]
    end 
  end

  devise_for :users do
    get '/users/sign_out' => 'devise/sessions#destroy'
  end

  root "home#index"
  get '*path', to: 'home#index', via: :all
end
