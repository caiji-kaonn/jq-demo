// 在自调用函数中编写
;
(function () {
    // 1.1实现获取元素 $(css选择器)
    function Jquery(seletor) {
        return new Init(seletor);
    };

    //   1.2 获取伪数组，索引 + 长度
    function Init(seletor) {
        let dom = document.querySelectorAll(seletor);
        for (let i = 0; i < dom.length; i++) {
            this[i] = dom[i]
        }
        this.length = dom.length;
    }

    // 封装each
    Init.prototype.each = function (callback) {
        for (let i = 0; i < this.length; i++) {
            callback(i, this[i]);
        }
    }



    // 3.设置css属性样式 css(属性，属性值)
    Init.prototype.css = function (propety, value) {
        // 设置需要带单位的一些属性数组
        let pxarr = ['height', 'width', 'top', 'left']
        for (let i = 0; i < this.length; i++) {
            // 要遍历在数组里找出，在组数里没有带数字单位以外的属性
            if (pxarr.indexOf(propety) !== -1) {
                //  判断值是否带了px
                if (value.toString().indexOf('px') === -1) {
                    this[i].style[propety] = value + 'px';
                } else {
                    this[i].style[propety] = value;
                }
            } else {
                this[i].style[propety] = value;
            }
            return this;
        }
    }

    //    4.设置removeClass
    Init.prototype.removeClass = function (className) {
        for (let i = 0; i < this.length; i++) {
            this[i].classList.remove(className);
        }
        return this;
    }

    //  5.设置addClass
    Init.prototype.addClass = function (className) {
        for (let i = 0; i < this.length; i++) {
            this[i].classList.add(className);
        }
    }

    //    6.设置toggleClass
    Init.prototype.toggleClass = function (className) {
        for (let i = 0; i < this.length; i++) {
            this[i].classList.toggle(className);
        }
    }


    // 让外面的也可以使用
    window.$ = window.Jquery = Jquery;

})()
let box = $('.box');
box.addClass('b');
box.removeClass('b');
box.toggleClass('b');
box.css('width', 400);