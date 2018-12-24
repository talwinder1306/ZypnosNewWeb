(function () {

    //RECAST = 8276aa20b338957f49fc1c58a62a688e
    //API = 377422fb9dcb4abf98242fb14afa8311
    var clientAPI, recastToken;
    setAccessToken = function (token, type) {
        switch (type) {
            case "API":
                clientAPI = new ApiAi.ApiAiClient({ accessToken: token });
                break;
            case "RECAST":
                recastToken = token;
                break;
        }
    }

    sendMessageToBot = (message, payloadModel) => {
        return new Promise((resolve, reject) => {
            switch (payloadModel.type) {
                case "API":
                    sendMessageToAPI(resolve, reject, message);
                    break;
                case "RECAST":
                    sendMessageToRecast(resolve, reject, message);
                    break;
            }
        });
    }

    sendMessageToAPI = (resolve, reject, message) => {
        clientAPI.textRequest(message).then(function (response) {
            var result;
            try {
                result = response.result.fulfillment.speech
            } catch (error) {
                result = "";
            }
            resolve(result);
        }).catch(function () {
            reject();
        });
    }

    sendMessageToRecast = (resolve, reject, message) => {
        var payload = {
            message: {
                type: "text",
                content: message
            },
            conversation_id: "1234"
        };
        $.ajax({
            url: 'https://api.recast.ai/build/v1/dialog',
            data: payload,
            headers: {
                "Authorization": "Token " + recastToken
            },
            type: "POST",
            dataType: "json",
            success: (body) => {
                var message = "";
                try {
                    message = body.results.messages;
                } catch (error) {
                    message = "";
                }
                resolve(message);
            },
            error: () => {
                reject();
            }
        });
    }
})();