class Category < ApplicationRecord
    has_many :listings

    def to_s
        name
    end
end
