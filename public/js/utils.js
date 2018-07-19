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
            setUser();
        } else {
            clearUser();
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
        var password = "Zypnos123" + Math.floor(Math.random() * (1000000 - 99999) + 99999);

        var oUserDetails = {
            userName: name,
            emailId: email,
            userPassword: password
        };
        signUp(oUserDetails);
    });

    $('#feedbackBtn').click(function (e) {
        var name = $('#feedbackName').val();
        var email = $('#feedbackEmail').val();
        var message = $('#feedbackMessage').val();
        var oFeedbackPayload = {
            name: name,
            email: email,
            message: message,
            time: getTimeStamp()
        }
        sendFeedback(oFeedbackPayload);
    });

    clearUser = function () {
        isUserLogged = false;
        uid = '';
    }

    setUser = function (user) {
        isUserLogged = true;
        uid = user.uid;
    }

    navToRnR = function(){
        window.location.href = "/recordNRun/index.html";
    }

    clearLoginDialog = function(){
        $('#loginEmail').val('');
        $('#loginPwd').val('');
    }

    clearFeedbackForm = function(){
        $('#feedbackName').val('');
        $('#feedbackEmail').val('');
        $('#feedbackMessage').val('');
    }

    clearSignUpForm = function(){
        $('#signupName').val('');
        $('#signupEmail').val('');
    }

    login = function (email, pass) {
        fSuccessHandler = function (oData) {
            setUser(firebase.auth().currentUser);
            clearLoginDialog();
            navToRnR();
        };
        fErrorHandler = function (erro) {
            clearUser();
        };
        firebase.auth().signInWithEmailAndPassword(email, pass)
            .then(function (authData) {
                if (firebase.auth() && firebase.auth().currentUser) {
                    fSuccessHandler();
                }
                else {
                    clearUser();
                }
            }, fErrorHandler).catch(fErrorHandler);
    }

    signUp = function (oUserDetails) {
        fSuccessHandler = function (oData) {
            clearSignUpForm();
            openMessageModel("Thanks for registering will get back to you soon");
        };
        fErrorHandler = function (erro) {
            openMessageModel("Unable to signup");
        };

        firebase.auth().createUserWithEmailAndPassword(oUserDetails.emailId, oUserDetails.userPassword)
            .then(function (user) {
                firebase.database().ref(user.uid).child('user').set(oUserDetails)
                    .then(fSuccessHandler);
            }, fErrorHandler).catch(fErrorHandler);

    };

    sendFeedback = function (oFeedbackPayload) {
        fSuccessHandler = function (oData) {
            clearFeedbackForm();
            openMessageModel("Thanks for submitting your feedback");
        };
        fErrorHandler = function (oData) {
            openMessageModel("Unable to send feedback");
        };
        firebase.database().ref('feedback').push(oFeedbackPayload)
            .then(fSuccessHandler, fErrorHandler).catch(fErrorHandler);
    };

    getTimeStamp = function () {
        var time = new Date();
        var year = time.getFullYear();
        var month = time.getMonth() + 1;
        var date = time.getDate();
        var hour = time.getHours();
        var minute = time.getMinutes();
        var second = time.getSeconds();
        var miliSecond = time.getMilliseconds();
        return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second + ":" + miliSecond;
    };

    openMessageModel = function (textMessage) {
        $('#messageModalText').text(textMessage);
        $('#messageModal').modal();
    }
})();