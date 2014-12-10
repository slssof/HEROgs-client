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

    $( "#dataBox" ).html(new EJS({url: '/tpl/enter/vPol.ejs'}).render());

    $('#genpers').on({
        'uk.modal.hide': function(){
            modal.show();
        }
    });
});

function vSex() {
    $( "#dataBox" ).html(new EJS({url: '/tpl/enter/vPol.ejs'}).render());
    setButtonAct('#bPol');
    setButtonUnPrim();
    setButtonPrim('#bPol');
}

function setSex(sex) {
    personage.sex = sex;
    pressbRace();
}

function pressbRace() {
//    $( "#dataBox" ).html(new EJS({url: '/tpl/enter/vRace.ejs'}).render());
    setButtonAct('#bRace');
    setButtonUnPrim();
    setButtonPrim('#bRace');
/*
    hiddenAll();
    $('#vRace').removeAttr('class');
    $('#vRace').attr('class', 'uk-display-block');
*/
//    $( "#dataBox" ).html(new EJS({url: '/tpl/enter/vRaceHuman.ejs'}).render());
    viewRace(0);

}

function viewRace(race) {
    if (race == 0) $( "#dataBox" ).html(new EJS({url: '/tpl/enter/vRaceHuman.ejs'}).render());
    if (race == 1) $( "#dataBox" ).html(new EJS({url: '/tpl/enter/vRaceElf.ejs'}).render());
    if (race == 2) $( "#dataBox" ).html(new EJS({url: '/tpl/enter/vRaceHobbit.ejs'}).render());
    if (race == 3) $( "#dataBox" ).html(new EJS({url: '/tpl/enter/vRaceGnom.ejs'}).render());
    if (race == 4) $( "#dataBox" ).html(new EJS({url: '/tpl/enter/vRaceDemon.ejs'}).render());
    if (race == 5) $( "#dataBox" ).html(new EJS({url: '/tpl/enter/vRaceLizard.ejs'}).render());
    if (race == 6) $( "#dataBox" ).html(new EJS({url: '/tpl/enter/vRaceOrc.ejs'}).render());
}

function pressbPodRace(race) {
    setButtonAct('#bPodRace');
    setButtonUnPrim('#bRace');
    setButtonPrim('#bPodRace');
    personage.race = race;
    if (race == 0) {
        $("#dataBox").html(new EJS({url: '/tpl/enter/vPodraceHumanBox.ejs'}).render());
        viewPodRace(10);
    }
    if (race == 1) {
        $("#dataBox").html(new EJS({url: '/tpl/enter/vPodraceElfBox.ejs'}).render());
        viewPodRace(20);
    }
    viewPodRace(race);
}

function viewPodRace(podRace) {
    if (podRace == 10) $( "#vPodrace" ).html(new EJS({url: '/tpl/enter/vPodraceHumanAqilon.ejs'}).render());
    if (podRace == 11) $( "#vPodrace" ).html(new EJS({url: '/tpl/enter/vPodraceHumanSlavia.ejs'}).render());
    if (podRace == 12) $( "#vPodrace" ).html(new EJS({url: '/tpl/enter/vPodraceHumanCimmeria.ejs'}).render());
    if (podRace == 13) $( "#vPodrace" ).html(new EJS({url: '/tpl/enter/vPodraceHumanChina.ejs'}).render());
    if (podRace == 14) $( "#vPodrace" ).html(new EJS({url: '/tpl/enter/vPodraceHumanTuran.ejs'}).render());
    if (podRace == 15) $( "#vPodrace" ).html(new EJS({url: '/tpl/enter/vPodraceHumanVendia.ejs'}).render());
    if (podRace == 16) $( "#vPodrace" ).html(new EJS({url: '/tpl/enter/vPodraceHumanStigia.ejs'}).render());

    if (podRace == 20) $( "#vPodrace" ).html(new EJS({url: '/tpl/enter/vPodraceElfSe.ejs'}).render());
    if (podRace == 21) $( "#vPodrace" ).html(new EJS({url: '/tpl/enter/vPodraceElfTe.ejs'}).render());
    if (podRace == 22) $( "#vPodrace" ).html(new EJS({url: '/tpl/enter/vPodraceElfLes.ejs'}).render());
    if (podRace == 23) $( "#vPodrace" ).html(new EJS({url: '/tpl/enter/vPodraceElfLun.ejs'}).render());
    if (podRace == 24) $( "#vPodrace" ).html(new EJS({url: '/tpl/enter/vPodraceElfSer.ejs'}).render());
    if (podRace == 25) $( "#vPodrace" ).html(new EJS({url: '/tpl/enter/vPodraceElfSea.ejs'}).render());
    if (podRace == 26) $( "#vPodrace" ).html(new EJS({url: '/tpl/enter/vPodraceElfWing.ejs'}).render());

}



function pressbclass(pclass) {

    setButtonAct('#bPodRace');
    setButtonUnPrim('#bRace');
    setButtonPrim('#bPodRace');

    personage.class = pclass;

    $( "#dataBox" ).html(new EJS({url: '/tpl/enter/vPodraceHumanBox.ejs'}).render());
    if (race == 0) $( "#vPodrace" ).html(new EJS({url: '/tpl/enter/vPodraceHumanAqilon.ejs'}).render());


}

function pressbPol() {
//    $( "#dataBox" ).html(new EJS({url: '/tpl/enter/vPol.ejs'}).render());
    //TODO Переделать на скакание по кнопкам, а не перегруз страницы
    location = "http://herogs.sls/enter/genpers.html";
}

function hiddenAll() {
    $('#vPol').removeAttr('class');
    $('#vPol').attr('class', 'uk-hidden');
    $('#vRace').removeAttr('class');
    $('#vRace').attr('class', 'uk-hidden');
    $('#vPodRaceHuman').removeAttr('class');
    $('#vPodRaceHuman').attr('class', 'uk-hidden');
    $('#vPodRaceElf').removeAttr('class');
    $('#vPodRaceElf').attr('class', 'uk-hidden');
}

function setButtonAct(button) {
    var attrButton = $(button).attr('class');
    $(button).removeAttr('disabled');
//    attrButton += ' uk-button-success';
//    $(button).attr('class', attrButton);
}

function setButtonPrim(button) {
    var attrButton = $(button).attr('class');
    $(button).removeAttr('disabled');
    attrButton += ' uk-button-primary';

    $(button).attr('class', attrButton);


}

function setButtonUnPrim() {
    var attrButton = $('#bPol').attr('class');
    var tmpStr = attrButton.replace("uk-button-primary"," ");
    $('#bPol').attr('class', tmpStr);
    attrButton = $('#bRace').attr('class');
    tmpStr = attrButton.replace("uk-button-primary"," ");
    $('#bRace').attr('class', tmpStr);
    attrButton = $('#bPodRace').attr('class');
    tmpStr = attrButton.replace("uk-button-primary"," ");
    $('#bPodRace').attr('class', tmpStr);
    attrButton = $('#bClass').attr('class');
    tmpStr = attrButton.replace("uk-button-primary"," ");
    $('#bClass').attr('class', tmpStr);
    attrButton = $('#bStats').attr('class');
    tmpStr = attrButton.replace("uk-button-primary"," ");
    $('#bStats').attr('class', tmpStr);
    attrButton = $('#bTune').attr('class');
    tmpStr = attrButton.replace("uk-button-primary"," ");
    $('#bTune').attr('class', tmpStr);
}
