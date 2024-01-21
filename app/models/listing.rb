class Listing < ApplicationRecord
  belongs_to :category
  belongs_to :user

  has_many_attached :photos

  broadcasts_refreshes
end
