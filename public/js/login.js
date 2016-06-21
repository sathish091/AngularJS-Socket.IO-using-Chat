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

           $.ajax ({
		           	url:'/login',
		           	dataType:'json',
		           	data:'user_login',
		           	type:'post',
		           	success:function(data)
		           	{
		           		location.href(data);


		           	}

                  });
		}
		 else
			{
				console.log('data is not correct');
			}
    });
});

