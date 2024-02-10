class UsersController < ApplicationController
  include Accessible

  def new; end

  def show; end

  def edit; end

  def update
    current_user.update(update_user_params)
  end

  def create
    user = User.new(
      email: user_params[:email],
      password: user_params[:password],
      password_confirmation: user_params[:password]
    )

    if user.save
      reset_session
      session[:current_user_id] = user.id
      redirect_to listings_path, notice: 'Account was successfully created.'
    else
      flash[:alert] = user.errors.humanize
      redirect_to register_path
    end
  end

  private

  def user_params
    params.require(:user).permit(:email, :password, :password_confirmation)
  end

  def update_user_params
    params.require(:user).permit(:name, :bio, :location, :avatar)
  end
end
