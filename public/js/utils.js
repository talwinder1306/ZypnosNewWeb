(function () {

    var config = {
        apiKey: "AIzaSyAply4fm-BOqtiX157m2XEMBNOIObYPW5Q",
        authDomain: "zypnos-70985.firebaseapp.com",
        databaseURL: "https://zypnos-70985.firebaseio.com",
        projectId: "zypnos-70985",
        storageBucket: "",
        messagingSenderId: "1035587128080"
    };
    firebase.initializeApp(config);
    var isUserLogged = false, uid = ''; 

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            isUserLogged = true;
            uid = user.uid;
        } else {
            isUserLogged = false;
            uid = '';
        }
      });

    $('#loginBtn').click(function (e) {
        var email = $('#loginEmail').val();
        var pass = $('#loginPwd').val();
        login(email, pass);
    });

    $('#signupBtn').click(function (e) {
        var name = $('#signupName').val();
        var email = $('#signupEmail').val();
    });

    $('#feedbackBtn').click(function (e) {
        var name = $('#feedbackName').val();
        var email = $('#feedbackEmail').val();
        var message = $('#feedbackMessage').val();
    });

    loggedFail = function(){

    }

    loginSuccess = function(){
        window.location.href = "/recordNRun/index.html";
    }

    login = function(email, pass){
        firebase.auth().signInWithEmailAndPassword(email, pass)
        .then(function (authData) {
          if (firebase.auth() && firebase.auth().currentUser){
            isUserLogged = true;
            uid = firebase.auth().currentUser.uid;
            loginSuccess();
          }
          else{
            isUserLogged = false;
            uid = '';
            loggedFail();
          }
        })
        .catch(function (error) {
            isUserLogged = false;
            uid = '';
            loggedFail();
        });
    }
})();