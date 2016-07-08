// App.messages = App.cable.subscriptions.create("MessagesChannel",{
//   connected: function(){
//     //Called when the subscription is ready for use on the server
//   },

//   disconnected: function(){
//     //Called when the subscription has been terminated by the server
//   },

//   received: function(data){
//     // Called when there's incoming data on the websocket for this channel
//     $("#messages").removeClass('hidden');
//     return $('#messages').append(this.renderMessage(data));
//   },

//   renderMessage: function(data) {
//     return "<p> <b>" + data.user + ": </b>" + data.message + "</p>";
//   }
// });

// $(document).on('keypress', '[data-behavior~=room_speaker]', function(event){
//   if (event.keyCode is 13){
//     App.room.speak event.target.value;
//     event.target.value = "";
//     event.preventDefault();
//   }
// })
// 
// $('#message-form').submit(function(event) {
//     event.preventDefault();

//     let url = $(this).attr('action');
//     let $authenticityToken = $(this).find("input[name='authenticity_token']");
//     let $messageBody = $(this).find("textarea[name='message[body]']")
//     let data = {
//       authenticity_token: $authenticityToken.val(),
//       message: {
//         body: $messageBody.val()
//       }
//     };

//     $.post(url, data).then(function() {
//       $messageBody.val(null);
//     });

//   });