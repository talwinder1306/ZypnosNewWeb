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
            loginSuccess();
        } else {
            loggedFail();
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

    loggedFail = function () {
        isUserLogged = false;
        uid = '';
    }

    loginSuccess = function (user) {
        isUserLogged = true;
        uid = user.uid;
    }

    login = function (email, pass) {
        firebase.auth().signInWithEmailAndPassword(email, pass)
            .then(function (authData) {
                if (firebase.auth() && firebase.auth().currentUser) {
                    loginSuccess(firebase.auth().currentUser);
                }
                else {
                    loggedFail();
                }
            })
            .catch(function (error) {
                loggedFail();
            });
    }

    signUp = function (oUserDetails) {
        firebase.auth().createUserWithEmailAndPassword(oUserDetails.emailId, oUserDetails.userPassword)
            .then(function (user) {
                firebase.database().ref(user.uid).child('user')
                    .set(oUserDetails)
                    .then(function () {

                    });
            })
            .catch(function (error) {

            });

    };

    sendFeedback = function (oFeedbackPayload) {
        fSuccessHandler = function (oData) {
        };
        fErrorHandler = function (oData) {
        };
        firebase.database().ref('feedback').push(oFeedbackPayload)
            .then(fSuccessHandler,fErrorHandler);
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
})();