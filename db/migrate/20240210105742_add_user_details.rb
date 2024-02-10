class AddUserDetails < ActiveRecord::Migration[7.1]
  def change
    add_column :users, :location, :string
    add_column :users, :bio, :text
  end
end
