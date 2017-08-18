jQuery(document).ready(function() {
    $.backstretch("../img/backgrounds/1.jpg");

    $('.login-form fieldset:first-child').fadeIn('slow');

    $('.login-form input[type="text"], .login-form input[type="password"]').on('focus', function() {
        $(this).removeClass('input-error');
    });
});


