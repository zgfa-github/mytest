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
                newHtml = countText.substring(0,maxLength)+'...<a class="more">'+openBtn+'</a>';
            }else{
                newHtml = countText;
            }
            TextBox.html(newHtml);
            TextBox.on("click",".more",function(){
                if($(this).text()==openBtn){
                    TextBox.html(countText+' <a class="more">'+closeBtn+'</a>');
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
            star:'/Public/img/common/star.png',
            starRed:'/Public/img/common/starred.png'
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
            var progressValue=parseInt(getProgressValue)*2.1;
            progressBox.each(function(index){
                // this.id=index;
                $(this).css('width',progressValue+'px');
			});
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
    $(this).click(function(){
        $(this).addClass("current").siblings().removeClass("current");
    }) 
};
$('.top_menu_list a').on('click',function(){
    var index=$(this).index();
        if(index>0){
            dialog.error('功能正在开发中,暂未上线,敬请期待');
        }
})
//选项卡切换和对应内容显示
function tab_down(tab_k, tab_con, tab_dz) {
    // alert(tab_k);
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

//懒图片加载
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

//简单滑动轮播
function swipe(elemObj){
    window.mySwipe = Swipe(elemObj, {
        auto: 2500,
        callback: function(index,element){
            //回调函数
            $(".position li").eq(index).addClass("on").siblings().removeClass("on");
        }
    });
    $(".position li").click(
        function () {
            mySwipe.slide($(this).index());
        }
    );
}
function swiper(elemObj){
    var swiper = new Swiper(elemObj, {
        slidesPerView: 5,
        spaceBetween: 50,
        // init: false,
        pagination: {
        el: '.swiper-pagination',
        clickable: true,
        },
        breakpoints: {
        1024: {
            slidesPerView: 4,
            spaceBetween: 40,
        },
        768: {
            slidesPerView: 3,
            spaceBetween: 30,
        },
        640: {
            slidesPerView: 2,
            spaceBetween: 20,
        },
        320: {
            slidesPerView: 1,
            spaceBetween: 10,
        }
        }
    });
}
function swiperAnimation(elemObj){
     var swiper = new Swiper(elemObj, {
      effect: 'coverflow',
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: 'auto',
      coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows : true,
      },
      pagination: {
        el: '.swiper-pagination',
      },
    });
}
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

var addTimer = function(){
        var list = [],callback,interval,opt,unix,iStartUp=0;
        return function(id,timeStamp1,timeStamp2){
            unix=parseInt(new Date(timeStamp2).getTime());
            if(!interval){
                interval = setInterval(function(){
                    go(unix);
                },1000);
            }
            
            list.push(
                {
                    ele:document.getElementById(id),
                    otime:timeStamp1,
                    ctime:timeStamp2
                }
            );
        }

        function go(opt) {
            for (var i = 0; i < list.length; i++) {
                //list[i].ele.innerHTML = changeTimeStamp(list[i].time);
                callback= changeTimeStamp(list[i].otime,opt);
                if(!callback){
                    list[i].ele.innerHTML='订单已取消';
                    $(list[i].ele).attr('data-key',0);
                    $(list[i].ele).parents('.order_info_list')
                    .find('a.order_pay_btn')
                    .removeClass('order_pay_btn')
                    .text('已取消')
                    .addClass('order_cancle');
                    $(list[i].ele).removeAttr('id');
                    //clearInterval(interval);
                    //interval=null;
                }else{
                    for(var k=0;k<callback.length;k++){
                        list[i].ele.children[k].innerHTML=callback[k];               
                    }
                }
                if (new Date(list[i].otime).getTime()==opt){
                    list.splice(i, 1); 
                }
            }
            unix=unix+1000;
        }

        //传入unix时间戳，得到倒计时
        function changeTimeStamp(endTime,backCurrentTime){
            var distancetime = new Date(endTime).getTime() - backCurrentTime;
            if(distancetime > 0){
    　　　　　　 //如果大于0.说明尚未到达截止时间
                //var ms = Math.floor(distancetime%1000);
                var sec = Math.floor(distancetime/1000%60);
                var min = Math.floor(distancetime/1000/60%60);
                var hour =Math.floor(distancetime/1000/60/60%24);
                var day = Math.floor(distancetime/1000/60/60/24);

                // if(ms<100){
                //     ms = "0"+ ms;
                // }
                if(sec<10){
                    sec = "0"+ sec;
                }
                if(min<10){
                    min = "0"+ min;
                }
                if(hour<10){
                    hour = "0"+ hour;
                }
                //return day + ":" +hour + ":" +min + ":" +sec + ":"+ms;
                return [day,hour,min,sec]
            }else{
    　　　　　　//若否，就是已经到截止时间了  
                return false
            }
        }
}();

//错误提示;默认1.2s
function errorTipc(info,time){
    $('.error_tipc').text(info?info:'出错啦！').fadeIn().fadeOut(time?time:1200);
}

//阻止弹窗滑动穿透2
function isRolling(container){
    // 移动端touch重写
    var startX, startY;
    // var button=document.getElementById('formLogin');
    // button.addEventListener('click',function(){
    //    $('input').focus();
    // })
    container.on('touchstart', function(e){
        //console.log(e.changedTouches[0]);
        // startX = e.changedTouches[0].pageX;
        // startY = e.changedTouches[0].pageY;
        startX = e.originalEvent.touches[0].pageX;
        startY = e.originalEvent.touches[0].pageY;
        
    });

    // 仿innerScroll方法
    container.on('touchmove', function(e){
        e.stopPropagation();

        var deltaX = e.originalEvent.touches[0].pageX - startX;
        var deltaY = e.originalEvent.touches[0].pageY - startY;

        // 只能纵向滚
        if(Math.abs(deltaY) < Math.abs(deltaX)){
            e.preventDefault();
            return false;
        }

        var box = $(this).get(0);

        if($(box).height() + box.scrollTop >= box.scrollHeight){
            if(deltaY < 0) {
                e.preventDefault();
                return false;
            }
        }
        if(box.scrollTop === 0){
            if(deltaY > 0) {
                e.preventDefault();
                return false;
            }
        }
        // 会阻止原生滚动
        // return false;
    });
}
//返回顶部
$('body').on('click','.backTop',function(){
    $('body,html').animate({scrollTop:0+'px'},500);
});
$(window).on('scroll',function(){
    var scrolltop=$(document).scrollTop();
    if(scrolltop>=300){
        $('.right_sidebar').show();
    }else{
        $('.right_sidebar').hide();
    }
});
//水平滑动(存在bug)
 var nav_scroll ={
        outer:null,
        $inner:null,
        hidden_width:0,
        current_x:0,
        start_x:0,
        scale:1,
        distance:0,
        init:function(outer,inner){
            var self =this;
            self.outer = $(outer)[0];
            self.$inner = $(inner);
            var inner_width = 0;
            var winWidth=$(window).width();
            //li布局
            var oLi=$(inner).find('li');
            self.$inner.children().each(function(){
                inner_width += $(this).outerWidth();
            });
            // oLi.each(function(){
            //     $(this).css('width',winWidth/2+'px');
            //     inner_width += $(this).outerWidth();
            // })
            self.hidden_width = inner_width-$(self.outer).width();
            self.$inner.width(inner_width+1);
            if(self.hidden_width>0){
                self.outer.addEventListener('touchstart', self.eventlistener, false);
            }
        },
        eventlistener:{
            handleEvent: function(event) {
            switch (event.type) {
                case 'touchstart': this.start(event); break;
                case 'touchmove': this.move(event); break;
                case 'touchend': this.end(event); break;
            }
            },
            start:function(){
                nav_scroll.start_x = event.touches[0].pageX;
                nav_scroll.outer.addEventListener('touchmove', this, false);
            },
            move:function(){
                var this_e = event || window.event;
                this_e.preventDefault();
                this_e.stopPropagation()
                nav_scroll.move_x = event.touches[0].pageX;
                nav_scroll.current_x = nav_scroll.current_x+nav_scroll.move_x-nav_scroll.start_x;
                nav_scroll.start_x = nav_scroll.move_x;
                nav_scroll.transform();
            },
            end:function(){
                nav_scroll.outer.removeEventListener('touchmove', this, false)
                nav_scroll.outer.removeEventListener('touchend', this, false)
            }
        },
        transform:function(x){
            var self =this;
            if(-nav_scroll.current_x>=self.hidden_width){
                if(-nav_scroll.current_x===self.hidden_width){
                    return null;
                }
                nav_scroll.current_x = -self.hidden_width;
            }
            else if(nav_scroll.current_x>=0){
                if(nav_scroll.current_x===0){
                    return null;
                }
                nav_scroll.current_x =0;
            }
            $(self.outer).css({
                webkitTransform:'translate('+nav_scroll.current_x+'px,0) translateZ(0)',
                transitionDuration:0+'ms',
                transitionTimingFunction: 'cubic-bezier(0.1, 0.57, 0.1, 1)'
            });
        }
}