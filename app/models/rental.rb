class Rental < ApplicationRecord # rubocop:disable Style/Documentation
  belongs_to :listing
  belongs_to :user
  belongs_to :owner, class_name: 'User', foreign_key: 'owner'

  enum status: { pending: 0, accepted: 1, rejected: 2, canceled: 3 }

  after_initialize :set_default_status, if: :new_record?
  validate :check_listing_availability, on: :create

  def check_listing_availability
    overlapping_rentals = Rental.where(listing_id:)
                                .where.not(id:)
                                .where('start_date < ? AND end_date > ?', end_date, start_date)
    errors.add(:base, 'Listing is not available in the selected date range') if overlapping_rentals.exists?
  end

  private

  def set_default_status
    self.status ||= :pending
  end
end
