(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['botlist'] = template({"1":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3=container.escapeExpression;

  return "    <div style=\"margin-bottom: 2px;\">\r\n        <button class=\"accordion "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.active : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\" onclick=\"onSelectBot("
    + alias3((helpers.json || (depth0 && depth0.json) || alias2).call(alias1,(depth0 != null ? depth0.botId : depth0),{"name":"json","hash":{},"data":data}))
    + ")\">\r\n            <i class=\"fa fa-wechat fa-fw\" aria-hidden=\"true\"></i>\r\n            "
    + alias3(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "\r\n        </button>\r\n        <div class=\"panel1\" style=\"display: "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.active : depth0),{"name":"if","hash":{},"fn":container.program(4, data, 0, blockParams, depths),"inverse":container.program(6, data, 0, blockParams, depths),"data":data})) != null ? stack1 : "")
    + "\">\r\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.testCases : depth0),{"name":"each","hash":{},"fn":container.program(8, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "        </div>\r\n    </div>\r\n";
},"2":function(container,depth0,helpers,partials,data) {
    return "active1";
},"4":function(container,depth0,helpers,partials,data) {
    return "block";
},"6":function(container,depth0,helpers,partials,data) {
    return "none";
},"8":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3=container.escapeExpression;

  return "                <button class=\"accordion "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.active : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\"  onclick=\"onSelectTestCase("
    + alias3((helpers.json || (depth0 && depth0.json) || alias2).call(alias1,(depth0 != null ? depth0.testCaseId : depth0),{"name":"json","hash":{},"data":data}))
    + ", "
    + alias3((helpers.json || (depth0 && depth0.json) || alias2).call(alias1,(depths[1] != null ? depths[1].botId : depths[1]),{"name":"json","hash":{},"data":data}))
    + ", "
    + alias3((helpers.json || (depth0 && depth0.json) || alias2).call(alias1,(depth0 != null ? depth0.url : depth0),{"name":"json","hash":{},"data":data}))
    + ")\">\r\n                    <i class=\"fa fa-file fa-fw\" aria-hidden=\"true\"></i>\r\n                    "
    + alias3(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "\r\n                </button>\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.bots : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true,"useDepths":true});
templates['headerbuttons'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "    <button class=\"btn add\" onclick=\"onAddTestCaseSelect()\">\r\n        <i class=\"fa fa-plus fa-fw\" aria-hidden=\"true\"></i>\r\n        Add\r\n    </button>\r\n    <button class=\"btn deleteAll\" onclick=\"onDeleteBotSelect()\">\r\n        <i class=\"fa fa-trash fa-fw\" aria-hidden=\"true\"></i>\r\n        Delete\r\n    </button>\r\n    <button class=\"btn runAll\">\r\n        <i class=\"fa fa-play fa-fw\" aria-hidden=\"true\"></i>\r\n        Run All Cases\r\n    </button>\r\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "    <button class=\"btn run\" onclick=\"reRunTestCase()\">\r\n        <i class=\"fa fa-play fa-fw\" aria-hidden=\"true\"></i>\r\n        Run\r\n    </button>\r\n    <button class=\"btn delete\" onclick=\"onDeleteTestCaseSelect()\">\r\n        <i class=\"fa fa-trash fa-fw\" aria-hidden=\"true\"></i>\r\n        Delete\r\n    </button>\r\n";
},"5":function(container,depth0,helpers,partials,data) {
    return "    <button class=\"btn save\" data-toggle=\"modal\" data-target=\"#saveTcModal\">\r\n        <i class=\"fa fa-floppy-o fa-fw\" aria-hidden=\"true\"></i>\r\n        Save\r\n    </button>\r\n    <button class=\"btn\" onclick=\"onResetTestCaseSelect()\">\r\n        <i class=\"fa fa-undo fa-fw reset\" aria-hidden=\"true\"></i>\r\n        Reset\r\n    </button>\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing;

  return "<div class=\"botimage\">\r\n    <img src=\"./images/bot.png\" alt=\"\" />\r\n</div>\r\n<p class=\"botName\">"
    + container.escapeExpression(((helper = (helper = helpers.botName || (depth0 != null ? depth0.botName : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"botName","hash":{},"data":data}) : helper)))
    + "</p>\r\n<div class=\"custom-buttons\">\r\n"
    + ((stack1 = (helpers.ifCond || (depth0 && depth0.ifCond) || alias2).call(alias1,(depth0 != null ? depth0.mode : depth0),"BOT",{"name":"ifCond","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = (helpers.ifCond || (depth0 && depth0.ifCond) || alias2).call(alias1,(depth0 != null ? depth0.mode : depth0),"TESTCASE",{"name":"ifCond","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = (helpers.ifCond || (depth0 && depth0.ifCond) || alias2).call(alias1,(depth0 != null ? depth0.mode : depth0),"SAVE",{"name":"ifCond","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</div>";
},"useData":true});
templates['input'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "<div class=\"wrap\">\r\n    <input type=\"text\" id=\"textBox\" placeholder=\"Write your message...\" />\r\n    <button class=\"submit\">\r\n        <i class=\"fa fa-paper-plane\" aria-hidden=\"true\"></i>\r\n    </button>\r\n</div>\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = (helpers.ifCond || (depth0 && depth0.ifCond) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.mode : depth0),"SAVE",{"name":"ifCond","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true});
})();