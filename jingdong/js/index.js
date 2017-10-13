window.onload=function(){
	function $(id){
		return document.getElementById(id);
	}
	//点击顶部banner右上角的X关闭banner显示
	// 事件三要素  事件原.事件=事件处理程序
	var topbanner=document.getElementById('topbanner');
	var aclose=document.getElementById('a-close');
	aclose.onclick=function () {
		 topbanner.style.display='none';
		// topbanner.style.css('display', 'none'); 这个为啥不行
	}

	//登陆点击弹出登陆框以及登陆框上的X关闭登陆框
	var logina=document.getElementById('logina');
	var loginpop=document.getElementById('loginpop');
	var loginmask=document.getElementById('loginmask');
	var closelogin=document.getElementById('closelogin');
	logina.onclick=function(){
		loginpop.style.display="block";
		maskpop.style.display="block";
	}
	closelogin.onclick=function(){
		loginpop.style.display="none";
		maskpop.style.display="none";
	}

/*	//搜索输入框处理
	//鼠标进入焦点时当为默认值时清空并变颜色
	var searchInput=document.getElementById('searchInput');
	searchInput.onfocus=function(){
		if(searchInput.value=='请输入'){
			searchInput.value='';
			searchInput.style.color="#666";
		}
	}
	//鼠标移出焦点时当为空时给默认值，并设置默认颜色
	searchInput.onblur=function(){
		if(searchInput.value==''){
			searchInput.value='请输入';
			searchInput.style.color="#aaa";
		}
	}*/
   //搜索输入框处理2仿淘宝的效果
   $("searchInput").focus();
   $("searchInput").oninput=$("searchInput").onpropertychange=function(){
   	 if (this.value=='') {
   	 	$("d11").style.display="block";
   	 } else {
   	 	$("d11").style.display="none";
   	 }
   	 
   }

	//遍历循环for来布置生活服务众多小标签背景图片
	var icons=document.getElementsByClassName('icon');
	//console.log(icons.length);
	for(var i = 0, length1 = icons.length; i < length1; i++){
		icons[i].style.background="url(imgs/icon_lifeserv.png) no-repeat -25px "+(-25)*i+"px";
		//console.log("125px "+(-25)*i+"px");
	}

	// 根据图片数量显示数字个数
	var slide=document.getElementById("slide");
	var imgnum=slide.getElementsByTagName("img").length;
	//alert(imgnum);
	var numbox=document.createElement("div");
	numbox.setAttribute("class", "num");
	numbox.setAttribute("id", "num");
	var ul=document.createElement("ul");
	slide.appendChild(numbox);
	document.getElementById("num").appendChild(ul);

	for (var i = 0; i < imgnum; i++) {
		var li=document.createElement("li");
		li.innerHTML=i+1;
		document.getElementById("num").children[0].appendChild(li);
		if (i==1) {
			li.setAttribute("class","now");
		}

	}

}