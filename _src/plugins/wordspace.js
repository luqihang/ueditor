/**
 * 提示插件
 * @author 陆启航
 * @file placeholder.js
 * @date 2016/3/25
 * @time 15:30
 */

(function(){

    UE.plugins['wordspace'] = function () {

        var me = this;

        var width;
        var height;

        var toolbar;
        var container;

        var minWidth = 50;

        UE.commands['opennowrap'] = {
            execCommand: function(command, val){
                domUtils.addClass(me.body,'word-nowrap');
            }
        }
        UE.commands['closenowrap'] = {
            execCommand: function(command, val){
                domUtils.removeClasses(me.body,'word-nowrap');
            }
        }

        UE.commands['getsize'] = {
            execCommand: function(command, val){

                return {
                    width: me.body.scrollWidth,
                    height: me.body.scrollHeight
                }
            }
        }

        UE.commands['showscroll'] = {
            execCommand: function(command, direction){
                domUtils.removeClasses(me.body,'scroll-'+direction+'-hidden');
            }
        }

        UE.commands['hidescroll'] = {
            execCommand: function(command, direction){
                domUtils.addClass(me.body,'scroll-'+direction+'-hidden');
            }
        }

        // this.addListener('contentchange',function(){
        //     dealChange();
        // });

        function dealChange() {
            // 没有滚动条时
            // if(me.body.offsetWidth < me.body.scrollWidth) {
            //     // 未超过窗口大小
            //     if(me.container.offsetWidth > container.scrollWidth) {
            //         container.style.width = me.body.scrollWidth + 'px';
            //     }
            //
            //     fireChange();
            // } else {
            //     toSmall();
            // }

            if(me.queryCommandState('placeholder')) {
                container.style.width = '200px';
            } else {
                reSize();
            }

        }

        function reSize() {
            if(container.offsetWidth < me.body.scrollWidth){
                var w = (container.offsetWidth + 30) > me.container.offsetWidth ? me.container.offsetWidth : (container.offsetWidth + 30);
                container.style.width = w +'px';
                fireChange();
                return;
            }
            container.style.width = (container.offsetWidth - 5)+'px';
            setTimeout(reSize);
        }


        function updateSize() {
            if(me.container.offsetWidth > container.scrollWidth) {
                container.style.width = me.body.scrollWidth + 'px';
            }
        }

        function fireChange() {
            if(width != me.body.scrollWidth || height != me.body.offsetHeight) {
                var xv = me.body.scrollWidth - width;
                var yv = me.body.offsetHeight - height;
                width = me.body.scrollWidth;
                height = me.body.offsetHeight;
                me.fireEvent('sizechange',{
                    width: width,
                    height: height,
                    xv: xv,
                    yv: yv,
                    toolbarHeight: toolbar.offsetHeight,
                    totalHeight: height + toolbar.offsetHeight
                });
            }
        }

        this.addListener("ready", function(type, evt) {

            utils.cssRule('wordspace',
                '.word-nowrap p{ white-space:nowrap;} .scroll-x-hidden {overflow-x:hidden;} .scroll-y-hidden{overflow-y:hidden;} body {margin: 0;}',
                me.document);

            width = me.body.scrollWidth;
            height = me.body.scrollHeight;
            toolbar = me.container.querySelector(".edui-editor-toolbarbox");
            container = me.container.querySelector('.edui-editor-iframeholder');

            domUtils.on(window, 'resize', updateSize);

            var body = me.body;
            var MutationObserver = window.MutationObserver
			|| window.WebKitMutationObserver;


            // 不使用Ueditor提供的内容监听(不精确,有延迟)
            // 创建观察者对象
            var observer = new MutationObserver(function(mutations) {
              mutations.forEach(function(mutation) {
                dealChange();
              });
            });

            var config = {
                // attributes: true,
                childList: true,
                characterData: true,
                // attributeOldValue: true,
                // characterDataOldValue: true,
                subtree:true,
                // attributeFilter:["width"]
            };
            observer.observe(body, config);
        });


    }

})();
