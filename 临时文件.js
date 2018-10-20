 //多图片上传
    var imgContainer = $('.multi-picture-module');
    var fileList;
    var num;
    $('body').on('change','#file',function(){
        var file = $(this);
        fileList = $(this).get(0).files;
        var imgArr = [];
        num=file.data('num');//限制个数
       
        if(num==0){ //0代表无限制个数          
            uploadPic(fileList[0],0,fileList.length);
        }else{
            uploadPic(fileList[0],0,num);
        }      
    });
    function uploadPic(fil,i,len){
            var img = fil;
            var obj=$(this).parent();
            var fileSize=fil.size/1024/1024;
            // 判断是否图片
            if(!img){
                return false;
            }
            // 判断图片格式
            var imgRegExp=/\.(?:jpg|jpeg|png|gif)$/;
            if(!(img.type.indexOf('image')==0 && img.type && imgRegExp.test(img.name)) ){
                layer.open({
                    content:'请上传：jpg、jpeg、png、gif格式图片',
                    time:2
                }) ;
            }
            if(fileSize>1){
                dialog.error('图片大小不能超过1M');
                return false;
            }
            console.log($('.editDetailLayer li').length);
            if($('.editDetailLayer li').length>=num && num){
                errorTipc('只能上传'+num+'张图片');
                return false;
            }
            var reader = new FileReader();
            reader.readAsDataURL(img);

            reader.onload = function(e){
                var imgUrl=e.target.result;
                var img=  $('<img src="" class="upload_img">');
                img.attr("src", imgUrl);
                var imgAdd = $('<li><div class="picture-module active"><input type="file" class="uploadImg uploadSingleEditImg" name=""><span class="delete-picture">X</span></div></li>');
                imgAdd.find('.picture-module').append(img);
                $('.multi-picture-module').append(imgAdd);
                if(i<len-1){
                    // console.log(len);
                    if(fileList[i+1]){
                        uploadPic(fileList[i+1],i+1,len);
                    }
                }
            }         
    }