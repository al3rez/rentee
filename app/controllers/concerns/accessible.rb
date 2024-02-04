module Accessible
  extend ActiveSupport::Concern

  included do
    skip_before_action :authenticate_user!, only: %i[new create]
    before_action :redirect_to_dashboard, if: :user_signed_in?, only: %i[new create]
  end

  protected

  def redirect_to_dashboard
    redirect_to(listings_path)
  end
end
