/**
 * Created by slshome on 03.12.14.
 */

var encrypt;
var decrypt;

$(function() {

    encrypt = new JSEncrypt();
    decrypt = new JSEncrypt();
    var oSession = JSON.parse(sessionStorage.getItem('session'));
    if (oSession == null) location="http://herogs.sls";
    console.log(oSession);
    encrypt.setPublicKey(oSession.pub);
    decrypt.setPrivateKey(oSession.priv);

    var modal = $.UIkit.modal("#my-id");
    modal.show();

    $( "#heroes" ).html(new EJS({url: '/tpl/enter/heroes.ejs'}).render());

    $('#my-id').on({
        'uk.modal.hide': function(){
            modal.show();
        }
    });
});

function genpers() {
    location="http://herogs.sls/enter/genpers.html";
}
