/**
 * Created by slshome on 03.12.14.
 */

var encrypt;
var decrypt;
var personage = {};

$(function() {


    var oSession = JSON.parse(sessionStorage.getItem('session'));
    if (oSession == null) location="http://herogs.sls";
    encrypt = new JSEncrypt();
    decrypt = new JSEncrypt();
    console.log(oSession);
    encrypt.setPublicKey(oSession.pub);
    decrypt.setPrivateKey(oSession.priv);

    var modal = $.UIkit.modal("#genpers");
    modal.show();

//    $( "#dataBox" ).html(new EJS({url: '/tpl/enter/vPol.ejs'}).render());

    $('#genpers').on({
        'uk.modal.hide': function(){
            modal.show();
        }
    });
});

function genpers() {
    location="http://herogs.sls/enter/genpers.html";
}

function setSex(sex) {
    personage.sex = sex;
    var attr_bRace = $('#bRace').attr('class');
    var attr_bPol = $('#bPol').attr('class');
    $('#bRace').removeAttr('disabled');
    var tmpStr = attr_bPol.replace("uk-button-primary"," ");
    tmpStr += ' uk-button-success';
    $('#bPol').attr('class', tmpStr);
    tmpStr = attr_bRace + ' uk-button-primary';
    $('#bRace').attr('class', tmpStr);
    pressbRace();


    // uk-button-success
    // uk-button-primary
}

function pressbRace() {
//    $( "#dataBox" ).html(new EJS({url: '/tpl/enter/vRace.ejs'}).render());
    $('#vPol').removeAttr('class');
    $('#vPol').attr('class', 'uk-hidden');
    $('#vRace').removeAttr('class');
    $('#vRace').attr('class', 'uk-display-block');


}

function pressbPol() {
//    $( "#dataBox" ).html(new EJS({url: '/tpl/enter/vPol.ejs'}).render());
    //TODO Переделать на скакание по кнопкам, а не перегруз страницы
    location = "http://herogs.sls/enter/genpers.html";
}
