(function(){
    getAllBotsFormattedPayload = function () {
        return payload = {
            name: "",
            token: "",
            type: "",
            botId: "",
            testCases: [],
            active: false
        }
    };

    getSaveBotPayload = function () {
        return payload = {
            name: "",
            token: "",
            type: "",
            uid: "",
        }
    };

    getSaveTestCasePayload = function () {
        return payload = {
            chats: {},
            testCaseName: "",
            botId: "",
            uid: "",
        }
    };

    getDeleteTestCasePayload = function(){
        return payload = {
            testCaseId: "",
            botId: "",
            uid: ""
        }
    }

    getTestCaseFormattedPayload = function () {
        return payload = {
            name: "",
            url: "",
            testCaseId: "",
            active: false
        }
    };
    
    initializeMainPayload = function() {
        return payloadModel = {
            bots : [],
            testCasePayload : {
                testCaseName: "",
                testCaseId: "",
                chats: {}
            },
            mode : "",
            botName : "",
            uid: "",
            botId: "",
            type: ""
        };
    }
})();