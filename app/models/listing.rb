class Listing < ApplicationRecord
  belongs_to :category
  has_many_attached :photos
end
