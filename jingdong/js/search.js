window.onload=function(){

	//高级选项鼠标指向显示下拉菜单功能
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

}