/**
 * Created by slshome on 03.12.14.
 */

$(function() {
    var modal = $.UIkit.modal("#my-id");
    modal.show();

    $('#my-id').on({
        'uk.modal.hide': function(){
            modal.show();
        }
    });

});