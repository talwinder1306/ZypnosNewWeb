(function () {

    var payloadModel;
    payloadModel = initializeMainPayload();
    initializeFirebase();
    checkForUserLogin();

    function initializeFirebase() {
        var config = {
            apiKey: "AIzaSyAply4fm-BOqtiX157m2XEMBNOIObYPW5Q",
            authDomain: "zypnos-70985.firebaseapp.com",
            databaseURL: "https://zypnos-70985.firebaseio.com",
            projectId: "zypnos-70985",
            storageBucket: "",
            messagingSenderId: "1035587128080"
        };
        firebase.initializeApp(config);
    }

    function checkForUserLogin() {
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                payloadModel.uid = user.uid;
                fetchAllBots();
            } else {
                showMessageModal("User not logged in.")
            }
        });
    }

    function fetchAllBots() {
        var payload = {
            uid: payloadModel.uid
        };
        var fSuccess = response => {
            formatAllBots(response);
            addAllBots();
            onSelectBot(undefined, 0);
            toggleBusyDialog();
        }
        var fFail = () => {
            toggleBusyDialog();
        }
        toggleBusyDialog();
        getBotsRequest(payload, fSuccess, fFail);
    }

    addAllBots = function () {
        var tHtml = Handlebars.templates.botlist(payloadModel);
        $('#allBots').html(tHtml);
        var t1Html = Handlebars.templates.headerbuttons(payloadModel);
        $('#headerButtons').html(t1Html);
        var t2Html = Handlebars.templates.input(payloadModel);
        $('#input').html(t2Html);
    };

    setActiveBot = function () {
        jQuery.each(payloadModel.bots, function (index, obj) {
            if (obj.botId == payloadModel.botId) {
                obj.active = true;
                payloadModel.botName = obj.name;
                payloadModel.botId = obj.botId;
                payloadModel.type = obj.type;
                setAccessToken(obj.token, payloadModel.type);
            }
            else {
                obj.active = false;
            }
        });
        addAllBots();
    }

    setActiveTestCase = function (testCaseId, botId) {
        jQuery.each(payloadModel.bots, function (index, obj) {
            if (obj.botId == botId) {
                jQuery.each(obj.testCases, function (index, obj1) {
                    if (obj1.testCaseId == testCaseId) {
                        obj1.active = true;
                        payloadModel.testCasePayload.testCaseName = obj1.name;
                        payloadModel.testCasePayload.testCaseId = obj1.testCaseId;
                    }
                    else {
                        obj1.active = false;
                    }
                });
            }
        });
    }

    setTestCaseName = function (testCaseName) {
        payloadModel.testCasePayload.testCaseName = testCaseName;
    }

    saveTestCase = function () {
        var payload = getSaveTestCasePayload();
        payload.chats = payloadModel.testCasePayload.chats;
        payload.testCaseName = payloadModel.testCasePayload.testCaseName;
        payload.botId = payloadModel.botId;
        payload.uid = payloadModel.uid;
        fSuccess = response => {
            var payload = getTestCaseFormattedPayload();
            payload.name = response.name;
            payload.url = response.url;
            payload.testCaseId = response.testCaseId;
            payload.active = true;
            addTestCaseToPayload(payload);
            addAllBots();
            onSelectTestCase(payload.testCaseId, payloadModel.botId, payload.url);
            toggleBusyDialog();
        }
        fFail = () => {
            toggleBusyDialog();
        };
        toggleBusyDialog();
        saveTestCaseRequest(payload, fSuccess, fFail)
    }

    $('#tokenSubmit').click(function () {
        var payload = getSaveBotPayload();
        payload.token = $('#bottoken').val();
        payload.name = $('#botName').val();
        payload.type = $('#botType').val();
        payload.uid = payloadModel.uid;
        setAccessToken(payload.token, payload.type);

        var fSuccess = response => {
            var payload = getAllBotsFormattedPayload();
            payload.name = response.name;
            payload.token = response.token;
            payload.type = response.type;
            payload.botId = response.botId;
            addBotToPayload(payload);
            addAllBots();
            onSelectBot(payload.botId);
            toggleBusyDialog();
        };
        var fFail = () => {
            alert("error");
            toggleBusyDialog();
        };
        toggleBusyDialog();
        saveBotRequest(payload, fSuccess, fFail);

    });


    $('#testCaseSubmit').click(function () {
        var testCase = $('#nameOfTestCase').val();
        setTestCaseName(testCase);
        saveTestCase();
    });

    addTestCaseToPayload = function (payload) {
        jQuery.each(payloadModel.bots, function (index, obj) {
            if (obj.botId == payloadModel.botId) {
                obj.testCases.push(payload);
            }
        });
    }

    sendUserMessage = function (message) {
        sendMessageToBot(message, payloadModel).then((result) => {
            addBotMessageToUI(result);
            addBotMessageToPayload(result);
        }).catch(() => {

        });
    }

    formatAllBots = function (response) {
        jQuery.each(response, function (index, obj) {
            var botPayload = getAllBotsFormattedPayload();
            botPayload.name = obj.botDetails.name;
            botPayload.token = obj.botDetails.token;
            botPayload.type = obj.botDetails.type;
            botPayload.botId = index;
            jQuery.each(obj.testCase, function (index2, obj2) {
                var testCasePayload = getTestCaseFormattedPayload();
                testCasePayload.name = obj2.name;
                testCasePayload.testCaseId = obj2.testCaseId;
                testCasePayload.url = obj2.url;
                botPayload.testCases.push(testCasePayload);
            });
            payloadModel.bots.push(botPayload);
        });
    }
    addBotToPayload = function (payload) {
        payloadModel.bots.push(payload);
    }

    addUserMessageToPayload = function (message) {
        payloadModel.testCasePayload.chats[new Date().getTime() + "_USER"] = message;
    }
    addBotMessageToPayload = function (message) {
        payloadModel.testCasePayload.chats[new Date().getTime() + "_BOT"] = message;
    }

    //======ReRun Test Case========Need to be modified
    reRunTestCase = function () {
        clearMessagesFromUI();
        var tempTestCasePayload = jQuery.extend({}, payloadModel.testCasePayload.chats);
        sendMessageTemp(tempTestCasePayload, Object.keys(tempTestCasePayload)[0]);
    }

    onSelectBot = function (botId, index) {
        payloadModel.botId = botId ? botId : payloadModel.bots[index].botId;
        payloadModel.mode = "BOT";
        clearMessagesFromUI()
        clearTestCasePayload();
        setActiveTestCase(undefined, botId);
        setActiveBot();
    }

    onSelectTestCase = function (testCaseId, botId, url) {
        payloadModel.testCasePayload.testCaseId = testCaseId;
        payloadModel.mode = "TESTCASE";
        clearMessagesFromUI();
        clearTestCasePayload();
        setActiveTestCase(testCaseId, botId);
        setActiveBot();
        fetchTestCase(testCaseId);
    }

    onAddTestCaseSelect = function () {
        payloadModel.mode = "SAVE";
        addAllBots();
    }

    onResetTestCaseSelect = function () {
        clearMessagesFromUI();
        clearTestCasePayload();
    }

    onDeleteTestCaseSelect = function () {
        var payload = getDeleteTestCasePayload();
        payload.botId = payloadModel.botId;
        payload.uid = payloadModel.uid;
        payload.testCaseId = payloadModel.testCasePayload.testCaseId;
        var fSuccess = response => {
            onSelectBot(response.botId)
            deleteTestCaseFromPayload(response.botId, response.testCaseId);
            addAllBots();
            toggleBusyDialog();
        }
        var fFail = () => {
            toggleBusyDialog();
        }
        toggleBusyDialog();
        deleteTestCaseRequest(payload, fSuccess, fFail)
    }

    onDeleteBotSelect = function () {
        var payload = getDeleteTestCasePayload();
        payload.botId = payloadModel.botId;
        payload.uid = payloadModel.uid;
        var fSuccess = response => {
            onSelectBot(undefined, 0)
            deleteBotFromPayload(response.botId);
            addAllBots();
            toggleBusyDialog();
        };
        var fFail = () => {
            toggleBusyDialog();
        };
        toggleBusyDialog();
        deleteBotRequest(payload, fSuccess, fFail);
    }

    deleteTestCaseFromPayload = function (botId, testCaseId) {
        jQuery.each(payloadModel.bots, function (index, bot) {
            if (bot.botId == botId) {
                for (var index in bot.testCases) {
                    if (bot.testCases[index].testCaseId == testCaseId) {
                        bot.testCases.splice(index, 1);
                    }
                }
            }
        });
    }

    deleteBotFromPayload = function (botId) {
        for (var index in payloadModel.bots) {
            if (payloadModel.bots[index].botId == botId) {
                payloadModel.bots.splice(index, 1);
            }
        }
    }

    clearTestCasePayload = function () {
        payloadModel.testCasePayload.testCaseName = "";
        payloadModel.testCasePayload.testCaseId = "";
        payloadModel.testCasePayload.chats = {};
    }

    fetchTestCase = function (testCaseId1) {
        var payload = {
            testCaseId: testCaseId1
        };
        var fSuccess = response => {
            if (response) {
                populateTestCases(response);
            }
            toggleBusyDialog();
        };
        var fFail = () => {
            toggleBusyDialog();
        };
        toggleBusyDialog();
        getTestCaseRequest(payload, fSuccess, fFail);
    }

    populateTestCases = function (result) {
        jQuery.each(result, function (index, obj) {
            if (index.indexOf("BOT") > -1) {
                addBotMessageToUI(obj);
                addBotMessageToPayload(obj);
            }
            else {
                addUserMessageToUI(obj);
                addUserMessageToPayload(obj);
            }
        });
    }

    function sendMessageTemp(payload, key) {
        addUserMessageToUI(payload[key]);
        sendMessageToBot(payload[key], payloadModel).then((result) => {
            if (payload[Object.keys(payload)[0]] != result) {
                addBotMessageToUIActual(result);
                addBotMessageToUIExpected(payload[Object.keys(payload)[0]]);
                addFailMessageToUi();
            }
            else {
                addBotMessageToUI(result);
                delete payload[Object.keys(payload)[0]];
                if (payload[Object.keys(payload)[0]])
                    sendMessageTemp(payload, Object.keys(payload)[0]);
                else
                    addPassMessageToUi();
            }
        }).catch(() => {

        });
        delete payload[key];
    }

    function onRunAllCases(aAllTestCases){
        if(!aAllTestCases){
            aAllTestCases = [];
            jQuery.each(payloadModel.bots, function(index, bot) {
                if(bot.botId == payloadModel.botId){
                    jQuery.each(bot.testCases, function(index1, testcase){
                        aAllTestCases.push(testcase.testCaseId);
                    })
                }
            });
        }
        var payload = {
            testCaseId: aAllTestCases[0]
        };
        var fSuccess = response => {
            if (response) {
                populateTestCases1(response);
            }
            toggleBusyDialog();
        };
        var fFail = () => {
            toggleBusyDialog();
        };
        toggleBusyDialog();
        getTestCaseRequest(payload, fSuccess, fFail);
    }

    populateTestCases1 = function(response){
        jQuery.each(result, function (index, obj) {
            if (index.indexOf("BOT") > -1) {
                addBotMessageToPayload(obj);
            }
            else {
                addUserMessageToPayload(obj);
            }
        });
    }

})();
