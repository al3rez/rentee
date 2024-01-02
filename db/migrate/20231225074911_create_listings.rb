class CreateListings < ActiveRecord::Migration[7.1]
  def change
    create_table :listings do |t|
      t.string :title
      t.text :description
      t.references :category, null: false, foreign_key: true
      t.string :postcode
      t.string :price_per_day
      t.string :price_per_month
      t.string :price_per_week
      t.string :item_value
      t.integer :min_rental_days

      t.timestamps
    end
  end
end
