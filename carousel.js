$(document).ready(function() {
	//set photo width. div must equal photo amount * width
	var photo_width = 600;
	//amount of photos
	var size = $('div.pic').length;	

	//anonymous function to add dots to the photos
	$(function(){
		for (var x = 1; x <= size; x++){
		$('div.dots').append('<span class="circle" id=' + x + '></span>')}
		toggleDot(1);
	});

	//make dot selected or unselected
	function toggleDot(id){
		var dot = $('span.circle').eq(id-1)
		if (dot.attr("class") == "circle"){
			dot.attr("class", "circle selected");
		}else {
			dot.attr("class", "circle");
		}		
	}

	//advance the slide to the dot location
	function dotClick(id){
		stopCycle();
		var current_left = parseInt($('#frame').css('left').slice(0, -2));
		var current_id = (Math.abs(current_left) / photo_width) +1

		$('div.pic.active').attr("class", "pic");
		$('div.pic').eq((id-1)).attr("class",'pic active');	

		$('#frame').animate(
	        {"left": -( (id-1)*photo_width)},
	        {duration: 600, queue: false, complete: function() {
	        }}
	      	);
		toggleDot(current_id);
		
		toggleDot(id);
	}

	//stop the automatic slide
	function stopCycle(){
		clearInterval(cycle);
	}


	//set up listener for dot click
	$('div.dots').on('click', 'span.circle', function(){
		var id = event.target.id;
		dotClick(id);
	});


	//self explanatory
	function next_slide(){
		var id = $('div.pic.active').attr('id')
		toggleDot(id);

		if (id == size){
			$('#frame').animate(
	        {"left": "0"},
	        {duration: 600, queue: false, complete: function() {
	        }}
	      	);
	      	id = 1;

		}else {

			var current_left = parseInt($('#frame').css('left').slice(0, -2));

			$('#frame').animate(
	        {"left": ( current_left - photo_width)},
	        {duration: 600, queue: false, complete: function() {
	        }}
	      	);

	      	$('div.pic.active').attr("class", "pic");
	      	

			id++;
				
			}

			toggleDot(id);
			$('div.pic').eq((id-1)).attr("class",'pic active');	
		
			}

	function prev_slide(){

		var id = $('div.pic.active').attr('id');
		toggleDot(id);


		if (id == 1){
			$('#frame').animate(
	        {"left": "-" + ((size-1) * photo_width)},
	        {duration: 600, queue: false, complete: function() {
	        }}
	      	);
	      	id = size;			 
		}
		else {
			var current_left = parseInt($('#frame').css('left').slice(0, -2));

			$('#frame').animate(
		
	        {"left": (current_left + photo_width)},
	        {duration: 600, queue: false, complete: function() {
	        console.log('setting left to ' + (current_left + photo_width))
	        }}
	      	);
	      	console.log('photo width is ' + ($(".pic.active").width()))
	      	id--;
	      }

	      	$('div.pic.active').attr("class", "pic");
	      			
			
			toggleDot(id);
			$('div.pic').eq((id-1)).attr("class",'pic active');	

	}

	$('a.back').click(function() {
		stopCycle();
  		prev_slide();
	});

	$("a.forward").click(function() {
		stopCycle();
  		next_slide();
	});

	//start slide animation
	var cycle = setInterval(function(){
		next_slide();

	}, 5000);

});
