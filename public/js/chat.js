$(function(){
	//get the user_data for server side in /myifo url
	$.get('/myinfo',function(data){
			console.log("user_data:",data);
			var on_user=data.name;
			console.log('client side on_name:',on_user);
			// client side socket connection
			var socket = io.connect('http://localhost:8000');
			socket.on('connect', function(data) { 
				console.log('connected');
				socket.emit('join','hi sathish');
			});
			//emit the message and username
			$('#send').click(function(){
				var chat_box=$('#chat').val(); 
				console.log(chat_box);
				$("#chat").val("");
				socket.emit('message',on_user,chat_box);
			});
			// keypress to data passing
			$('#chat').keypress(function(e){
				if(e.which==13) {
					e.preventDefault();
					$('#send').click();
				}
			});
			// display the data
			socket.on('display',function(users,chat_box){
				console.log('text data:',users,chat_box);
				console.log('name:',users.Online_user)
				$('#msg').append('<b>'+ users.Online_user +'::<b>'+ chat_box +'<br>');
			});
		});
});
		
          	

      

	