// /* 
// * 作者：Poya QQ：931989338
// * 邮箱：djcbpl@163.com
// * 购买: 定制主题
// * 讨论群：149663025
// * 广告：本人承接各类大中小型管理系统的软件的设计与前端开发、主题开发，有需要的朋友联系我啦~~~~
// */
var t = n =0, count;

$(document).ready(function(){ 

count=$("#banner_list a").length;
// console.log(count+"总数a");

$("#banner_list a:not(:first-child)").hide();

$("#banner_info").html($("#banner_list a:first-child").find("img").attr('alt'));

$("#banner_info").click(function(){window.open($("#banner_list a:first-child").attr('href'), "_blank")});

$("#ul1 li").click(function() {

	var i = $(this).index();//获取Li元素的索引值，即0，1，2，3，4
	// console.log($(this).index());
	n = i;
	// console.log(n+"iii");
	if (i >= count) return;

	$("#banner_info").html($("#banner_list a").eq(i).find("img").attr('alt'));

	$("#banner_info").unbind().click(function(){window.open($("#banner_list a").eq(i).attr('href'), "_blank")})

	$("#banner_list a").filter(":visible").fadeOut(500).parent().children().eq(i).fadeIn(1000);

	document.getElementById("banner").style.background="";

	$(this).toggleClass("on");

	$(this).siblings().removeAttr("class");

});

t = setInterval("showAuto()", 3000);

$("#banner").hover(function(){clearInterval(t)}, function(){t = setInterval("showAuto()", 4000);});

})



function showAuto(){
	n>=(count-1)?n=0:n++;
	$("#banner li").eq(n).trigger('click');
}
// window.onload=function(){
// 	var list=document.getElementById("banner_list");
// 	var num=list.children;
// 	var numicon=document.getElementById("ul1").children;

// 	var now=0;
// 	function slide(){
// 	// if (aaa==undefined) {
			
// 			now>num.length-1?now=0:now;
// 			console.log(now);
// 			for (var i = 0; i < num.length; i++) {
// 				num[i].style.display="none";
// 				numicon[i].setAttribute("class",'');
// 			};
// 			num[now].style.display="block";
// 			numicon[now].setAttribute("class",'on');
// 			now++;

// 		// } else {
// 		// 	num[aaa].style.display="block";
// 		// 	numicon[aaa].setAttribute("class",'on');
// 		// };
	
// 	}
	
// 	for (var i = 0; i < num.length; i++) {
// 		num[i].onmouseover=numicon[i].onmouseover=function(){
// 			clearInterval(timer);
// 			// slide(i);
// 		}
// 		num[i].onmouseout=numicon[i].onmouseout=function(){
// 			timer=setInterval(slide,2000);
// 			// slide(i);
// 		}
// 	};
// 	var timer=setInterval(slide,2000);
// }