/**
 * 提示插件
 * @author 陆启航
 * @file placeholder.js
 * @date 2016/3/29
 * @time 10:00
 */

(function(){

    UE.plugins['toolbarControl'] = function () {

        var me = this;
        var isShow = true;
        var toolbar;
        UE.commands['toggletoolbar'] = {
            execCommand: function (command, placeholder) {
                if(isShow) {
                    me.execCommand('hidetoolbar');
                } else {
                    me.execCommand('showtoolbar');
                }
            },
            queryCommandState: function (command) {
                return isShow;
            },
            queryCommandValue: function (command) {
                return isShow;
            }
        }

        UE.commands['showtoolbar'] = {
            execCommand: function(command, val){
                if(toolbar) {
                    isShow = true;
                    domUtils.removeClasses(toolbar,'hidden');
                }
            }
        }
        UE.commands['hidetoolbar'] = {
            execCommand: function(command, val){
                if(toolbar) {
                    isShow = false;
                    domUtils.addClass(toolbar,'hidden');
                }
            }
        }


        this.addListener("ready", function(type, evt) {
            toolbar = me.container.querySelector(".edui-editor-toolbarbox");
            if(toolbar) {
                me.execCommand('showtoolbar');
            }
        });

        utils.cssRule('toolbar',
            '.hidden { display:none;}',
            me.document);
    };

})();
