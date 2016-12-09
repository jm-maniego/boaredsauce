class Api::UsersController < Api::ResourceController
  def show
    @user = User.includes(polls: :poll_choices).find(params[:id])
    respond_with @user, include: :polls, context: current_user
  end
end