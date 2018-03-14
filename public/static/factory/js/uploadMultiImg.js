$(function(){
        // 上传图片资料
        // $('body').on('change','.uploadMultiImg',function(){
        //     var img = event.target.files[0];
        //     var obj=$(this).parent();
        //     var multiPictureObj=$(obj).parents('.upload-picture-module').siblings('form');
        //     console.log(img);
        //     // 判断是否图片
        //     if(!img){
        //         return false;
        //     }
        //     // 判断图片格式
        //     var imgRegExp=/\.(?:jpg|jpeg|png|gif)$/;
        //     if(!(img.type.indexOf('image')==0 && img.type && imgRegExp.test(img.name)) ){
        //         layer.open({
        //             content:'请上传：jpg、jpeg、png、gif格式图片',
        //             time:2
        //         }) ;
        //     }
        //     var reader = new FileReader();
        //     reader.readAsDataURL(img);
        //     reader.onload = function(e){
        //         var imgUrl=e.target.result;
        //         var html='';
        //         var oLiLength=$('.multi-picture-module li').length;
        //         // console.log(imgUrl);
        //         // $(obj).addClass('active');
        //         var postData = {img: e.target.result};
        //         postData.imgWidth = 145;
        //         postData.imgHeight = 100; 
        //         // $(obj).find('img').attr('src',imgUrl);
        //         // $(obj).find('.business-license').val(imgUrl);               
        //         // $(obj).find('.agent-authorization').val(imgUrl);
        //         html+='<li>';
        //         html+='<div class="picture-module">';
        //         html+='<input type="file" class="uploadImg" name="">';
        //         html+='<img class="upload_img" src="">';
        //         html+='<input type="hidden" class="" value="">';
        //         html+='</div>';
        //         html+='</li>';
        //         $(obj).parent('li').find('img').attr('src',imgUrl);
        //         if(!oLiLength){
        //             console.log(oLiLength);
        //             multiPictureObj.find('.multi-picture-module').append(html);
        //             multiPictureObj.find('.picture-module').addClass('active');
        //             multiPictureObj.find('img').attr('src',imgUrl);
        //             return false;
        //         }
        //         multiPictureObj.find('.multi-picture-module li:last').after(html);
        //         multiPictureObj.find('.picture-module').addClass('active');
        //         multiPictureObj.find('li:last img').attr('src',imgUrl);
        //     }
        // });

        $('body').on('change','#file',function(){
            var file = $(this);
            var fileList = $(this).get(0).files;
            var imgContainer = $('.multi-picture-module');
            var imgArr = [];
            console.log(fileList.length);
            for (var i = 0; i < fileList.length; i++) {
                var imgUrl = window.URL.createObjectURL(file.get(0).files[i]);
                
                imgArr.push(imgUrl);
                // var img = document.createElement("img");
                var img=  $('<img src="" class="upload_img">');
                img.attr("src", imgArr[i]);
                // var imgAdd = document.createElement("div");
                var imgAdd = $('<li><div class="picture-module active"><input type="file" class="uploadImg" name=""><span class="delete-picture">X</span></div></li>');
                // imgAdd.setAttribute("class", "z_addImg");
                // imgAdd.attr("class", "z_addImg");
                imgAdd.find('.picture-module').append(img);
                imgContainer.append(imgAdd);
            };
            imgRemove();
        })
})

//原生写法
function imgChange(obj1, obj2) {
   
    //获取点击的文本框  onchange="imgChange('z_photo','z_file');"
    // var file = document.getElementById("file");     
    var fileList = $('#file').get(0).files[0];     
    //存放图片的父级元素
    var imgContainer = document.getElementsByClassName(obj1)[0];
    //获取的图片文件
    // var fileList = file.files;
    console.log(fileList);
    //文本框的父级元素
    var input = document.getElementsByClassName(obj2)[0];
    var imgArr = [];
    //遍历获取到得图片文件
    for (var i = 0; i < fileList.length; i++) {
        var imgUrl = window.URL.createObjectURL(file.files[i]);
       
        imgArr.push(imgUrl);
        var img = document.createElement("img");
        img.setAttribute("src", imgArr[i]);
        var imgAdd = document.createElement("div");
        imgAdd.setAttribute("class", "z_addImg");
        imgAdd.appendChild(img);
        imgContainer.appendChild(imgAdd);
    };
    imgRemove();
};

function imgRemove() {
    var imgList = document.getElementsByTagName("li");
    // var mask = document.getElementsByClassName("z_mask")[0];
    // var cancel = document.getElementsByClassName("z_cancel")[0];
    // var sure = document.getElementsByClassName("z_sure")[0];
    for (var j = 0; j < imgList.length; j++) {
        imgList[j].index = j;
        imgList[j].onclick = function() {
            var t = this;
            // mask.style.display = "block";
            // cancel.onclick = function() {
            //     mask.style.display = "none";
            // };
            // sure.onclick = function() {
            //     mask.style.display = "none";
            //     t.style.display = "none";
            // };

        }
    };
};

//原生删除写法
// function imgRemove() {
//     var imgList = document.getElementsByClassName("z_addImg");
//     var mask = document.getElementsByClassName("z_mask")[0];
//     var cancel = document.getElementsByClassName("z_cancel")[0];
//     var sure = document.getElementsByClassName("z_sure")[0];
//     for (var j = 0; j < imgList.length; j++) {
//         imgList[j].index = j;
//         imgList[j].onclick = function() {
//             var t = this;
//             mask.style.display = "block";
//             cancel.onclick = function() {
//                 mask.style.display = "none";
//             };
//             sure.onclick = function() {
//                 mask.style.display = "none";
//                 t.style.display = "none";
//             };

//         }
//     };
// };

