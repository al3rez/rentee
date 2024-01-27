class Category < ApplicationRecord
  extend FriendlyId
  friendly_id :name, use: :slugged
  has_one_attached :image

  has_many :listings

  def to_s
    name
  end
end
