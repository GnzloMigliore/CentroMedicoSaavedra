/*
* Clinica Multi-Purpose Medical HTML Template
* Build Date: January 2016
* Author: ThemeAtelier
* Copyright (C) 2016 ThemeAtelier
*/
/**
 * Table of contents
 * -----------------------------------
 * 1.0 JQUERY WINDOW LOAD FUNCTION
	* 1.1 PRELOADER
	* 1.2 MASSONARY JS
 * 2.0 JQUERY DOCUMENT READY FUNCTION
	* 2.1 JQUERY MAIN MENU JS
	* 2.2 STELLAR JS
	* 2.3 VIDEO POPUP
	* 2.4 CALL TO ACTION SLIDER
	* 2.5 FEATURED BLOG CAROUSEL
	* 2.6 DOCTORS CAROUSEL
	* 2.7 GOOGLE MAP
	* 2.8 SCROLL TO UP
	* 2.9 DATE PICKER
	* 2.10 APPOINMENT MAIL FUNCTION AJAX
	* 2.11 APPOINMENT MAIL FUNCTION AJAX V2
	* 2.12 CONTACT MAIL FUNCTION AJAX
 ==================
 *
 */
(function($) {
    "use strict"; // this function is executed in strict mode

/* =================================
   1.0 JQUERY WINDOW LOAD FUNCTION
=================================== */
$(window).load( function() {	
    /******************** 1.1 PRELOADER ********************/
    // will first fade out the loading animation
	var $prewrp = $('.preloader-wrap'),
		$loader = $( '.loader');
		
    $prewrp.fadeOut();
    // will fade out the whole DIV that covers the website.
    $loader.delay(1000).fadeOut("slow");
	/******************** 1.2 MASSONARY JS ********************/
	var $grid = $('.grid');
		
	$grid.masonry({
		itemSelector: '.grid-item',
		columnWidth: '.grid-item',
	});
});
/* =================================
   2.0 JQUERY DOCUMENT READY FUNCTION
=================================== */
$(document).ready(function() {
	/******************** 2.1 JQUERY MAIN MENU JS ********************/
	$('nav#dropdown').meanmenu();
	
	/* Fixed main menu */

	$(window).on('scroll',function() {    
        var scroll = $(window).scrollTop();
        if (scroll < 5) {
            $('.header-area').removeClass('is_stuck');
        }else{
            $('.header-area').addClass('is_stuck');
        }
    });
	
	/******************** 2.2 STELLAR JS ********************/
	$(window).stellar({
		horizontalScrolling: false,
	});
	/******************** 2.3 VIDEO POPUP ********************/
	jQuery("a.popup-youtube").YouTubePopUp();
	
	/******************** 2.4 CALL TO ACTION SLIDER ********************/
	$(".owl-home").owlCarousel({
		items:1, // Show next and prev buttons
		nav:false,
		dots:false,
		loop:true,
		lazyLoad:true,
		autoplay:true,
		animateOut: 'fadeOut',
		autoplayTimeout:5000,
	});
	/******************** 2.5 FEATURED BLOG CAROUSEL ********************/
	$(".featured-blog-carosel").owlCarousel({
		items:1, // Show next and prev buttons
		nav:true,
		dots:false,
		loop:true,
		lazyLoad:true,
		autoplay:true,
		autoplayTimeout:5000,
		margin:20,
		navText: ["<i class='fa fa-angle-left'></i>","<i class='fa fa-angle-right'></i>"],
	});
	/******************** 2.6 DOCTORS CAROUSEL ********************/
	$(".owl-doctor").owlCarousel({
		nav:true,
		dots:false,
		loop:true,
		lazyLoad:true,
		autoplay:true,
		animateOut: 'fadeOut',
		autoplayTimeout:5000,
		margin:20,
		navText: ["<i class='fa fa-angle-left'></i>","<i class='fa fa-angle-right'></i>"],
		responsive : {
			0 : {
				items:1,
			},
			480 : {
				items:2,
			},
			768 : {
				items:3,
		},
		},
	});
	/******************** 2.7 GOOGLE MAP ********************/
	/* GOLBAL AND CONTACT PAGE MAP */
	$('.map')
      .gmap3({
        center:[51.492465, -0.230184],
        zoom:4,
        scrollwheel: false
      })
      .marker([
        {position:[51.492465, -0.230184]},
      ])
	
	/******************** 2.8 SCROLL TO UP ********************/
	var $scrollup = $('.scrollup');
	
	$(window).on('scroll', function() {
		if ($(this).scrollTop() > 500) {
			$scrollup.fadeIn();
		} else {
			$scrollup.fadeOut();
		}
	});
	$scrollup.on("click", function() {
		$("html, body").animate({
			scrollTop: 0
		}, 800);
		return false;
	});
	/******************** 2.9 DATE PICKER ********************/
	$( "#appdate" ).datepicker();
	$( "#birth_date" ).datepicker();
	/******************** 2.10 APPOINMENT MAIL FUNCTION AJAX ********************/
	var $loadImg 	 = $('#loading_image'),
		$erroromes   = $('#erreomes'),
		$loadImgcont = $('#loading_imgcont');
	
	$('#appointments').submit( function(e){
		 e.preventDefault(); // Prevent Default Submission
		$.ajax({
			type: 'POST',
			url: 'php/appointments.php',
			data: $(this).serialize(),
			success: function(data){
				$erroromes.html( data  );
				$loadImg.css( 'display', 'none' );
			}
		});
		// loading button
		if ( $loadImg.length == 0 ) { //is the image on the form yet?    
			$loadImg.css('display','block')
		}
		$loadImg.show(); // show the animated image 
		return false;
	});
	/******************** 2.11 APPOINMENT MAIL FUNCTION AJAX V2 ********************/
	$('#appointmentsv2').submit( function(e){
		 e.preventDefault(); // Prevent Default Submission
		$.ajax({
			type: 'POST',
			url: 'php/appointmentsv2.php',
			data: $(this).serialize(),
			success: function(data){
				$erroromes.html( data  );
				$loadImg.css( 'display', 'none' );
			}
		});
		// loading button
		if ( $loadImg.length == 0) { //is the image on the form yet?
			$loadImg.css('display','block')
		}
		$loadImg.show(); // show the animated image    
		//$(':submit',this).attr('disabled','disabled'); // disable double submits
		return false;
	});
	/******************** 2.12 CONTACT MAIL FUNCTION AJAX ********************/
	$('#contactform').submit( function(e){
		 e.preventDefault(); // Prevent Default Submission
		$.ajax({
			//console.log($(this).serialize());
			type: 'POST',
			url: 'php/contactform.php',
			data: $(this).serialize(),
			success: function(data){
				$erroromes.html( data  );
				$loadImgcont.css( 'display', 'none' );
			}
		});
		// loading button
		if ( $loadImgcont.length == 0) { //is the image on the form yet? 
			$loadImgcont.css('display','block')
		}
		$loadImgcont.show(); // show the animated image    
		//$(':submit',this).attr('disabled','disabled'); // disable double submits
		
		return false;
	});
});
})(jQuery);