json.extract! listing, :id, :title, :description, :category_id, :postcode, :price_per_day, :price_per_month, :price_per_week, :item_value, :min_rental_days, :photos, :created_at, :updated_at
json.url listing_url(listing, format: :json)
json.photos do
  json.array!(listing.photos) do |photo|
    json.id photo.id
    json.url url_for(photo)
  end
end
