((function () {
        // 1.实现$(css选择器)的功能
        function Jquenry(seletor) {
            return new Init(seletor);
        }

        // 构造函数  获取页面多个元素：伪数组  索引+长度
        function Init(seletor) {
            let dom = document.querySelectorAll(seletor)
            for (let i = 0; i < dom.length; i++) {
                this[i] = dom[i];
            }
            this.length = dom.length;
        }

        //    封装each
        Init.prototype.each = function (callback) {
            for (let i = 0; i < this.length; i++) {
                callback(i, this[i]);
            }
        }


        //  原型对象实现css方法 ：1.css(属性名，属性值)
        // 2.获取css(属性值)

        Init.prototype.css = function (propety, value) {
            //  获取css(属性值)
            if (value !== undefined) {
                return window.getComputedStyle(this[0])[propety]
            } else {
                // 对象.style.css属性=值 => css(属性名，属性值)
                let pxarr = ['width', 'height', 'top', 'left']
                this.each(function (i, e) {
                    if (pxarr.indexOf(propety) !== -1) {
                        if (value.toString().indexOf('px') === -1) {
                            e.style[propety] = value + 'px';
                        } else {
                            e.style[propety] = value;
                        }
                    } else {
                        e.style[propety] = value;
                    }
                })
            }



        }





    }

    //    实现removeClass效果
    Init.prototype.removeClass = function (className) {
        this.each(function (i, e) {
            e.classList.remove(className);
        })
        return this;
    }

    //   实现添加类名
    Init.prototype.addClass = function (className) {
        this.each(function (i, e) {
            e.classList.add(className);
        })
        return this;
    }

    //  实现切换类名
    Init.prototype.toggleClass = function (className) {
        this.each(function (i, e) {
            e.classList.toggle(className);
        })
    }



    // 为了让外局也能访问到  window.属性
    window.$ = window.Jquenry = Jquenry;

})());