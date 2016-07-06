'use strict'; 
function scrollUp(block,targetBlock) {
	$(block).click(function(event){
		//event.preventDefault();
		var href = $($(this).attr('href').substr(1));
		var that = $(this);
		var target;
		if (href == '#contacts') {
			$('body, html').animate({scrollTop:$('body').height()},800);
			return false;
		}
		if (that.hasClass('tab-link')) {
			target = href.find('.container');
			console.log(href);
			target = target.offset().top - 180; 
			$(that.data('href')).trigger('click');
		} else 
			target = href.offset().top - 81;  
		$('body, html').animate({scrollTop:target},800);
		return false;
	});
}   

function hashScroll() {
	if(window.location.hash) {
		var targetBlock = $(window.location.hash);	
		console.log(targetBlock)	
		var target = $(targetBlock).offset().top - 82; 
		$('body, html').animate({scrollTop:target}, 0);
	}
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
				$('.preview-logo img.init, .header-logo').css({'opacity':1})
			}).removeClass('active');
			$('body').removeClass('collapsed');
		}
		else{
			$(this).addClass('active');
			$('.preview-logo img.init, .header-logo').css({'opacity':0})
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
	var windowHeight = $(window).height();  
 
	if ($(window).width() > responsive) {
		$('.section').css({
			'min-height' : windowHeight
		});

		$('.section-double').css({
			'height' : windowHeight*2
		});

	} else {
		$('.section').css({
			'min-height' : 'auto'
		});		
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
	if ($('.preview-logo').length) {
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

		var logoTween = new TweenLite($logoPreview, 300, position1);
		var mediaTween = new TweenLite($('.preview-media'), 2000, position2); 

		//if (!window.location.hash) {
			Scrollissimo.add(logoTween, 0, 25); 
			Scrollissimo.add(mediaTween, 0, 25); 
		/*} else {
			TweenLite.to($logoPreview, 0, position1);
			Scrollissimo.add(mediaTween, 0, 25); 
		}*/
	}
}

function logoInit() {
	if ($('.preview-logo').length) {
		$('.preview-logo img').addClass('init');
	}
}

function logoFade() {
	if ($('.preview-logo').length && !window.location.hash) {
		$('.preview-logo img').addClass('fadeInDown animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
	  		$(this).removeClass('fadeInUp animated');
	    });
	}
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
	logoPreviewPos();
	logoAnimation();
	masterTooltip();	
	scrollUp('.topMenu a');  	

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

		hashScroll();
	}); 

	$(window).resize(function(){
		footerplaceholder();
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

 