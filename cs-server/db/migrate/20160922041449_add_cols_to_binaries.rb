class AddColsToBinaries < ActiveRecord::Migration[5.0]
  def change
    add_column :binaries, :choiceA, :string
    add_column :binaries, :choiceB, :string
  end
end
