var socket=io();

socket.on('connect',function() {
	console.log('Connected to server.');
	socket.on('welcome',function(greet){
		// console.log(greet.text);
		// console.log(greet.from);
		$("#list").append(`<li>${greet.from}:${greet.text}</li>`);
		// setPos();
	});
	socket.emit('createMessage',{
		to:"Himanshu",
		message:"hsdsajhjshjdhsdkdsjhdjhd",
		time:Date.now	
	},function(data)
	{
		console.log(data);
	});
});

socket.on('newMessage',function(message){
 	// console.log("new message from:",message.from,"\nmessage: ",message.message,"\nCreated At: ",message.time);
 	$("#list").append(`<li>${message.from}:${message.message}</li>`);
 	// setPos();
 });

socket.on('sendlocation',function(link)
{
	$('#list').append(`<li>User:<a href="${link.link}" target="_blank">My location</a></li>`);
	// setPos();
});

socket.on('disconnect',function(){
	console.log("Connection Disconnected");
});

$("#message-form").on('submit',function(e){
	e.preventDefault();
	socket.emit('createMessage',{
		to:"User",
		message:$("#message").val(),	
	},function(data)
	{
		$("#message").val("");
		console.log(data);
	});
})

$("#sendlocation").on('click',function(){
	if(!navigator.geolocation){
		return ('Geolocation is not supported by browser');
	}
	navigator.geolocation.getCurrentPosition(function(position){
		socket.emit('sendlocation',{
			latitude:position.coords.latitude,
			longitude:position.coords.longitude
		},function(message){
			setPos();
			console.log(message);
		});
	},function()
	{
		alert('unable to get location.');
	});
});


$("#list").css('height',$(window).height()-50);
$("input").css('width',$(window).width()-380);
function setPos()
{

	var height=$("li").last().position();
	$( "body" ).scrollTop(10000000);
	if(height.top<$(window).height()-50)
	{
		$("#list").css('height',$(window).height()-50);	
	}	
	else{
		$("#list").css('height',height.top);
	}
	$("input").css('width',$(window).width()-380);
}
