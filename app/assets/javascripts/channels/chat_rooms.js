App.chat_rooms = App.cable.subscriptions.create({channel: "ChatRoomsChannel", room: $("#chat-room-area").data("room")},{
  speaking_list: [],
  current_user: null,
  room_id: function(){
    return $("#chat-room-area").data("room");
  },

  connected: function(){
    //Called when the subscription is ready for use on the server
    var self = this;

    self.current_user = $("#chat-room-area").data("user");

    setTimeout(function(){
      self.join();
    }, 1000);
  },

  disconnected: function(){
    //Called when the subscription has been terminated by the server
  },

  join: function(){
    this.perform("join", {room: this.room_id()});
  },

  received: function(data){
    // Called when there's incoming data on the websocket for this channel

    if(data.message){
      $('#messages').append(data.message);
    }else if(this.current_user != data.user){
      if(data.type == 'is_speaking'){
        if(this.speaking_list.indexOf(data.user) == -1){
          this.speaking_list.push(data.user);
        }

        this.render_speaking();
      }else if(data.type == 'end_speaking'){
        if(this.speaking_list.indexOf(data.user) > -1){
          this.speaking_list.splice(data.user);
        }

        this.render_speaking();
      }
    }
    
    return;
  },

  speak: function(data){
    data.chat_room_id = this.room_id();
    this.perform("receive", data);
  },

  is_speaking: function(){
    this.perform("is_speaking", {chat_room_id: this.room_id()});
  },

  end_speaking: function(){
    this.perform("end_speaking", {chat_room_id: this.room_id()});
  },

  render_speaking: function(){
    if(this.speaking_list.length > 0){
      $("#is_speaking").html(this.speaking_list.join(', ') + ' is writing...');
      $("#is_speaking").show();
    }else{
      $("#is_speaking").hide();
    }
    
  }
});


$(function() {
  $(document).on('keypress', '[data-behavior~=room_speaker]', function(event){
    if (event.keyCode == 13){
      App.chat_rooms.speak({message: event.target.value});
      event.target.value = "";
      event.preventDefault();
    }
  });

  $('#new_message').submit(function(event) {
    event.preventDefault();

    var input = $(this).find('[data-behavior~=room_speaker]');

    App.chat_rooms.speak({message: input.val()});
    input.val('');
    
    return false;
  });

  $(document).on('focus', '[data-behavior~=room_speaker]', function(event){
    App.chat_rooms.is_speaking();
  });

  $(document).on('blur', '[data-behavior~=room_speaker]', function(event){
    App.chat_rooms.end_speaking();
  });
});