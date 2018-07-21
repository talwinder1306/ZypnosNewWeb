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

        if (validateLogin(email, pass) == true) {
            login(email, pass);
        }
    });

    $('#signupBtn').click(function (e) {
        var name = $('#signupName').val();
        var email = $('#signupEmail').val();
        var password = "Zypnos123" + Math.floor(Math.random() * (1000000 - 99999) + 99999);

        if (validateSignUp(name, email) == true) {
            var oUserDetails = {
                userName: name,
                emailId: email,
                userPassword: password
            };
            signUp(oUserDetails);
        }
    });

    $('#feedbackBtn').click(function (e) {
        var name = $('#feedbackName').val();
        var email = $('#feedbackEmail').val();
        var message = $('#feedbackMessage').val();
        if (validateFeedback(name, email, message) == true) {
            var oFeedbackPayload = {
                name: name,
                email: email,
                message: message,
                time: getTimeStamp()
            }
            sendFeedback(oFeedbackPayload);
        }
    });

    clearUser = function () {
        isUserLogged = false;
        uid = '';
		$('#login').removeClass('hide');
		$('#logout').addClass('hide');
		$('#goToSubscribe, #goToArrow').removeClass('hide');
		$('#goToTool').addClass('hide');
    }

    setUser = function (user) {
        isUserLogged = true;
        uid = user.uid;
		$('#login').addClass('hide');
		$('#logout').removeClass('hide');
		$('#goToSubscribe, #goToArrow').addClass('hide');
		$('#goToTool').removeClass('hide');
    }

    navToRnR = function () {
        window.location.href = "http://developer.zypnos.com";
    }

    clearLoginDialog = function () {
        $('#loginEmail').val('');
        $('#loginPwd').val('');
    }

    clearFeedbackForm = function () {
        $('#feedbackName').val('');
        $('#feedbackEmail').val('');
        $('#feedbackMessage').val('');
    }

    clearSignUpForm = function () {
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
            $('#loginError').append("Email/Password is incorrect");
        };
        firebase.auth().signInWithEmailAndPassword(email, pass)
            .then(function (authData) {
                if (firebase.auth() && firebase.auth().currentUser) {
                    fSuccessHandler();
                }
                else {
                    clearUser();
                    $('#loginError').append("Email/Password is incorrect");
                }
            }, fErrorHandler).catch(fErrorHandler);
    }

    signUp = function (oUserDetails) {
        fSuccessHandler = function (oData) {
            clearSignUpForm();
            openMessageModel("Thanks for registering will get back to you soon");
            sendMail({
                bot_name: oUserDetails.userName,
                email_id: oUserDetails.emailId,
                bot_url: ''
            });
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
            openMessageModel("Thank you for contacting us, we will get back to you soon!");
            sendMail({
                bot_name: oFeedbackPayload.name,
                email_id: oFeedbackPayload.email,
                bot_url: oFeedbackPayload.message
            });
        };
        fErrorHandler = function (oData) {
            openMessageModel("Unable to send message");
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

    validateLogin = function (email, pass) {
        $('#loginError').html("");
        $('#loginEmail,#loginPwd').removeClass('errorLoginTextbox');
        var validLogin = true;
        if (email == '' || pass == '') {
            $('#loginEmail,#loginPwd').addClass('errorLoginTextbox');
            $('#loginError').append("Please enter email and password");
            validLogin = false;
        } else {
            if (validateEmail(email) == false) {
                $('#loginEmail').addClass('errorLoginTextbox');
                $('#loginError').append("Please enter a valid email id<br/>");
                validLogin = false;
            }

            if (pass.length < 6) {
                $('#loginPwd').addClass('errorLoginTextbox');
                $('#loginError').append("Password must be atleast 6 characters");
                validLogin = false;
            }

        }
        return validLogin;
    }

    validateEmail = function (email) {
        var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        if (reg.test(email) == true) {
            return true;
        }
        return false;
    }

    validateSignUp = function (name, email) {
        $('#signupError').html("");
        var validSignUp = true;
        if (name == '' || email == '') {
            $('#signupError').append("<p>Please enter name and email</p>");
            validSignUp = false;
        } else {
            if (validateEmail(email) == false) {
                $('#signupError').append("<p>Please enter a valid email id</p>");
                validSignUp = false;
            }
			/*
			var reg = /^[a-zA-Z]+$/;
			
			if(name.length < 3 || reg.test(name) == false) {
				$('#signupName').addClass('errorLoginTextbox');
				$('#signupError').append("Please enter a valid name");
				validLogin = false;
			}
			*/
        }
        return validSignUp;
    }

    validateFeedback = function (name, email, message) {
        $('#feedbackError').html("");
        $('#feedbackName,#feedbackEmail, #feedbackMessage').removeClass('errorFeedbackTextbox');
        var validFeedback = true;
        if (name == '' || email == '' || message == '') {
            if (name == '') { $('#feedbackName').addClass('errorFeedbackTextbox'); }
            if (email == '') { $('#feedbackEmail').addClass('errorFeedbackTextbox'); }
            if (message == '') { $('#feedbackMessage').addClass('errorFeedbackTextbox'); }
            $('#feedbackError').append("Please enter all fields.");
            validFeedback = false;
        } else {
            if (validateEmail(email) == false) {
                $('#feedbackEmail').addClass('errorFeedbackTextbox');
                $('#feedbackError').append("Please enter a valid email id");
                validFeedback = false;
            }
			/*
			var reg = /^[a-zA-Z]+$/;
			
			if(name.length < 3 || reg.test(name) == false) {
				$('#feedbackName').addClass('errorFeedbackTextbox');
				$('#feedbackError').append("Please enter a valid name");
				validLogin = false;
			}
			*/
        }
        return validFeedback;
    }

    sendMail = function (sentMessage) {
        var service_id = "gmail";
        var template_id = "zypnos";
        var template_params = sentMessage;
        emailjs.send(service_id, template_id, template_params).then(function () {
            console.log("Sent");
        },
            function (err) {
                console.log("Send email failed!\r\n Response:\n " + JSON.stringify(err))
            });
    }

})();