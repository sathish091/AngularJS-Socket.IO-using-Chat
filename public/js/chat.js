$(function(){
	//get the user_data for server side in /myifo url
	$.get('/myinfo',function(data){
			console.log("user_data:",data);
			var username=data.name;
			console.log('client side on_name:',username);
			// client side socket connection
			var socket = io.connect('http://localhost:8000');
	 		socket.on('connect', function(data) { 
				console.log('connected');
				// socket.emit('adduser',on_user);
			});
			//emit the message and username
			$('#send').click(function(){
				var chat_box=$('#chat').val(); 
				console.log(chat_box);
				$("#chat").val("");
				socket.emit('sendchat',chat_box);
			});
			// keypress to data passing
			$('#chat').keypress(function(e){
				if(e.which==13) {
					e.preventDefault();
					$('#send').click();
				}
			});
			// display the data
			socket.on('connect', function(){
				socket.emit('adduser', username);
			});
			socket.on('updatechat', function (username, data) {
				console.log("dsadjhvsh:",username,data)
				$('#msg').append('<b>'+username + ':</b> ' + data + '<br>');
			});	
			socket.on('updateusers', function(data) {
				console.log("dadaaaa:",data);
				$('#onlineuser').empty();
				$.each(data, function(key, value) {
					console.log("kkkkk:",key);
					console.log("vvvvv:",value);
					$('#onlineuser').append('<div style="cursor:pointer;" onclick="send_individual_msg(\''+value+'\')">' + key + '</div>');
				});
			});
			socket.on('store_username',function(username){
				my_username=username;
				console.log("my_username:",my_username);
			});
			var my_username="";
			function send_individual_msg(id){
				console.log("idddd:",id);
				socket.emit('check_user',my_username,id);
			}
			socket.on('msg_user',function(username){
				socket.emit('msg_others',username,my_username,chat_box);

			});
			socket.on('msg_handler', function (username, data) {
		$('#msg').append('<b>'+username + ':</b> ' + data + '<br>');			
	});
			
		});
});
		
          	

      

	