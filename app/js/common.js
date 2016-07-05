'use strict'; 
function scrollUp(block,targetBlock) {
	$(block).click(function(event){
		event.preventDefault();
		var target;
		if ($(this).attr('href') == '#slide-5') {
			$('body, html').animate({scrollTop:$('body').height()},800);
			return false;
		}
		if ($(this).hasClass('tab-link')) {
			target = $($(this).attr('href')).find('.container') || $($(this).attr('href')).find('.mbox');
			target = target.offset().top - 180; 
			$($(this).data('href')).trigger('click');
		} else 
			target = $($(this).attr('href')).offset().top - 82;  
		$('body, html').animate({scrollTop:target},800);
		return false;
	});
}   
 
function star(rating){
	$(rating).each(function(){
		var rating = $(this).data('rating');
		var maxrating = 5;
		for (var i = 0; i < maxrating; i++){
			$(this).append('<span></span>');
			if (i<rating)
				$(this).find('span').eq(i).addClass('active');
		}
	})
}

function slickInit(){
	if ($('.slider').length){
		$('.slider').slick({
		  slidesToShow: 2,
		  slidesToScroll: 1,
		  arrows: true,
		  responsive: [
		    {
		      breakpoint: 960,
		      settings: {
		        slidesToShow: 1
		      }
		    }
	    ]
		});
	}
	if ($('.slider-for').length){
		$('.slider-for').slick({
		  slidesToShow: 1,
		  slidesToScroll: 1,
		  arrows: true,
		  fade: true,
		  asNavFor: '.slider-nav'
		});
		$('.slider-nav').slick({
		  slidesToShow: 3,
		  slidesToScroll: 1,
		  asNavFor: '.slider-for',
		  dots: false,
		  centerMode: true,
		  centerPadding:'0px',
		  focusOnSelect: true
		});
	}
}

function expandTool(){
	$('.expand-subject').slideUp(0);
	$('.expand-tool').click(function(e){
		$(this).siblings('.expand-subject').stop().slideToggle();
		$(this).parent().toggleClass('active');
		e.preventDefault();
	})
}

function navbartoggle(){
	$('.navbar-toggle').click(function(){
		var navbar = $('.navbar-collapse');
		if($(this).is('.active')){
			$(this).removeClass('active');
			navbar.stop().slideUp(function(){
				$('.preview-logo img.init').css({'opacity':1})
			}).removeClass('active');
			$('body').removeClass('collapsed');
		}
		else{
			$(this).addClass('active');
			$('.preview-logo img.init').css({'opacity':0})
			navbar.stop().slideDown().addClass('active');
			$('body').addClass('collapsed');  
		}
		return false;
	});
}

function footerplaceholder(){	
	$('.footer_placeholder')
		.height($('.footer')
		.outerHeight());
}

function tabs(block){
	if (typeof(block)==='undefined') block=$('.tabs');
	block.each(function(){
		var $wrap=$(this);
		if (!$wrap.is('.tabs-done')){
			$wrap.addClass('tabs-done');
			$('[data-tabId]',$wrap).click(function(event){
				event.preventDefault();
				//coneole.log(3);
				var tabid=$(this).data('tabid');
				$('[data-tabId]',$wrap).removeClass('active');
				$('[data-tabId="'+tabid+'"]',$wrap).addClass('active');
				$('[data-tab]',$wrap).removeClass('active').addClass('hidden');
				$('[data-tab="'+tabid+'"]',$wrap).addClass('active').removeClass('hidden');
			})
			if ($('.active[data-tabId]',$wrap).length>0)
				$('.active[data-tabId]',$wrap).click();
			else
				$('[data-tabId]:eq(0)',$wrap).click();
		}
	})
}

function sendForm(){
	$('form [type="submit"]').click(function(){

 		var parentClass=$(this).attr('rel');
	 	var paramsFancy={
		    'scrolling':0,
		    'autoScale': true,
		    'transitionIn': 'elastic',
		    'transitionOut': 'elastic',
		    'speedIn': 500,
		    'speedOut': 300,
		    'autoDimensions': true,
		    'centerOnScroll': true,
		    'href' : '#thanks',
		    'padding' : '0',
		    'height' : 'auto',
		    helpers: {
	            overlay: {
	              locked: false
	            }
	        }
	    };

	   form =  $(this).closest('form');

	    if(form.valid()){
	        $.ajax({
	            url: 'form_work.php',
	            data: 'action=send_form&'+form.serialize(),
	            success: function(data){
	                $.fancybox.close();
	                $.fancybox.open(paramsFancy);
	                $('form input[type="text"]').val('');
                  	$('form input[type="text"]').blur();
                  	$('.zNice-tInput').removeClass('zNice-error zNice-valid');
	            }
	        });
	        
	    }else{

	    } 
	}); 
}

function previewHeight(responsive) {
	var windowHeight = $(window).height() - 82;  
 
	if ($(window).width() > responsive) {
		$('.section').css({
			'min-height' : windowHeight
		});
	} else {
		$('.section').css({
			'min-height' : 'auto'
		});		
	}

	if ($(window).width() > responsive) {
		$('.section-double').css({
			'height' : windowHeight*2
		})
	}

}

function logoPreviewPos() {
	var $logoPreview = $('.preview-logo img');
	$logoPreview.css({
		'left' : $(window).width()/2 - $logoPreview.width()/2,
		'top' : ($(window).height() - $('.thumbnails').height())/2 - $logoPreview.height()/2
	});
}

function logoAnimation() {
	var $logoPreview = $('.preview-logo img');
	var $logoHeader = $('.header-logo');
	$logoPreview.top = $logoPreview.position().top - $logoPreview.height();
	$logoPreview.left = $logoPreview.position().left;	

	$logoHeader.top = $logoHeader.offset().top - 2;
	$logoHeader.left = $logoHeader.offset().left;

	var position1 = { 
		top: $logoHeader.top,  
		scale: .3, 
		left: $logoHeader.left
	};

	var position2 = {
		top: -80
	}

	var myTween = new TweenLite($logoPreview, 300, position1);
	var myTween2 = new TweenLite($('.preview-media'), 2000, position2); 

	Scrollissimo.add(myTween, 0, 25); 
	Scrollissimo.add(myTween2, 0, 25); 
}

function logoOnResize() {
	var $logoHeader = $('.header-logo');
	$logoHeader.top = $logoHeader.offset().top - 2;
	$logoHeader.left = $logoHeader.offset().left;
	$logoHeader.css({
		'left' : $logoHeader.left,
		'top' : $logoHeader.top
	});

}

function logoInit() {
	$('.preview-logo img').addClass('init');
}

function logoFade() {
	$('.preview-logo img').addClass('fadeInDown animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
  		$(this).removeClass('fadeInUp animated');
    });
}

function thumbnailsPos(scrollTop) {
	var areaHeight = $('.preview').height()  - $(window).height() + $('.thumbnails').outerHeight();
    if (scrollTop >= areaHeight)
    	$('.thumbnails').css('position', 'static');
    else {
   		$('.thumbnails').css('position', 'fixed');
	}
}

function previewRespHeight() {
	var previewHeight = $(window).height() - $('.thumbnails-item').outerHeight() - 30; 
	$('.preview').css({
		'height' : previewHeight,
		'min-height' : previewHeight
	});
}

function skrollrInit() {
	//install scrollr for parallax
    var s = skrollr.init({
        render: function(data) {
            //Debugging - Log the current scroll position.
            //console.log(data.curTop);
        }
    });
}

function masterTooltip() {
	$('.masterTooltip').hover(function(){
        // Hover over code
        var title = $(this).attr('title');
        $(this).data('tipText', title).removeAttr('title');
        $('<p class="tooltip"></p>')
        .text(title)
        .appendTo('body')
        .fadeIn('slow');
    }, function() {
        // Hover out code
        $(this).attr('title', $(this).data('tipText'));
        $('.tooltip').remove();
    }).mousemove(function(e) {
        var mousex = e.pageX + 20; //Get X coordinates
        var mousey = e.pageY + 10; //Get Y coordinates
        $('.tooltip')
        .css({ top: mousey, left: mousex })
    });
}

$(document).ready(function(){
	navbartoggle();
	slickInit();
	footerplaceholder();
	tabs();
	logoAnimation();
	logoPreviewPos();
	scrollUp('.topMenu a');
	masterTooltip();

	var responsive = 1024;
	var mobile = 768;
	var windowWidth = $(window).width();

	$(window).load(function(){ 
		var wHeight = $(window).height(); 
		previewHeight(responsive);
		logoInit();
		new WOW({ mobile: false }).init();
		
		if (windowWidth > responsive) {
			logoFade();
			skrollrInit();
		} else {
			previewRespHeight();
		}
	}); 

	$(window).resize(function(){
		footerplaceholder();
		logoOnResize();
		previewHeight(responsive);
		if (windowWidth <= responsive) {
			previewRespHeight();
		}
		if (windowWidth > responsive) {
			thumbnailsPos($(this).scrollTop()); 
		}

	});

	$(window).scroll(function(){  	
		if (windowWidth > responsive) {
			thumbnailsPos($(this).scrollTop()); 
		}
	    if ($(window).width() > responsive) {
	   		Scrollissimo.knock();		    
		}
	});

	$(window).on('beforeunload', function(){
  		$(window).scrollTop(0);
	});

});

 