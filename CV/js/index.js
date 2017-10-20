$(function(){
	var winHeight=$(window).height();
	var pages=$(".page").length;
	(function(){
		
		//初始化，设置每页内容高度和整个盒子高度是容器大小高度
		setHeight();
		//设置第一页属性值
		$(".page:first").css({
			top: '0'
		});

		//容器大小变化时
		$(window).resize(function(event) {
			setHeight();
		});

		//设置每项内容高度为屏幕高度
		function setHeight(){
			
			$(".page").height(winHeight+'px');
			$("#CVBox").height(winHeight+'px');
		};

		//鼠标滚轴事件
		$(document).on("mousewheel DOMMouseScroll",".page",function(event){
			var event=event||window.event;
			console.log(event.originalEvent);
			if($(this).index()<pages-1){
				$(this).css('top', -winHeight+'px');
				$(this).next(".page").css('top', "0");;
			}
			
		})
	})();




})