(function () {
    addUserMessageToUI = function (message) {
        $('<li class="replies"><img src="./images/profile.jpg" alt="" /><p>' + message + '</p></li>').appendTo($('.messages ul'));
        $('.message-input input').val(null);
        $(".messages").animate({ scrollTop: $(document).height() }, "fast");
    };
    addBotMessageToUIText = function(message) {
        $('<li class="sent"><img src="./images/bot.png" alt="" /><p>' + message.content + '</p></li>').appendTo($('.messages ul'));
    };
    addBotMessageToUIQuickReply = function(message) {
        var buttonLength = message.content.buttons.length;
        var buttonString = "";
        message.content.buttons.forEach(element => {
            buttonString += '<button type="button" class="btn quick-button">' + element.title + '</button>';
        });
        $('<li class="sent"><div><img src="./images/bot.png" alt="" /><p>' + message.content.title + '</p><div class="quick-reply">' + buttonString +  '</div></div></li>').appendTo($('.messages ul'));
    };
    addBotMessageToUIList  = function(message) {
        var listString = ""

        message.content.elements.forEach(element => {
            var oneListString = '<li class="sent list-group-item"><div><img class="list-img-left" src="' + element.imageUrl + '" alt="Card image"><div><div class="list-title">' + element.title + '</div><div class="list-text">' + element.subtitle + '</div><button type="button" class="btn list-button">' + element.buttons[0].title + '</button></div></div></li>';
            listString += oneListString;
        });

        $('<li class="sent"><div><img src="./images/bot.png" alt="" />' + listString + '</div></li>').appendTo($('.messages ul'));
    };

    addBotMessageToUIPicture = function(message) {
        $('<li class="sent"><img src="./images/bot.png" alt="" /><div class="msg-image"><img src="' + message.content + '" class="image-img"></div></li>').appendTo($('.messages ul'));
    };

    addBotMessageToUIButton = function(message) {

    };
    addBotMessageToUICard = function(message) {

    };
    addBotMessageToUICarousel = function(message) {

    };

    addBotMessageToUI = function (message) {
        switch (message.type) {
            case "text":
                addBotMessageToUIText(message);
                break;
            case "quickReplies":
                addBotMessageToUIQuickReply(message);
                break;
            case "list":
                addBotMessageToUIList(message);
                break;
            case "picture":
                addBotMessageToUIPicture(message);
                break;
            case "buttons":
                addBotMessageToUIButton(message);
                break;
            case "card":
                addBotMessageToUICard(message);
                break;
            case "carousel":
                addBotMessageToUICarousel(message);
                break;
        }
        
        $('.message-input input').val(null);
        $(".messages").animate({ scrollTop: $(document).height() }, "fast");
    };
    addBotMessageToUIActual = function (message) {
        $('<li class="sent"><img src="./images/bot.png" alt="" /><p>' + message + '</p>' +
            '&nbsp;<p class="actual">Actual</p></li>').appendTo($('.messages ul'));
        $('.message-input input').val(null);
        $(".messages").animate({ scrollTop: $(document).height() }, "fast");
    };
    addBotMessageToUIExpected = function (message) {
        $('<li class="sent"><img src="./images/bot.png" alt="" /><p>' + message + '</p>' +
            '&nbsp;<p class="expect">Expected</p></li>').appendTo($('.messages ul'));
        $('.message-input input').val(null);
        $(".messages").animate({ scrollTop: $(document).height() }, "fast");
    };
    addFailMessageToUi = function () {
        $('<li class="fail"><p>Result : Failed</p></li>').appendTo($('.messages ul'));
        $('.message-input input').val(null);
        $(".messages").animate({ scrollTop: $(document).height() }, "fast");
    }
    addPassMessageToUi = function () {
        $('<li class="pass"><p>Result : Passed</p></li>').appendTo($('.messages ul'));
        $('.message-input input').val(null);
        $(".messages").animate({ scrollTop: $(document).height() }, "fast");
    }
    addTestCaseNameToUi = function (testCaseName) {
        $('<li><h1>'+testCaseName+'</h1></li>').appendTo($('.messages ul'));
        $(".messages").animate({ scrollTop: $(document).height() }, "fast");
    }

    $(window).on('keydown', function (e) {
        if (e.which == 13) {
            newMessage();
            return false;
        }
    });

    showMessageModal = function (sText) {
        $('#modalMessage').text(sText);
        $('#messageModal').modal('show');
    };

    //Add message
    $('.submit').click(function () {
        newMessage();
    });

    function newMessage() {
        message = $(".message-input input").val();
        if ($.trim(message) == '') {
            return false;
        }
        addUserMessageToUI(message);
        addUserMessageToPayload(message);
        sendUserMessage(message);
    }

    $(".messages").animate({ scrollTop: $(document).height() }, "fast");

    accordian = function (e) {
        debugger;
        this.classList.toggle("active1");
        var panel = this.nextElementSibling;
        if (panel.style.display === "block") {
            panel.style.display = "none";
        } else {
            panel.style.display = "block";
        }
    };


    //Header buttons
    $('.add').click(function () {
        payloadModel.mode = "SAVE";
        addAllBots();
    });

    $('.add').on('click', function () {
        payloadModel.mode = "SAVE";
        addAllBots();
    });

    $('.runAll').click(function () {

    });

    $('.run').click(function () {

    });

    $('.delete').click(function () {

    });

    $('.save').click(function () {

    });

    $('.reset').click(function () {
        clearMessagesFromUI();
    });

    clearMessagesFromUI = function () {
        $(".chats").empty();
    }

    toggleBusyDialog = function(){
        var index = $('#cover').css('z-index');
        if(index > -1)
            $('#cover').css('z-index', -1);
        else
            $('#cover').css('z-index', 99);
    }

})();