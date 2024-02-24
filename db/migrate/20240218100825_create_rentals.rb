class CreateRentals < ActiveRecord::Migration[7.1]
  def change
    create_table :rentals do |t|
      t.references :listing, null: false, foreign_key: true
      t.datetime :start_date
      t.datetime :end_date
      t.integer :status
      t.references :user, null: false, foreign_key: true
      t.integer :owner

      t.timestamps
    end
  end
end
