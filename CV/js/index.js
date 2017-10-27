$(function(){
	var winHeight=$(window).height();
	var winWidth=$(window).width();
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


	var type=1;//下箭头标记
	var pageTurning=$("#pageTurning");//下一页盒子标签盒子
	(function(){
		//鼠标滚轴事件
		$(document).on("mousewheel DOMMouseScroll",".page",function(event){
			var event=event||window.event;
			var wheelDelta=event.originalEvent.wheelDelta;//这个值小于0是向下滚，大于0是向上滚动
			if(wheelDelta<0&&$(this).index()<pages-1){
				pageChange(this,1,pageTurning);//向下type给1

			}else if(wheelDelta>0&&$(this).index()>0){
				pageChange(this,0,pageTurning);//向上type给0
			}
		});
		//上下箭头
		pageTurning.on("click",function(){
			var types=type;//这里不能奖整个type传入函数，然后在下面的函数改这个type值，相当于改函数的参数了，影响不到全局type值
			pageChange($(".page.active")[0],types,pageTurning);

		})
	})();

	//鼠标滚轴和上下箭头切换函数  参数 当前active页对象 上下类型 上下页对象
	function pageChange(item,types,pageTurning){
		if(types){//向下滚动或者点击下箭头时
			$(item).attr('class','page').addClass('pre');
			$(item).next(".page").addClass('active');
			$("#nav ul li").eq($(item).index()).removeClass('active');
			$("#nav ul li").eq($(item).index()+1).addClass('active');
			if($(item).index()==pages-2){//向下，当前对象是倒数第二个时
				type=0;
				pageTurning.css('backgroundImage', 'url("imgs/up.png")');
			}
		}else{
			$(item).attr('class','page').addClass('next');
			$(item).prev(".page").addClass('active');
			$("#nav ul li").eq($(item).index()).removeClass('active');
			$("#nav ul li").eq($(item).index()-1).addClass('active');
			if($(item).index()==1){//向上，当前对象是第二个时
				type=1;
				pageTurning.css('backgroundImage', 'url("imgs/down.png")');
			}
		}
		
		
	}

	//导航点击
	$("#nav").on('click', 'ul li', function(event) {
		event.preventDefault();
		if($(this).index()!=$("ul li.active").index()){
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
		if($(this).index()==pages-1){
			type=0;
			pageTurning.css('backgroundImage', 'url("imgs/up.png")');
		}
		if($(this).index()==0){
			type=1;
			pageTurning.css('backgroundImage', 'url("imgs/down.png")');
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
	(function(){
		//tips提示动画
		var tips=$("#tips");
		var left;//距离左边边距 
		var distance=20;//离二边最小距离
		
		var timer=setInterval(tipsAnimate, 1000);
		function tipsAnimate(){
			console.log('111');
			left=tips.offset().left;
			if(left<=distance){
				tips.animate({
					'left': winWidth-distance-tips.width()+'px',
					'opacity': "0.6",
				},5000);
			}else if(left>=winWidth-distance-tips.width()){
				tips.animate({
					'left': distance+'px',
					'opacity': "1",
				},
					5000);
			}
		}
	})();

})