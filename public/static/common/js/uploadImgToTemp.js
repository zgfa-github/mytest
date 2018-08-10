$(function(){
    // 选择单图片
    $('body').on('change','.uploadSingleImg',function () {
        var img = event.target.files[0];
        var uploadfileSize=img.size/1024/1024;
        var obj=$(this).parent();
        // 判断是否图片
        if(!img){
            return false;
        }
        // 判断图片格式
        var imgRegExp=/\.(?:jpg|jpeg|png|gif)$/;
        if(!(img.type.indexOf('image')==0 && img.type && imgRegExp.test(img.name)) ){
            dialog.error('请上传：jpg、jpeg、png、gif格式图片');
            return false;
        }
        if(uploadfileSize>1){
            dialog.error('图片大小不能超过1M');
            return false;
        }
        var reader = new FileReader();
        reader.readAsDataURL(img);
        reader.onload = function(e){
            var imgUrl=e.target.result;
            $(obj).addClass('active');
            var postData = {fileBase64: e.target.result};
            postData.fileType = 'image';
            // postData.imgWidth = 145;
            // postData.imgHeight = 100;
            $(obj).find('img').attr('src',imgUrl);
            // $(obj).find('.img').val(imgUrl);
            //提交
            $.post(controller+"uploadFileToTemp",postData,function(msg){
                if(msg.status == 1){
                    $(obj).find('.img').val(msg.info);
                    $(obj).find('img').attr('src','/uploads/'+msg.info);
                }else{
                    dialog.error(msg.info)
                }
            })
        }

    });
    // 选择单视频
    $('body').on('change','.uploadSingleVideo',function () {
        var img = event.target.files[0];
        var obj=$(this).parent();
        var url = URL.createObjectURL(img); 
        var videoDuration=$(this).data('duration');
        // 判断是否图片
        // if(!img){
        //     return false;
        // }
        // // 判断图片格式
        // var imgRegExp=/\.(?:jpg|jpeg|png|gif)$/;
        // if(!(img.type.indexOf('image')==0 && img.type && imgRegExp.test(img.name)) ){
        //     layer.open({
        //         content:'请上传：jpg、jpeg、png、gif格式图片',
        //         time:2
        //     }) ;
        // }
        var reader = new FileReader();
        reader.readAsDataURL(img);
        reader.onload = function(e){
           console.log(img);
            var postData = {fileBase64: e.target.result};
            postData.fileType = 'video';
            var videoUrl=e.target.result;
            $(obj).find('video').attr('src',videoUrl);
            $('.editDetailLayer .upload-video').on('canplaythrough',function(){
                var _this=$(this).get(0);
                var hour = parseInt((_this.duration)/3600);
                var minute = parseInt((_this.duration%3600)/60);
                var second = Math.ceil(_this.duration%60);
                console.log(_this.duration);
                if(_this.duration>videoDuration){
                    alert('时间不能超过'+videoDuration+'s');
                    return false;
                }
            })
            // $(obj).find('.img').val(videoUrl);
            //提交
            // $.post(controller+"uploadFileToTemp",postData,function(msg){
            //     if(msg.status == 1){
            //         $(obj).find('.img').val(msg.info);
            //         $(obj).find('img').attr('src','/uploads/'+msg.info);
            //     }else{
            //         dialog.error(msg.info)
            //     }
            // })
        }
    })
  
});
