class CreateMessages < ActiveRecord::Migration[5.0]
  def change
    create_table :messages do |t|
      t.string   :content, null: false

      t.integer :user_id
      t.integer :chat_room_id

      t.timestamps
    end

    add_index :messages, :user_id
    add_index :messages, :chat_room_id

    add_index :messages, [:user_id, :chat_room_id]
  end
end
