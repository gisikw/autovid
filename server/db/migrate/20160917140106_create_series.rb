class CreateSeries < ActiveRecord::Migration[5.0]
  def change
    create_table :series do |t|
      t.string :title
      t.string :prefix
      t.string :channel
      t.string :description
      t.string :tags
      t.datetime :publish_at
      t.integer :release_number
      t.timestamps
    end
  end
end
