class CreateBinaries < ActiveRecord::Migration[5.0]
  def change
    create_table :binaries do |t|
      t.references :user, foreign_key: true
      t.boolean :active
      t.string :name
      t.text :content
      t.integer :votesA
      t.integer :votesB

      t.timestamps
    end
  end
end
