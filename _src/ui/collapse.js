(function (){
    var utils = baidu.editor.utils,
        UIBase = baidu.editor.ui.UIBase,
        Collapse = baidu.editor.ui.Collapse = function (options){
            this.initOptions(options);
            this.initCollapse();
        };
    Collapse.prototype = {
        uiName: 'collapse',
        initCollapse: function (){
            this.initUIBase();
        },
        getHtmlTpl: function (){
            return '<div id="##" class="edui-box %%"><div class="%%-btn" onclick="return $$._onClick(event, this);">展开</div><div class="%%-body">{{content}}</div></div>';
        },
        _onClick: function(event, ele) {
            var box = ele.parentElement;
            if(box.style.width == 'auto') {
                box.style.width = '40px';
                box.style.height = '20px';
                ele.innerHTML = '展开';
            } else {
                // if(window.getComputedStyle) {
                    // console.log(window.getComputedStyle(box).width);
                    box.style.width = 'auto';
                    box.style.height = 'auto';
                    ele.innerHTML = '收起';
                // }
            }
        }
    };
    utils.inherits(Collapse, UIBase);

})();
