class Rental < ApplicationRecord # rubocop:disable Style/Documentation
  belongs_to :listing
  belongs_to :user
  belongs_to :owner, class_name: 'User', foreign_key: 'owner'

  enum status: { pending: 0, accepted: 1, rejected: 2, canceled: 3 }

  before_validation :set_owner

  after_initialize :set_default_status, if: :new_record?
  validate :check_listing_availability, on: :create

  private

  def set_owner
    self.owner = listing.user if listing.present?
  end

  def set_default_status
    self.status ||= :pending
  end

  # Checks if the listing is available for the selected date range.  It queries
  # for rentals that have the same listing_id, excluding the current rental's
  # id, and where the start_date is before the current rental's end_date and the
  # end_date is after the current rental's start_date.  If any overlapping
  # rentals are found, it adds an error to the base object indicating the
  # listing is not available.
  def check_listing_availability
    overlapping_rentals = Rental.where(listing_id:)
                                .where.not(id:)
                                .where('start_date < ? AND end_date > ?', end_date, start_date)
    errors.add(:base, 'Listing is not available in the selected date range') if overlapping_rentals.exists?
  end
end
