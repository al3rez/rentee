Category.destroy_all
categories = [
  'Film & Photography',
  'DJ Equipment',
  'Drones',
  'Electoronics',
  'Lenses',
  'Musical Instruments',
  'Projectors',
  'Electric Scooters',
  'Vehicles',
  'Sweing machines'
]
categories.each do |category|
  Category.create(name: category)
end
