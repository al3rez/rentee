class RentalsController < ApplicationController # rubocop:disable Style/Documentation
  before_action :set_listing, only: %i[index]

  def index; end

  def new; end

  def create
    @rental = Rental.new(rental_params.merge(user: current_user))

    if @rental.save
      redirect_to @rental
    else
      render turbo_stream: turbo_stream.replace('rental_form', partial: 'rentals/form', locals: { rental: @rental })
    end
  end

  private

  def set_listing
    @listing = Listing.find(params[:listing_id])
  end

  def rental_params
    params.require(:rental).permit(:start_date, :end_date, :listing_id)
  end
end
