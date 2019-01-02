(function () {
    var idNum = 0;
    var scrollBarWidths = 40;

    addUserMessageToUI = function (message) {
        $('<li class="replies"><img src="./images/profile.jpg" alt="" /><p>' + message + '</p></li>').appendTo($('.messages ul'));
        $('.message-input input').val(null);
        $(".messages").animate({ scrollTop: $(document).height() }, "fast");
    };
    addBotMessageToUIText = function(message, differnceString) {
        $('<li class="sent"><img src="./images/bot.png" alt="" /><p>' + message.content + '</p>' + differnceString + '</li>').appendTo($('.messages ul'));
    };
    addBotMessageToUIQuickReply = function(message, differnceString) {
        idNum = idNum + 1;
        var contentString = '<div class="msg-quick-reply"><p>' + message.content.title + '</p><div class="box" id="box-' + idNum
                    +'"><div class="scroller scroller-left" id="scroller-left-' + idNum +'"><i class="glyphicon glyphicon-chevron-left arrow"></i></div><div class="scroller scroller-right" id="scroller-right-' + idNum 
                    + '"><i class="glyphicon glyphicon-chevron-right arrow"></i></div><div class="wrapper" id="wrapper-' + idNum +'"><div class="list" id="list-' + idNum + '">';
        
        var buttonLength = message.content.buttons.length;
        var buttonString = "";  
        message.content.buttons.forEach(element => {
            buttonString += '<div class="item"><button type="button" class="btn quick-button">' + element.title + '</button></div>';
        });
        $('<li class="sent"><img src="./images/bot.png" alt="" />' + contentString + buttonString +  '</div></div></div>' + differnceString + '</div></li>').appendTo($('.messages ul'));
        reAdjust(idNum);
    };
    addBotMessageToUIList  = function(message, differnceString) {
        var listString = ""

        message.content.elements.forEach(element => {
            var oneListString = '<div class="list-group-item"><img class="list-img-left" src="' + element.imageUrl + '" alt="Card image"><div><div class="list-title">' + element.title + '</div><div class="list-text">' + element.subtitle + '</div><button type="button" class="btn list-button">' + element.buttons[0].title + '</button></div></div>';
            listString += oneListString;
        });

        $('<li class="sent"><img src="./images/bot.png" alt="" /><div style="display: flow-root">' + listString + differnceString + '</div></li>').appendTo($('.messages ul'));
    };

    addBotMessageToUIPicture = function(message, differnceString) {
        $('<li class="sent"><img src="./images/bot.png" alt="" /><div class="msg-image"><img src="' + message.content + '" class="image-img"></div>' + differnceString + '</li>').appendTo($('.messages ul'));
    };

    addBotMessageToUIButton = function(message, differnceString) {
        var buttonString = "";
        message.content.buttons.forEach(element => {
            buttonString += '<button type="button" class="btn list-button">' + element.title + '</button>';
        });
        $('<li class="sent"><img src="./images/bot.png" alt="" /><div style="display: flow-root"><div class="list-group-item" style="display: grid;"><div class="list-title">' + message.content.title + '</div>' + buttonString + '</div>' + differnceString + '</div></li>').appendTo($('.messages ul'));
    };
    addBotMessageToUICard = function(message, differnceString) {
        var buttonString = "";
        message.content.buttons.forEach(element => {
            buttonString += '<button type="button" class="btn btn-primary">' + element.title + '</button>';
        });

        $('<li class="sent"><img src="./images/bot.png" alt="" /><div class="panel panel-default msg-card"><img src="' 
            + message.content.imageUrl + '" class="card-img-top"> <div class="card-body"><h4 class="card-title">' + message.content.title +
            '</h4><p class="card-text">' + message.content.subtitle + '</p>' +  buttonString
            + '</div>' + differnceString + '</li>').appendTo($('.messages ul'));
    };

    addBotMessageToUICarousel = function(message, differnceString) {
        idNum = idNum + 1;
        var itemString = "";
        var contentString = '<div class="msg-carousel"><div class="box" id="box-' + idNum
                    +'"><div class="scroller scroller-left" id="scroller-left-' + idNum +'"><i class="glyphicon glyphicon-chevron-left arrow"></i></div><div class="scroller scroller-right" id="scroller-right-' + idNum 
                    + '"><i class="glyphicon glyphicon-chevron-right arrow"></i></div><div class="wrapper" id="wrapper-' + idNum +'"><div class="list" id="list-' + idNum + '">';
        message.content.forEach(element => {
        var buttonString = "";
        if(element.buttons != undefined && element.buttons.length > 0) {
            element.buttons.forEach(elementButton => {
                        buttonString += '<button type="button" class="btn btn-primary">' + elementButton.title + '</button>';
            });
        }
       
        itemString += '<div class="item"><div class="panel panel-default msg-card"><img src="' 
            + element.imageUrl + '" class="card-img-top"> <div class="card-body"><h4 class="card-title">' + element.title +
            '</h4><p class="card-text">' + element.subtitle + '</p>' +  buttonString
            + '</div></div></div>' 
        });

       $('<li class="sent"><img src="./images/bot.png" alt="" />' + contentString + "" + itemString + '</div></div></div></div>'+ differnceString + '</li>').appendTo($('.messages ul'));
       reAdjust(idNum);
    };

    addBotMessage = function (message, differnceString) {
        switch (message.type) {
            case "text":
                addBotMessageToUIText(message, differnceString);
                break;
            case "quickReplies":
                addBotMessageToUIQuickReply(message, differnceString);
                break;
            case "list":
                addBotMessageToUIList(message, differnceString);
                break;
            case "picture":
                addBotMessageToUIPicture(message, differnceString);
                break;
            case "buttons":
                addBotMessageToUIButton(message, differnceString);
                break;
            case "card":
                addBotMessageToUICard(message, differnceString);
                break;
            case "carousel":
                addBotMessageToUICarousel(message, differnceString);
                break;
            default:  //temporary fix for dialogflow messages
                message = {
                    content: message
                };
                addBotMessageToUIText(message, differnceString);
                break;
        }
        
        $('.message-input input').val(null);
        $(".messages").animate({ scrollTop: $(document).height() }, "fast");
    };

    addBotMessageToUI = function(message) {
        var differnceString = '';
        addBotMessage(message, differnceString);
    };
    addBotMessageToUIActual = function (message) {
        var differnceString = '<p class="actual">Actual</p>';
        addBotMessage(message, differnceString);
    };
    addBotMessageToUIExpected = function (message) {
        var differnceString = '<p class="expect">Expected</p>';
        addBotMessage(message, differnceString);
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

    var widthOfList = function(idNum){
      var list = $("#list-"+idNum);
      var items = list.find(".item");
      var itemsWidth = 0;
      items.each(function(){
        var itemWidth = $(this).outerWidth(true);
        itemsWidth+=itemWidth;
      });
      return itemsWidth;
    };

    var averageWidthOfItems = function(idNum){
      var list = $("#list-"+idNum);
      var items = list.find(".item");
      var itemsWidth = 0;
      var itemCount = 0;
      items.each(function(){
        var itemWidth = $(this).outerWidth();
        itemsWidth+=itemWidth;
        itemCount++;
      });
      return itemsWidth/itemCount;
    };

    var widthOfHidden = function(idNum){
      return (($('#wrapper-'+idNum).outerWidth())-widthOfList()-getLeftPosi())-scrollBarWidths;
    };

    var widthOfWrapper = function(idNum){
      return $('#wrapper-' + idNum).outerWidth();
    };

    var getLeftPosi = function(idNum){
      return $('#list-'+idNum).position().left;
    };

    var reAdjust = function(idNum){
      if(idNum == undefined || idNum == ""){
        $('.scroller-right').show();
      }
      else {
      if ((Math.abs(getLeftPosi(idNum)) + widthOfWrapper(idNum)) <= widthOfList(idNum)) {
        $('#scroller-right-' + idNum).show();
      }
      else {
        $('#scroller-right-'+ idNum).hide();
      }
      
      if (getLeftPosi(idNum)<0) {
        $('#scroller-left-' + idNum).show();
      }
      else {
        var list = $("#list-"+idNum);
        var items = list.find(".item");
        items.animate({left:"-="+getLeftPosi(idNum)+"px"},'slow');
        $('#scroller-left-'+idNum).hide();
      }
    }
    }

    $(window).on('resize',function(e){  
        reAdjust();
    });

    $(document).on("click", ".scroller-right", function(){

      var elemId = $(this).attr('id');
      var splitId = elemId.split('-');
      var idNum = splitId[splitId.length - 1];

      $('#scroller-left-' + idNum).fadeIn('slow');
      $('#scroller-right-' + idNum).fadeOut('slow');
      var leftScroll = -(averageWidthOfItems(idNum));
      $('#list-' + idNum).animate({left:"+=" + leftScroll +"px"},'slow',function(){
        reAdjust(idNum);
      });   
    });

    $(document).on("click", ".scroller-left", function() {
        var elemId = $(this).attr('id');
        var splitId = elemId.split('-');
        var idNum = splitId[splitId.length - 1];
        $('#scroller-right-' + idNum).fadeIn('slow');
        $('#scroller-left-' + idNum).fadeOut('slow');
      
        $('#list-'+idNum).animate({left:"+="+ (averageWidthOfItems(idNum)) +"px"},'slow',function(){
            reAdjust(idNum);
        });
        
    });

})();