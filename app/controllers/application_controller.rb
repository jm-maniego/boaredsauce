class ApplicationController < ActionController::Base
  layout :layout_by_resource
  protect_from_forgery with: :exception
  before_action :authenticate_user!

  protected

  def layout_by_resource
    if devise_controller?
      "login"
    else
      "application"
    end
  end

  private

  helper_method :app_name
  def app_name
    Boaredsauce.name
  end
end
