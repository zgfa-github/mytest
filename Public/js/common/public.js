(function($){
    var deviceWidth=document.documentElement.clientWidth;
    var html =document.getElementsByTagName('html')[0];
    html.style.fontSize=deviceWidth/6.4+'px';

    $.fn.moreText = function(options){
        var defaults = {
            maxLength:50,
            mainCell:".branddesc",
            openBtn:'显示全部>',
            closeBtn:'收起'
        };
        return this.each(function() {
            var _this = $(this);

            var opts = $.extend({},defaults,options);
            var maxLength = opts.maxLength;
            var TextBox = $(opts.mainCell,_this);
            var openBtn = opts.openBtn;
            var closeBtn = opts.closeBtn;

            var countText = TextBox.html();
            var newHtml = '';
            if(countText.length > maxLength){
                newHtml = countText.substring(0,maxLength)+'...<span class="more">'+openBtn+'</span>';
            }else{
                newHtml = countText;
            }
            TextBox.html(newHtml);
            TextBox.on("click",".more",function(){
                if($(this).text()==openBtn){
                    TextBox.html(countText+' <span class="more">'+closeBtn+'</span>');
                }else{
                    TextBox.html(newHtml);
                }
            });
        });
    };

    //星星评分等级(5个img布局，有点重复)
    $.fn.setStar=function(options){
        var defaults={
            getFractionValue:1,
            mainCell:".star_img img",
            star:'public/admin-img/common/mall/star.png',
            starRed:'public/admin-img/common/mall/starred.png'
        };
        if($.isNumeric(options)){
            defaults.getFractionValue=options;
        }
        return this.each(function(){
            //console.log($(this));
            var _this=$(this);
            
            var opts=$.extend({},defaults,options); 
            var starBox = $(opts.mainCell,_this);
            var getFractionValue=opts.getFractionValue;
            var star=opts.star;
            var starRed=opts.starRed;
            var starValue=parseInt(getFractionValue);

            starBox.each(function(index){
                	
				var prompt=['1分','2分','3分','4分','5分'];	//评价分数
				this.id=index;		//遍历img元素，设置单独的id
                //console.log(this.id);
				starBox.attr('src',star);//空心星
				// _this.find('#'+getFractionValue).attr('src',starRed);		//当前的图片为实星
				// _this.find('#'+getFractionValue).prevAll().attr('src',starRed);	//当前的前面星星为实星  prompt[getFractionValue]
                _this.find('#'+(starValue-1)).attr('src',starRed);		//当前的图片为实星
				_this.find('#'+(starValue-1)).prevAll().attr('src',starRed);	//当前的前面星星为实星  prompt[getFractionValue]
                $(this).parent().next('span').text(getFractionValue+'分');
                $(this).parent().next('span').attr('data-score',getFractionValue);  
			});
        });
    };
    $.fn.getStar=function(){
         return this.find("span").attr('data-score');
    };

    //星星评分（绝对定位布局）
     $.fn.classStar=function(options){
         console.log(options);
        //各种属性、参数
        var defaults={
            getFractionValue:1,
            mainCell:".real_star",
            star:'public/admin-img/common/sellerCompany/star.png',
            starRed:'public/admin-img/common/sellerCompany/starred.png'
        };
        if($.isNumeric(options)){
            defaults.getFractionValue=options;
        }
        return this.each(function(){
            //console.log($(this));
            var _this=$(this);
            
            var opts=$.extend({},defaults,options); 
            var starBox = $(opts.mainCell,_this);
            var getFractionValue=opts.getFractionValue;
            var star=opts.star;
            var starRed=opts.starRed;
            var starValue=parseInt(getFractionValue)*25;

            starBox.each(function(index){             	
				// this.id=index;
                $(this).css('width',starValue+'px');
                $(this).parent().next('span').text(getFractionValue+'分');
                $(this).parent().next('span').attr('data-score',getFractionValue);  
			});
        });
    };
    $.fn.getClassStar=function(){
         return this.find("span").attr('data-store');
    };

    //进度条
    $.fn.getProgressBar=function(options){
        var defaults={
            getProgressValue:1,
            mainCell:".real_star_progress"
        };
        if($.isNumeric(options)){
            defaults.getProgressValue=options;
        }
        return this.each(function(){
            // console.log($(this));
            var _this=$(this);
            
            var opts=$.extend({},defaults,options); 
            var progressBox = $(opts.mainCell,_this);
            var getProgressValue=opts.getProgressValue;
            var progressValue=parseInt(getProgressValue)*10;
            progressBox.each(function(index){
                // this.id=index;
                $(this).css('width',progressValue+'px');
			});
        });
    };

    //移动端nav导航滑动,要结合iscroll.js
    $.fn.navbarscroll = function (options) {
        //各种属性、参数
        var _defaults = {
            className:'cur', //当前选中点击元素的class类名
            clickScrollTime:300, //点击后滑动时间
            duibiScreenWidth:0.4, //单位以rem为准，默认为0.4rem
            scrollerWidth:3, //单位以px为准，默认为3,[仅用于特殊情况：外层宽度因为小数点造成的不精准情况]
            defaultSelect:0, //初始选中第n个，默认第0个
            fingerClick:0, //目标第0或1个选项触发,必须每一项长度一致，方可用此项
            endClickScroll:function(thisObj){}//回调函数
        }
        var _opt = $.extend(_defaults, options);
        this.each(function () {
            //插件实现代码
            var _wrapper = $(this);
            var _win = $(window);
            var _win_width = _win.width(),_wrapper_width = _wrapper.width(),_wrapper_off_left = _wrapper.offset().left;
            var _wrapper_off_right=_win_width-_wrapper_off_left-_wrapper_width;
            var _obj_scroller = _wrapper.children('.scroller');
            var _obj_ul = _obj_scroller.children('ul');
            var _obj_li = _obj_ul.children('li');
            var _scroller_w = 0;
            _obj_li.css({"margin-left":"0","margin-right":"0"});
            for (var i = 0; i < _obj_li.length; i++) {
                _scroller_w += _obj_li[i].offsetWidth;
            }
            _obj_scroller.width(_scroller_w+_opt.scrollerWidth);
            var myScroll = new IScroll('#'+_wrapper.attr('id'), {
                eventPassthrough: true,
                scrollX: true,
                scrollY: false,
                preventDefault: false
            });
            _init(_obj_li.eq(_opt.defaultSelect));
            _obj_li.click(function(){
                _init($(this));
            });
			//解决PC端谷歌浏览器模拟的手机屏幕出现莫名的卡顿现象，滑动时禁止默认事件（2017-01-11）
			_wrapper[0].addEventListener('touchmove',function (e){e.preventDefault();},false);
            function _init(thiObj){
                var $this_obj=thiObj;
                var duibi=_opt.duibiScreenWidth*_win_width/10,this_index=$this_obj.index(),this_off_left=$this_obj.offset().left,this_pos_left=$this_obj.position().left,this_width=$this_obj.width(),this_prev_width=$this_obj.prev('li').width(),this_next_width=$this_obj.next('li').width();
                var this_off_right=_win_width-this_off_left-this_width;
                if(_scroller_w+2>_wrapper_width){
                    if(_opt.fingerClick==1){
                        if(this_index==1){
                            myScroll.scrollTo(-this_pos_left+this_prev_width,0, _opt.clickScrollTime);
                        }else if(this_index==0){
                            myScroll.scrollTo(-this_pos_left,0, _opt.clickScrollTime);
                        }else if(this_index==_obj_li.length-2){
                            myScroll.scrollBy(this_off_right-_wrapper_off_right-this_width,0, _opt.clickScrollTime);
                        }else if(this_index==_obj_li.length-1){
                            myScroll.scrollBy(this_off_right-_wrapper_off_right,0, _opt.clickScrollTime);
                        }else{
                            if(this_off_left-_wrapper_off_left-(this_width*_opt.fingerClick)<duibi){
                                myScroll.scrollTo(-this_pos_left+this_prev_width+(this_width*_opt.fingerClick),0, _opt.clickScrollTime);
                            }else if(this_off_right-_wrapper_off_right-(this_width*_opt.fingerClick)<duibi){
                                myScroll.scrollBy(this_off_right-this_next_width-_wrapper_off_right-(this_width*_opt.fingerClick),0, _opt.clickScrollTime);
                            }
                        }
                    }else{
                        if(this_index==1){
                            myScroll.scrollTo(-this_pos_left+this_prev_width,0, _opt.clickScrollTime);
                        }else if(this_index==_obj_li.length-1){
                            if(this_off_right-_wrapper_off_right>1||this_off_right-_wrapper_off_right<-1){
                                myScroll.scrollBy(this_off_right-_wrapper_off_right,0, _opt.clickScrollTime);
                            }
                        }else{
                            if(this_off_left-_wrapper_off_left<duibi){
                                myScroll.scrollTo(-this_pos_left+this_prev_width,0, _opt.clickScrollTime);
                            }else if(this_off_right-_wrapper_off_right<duibi){
                                myScroll.scrollBy(this_off_right-this_next_width-_wrapper_off_right,0, _opt.clickScrollTime);
                            }
                        }
                    }
                }
                $this_obj.addClass(_opt.className).siblings('li').removeClass(_opt.className);
                _opt.endClickScroll.call(this,$this_obj);
            }
        });
    };
})(jQuery);

//限制input、textarea字数
var maximumWord =function(obj,max){
    var val=$(obj).val().length;
    var content='最多只能输入'+max+'个字';
    if(val>max){
        layer.open({
            content:content,
            time:2
        });
        $(obj).val($(obj).val().substring(0,max));
        return false;
    }
};

//选项卡切换
$.fn.tab = function(){
    $(this).addClass("current").siblings().removeClass("current");
};

//选项卡切换
function tab_down(tab_k, tab_con, tab_dz) {
    var $div_li = $(tab_k);
    var timeout;
    if (tab_dz == "click") {
        $div_li.click(function() {
            $(this).addClass("current").siblings().removeClass("current");
            var index = $div_li.index(this);
            $(tab_con).hide().eq(index).show().addClass('active').siblings().removeClass('active');
        })
    } else if (tab_dz == "mouseover") {
        $div_li.hover(function() {
            var ts = $(this);
            timeout = setTimeout(function() {
                ts.addClass("current").siblings().removeClass("current");
                var index = ts.index();
                // $(tab_con).eq(index).show().siblings().hide();
                $(tab_con).hide().eq(index).show();
            }, 200)
        }, function() {
            clearTimeout(timeout);
        })
    }
}

//加载图片
function checkShow(ele){
    var winH=$(window).height(),
        scrollH=$(window).scrollTop();
    ele.each(function(){
        var _This=$(this),top;
        top =_This.offset().top;
        if(_This.attr('data-isloaded')){
            return ;
        }
        if(top < scrollH + winH){
            setTimeout(function(){
                // owImg(_This);
                _This.attr('src',_This.attr('data-img'));
                _This.attr('data-isloaded',true);
            },300)
        }
    })
}

//全选
$('body').on('click','.checkall',function () {
    var _thisChecked = $(this).prop("checked");
    $.each($('.checkitem'),function () {
        $(this).prop('checked',_thisChecked);
    });
});

//反选
$('body').on('click','.checkitem',function () {
    var sign = true;
    //一票否决
    $.each($('.checkitem'),function () {
        if(!$(this).prop('checked')){
            sign = false;
        }
    });
    $('.checkall').prop('checked',sign);
});

//滑动轮播
function swipe(elemObj){
    window.mySwipe = Swipe(elemObj, {
        auto: 2500,
        callback: function(index,element){
        }
    });
};

//活动倒计时
function countDown(time,id){
   
    var day_elem = id.find('.day');
    var hour_elem = id.find('.hour');
    var minute_elem = id.find('.minute');
    var second_elem = id.find('.second');
    var end_time = new Date(time).getTime(),//月份是实际月份-1
    sys_second = (end_time-new Date().getTime())/1000;
    
    var timer = setInterval(function(){
        if (sys_second > 1) {
            sys_second -= 1;
            var day = Math.floor((sys_second / 3600) / 24);
            var hour = Math.floor((sys_second / 3600) % 24);
            var minute = Math.floor((sys_second / 60) % 60);
            var second = Math.floor(sys_second % 60);
            day_elem && $(day_elem).text(day);//计算天
            $(hour_elem).text(hour<10?"0"+hour:hour);//计算小时
            $(minute_elem).text(minute<10?"0"+minute:minute);//计算分
            $(second_elem).text(second<10?"0"+second:second);//计算秒
        } else { 
            clearInterval(timer);
            $('.count_down_box').html('<span>本次活动已结束</span>');
        }
    }, 1000);
}

//简单插件方法
$.fn.hilight = function(options) {    
  var defaults = {    
    foreground: 'red',    
    background: 'yellow'    
  };  

  var opts = $.extend(defaults, options);    
}; 

$.smartScroll=function(container, selectorScrollable) {
    // 如果没有滚动容器选择器，或者已经绑定了滚动时间，忽略
    if (!selectorScrollable || container.data('isBindScroll')) {
        return;
    }

    // 是否是搓浏览器
    // 自己在这里添加判断和筛选
    var isSBBrowser;

    var data = {
        posY: 0,
        maxscroll: 0
    };

    // 事件处理
    container.on({
        touchstart: function (event) {
            var events = event.touches[0] || event;
            
            // 先求得是不是滚动元素或者滚动元素的子元素
            var elTarget = $(event.target);
            
            if (!elTarget.length) {
                return;    
            }
            
            var elScroll;
            
            // 获取标记的滚动元素，自身或子元素皆可
            if (elTarget.is(selectorScrollable)) {
                elScroll = elTarget;
            } else if ((elScroll = elTarget.parents(selectorScrollable)).length == 0) {
                elScroll = null;
            }
            
            if (!elScroll) {
                return;
            }
            
            // 当前滚动元素标记
            data.elScroll = elScroll;
            
            // 垂直位置标记
            data.posY = events.pageY;
            data.scrollY = elScroll.scrollTop();
            // 是否可以滚动
            data.maxscroll = elScroll[0].scrollHeight - elScroll[0].clientHeight;
        },
        touchmove: function () {
            // 如果不足于滚动，则禁止触发整个窗体元素的滚动
            if (data.maxscroll <= 0 || isSBBrowser) {
                // 禁止滚动
                event.preventDefault();
            }
            // 滚动元素
            var elScroll = data.elScroll;
            // 当前的滚动高度
            var scrollTop = elScroll.scrollTop();
    
            // 现在移动的垂直位置，用来判断是往上移动还是往下
            var events = event.touches[0] || event;
            // 移动距离
            var distanceY = events.pageY - data.posY;
    
            if (isSBBrowser) {
                elScroll.scrollTop(data.scrollY - distanceY);
                elScroll.trigger('scroll');
                return;
            }
    
            // 上下边缘检测
            if (distanceY > 0 && scrollTop == 0) {
                // 往上滑，并且到头
                // 禁止滚动的默认行为
                event.preventDefault();
                return;
            }
    
            // 下边缘检测
            if (distanceY < 0 && (scrollTop + 1 >= data.maxscroll)) {
                // 往下滑，并且到头
                // 禁止滚动的默认行为
                event.preventDefault();
                return;
            }
        },
        touchend: function () {
            data.maxscroll = 0;
        }    
    });

    // 防止多次重复绑定
    container.data('isBindScroll', true);
};