import $ from 'jquery';

$(document).ready(function() {

    //$(window).resize(function(){
        if ($(window).width() < 800) {
            $('.menu').addClass('menu-mob');
            $('.menu').removeClass('menu-desktop');
        }
    //});

    $('.header__burger').click(function() {
        $('.line--1').toggleClass('top-line');
        $('.line--2').toggleClass('middle-line');
        $('.line--3').toggleClass('bottom-line');
        $('.menu-desktop').animate({
            left: parseInt($('.menu-desktop').css('left'), 10) == -304 + 'px' ? +$('.menu-desktop').outerWidth() : 0,
            left: parseInt($('.menu-desktop').css('left'), 10) == 0 ? -$('.menu-desktop').outerWidth() : 0,
        });
        $('.menu-mob').animate({
            right: parseInt($('.menu-mob').css('right'), 10) == -304 + 'px' ? +$('.menu-mob').outerWidth() : 0,
            right: parseInt($('.menu-mob').css('right'), 10) == 0 ? -$('.menu-mob').outerWidth() : 0,
        });
        $('.menu').toggle();
    });

    $('.header-help').click(function() {
        $('body').find('.help').fadeToggle(300);
    });

    $('.help-link').mouseover(function() {
        $(this).html('Служба поддержки');
    });
    $('.help-link').mouseleave(function() {
        $(this).html('Написать письмо');
    });

    $('a[href^="#"]').click(function() {
        let el = $(this).attr('href');
        $('body').animate({
        scrollTop: $(el).offset().top}, 500);
        return false;
    });

    $('.link-modal').click(function(e) {
        e.preventDefault();
        $('.modal').fadeIn(300);
        $('.modal-overlay').fadeIn(300);
    });

    $('.modal-overlay').click(function() {
        $('.modal').fadeOut(300);
        $(this).fadeOut(300);
    });

    $('.modal-exit').click(function() {
        $('.modal').fadeOut(300);
        $('.modal-overlay').fadeOut(300);
    });

    $('.services-pay-heading').click(function() {
        $(this).next('.services-pay-dopwrapper').slideToggle();
        $(this).toggleClass('triangle-down');
        $(this).toggleClass('triangle-up');
    });
    
});

