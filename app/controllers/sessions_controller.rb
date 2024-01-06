class SessionsController < ApplicationController
  def new; end

  def create
    user = User.find_by(email: params[:email])
    if user.blank?
      flash[:alert] = 'Invalid email or password'
      redirect_to login_path
      return
    end

    if user.authenticate(params[:password])
      reset_session
      session[:current_user_id] = user.id
      redirect_to listings_path, notice: 'Successfully logged in.'
    else
      flash[:alert] = 'Invalid email or password'
      redirect_to :new
    end
  end

  private

  def user_params
    params.require(:user).permit(:email, :password)
  end
end
