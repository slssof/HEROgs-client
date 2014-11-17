/**
 * Created by dragon on 17.11.14.
 */
function modal(id_mod) {

        var id = "#" + id_mod;
        var maskHeight = $(document).height();
        var maskWidth = $(window).width();

        $('#mask').css({'width': maskWidth, 'height': maskHeight});
        $('#bg').addClass('blur');
        $('#mask').fadeIn(1000);
        //$('#mask').fadeTo("slow", 0.5);

        var winH = $(window).height();
        var winW = $(window).width();

        $(id).css('top', winH / 2 - $(id).height() / 2);
        $(id).css('left', winW / 2 - $(id).width() / 2);

        $(id).fadeIn(2000);


    $('.close').click(function (e) {
        //e.preventDefault();
        $('#bg').removeClass('blur');
        $('#mask, .window').fadeOut(1000);
    });

    $('#mask').click(function () {
        $('#bg').removeClass('blur');
        $(this).fadeOut(1000);
        $('.window').fadeOut(1000);
    });
}
