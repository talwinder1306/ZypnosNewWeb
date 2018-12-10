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
            setUser(user);
        } else {
            clearUser();
        }
    });

    $('#loginForm-SubmitBtn').click(function (e) {
        var email = $('#loginForm-email').val();
        var pass = $('#loginForm-password').val();

        if (validateLogin(email, pass) == true) {
            login(email, pass);
        }
    });

    $('#homepage-logoutBtn').click(function (e) {
        var userId = "";
        if (firebase.auth() && firebase.auth().currentUser) {
            userId = firebase.auth().currentUser.uid;
        }
        if (userId) {
            firebase.auth().signOut().then(function () {
                openMessageModel("Logout Successful");
                clearUser();
            }).catch(function (error) {
                openMessageModel("Unable to logout");
            });
        }
        else {
            openMessageModel("User not logged in.");
        }
    });

    $('#signupForm-submitBtn').click(function (e) {
        var name = $('#signupForm-name').val();
        var email = $('#signupForm-email').val();
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

    $('#contactForm-submitBtn').click(function (e) {
        var name = $('#contactForm-name').val();
        var email = $('#contactForm-email').val();
        var message = $('#contactForm-message').val();
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
        $('#homepage-loginBtn').removeClass('hide');
        $('#homepage-logoutBtn').addClass('hide');
        $('#homepage-signupTextLink, #homepage-signupArrowLink').removeClass('hide');
        $('#homepage-goToTool').addClass('hide');
    }

    setUser = function (user) {
        isUserLogged = true;
        uid = user.uid;
        $('#homepage-loginBtn').addClass('hide');
        $('#homepage-logoutBtn').removeClass('hide');
        $('#homepage-signupTextLink, #homepage-signupArrowLink').addClass('hide');
        $('#homepage-goToTool').removeClass('hide');
    }

    navToRnR = function () {
        window.location.href = "/recordNRun/index.html";
    }

    clearLoginDialog = function () {
        $('#loginForm-email').val('');
        $('#loginForm-password').val('');
    }

    clearFeedbackForm = function () {
        $('#contactForm-name').val('');
        $('#contactForm-email').val('');
        $('#contactForm-message').val('');
    }

    clearSignUpForm = function () {
        $('#signupForm-name').val('');
        $('#signupForm-email').val('');
    }

    login = function (email, pass) {
        fSuccessHandler = function (oData) {
            setUser(firebase.auth().currentUser);
            clearLoginDialog();
            navToRnR();
        };
        fErrorHandler = function (erro) {
            clearUser();
            $('#loginForm-errorMsg').append("Email/Password is incorrect");
        };
        firebase.auth().signInWithEmailAndPassword(email, pass)
            .then(function (authData) {
                if (firebase.auth() && firebase.auth().currentUser) {
                    fSuccessHandler();
                }
                else {
                    clearUser();
                    $('#loginForm-errorMsg').append("Email/Password is incorrect");
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
        $('#loginForm-errorMsg').html("");
        $('#loginForm-email,#loginForm-password').removeClass('errorLoginTextbox');
        var validLogin = true;
        if (email == '' || pass == '') {
            $('#loginForm-email,#loginForm-password').addClass('errorLoginTextbox');
            $('#loginForm-errorMsg').append("Please enter email and password");
            validLogin = false;
        } else {
            if (validateEmail(email) == false) {
                $('#loginForm-email').addClass('errorLoginTextbox');
                $('#loginForm-errorMsg').append("Please enter a valid email id<br/>");
                validLogin = false;
            }

            if (pass.length < 6) {
                $('#loginForm-password').addClass('errorLoginTextbox');
                $('#loginForm-errorMsg').append("Password must be atleast 6 characters");
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
        $('#contactForm-error').html("");
        $('#contactForm-name,#contactForm-email, #contactForm-message').removeClass('errorFeedbackTextbox');
        var validFeedback = true;
        if (name == '' || email == '' || message == '') {
            if (name == '') { $('#contactForm-name').addClass('errorFeedbackTextbox'); }
            if (email == '') { $('#contactForm-email').addClass('errorFeedbackTextbox'); }
            if (message == '') { $('#contactForm-message').addClass('errorFeedbackTextbox'); }
            $('#contactForm-error').append("Please enter all fields.");
            validFeedback = false;
        } else {
            if (validateEmail(email) == false) {
                $('#contactForm-email').addClass('errorFeedbackTextbox');
                $('#contactForm-error').append("Please enter a valid email id");
                validFeedback = false;
            }
			/*
			var reg = /^[a-zA-Z]+$/;
			
			if(name.length < 3 || reg.test(name) == false) {
				$('#contactForm-name').addClass('errorFeedbackTextbox');
				$('#contactForm-error').append("Please enter a valid name");
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