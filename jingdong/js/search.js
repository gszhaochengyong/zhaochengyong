window.onload=function(){

	//高级选项鼠标指向显示下拉菜单功能
	console.log(document.getElementById("allgoods"));
	var lis=document.getElementById("ids").getElementsByTagName("li");

	var divshidden=document.getElementById("float").getElementsByTagName("div");
	for (var i = 0; i < lis.length; i++) {
		lis[i].index=i;
		lis[i].onmouseover=function(){
			divshidden[this.index].style.display='block';
		}
		lis[i].onmouseout=function(){
			divshidden[this.index].style.display='none';
		}
	}

	 $("#allgoods").onmouseover=function(){
	 	$("#lists").style.display="block";
	 }
	 $("#allgoods").onmouseout=function(){
	 	$("#lists").style.display="none";
	 }

	var topbanner=document.getElementById('topbanner');
	var aclose=document.getElementById('a-close');
	aclose.onclick=function () {
		$(topbanner).slideUp(200,"linear");
		 // topbanner.style.display='none';
		// topbanner.style.css('display', 'none'); 这个为啥不行
	}

	//登陆点击弹出登陆框以及登陆框上的X关闭登陆框
	var logina=document.getElementById('logina');
	var loginpop=document.getElementById('loginpop');
	var loginmask=document.getElementById('loginmask');
	var closelogin=document.getElementById('closelogin');
	console.log(maskpop)
	logina.onclick=function(){
		$(loginpop).show(10);
		$(maskpop).show(30);
	}
	closelogin.onclick=function(){
		loginpop.style.display="none";
		maskpop.style.display="none";
	}


	//搜索输入框处理2仿淘宝的效果
	$("#searchInput").focus();
    $("#searchInput").on("input propertychange",function(){
   	  console.log("ddd");
   	 if ($(this).val()=='') {
   	 	$("#d11").css("display","block");
   	 } else {
   	 	$("#d11").css("display","none")
   	 }
   	 
   });


}
	