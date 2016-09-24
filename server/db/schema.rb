ActiveRecord::Schema.define(version: 20160917140106) do

  create_table "series", force: :cascade do |t|
    t.string   "title"
    t.string   "prefix"
    t.string   "channel"
    t.string   "description"
    t.string   "tags"
    t.datetime "publish_at"
    t.integer  "release_number"
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
  end

  create_table "videos", force: :cascade do |t|
    t.string   "youtube_id"
    t.string   "title"
    t.datetime "publish_time"
    t.string   "status"
    t.string   "channel"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
  end

end
