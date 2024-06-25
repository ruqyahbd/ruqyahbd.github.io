jQuery(document).ready(function($){
    "use strict";

    var a = $('.offscreen-navigation .menu');

    if (a.length) {
        a.children("li").addClass("menu-item-parent");
        a.find(".menu-item-has-children > a").on("click", function (e) {
            e.preventDefault();
            $(this).toggleClass("opened");
            var n = $(this).next(".sub-menu"),
                s = $(this).closest(".menu-item-parent").find(".sub-menu");
            a.find(".sub-menu").not(s).slideUp(250).prev('a').removeClass('opened'), n.slideToggle(250)
        });
        a.find('.menu-item:not(.menu-item-has-children) > a').on('click', function (e) {
            $('.rt-slide-nav').slideUp();
            $('body').removeClass('slidemenuon');
        });
    }

    $('.mean-bar .sidebarBtn').on('click', function (e) {
        e.preventDefault();
        if ($('.rt-slide-nav').is(":visible")) {
            $('.rt-slide-nav').slideUp();
            $('body').removeClass('slidemenuon');
        } else {
            $('.rt-slide-nav').slideDown();
            $('body').addClass('slidemenuon');
        }

    });	

    $('#site-navigation').navpoints({
        updateHash:true
    });
    
    /* Scroll to top */
    $('.scrollToTop').on('click',function(){
        $('html, body').animate({scrollTop : 0},800);
        return false;
    });
    $(window).scroll(function(){
        if ($(this).scrollTop() > 100) {
            $('.scrollToTop').fadeIn();
        } else {
            $('.scrollToTop').fadeOut();
        }
    });

    /* Search Box */
    $('body').on('click', '.search-box-area .search-button', function(event){
        event.preventDefault();
        if($('.search-box-area .search-text').hasClass('active')){
            $('.search-box-area .search-text').removeClass('active');
        }
        else{
            $('.search-box-area .search-text').addClass('active');
        }
        return false;
    });

    /* Header Right Menu */
    $('body').on('click', '.additional-menu-area .side-menu-trigger', function (e) {
        e.preventDefault();
        if ( $('.sidenav').hasClass('rtin-ropen') ) {
            $('.sidenav').removeClass('rtin-ropen');
            $('.sidenav').width(0);
        }
        else {
            $('.sidenav').addClass('rtin-ropen');
            $('.sidenav').width(280);
        }
    });

    $('body').on('click', '.additional-menu-area .closebtn', function (e) {
        e.preventDefault();
        $('.sidenav').removeClass('rtin-ropen');
        $('.sidenav').width(0);
    });

    /* Mega Menu */
    $('.site-header .main-navigation ul > li.mega-menu').each(function() {
        // total num of columns
        var items = $(this).find(' > ul.sub-menu > li').length;
        // screen width
        var bodyWidth = $('body').outerWidth();
        // main menu link width
        var parentLinkWidth = $(this).find(' > a').outerWidth();
        // main menu position from left
        var parentLinkpos = $(this).find(' > a').offset().left;

        var width = items * 220;
        var left  = (width/2) - (parentLinkWidth/2);

        var linkleftWidth  = parentLinkpos + (parentLinkWidth/2);
        var linkRightWidth = bodyWidth - ( parentLinkpos + parentLinkWidth );

        // exceeds left screen
        if( (width/2)>linkleftWidth ){
            $(this).find(' > ul.sub-menu').css({
                width: width + 'px',
                right: 'inherit',
                left:  '-' + parentLinkpos + 'px'
            });        
        }
        // exceeds right screen
        else if ( (width/2)>linkRightWidth ) {
            $(this).find(' > ul.sub-menu').css({
                width: width + 'px',
                left: 'inherit',
                right:  '-' + linkRightWidth + 'px'
            }); 
        }
        else{
            $(this).find(' > ul.sub-menu').css({
                width: width + 'px',
                left:  '-' + left + 'px'
            });            
        }
    });

    /* Sticky Menu */
    if ( SEOEngineObj.stickyMenu == 1 || SEOEngineObj.stickyMenu == 'on' ) {
        if (SEOEngineObj.stickyOld) {
            run_old_sticky_menu();
        }
        else {
            run_sticky_menu();
            run_sticky_meanmenu();           
        }
    }

    /* Owl Custom Nav */
    if ( typeof $.fn.owlCarousel == 'function') { 

        $(".owl-custom-nav .owl-next").on('click',function(){
            $(this).closest('.owl-wrap').find('.owl-carousel').trigger('next.owl.carousel');
        });
        $(".owl-custom-nav .owl-prev").on('click',function(){
            $(this).closest('.owl-wrap').find('.owl-carousel').trigger('prev.owl.carousel');
        });

        $(".rt-owl-carousel").each(function() {
            var options = $(this).data('carousel-options');
            $(this).owlCarousel(options);
        });
    }

    /* Woocommerce Shop change view */
    $('#shop-view-mode li a').on('click',function(){
        $('body').removeClass('product-grid-view').removeClass('product-list-view');

        if ( $(this).closest('li').hasClass('list-view-nav')) {
            $('body').addClass('product-list-view');
            Cookies.set('shopview', 'list');
        }
        else{
            $('body').addClass('product-grid-view');
            Cookies.remove('shopview');
        }
        return false;
    });

    /* Visual Composer */
    // Pricing Box 2
    $(".rt-pricing-box-2").on({
        mouseenter: function(){
            var bghover = $(this).data('bghover');
            $(this).css('background-color', bghover);
            $(this).find(".rt-btn a").css('color', bghover);
        },
        mouseleave: function(){
            var bgcolor = $(this).data('bgcolor');
            $(this).css('background-color', bgcolor);
            $(this).find(".rt-btn a").css('color', '');          
        }
    }, this);

    // CTA - Verticle align middle
    $(".rt-cta-1").each(function() {
        var mt,
        $parent = $(this).find('.row'),
        $child1 = $(this).find('.rt-cta-contents'),
        $child2 = $(this).find('.rt-cta-button'),
        pHeight = $parent.height(),
        c1Height = $child1.height(),
        c2Height = $child2.height();
        if ( pHeight > c1Height ) {
            mt = (pHeight-c1Height)/2;
            $child1.css('margin-top', mt+'px');
        }
        if ( pHeight > c2Height ) {
            mt = (pHeight-c2Height)/2;
            $child2.css('margin-top', mt+'px');
        }
    });

    // Info Text hover 
    $(".rt-info-text.layout1, .rt-info-text.layout3").on({
        mouseenter: function(){
            var hoverColor = $(this).data('hover');
            $(this).find("i").css('background-color', hoverColor);
            $(this).find(".media-heading, .media-heading a").css('color', hoverColor);
        },
        mouseleave: function(){
            var color = $(this).data('color');
            $(this).find("i").css('background-color', color);
            $(this).find(".media-heading, .media-heading a").css('color', "");            
        }
    }, this);

    $(".rt-info-text.layout2").on({
        mouseenter: function(){
            var hoverColor = $(this).data('hover');
            $(this).find("i").css('color', hoverColor);
            $(this).find(".media-heading, .media-heading a").css('color', hoverColor);
        },
        mouseleave: function(){
            var color = $(this).data('color');
            $(this).find("i").css('color', color);
            $(this).find(".media-heading, .media-heading a").css('color', "");            
        }
    }, this);

    // Counter
    if ( typeof $.fn.counterUp == 'function') { 
        $('.rt-counter-2 .rt-counter-num').counterUp({
            delay: $(this).data('rtSteps'),
            time: $(this).data('rtSpeed')
        });
    }

    // Testimonial
    $(".rt-owl-testimonial-2").each(function() {
        var color = $(this).data('color');
        $(this).find(".owl-nav > div").css({
            'color': color,
            'border-color': color,
        });
    });
    $(".rt-owl-testimonial-2 .owl-nav > div").on({
        mouseenter: function(){
            var color = $(this).closest('.rt-owl-testimonial-2').data('color');
            $(this).css({
                'color': '',
            });
            this.style.setProperty( 'background-color', color, 'important' );
        },
        mouseleave: function(){
            var color = $(this).closest('.rt-owl-testimonial-2').data('color');
            $(this).css({
                'color': color,
                'background-color': ''
            });          
        }
    }, this);

    // Button
    $(".rt-vc-button-1").on({
        mouseenter: function(){
            var txtHover = $(this).data('txthover');
            var bgHover  = $(this).data('bghover');
            $(this).css({
                'color': txtHover,
                'background-color': bgHover
            });
        },
        mouseleave: function(){
            var txtColor = $(this).data('txtcolor');
            var bgColor  = $(this).data('bgcolor');
            if ( bgColor == '' ) {
                bgColor = 'transparent';
            }
            $(this).css({
                'color': txtColor,
                'background-color': bgColor
            });
        }
    }, this);


    function run_sticky_menu() {

        if ( window.seoEngineStickyActivated ) {
            return;
        }

        window.seoEngineStickyActivated = true;

        var wrapperHtml  = $('<div class="main-header-sticky-wrapper"></div>');
        var wrapperClass = '.main-header-sticky-wrapper';
        
        $('.site-header').clone().appendTo(wrapperHtml);
        $('body').append(wrapperHtml);

        var height = $(wrapperClass).outerHeight() + 40;

        $(wrapperClass).css('margin-top', '-' + height + 'px');

        $(window).scroll(function(){
            if ($(this).scrollTop() > 300) {
                $('body').addClass('rdthemeSticky');
            }
            else {
                $('body').removeClass('rdthemeSticky');
            }
        });
    }

    function run_sticky_meanmenu() {

        $(window).scroll(function() {
            if ($(this).scrollTop() > 50) {
                $('body').addClass("mean-stick");
            } 
            else {
                $('body').removeClass("mean-stick");
            }
        });
    }

    function run_old_sticky_menu() {
        $(window).scroll(function() {
            var s = $("body");
            var windowpos = $(window).scrollTop();
            if(windowpos > 0){
                s.removeClass("non-stick");
                s.addClass("stick");
            } 
            else {
                s.removeClass("stick");
                s.addClass("non-stick");
            }
        });
    }
	
	
	// Wishlist Icon
	$(document).on('click', '.rdtheme-wishlist-icon',function() {
		if ( $(this).hasClass('rdtheme-add-to-wishlist')) {

			var $obj = $(this),
				productId = $obj.data('product-id'),
				afterTitle = $obj.data('title-after');

			var data = {
				'action' : 'seoengine_add_to_wishlist',
				'context' : 'frontend',
				'nonce' : $obj.data('nonce'),
				'add_to_wishlist' : productId,
			};

			$.ajax({
				url : SEOEngineObj.ajaxurl,
				type : 'POST',
				data : data,
				success : function( data ){
					if ( data['result'] != 'error' ) {
						$obj.find('.wishlist-icon').removeClass('fa-heart-o').addClass('fa-heart').show();
						$obj.removeClass('rdtheme-add-to-wishlist').addClass('rdtheme-remove-from-wishlist');
						$obj.attr('title', afterTitle);
					}
				}
			});

			return false;
		}
	});

});

(function($){
    "use strict";

    // Window Load+Resize
    $(window).on('load resize', function () {
        // Define the maximum height for mobile menu
        var wHeight = $(window).height();
        wHeight = wHeight - 50;
        $('.mean-nav > ul').css('max-height', wHeight + 'px');
    });

    // Window Load
    $(window).on('load', function () {
        // Preloader
        $('#preloader').fadeOut('slow', function () {
            $(this).remove();
        });
    });

})(jQuery);