# Be sure to restart your server when you modify this file. Action Cable runs in a loop that does not support auto reloading.
class ChatRoomsChannel < ApplicationCable::Channel
  def subscribed
    # stream_from "chat_room_#{params['room']}"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def join(data)
    stream_from "chat_room_#{data['room']}"
  end

  def receive(data)
    message = Message.new({content: data['message'], chat_room_id: data['chat_room_id']})
    message.user = self.current_user

    message.save!
  end

  def is_speaking(data)
    ActionCable.server.broadcast "chat_room_#{data['chat_room_id']}", type: 'is_speaking', user: self.current_user.email, user_id: self.current_user.id
  end

  def end_speaking(data)
    ActionCable.server.broadcast "chat_room_#{data['chat_room_id']}", type: 'end_speaking', user: self.current_user.email, user_id: self.current_user.id
  end
end
