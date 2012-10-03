// Return boolean TRUE/FALSE
function isiPhone(){
    return (
        (navigator.platform.indexOf("iPhone") != -1) ||
        (navigator.platform.indexOf("iPod") != -1)
    );
}

/* / / / / / / / /  Numbers and statements / / / / / / / / */

//set statements
winWidth = $(window).width();
winHeight = $(window).height();

maxWidth = winWidth;
maxHeight = winHeight;
	
minWidth = 960;
minHeight = 200;
	
orgImgWidth = 432;
  

/* Loader */
var base = Math.floor(Math.random()*13);
var loaded = base*(Math.floor(Math.random()*13));
var timer;

function startCount() {
	loaded=loaded*(Math.floor(Math.random()*13));
	if ( loaded != 0 ) {
		$('.counter').html('<p>'+loaded+'</p><p>'+winWidth+'&times;'+winHeight+'</p>');
	}
	timer=setTimeout("startCount()",150);
}

function stopCount() {
	clearTimeout(timer);
}


$(document).ready(function() {
	
	if ( !isiPhone() ) {
		startCount();
	}
	
	$('.image').css({opacity:0});
	
	var fit = (Math.ceil(winWidth / 364) + 1);
	var rounded = Math.floor(winWidth / fit);
	var ratio = rounded / orgImgWidth;
		
	var imgHolder = $('.image');
	var img = $('#container img');
	
	var fitFloor = (Math.floor(winWidth / 364) + 1);
	var newRounded = Math.ceil(winWidth / fitFloor);
	var ratio = newRounded / orgImgWidth;
	
	$('#wrapper').css({'width':(((orgImgWidth * ratio)*fitFloor)+fitFloor)});
    
    $('#wrapper').masonry({
		columnWidth: rounded,
		isResizeable: false,
		itemSelector: '.image'
	});
	
	img.each(function(index) {
		var parent = $(this).parent();
		var height = $(this).attr('height');		
		$(this).attr('orgheight',height);		
		var newWidth = Math.ceil(orgImgWidth * ratio);
		var newHeight = Math.ceil(height * ratio);		
		var pos = parent.position();				
		var topPos = pos.top;
		var leftPos = pos.left;		
		var newTopPos = Math.ceil(topPos * ratio);
		var newLeftPos = Math.ceil(leftPos * ratio);		
		$(this).attr({
			'width':newWidth,
			'height':newHeight
		});		
		parent.css({
			top:newTopPos,
			left:newLeftPos
		});		
		if ( index == ($('#container img').length - 1) ) {
		
			$('#wrapper').masonry({
				columnWidth: newWidth
			});
		}
	});
	
});

$(window).load(function () {
	
	if ( !isiPhone() ) {
		stopCount();
	}
	
	var holder = $('.image');	
	var holders = holder.length;
	
	holder.each(function(index) {
		
		$(this).children('img').attr('title','');
		
		if ( index == (holders-1) ) {
			
            $('#container').css({opacity:1});						
            $('.loading').remove();					
            $('.image').each(function(i){
                $(this).delay(i*100).animate({opacity : 1.0}, 400 );
            });
		}
		
	});
	
});



$(window).resize(function(){
	
	if ( !isiPhone() ) {
		
		winWidth = $(window).width();
        winHeight = $(window).height();
		
		var fit = (Math.ceil(winWidth / 364) + 1);
		var rounded = Math.floor(winWidth / fit);
		var ratio = rounded / orgImgWidth;
			
		var imgHolder = $('.image');
		var img = $('#container img');
		
		var fitFloor = (Math.floor(winWidth / 364) + 1);
		var newRounded = Math.ceil(winWidth / fitFloor);
		var ratio = newRounded / orgImgWidth;
		
		$('#wrapper').css({'width':(((orgImgWidth * ratio)*fitFloor)+fitFloor)});
		
		$('#wrapper').masonry({
			columnWidth: rounded,
			isResizeable: false,
			itemSelector: '.image'
		});
		
		img.each(function(index) {
	
			var parent = $(this).parent();			
			var height = $(this).attr('orgheight');			
			var newWidth = Math.ceil(orgImgWidth * ratio);			
			var newHeight = Math.ceil(height * ratio);			
			var pos = parent.position();					
			var topPos = pos.top;
			var leftPos = pos.left;			
			var newTopPos = Math.ceil(topPos * ratio);
			var newLeftPos = Math.ceil(leftPos * ratio);
			
			$(this).attr({
				'width':newWidth,
				'height':newHeight
			});
			
			parent.css({
				top:newTopPos,
				left:newLeftPos
			});
			
			if ( index == ($('#container img').length - 1) ) {
			
                $('#wrapper').masonry({
					columnWidth: newWidth
				});
			}
			
		});
	
	} else {
		
		$('#wrapper').masonry({});
		
	}	
});