class Listing < ApplicationRecord
  belongs_to :category, touch: true
  belongs_to :user, touch: true

  has_many_attached :photos

  broadcasts_refreshes
end
