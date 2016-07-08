class MessageBroadcastJob < ApplicationJob
  queue_as :default
 
  def perform(message)
    ActionCable.server.broadcast "chat_room_#{message.chat_room_id}", message: render_message(message)

    message.chat_room.user_ids.uniq.each do |user_id|
      next if message.user_id == user_id
      ActionCable.server.broadcast "web_notification_#{user_id}", message: "#{message.user.email} sent new message in #{message.chat_room.topic}"
    end
  end
 
  private
    def render_message(message)
      ApplicationController.renderer.render(partial: 'messages/message', locals: { message: message })
    end
end
