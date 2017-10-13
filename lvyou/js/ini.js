// 根据屏幕宽度和屏幕尺寸变化来决定主动框架宽度
var winWidth; //屏幕宽度
function bodyClass() {
	var bodyItem=document.getElementsByTagName('body');
	// 获取屏幕宽度
	if (window.innerWidth){
		winWidth = window.innerWidth;
	}
	else if ((document.body) && (document.body.clientWidth)){

		winWidth = document.body.clientWidth;
	}
	if (winWidth>=1190) {
		//console.log(bodyItem['0']);
		
		bodyItem['0'].setAttribute('class', 'w1190');
		//console.log(document.body);
	} else {
		//console.log(document.getElementsByTagName('body')['0']);
		bodyItem['0'].setAttribute('class','w990');
	}
	//console.log(bodyItem[0].className+'ddd');
};
window.onload=function(){
	bodyClass();
	window.onresize=bodyClass;
}