require 'test_helper'

class RentalTest < ActiveSupport::TestCase
  test 'all rentals have pending status by default' do
    user = User.create!(email: 'test@example.com', password: 'password')
    renter = User.create!(email: 'renter@example.com', password: 'password')
    category = Category.create!(name: 'Test Category')
    listing = Listing.create!(title: 'Test Listing', description: 'Test Description', price_per_day: 100, user:,
                              category:)
    rental = Rental.create!(listing:, user: renter, owner: user, start_date: Date.today,
                            end_date: Date.today + 1.day)
    assert rental.pending?
  end

  test 'user cannot rent a listing that is already rented' do
    user = User.create!(email: 'test@example.com', password: 'password')
    renter = User.create!(email: 'renter@example.com', password: 'password')
    category = Category.create!(name: 'Test Category')
    listing = Listing.create!(title: 'Test Listing', description: 'Test Description', price_per_day: 100, user:,
                              category:)
    Rental.create!(listing:, user: renter, owner: user, start_date: Date.today,
                   end_date: Date.today + 1.day)

    assert_raises(ActiveRecord::RecordInvalid) do
      Rental.create!(listing:, user: renter, owner: user, start_date: Date.today,
                     end_date: Date.today + 1.day)
    end
  end
end
