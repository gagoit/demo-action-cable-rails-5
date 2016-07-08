class CreateChatRooms < ActiveRecord::Migration[5.0]
  def change
    create_table :chat_rooms do |t|
      t.string   :topic, null: false

      t.timestamps
    end

    add_index :chat_rooms, :topic,                unique: true
  end
end
