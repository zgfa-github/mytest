
/**
 * message
 * 消息框
 * 使用方式：
 *  <!-- bar -->
 *	<div id="messageBar"></div>
	<!-- message box -- >
	<div id="messageContent"></div>
 * 
 */

//初始化
function initMessage(){

	$("#myCarousel").carousel({
		interval:false,
		wrap:false
	});

	//绑定关闭按钮
	$("#messageContentFootBtn").click(function(event) {
		hideMessage();
	});
}

/**
 * showMessage
 * title: 消息标题
 * msg: 消息内容
 * btn: 按钮内容
 * 显示消息框
 */
function showMessage(title,msg,btn){
	


	//显示结果
	$("#messageBar").css("display","block");
	$("#messageContent").css("display","block");

	//page reset
	$("#messageContentHead").css("line-height",$("#messageContentHead").height()+"px");
	$("#messageContentFootBtn").css("line-height",$("#messageContentFootBtn").height()+"px");
	 
	
}

/**
 * hideMessage
 * 隐藏消息框
 */
function hideMessage(){
	$("#messageBar").css("display","none");
	$("#messageContent").css("display","none");
}


