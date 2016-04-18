/**
 * 提示插件
 * @author 陆启航
 * @file placeholder.js
 * @date 2016/3/25
 * @time 15:30
 */

(function(){

    UE.plugins['placeholder'] = function () {

        var me = this;
        var isShowPlaceHoder = true;

        UE.commands['placeholder'] = {
            execCommand: function (command, placeholder) {
                me.options.placeholder = placeholder;
                if(isShowPlaceHoder) {
                    // me.execCommand('show_placeholder');
                    show_placeholder();
                }
            },
            queryCommandState: function (command) {
                return isShowPlaceHoder;
            },
            queryCommandValue: function (command) {
                return me.options.placeholder;
            }
        }

        function show_placeholder() {
            isShowPlaceHoder = true;
            render();
        }

        function hide_placeholder() {
            isShowPlaceHoder = false;
            me.document.body.removeAttribute('placeholder');
        }

        this.addListener("contentChange", function (type, evt) {
            if(!me.hasContents()) {
                show_placeholder();
            } else if(isShowPlaceHoder){
                hide_placeholder();
            }
        });
        this.addListener("keydown", function (type, evt) {
            setTimeout(function(){
                if(!me.hasContents()) {
                    // me.execCommand('show_placeholder');
                    show_placeholder();
                } else if(isShowPlaceHoder){
                    hide_placeholder();
                }
            });
        });

        this.addListener("ready", function(type, evt) {
            utils.cssRule('placeholder',
                'body.view::before{ content:attr(placeholder);position: absolute; color:gray;}',
                me.document);
            isShowPlaceHoder = true;
            render();
        });

        function render() {

            var placeholder = me.options.placeholder || '欢迎使用佛手编辑器';
            me.document.body.setAttribute('placeholder', placeholder);
        }

        me.setPlaceholder = function(str) {
            me.execCommand('placeholder', str);
        }

        me.getPlaceholder = function(str) {
            return me.queryCommandValue('placeholder');
        }
    };

})();
