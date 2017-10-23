$(function(){
	var winHeight=$(window).height();
	var pages=$(".page").length;
	var pageItem=["首页","求职意向","项目经验","工作经验","教育经历","培训经历","联系方式"];
	

	//导航动态根据.page页个数来添加
	(function(){
		var ul=$("<ul></ul>");
		for (var i = 0; i < pages; i++) {
			var li=$("<li></li>");
			li.html(pageItem[i]);
			ul.append(li);
		}
		console.log(ul);
		$("#nav").append(ul);
	})();


	
	//初始化
	(function(){
		//初始化，设置每页内容高度和整个盒子高度是容器大小高度
		setHeight();
		//初始化active第一个对象，要放在这里，因为放前面li还没生成
		$(".page:first").addClass('active');
		$("#nav ul li:first").addClass('active');
	})();		
	
	//容器大小变化时
	(function(){
		$(window).resize(function(event) {
			winHeight=$(window).height();
			setHeight();
		});
	})();

	//设置每项内容高度为屏幕高度函数
	function setHeight(){
		
		$(".page").height(winHeight+'px');
		$("#CVBox").height(winHeight+'px');
	};

	(function(){
		//鼠标滚轴事件
		$(document).on("mousewheel DOMMouseScroll",".page",function(event){
			var event=event||window.event;
			var wheelDelta=event.originalEvent.wheelDelta;//这个值小于0是向下滚，大于0是向上滚动
			//用操作类的方式更好
			if(wheelDelta<0&&$(this).index()<pages-1){
				$(this).attr('class','page').addClass('pre');
				$(this).next(".page").addClass('active');
				$("#nav ul li").eq($(this).index()).removeClass('active');
				$("#nav ul li").eq($(this).index()+1).addClass('active');

			}else if(wheelDelta>0&&$(this).index()>0){
				$(this).attr('class','page').addClass('next');
				$(this).prev(".page").addClass('active');
				$("#nav ul li").eq($(this).index()).removeClass('active');
				$("#nav ul li").eq($(this).index()-1).addClass('active');
			}
		});
	})();

	//导航点击
	$("#nav").on('click', 'ul li', function(event) {
		event.preventDefault();
		console.log($(this).index());
		if($(this).index()!=$("ul li.active").index()){
			console.log($(this).index());
			$('ul li.active').removeClass('active');
			$(this).addClass('active');
			$(".page").eq($(".page.active").index()).removeClass('active');

			for (var i = 0; i < pages; i++) {
				if(i<$(this).index()){
					$(".page").eq(i).attr('class', 'page').addClass('pre');
				}else if (i>$(this).index()) {
					$(".page").eq(i).attr('class', 'page').addClass('next');
				}else{
					$(".page").eq(i).attr('class', 'page').addClass('active');
				}

			}
		}
	});
	//用这个效果咋不行，移一下就跳到最后一个了，是不是循环完了才绑定最后一次？
/*	function exchange(wheelDelta,item){
		console.log(item.index());
		console.log(wheelDelta+','+item);
		if(wheelDelta){
			item.removeClass('active').addClass('next');
			item.prev(".page").addClass('active');
			$("#nav ul li").eq(item.index()).removeClass('active');
			$("#nav ul li").eq(item.index()-1).addClass('active');
		}else{
			item.removeClass('active').addClass('pre');
			item.next(".page").addClass('active');
			$("#nav ul li").eq(item.index()).removeClass('active');
			$("#nav ul li").eq(item.index()+1).addClass('active');
		}
	}*/
})