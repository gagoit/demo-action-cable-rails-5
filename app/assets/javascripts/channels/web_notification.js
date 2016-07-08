App.web_notification = App.cable.subscriptions.create({channel: "WebNotificationChannel", user: ''}, {
  connected: function(){
    //Called when the subscription is ready for use on the server
    var self = this;

    self.current_user = $(".nav .user-info").data("user");

    setTimeout(function(){
      self.join();
    }, 1000);
  },

  disconnected: function(){
    //Called when the subscription has been terminated by the server
  },

  join: function(){
    this.perform("join", {user: this.current_user});
  },

  received: function(data){
    // Called when there's incoming data on the websocket for this channel
    $.notify(data.message, 'success');
    
    return;
  },
});