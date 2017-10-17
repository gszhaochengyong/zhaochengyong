/* 
* 作者：Poya QQ：931989338
* 邮箱：djcbpl@163.com
* 购买: 定制主题
* 讨论群：149663025
* 广告：本人承接各类大中小型管理系统的软件的设计与前端开发、主题开发，有需要的朋友联系我啦~~~~
*/

$(function(){
    function show(){
	    var mydate = new Date();
	    var str = "" + mydate.getFullYear();
	    return str;
    }
    $(".Years").text(show());
});

$(".college-describe").each(function(){
	var maxwidth=126;
	if($(this).text().length>maxwidth){
		$(this).text($(this).text().substring(0,maxwidth));
		$(this).html($(this).html()+'…');
	}
});




