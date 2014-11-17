/**
 * Created by dragon on 17.11.14.
 */
function modal(id_mod) {

        var id = "#" + id_mod;
        //var maskHeight = $(document).height();
        //var maskWidth = $(window).width();

        //$('#mask').css({'width': maskWidth, 'height': maskHeight});
        //$('#bg').addClass('blur');
        //$('#mask').fadeIn(500);
        $('#overlay').fadeTo("slow", 0.6);
        //$('.wrap_m').show();

        //var winH = $(window).height();
        //var winW = $(window).width();
        //$(id).css('top', winH / 2 - $(id).height() / 2);
        //$(id).css('left', winW / 2 - $(id).width() / 2);
        $(id).fadeIn(1000);


    $('.close').click(function (e) {
        //e.preventDefault();
        //$('#bg').removeClass('blur');
        $('#overlay, .window').fadeOut(500);
    });

    $('#overlay').click(function () {
        //$('#bg').removeClass('blur');
        $(this).fadeOut(500);
        $('.window').fadeOut(500);
    });
}
