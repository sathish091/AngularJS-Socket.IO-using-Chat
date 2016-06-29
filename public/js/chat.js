
		var socket = io.connect('http://localhost:8000');

		socket.on('connect', function(data) { 
			console.log('connected');
			console.log(data)
			socket.emit('join','hi sathish')
		});
		socket.on('chat',function(data){
			console.log(data);
			$('#msg').append('<b>'+ 'Message:' +'<b>'+ data +'<br>')
		});

        $(function(){
        	$('#send').click(function(){
        		var chat_user=$('#chat').val(); 
        		console.log(chat_user);
        		socket.emit('message',chat_user)
        	});
        	$('#chat').keypress(function(e){
        		if (e.which==13) {
        			$('#send').click();
        		}

        		
        	})
        })
		
          	

      

	