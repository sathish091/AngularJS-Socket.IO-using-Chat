$(document).ready(function(){

	$('#login').click(function(){

	  if ($('.form').parsley().validate())
	    {
		 	var user_email=$('#login_email').val();
		 	var user_password=$('#login_password').val();

		 	var user_login =
		 	 {
		 		email:user_email,
		 		password:user_password
		 	 };
		 	 console.log(user_login)

           $.post('/login',user_login,function(data)
           { console.log(data);
           	if (data) 
           	{
           		location.href='/chat';

           	}else 
           	    {
           		alert('invalied data');
           	    }


           });
		}
		 else
			{
				console.log('data is not correct');
			}
    });
});

