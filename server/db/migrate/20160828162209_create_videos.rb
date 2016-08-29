class CreateVideos < ActiveRecord::Migration[5.0]
  def change
    create_table :videos do |t|
      t.string :youtube_id
      t.string :title
      t.datetime :publish_time
      t.string :status
      t.string :channel
      t.timestamps
    end
  end
end
