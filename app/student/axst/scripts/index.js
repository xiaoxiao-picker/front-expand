$(document).ready(function() {
	$(document).on("click", ".signup-btn", function() {
		$(this).css({
			'display': 'none'
		});
		$("#ModalContainer").addClass('show');
	});

});


var CLIENTTIME,SERVERTIME;

function justWaitNoBB(){
	var start=new Date('2015/6/10 18:00').getTime();
	var end=new Date('2015/6/12 17:00').getTime();
	var now =new Date().getTime();

	if(now<start){
		SUI.use("helper",function(Helper){
			Helper.alert("小伙伴们：</br>报名时间为 6月10日 18:00 - 6月12日 17:00 </br>请耐心等待哦！");
		});	
	}else if(now>end){
		SUI.use("helper",function(Helper){
			Helper.alert("感谢你的关注，报名已截止。");
		});
	}else{
		window.location.href="./area.html";
	}
}