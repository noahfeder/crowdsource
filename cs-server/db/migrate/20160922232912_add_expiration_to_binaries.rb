class AddExpirationToBinaries < ActiveRecord::Migration[5.0]
  def change
    add_column :binaries, :expiration, :string
  end
end
