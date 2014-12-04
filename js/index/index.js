var lang;
var socket;
var sKey;
var encrypt;
var decrypt;

$(function() {
    encrypt = new JSEncrypt();
    decrypt = new JSEncrypt();
    socket = io.connect('http://herogs.sls:5000');
    socket.on('connect', function (data) {
            console.log(socket.io.engine.id);
        //ToDo отображение занятости логина при регистрации
            socket.on('otvCheckLoginName', function(data) {
                if (data.exist) {
                    //ToDo Если логин занят, то цвет букв или чего там сделать цветом ошибки
                    $( "#checkLoginColor" ).removeClass("input-error").addClass("input-success");
                    $( "#btnRegSend" ).addClass("btn-disabled");
                    alert("занято");
                } else {
                    //ToDo Если логин не занят, то цвет букв или чего там сделать цветом нормально
                    $( "#checkLoginColor" ).removeClass("has-error").addClass("has-success");
                    $( "#btnRegSend" ).removeClass("disabled");
                }
            });
            socket.on('userAdded', function(data) {
                $('#modal-container-regged').modal('show');
            });
            socket.on('sendKey', function(data) {
                sKey = JSON.parse(Encode(data, socket.io.engine.id));
                encrypt.setPublicKey(sKey.pub);

            });
            socket.on('createSession', function(data) {
                console.log('createSession');
//                $('#modal-container-login').modal('hide');
                sessionStorage.setItem('session', JSON.stringify(data));
                // sessionStorage.getItem('session');
                location="http://herogs.sls/enter/enter.html";
            });
            socket.on('loginError', function(data) {
// ToDo сделать нормальный мультиязычный вывод сообщения
               alert("Неправильный логин или пароль");
                $('.inv').show();
            });

   });
   loadIndex();
});


function loadIndex(lg) {
    if (lg != null) {
    localStorage.lang = lg;
    }
    var lng = localStorage.lang;
    if (lng != null) {
    }
    if (lng == null) {
    lng = 'ru';
    localStorage.lang = lng;
    }
//Загружаем языковый файл
    var path = "locales/" + lng + ".json";
    $.getJSON(path, function (data) {
        lang = data;
        $( "#index" ).html(new EJS({url: 'tpl/index/index.ejs'}).render()).promise().done(function() {

            var pathVal = "js/jquery.validationEngine-" + lng + ".js";
            $.getScript(pathVal, function() {
                $("#registerForm").validationEngine();
            });

            $( '#lang_sel_en' ).bind('click' , function(){
                loadIndex('en');
            });
            $( '#lang_sel_ru' ).on('click', function(){
                loadIndex('ru');
            });
            $( '#btnLoginSend' ).on('click', function(){
                login();
            });
            $( '#btnRegSend' ).on('click', function(){
                sendRegForm();
            });
        });

    });

//        $.getScript(pathVal, function() {$("#registerForm").validationEngine();});
}

function checkLoginName() {
    socket.emit('checkLoginName', JSON.stringify(encrypt.encrypt($( "#inputLogin").val())));
}

function checkPassword() {
    {
        if ($("#inputPassword3").val() != $("#inputPassword4").val()) {
            $( "#checkLoginPassword4" ).removeClass("has-success").addClass("has-error");
            $( "#btnRegSend" ).addClass("disabled");
        } else {
            $( "#checkLoginColor" ).removeClass("has-error").addClass("has-success");
            $( "#btnRegSend" ).removeClass("disabled");
        }
    }
}

function login() {
    var loginData={};
    loginData.login = encrypt.encrypt($("#inputLoginEnter").val());
    loginData.password = encrypt.encrypt($("#inputPasswordEnter").val());
    var validate = 1; //validator.matches(loginData.login, /^[0-9A-Za-zА-Яа-яЁё\s!@#$()+.=]+$/) * validator.matches(loginData.password, /^[0-9A-Za-zА-Яа-яЁё\s!@#$()+.=_]+$/);
    alert("validate login = " + validate);
    if(validate) {
        socket.emit('login', loginData);
    }

}

function sendRegForm() {
    var regData={};
    regData.login=$("#inputLogin").val();
    regData.password=$("#inputPassword1").val();
    var password2 = $("#inputPassword2").val();
    regData.email=$("#inputMail1").val();
    var eMail2 = $("#inputMail2").val();
//    regData.realName=$("#inputRealName").val();
//    regData.birthDay=$("#inputBirthDay").val();
//    regData.sex=$("#index_sex").val();
//    regData.lang=$("#index_lang").val();
    var passMailCheck = 1;
    if ((regData.password != password2) || (regData.email != eMail2)) { passMailCheck = 0; }

    var validate = validator.matches(regData.login, /^[0-9A-Za-zА-Яа-яЁё\s!@#$()+.=]+$/) *
            validator.matches(regData.password, /^[0-9A-Za-zА-Яа-яЁё\s!@#$()+.=_]+$/) *
            validator.isEmail(regData.email) * passMailCheck;
    if (regData.sex == "sexMan") regData.sex = 1;
    if (regData.sex == "sexWoman") regData.sex = 0;
    if (regData.lang == "langRu") regData.lang = 0;
    if (regData.lang == "langEn") regData.lang = 1;

    if(validate) {
        socket.emit('regUser', regData );
        return 0;
    } else {
        alert ("Не правильно заполнена форма регистрации");
        //ToDo что-то сделать если форма заполнена не правильно. Соббщение об этом в окно вывести.
    }
}





