 $(function(){
 	//最顶部左侧小菜单
 	var topSmallMenuLeft=$("#topSmallMenuLeft");
 	for (var i = 0; i < topMenuLeft.length; i++) {
 		var a=$("<a href='javascript:;'></a>");
 		var li=$("<li></li>");
 		li.html(topMenuLeft[i]);
 		a.append(li);
 		topSmallMenuLeft.append(a);
 	};
 	// 上部大菜单
 	var headerNav=$("#headerNav");
 	for (var i = 0; i < topMenu.length; i++) {
 		if (topMenu[i].length>0) {
 			var a=$("<a></a>");
 			a.html(topMenu[i][0]);
 			headerNav.append(a);
 		}else {
 			var a=$("<a></a>");
 			headerNav.append(a);
 		}
 	}
 	var menuListBox=$("#menuListBox");
 	//大菜单鼠标指向时显示下拉菜单
 	//有bug切换时会有空隙，到时不能解决的话就用hide show得了
 	var meunUl=$("#menuUl");
 	headerNav.on("mouseover","a",function(){
 		var text=$(this).text();
 		for (var i = 0; i < topMenu.length; i++) {
 			if(topMenu[i][0]==text){
 				meunUl.html("");
 				if(topMenu[i][1]!=null &&text!=""){
 					for (var j = 0; j < topMenu[i][1].length; j++) {
 						if(topMenu[i][1][j][0]!=null){
 							li=$("<li><div class='item'><span class='kind'>"+topMenu[i][1][j][0]+"</span><a><div class='img'><img src='imgs/"
	 						+topMenu[i][1][j][1]+"'></div></a><a><p class='name'>"+topMenu[i][1][j][2]+
	 						"</p></a><p class='price'>"+topMenu[i][1][j][3]+"</p></div></li>");
 						}else{
 							li=$("<li><div class='item'><span class='kindNull kind'>"+" "+"</span><a><div class='img'><img src='imgs/"
	 						+topMenu[i][1][j][1]+"'></div></a><a><p class='name'>"+topMenu[i][1][j][2]+
	 						"</p></a><p class='price'>"+topMenu[i][1][j][3]+"</p></div></li>");
		 					
 						}
	 					meunUl.append(li);
 					}
 					menuListBox.stop(true,false).show()
 				}
 				
 				
 			}
 		}
 	});
 	headerNav.on("mouseout","a",function(){
 		menuListBox.stop(true,false).hide();
 	});
 	//上部大菜单
 	menuListBox.on("mouseover",function(){
 		menuListBox.stop(true,false).show();
 	});
 	menuListBox.on("mouseout",function(){
 		menuListBox.stop(true,false).hide();
 	});
 	//鼠标点击输入框清空内容
 	var searchInput=$("#searchInput");
 	searchInput.on("click",function(){
 		$(".hotWords").eq(0).hide();
 	});
 	searchInput.on("blur",function(){
 		$(".hotWords").eq(0).show();
 	});

 	// 左侧菜单
 	var topLeftMenu=$("#topLeftMenu");
 	var rightList=$("#rightList");
 	for (var i = 0; i < leftMenu.length; i++) {
 		var html='<li>'+leftMenu[i][0]+'<span class="arrow"></span></li>';
 		topLeftMenu.append($(html));
 	};
 	topLeftMenu.on("mouseenter","li",function(){
 		rightList.html("");
 		var str="";
 		var text=$(this).text();
 		str+="<ul>";
 		
		for (var i = 0; i < leftMenu.length; i++) {
 			if(leftMenu[i][0]==text){
 				for (var j = 0; j < leftMenu[i][1].length; j++) {
 					str+="<li class='item'>";
 					str+="<img src='imgs/"+leftMenu[i][1][j][0]+"'>";
 					str+="<a><span class='name'>"+leftMenu[i][1][j][1]+"</span></a>";
 					if(leftMenu[i][1][j][2]!=null){
 						str+="<a><span class='buy'>"+leftMenu[i][1][j][2]+"</span></a></li>";
 					}
 					
 				}
 			}
 		}
 		str+="</ul>";
 		rightList.html($(str));
 		rightList.show();
 	});
 	//左侧菜单移除时
 	$("#leftMenu").on("mouseleave",function(){
 		rightList.hide();
 	});

 	/*轮播图部分开始*/
    var topRightSlide=$("#topRightSlide");
    var rightSlideBox=$("#rightSlideBox");
    var photoNumber=$("#photoNumber");
    var numbeAString='';
    //加数字标签
    for (var i = 0; i < topRightSlide.children("li").length; i++) {
    	var a;
    	a=i==0?"<a href='javascript:;' class='active'></a>":"<a href='javascript:;'></a>";
    	photoNumber.append($(a));
    }

    var iSlide=0;//播放当前项标签
    var timerSlide=null;//自动播放幻灯片定时器
    //图片切换和数字
    function showSlide(iSlide){
    	topRightSlide.children("li").eq(iSlide).addClass('active').show(10).siblings("li").hide().removeClass('active');
    	photoNumber.children('a').eq(iSlide).addClass('active').siblings('a').removeClass('active');
    }
    //定时器函数
    function timerSlides(){
    	timerSlide=setInterval(function(){
			++iSlide;
			iSlide=iSlide>(topRightSlide.children("li").length-1)?0:iSlide;
			showSlide(iSlide);
		}, 2000);
    }
	//初始化
	timerSlides();
	//大盒子鼠标事件
	rightSlideBox.on("mouseover",function(){
		clearTimeout(timerSlide);
	});
	rightSlideBox.on("mouseout",function(){
			timerSlides();
	});
	//点数字
	photoNumber.on('click','a',function(){
		clearInterval(timerSlide);
		showSlide($(this).index());
	})
	//上下页
	var pageSlide=$("#pageSlide");
	pageSlide.children('span').on("click",function(){
		if($(this).attr('class')=="pre"){
			iSlide-=1;
		}else{
			iSlide+=1;
		}
		iSlide=iSlide>(topRightSlide.children("li").length-1)?0:iSlide;
		showSlide(iSlide);
	})
	/*轮播图部分结束*/


	/*小米明星单品开始*/
	slideBox2=$("#slideBox2");
	var startLeft=slideBox2.position().left;//要移动的盒子位置
	var	widthBox=$("#starSingle").innerWidth();//盒子宽度
	var targetPos=0;//目标位置
	var  slide2Page=$("#slide2Page");//上下页变量盒子
	var timerSlide2=null;//定时器
	var flagSlide2Slide2=-1;//标记
	//定时函数
	function timerSlides2(target){
		timerSlide2=setInterval(function(left,target){
			startLeft=slideBox2.position().left;
			 if(!target){
				targetPos=startLeft<0?0:-widthBox;
			 }else{
				targetPos=target;
			 }
			slide2Animate(startLeft,targetPos);//上下页也需要这个动画，所以弄成函数，通用
			},5000);
			
	}
	//动画函数 参数需要移动的盒子left值和需要移动到的位置
	function slide2Animate(left,target){
		flagSlide2=left<0?-1:1;//确定上下页是否active的变量控制标记
		slideBox2.animate({
					left: target},
					300, function(){
						if(flagSlide2>0){
							//上一页active下一页deactive
							slide2Page.children('span').eq(1).removeClass('active');
							slide2Page.children('span').eq(0).addClass('active');
						}else{
							//下一页active上一页deactive
							slide2Page.children('span').eq(0).removeClass('active');
							slide2Page.children('span').eq(1).addClass('active');
						}
				});
	}
	//开始初始化
	timerSlides2();
	//上下页操作
	slide2Page.children('span').on("click",function(){
		if($(this).hasClass('pre') && $(this).hasClass('active')){
			clearInterval(timerSlide2);
			slide2Animate(-widthBox,0);
			timerSlides2();//重新开始定时器
		}
		if($(this).hasClass('next')&& $(this).hasClass('active')){
			clearInterval(timerSlide2);
			slide2Animate(0,-widthBox);
			timerSlides2();//重新开始定时器
		}
	})
	/*小米明星单品结束*/
	/*为你推荐的轮播图部分*/
	var slide3Page=$("#slide3Page");
	var publicItemsUl3=$("#publicItemsUl3");
	var publicItems3=$("#publicItems3");
	var slide3pageNumber=Math.ceil(publicItemsUl3.children('li').length/5);
	var page3Ini=1;
	slide3Page.children('span').on("click",function(){
		//上一页
		if($(this).hasClass('pre') && $(this).hasClass('active')){
			page3Ini-=1;
			page3Ini=page3Ini<=1?1:page3Ini;
			if(page3Ini<=1){
				slide3Page.children('span').eq(0).removeClass('active');
			}
			slide3Page.children('span').eq(1).addClass('active');
			if(page3Ini>=1){
				var target=-(page3Ini-1)*widthBox;	
				slide3Animate(target);
			}
			
		}
		//下一页
		if($(this).hasClass('next')&& $(this).hasClass('active')){
			page3Ini+=1;

			if(page3Ini<=slide3pageNumber){
				var target=-(page3Ini-1)*widthBox;
				slide3Animate(target);
			}

			page3Ini=page3Ini>=slide3pageNumber?slide3pageNumber:page3Ini;
			if(page3Ini>=slide3pageNumber){
				slide3Page.children('span').eq(1).removeClass('active');
			}
			slide3Page.children('span').eq(0).addClass('active');
		}
	});

	function slide3Animate (target) {
		publicItems3.animate({left: target}, 30);
	}
	
	/*为你推荐的轮播图结束*/
	/*家电操作开始*/
	var equipmentCategory=$("#equipmentCategory");
	var publicItems=$("#publicItems");
	var publicItemsUl=$("#publicItemsUl");
	equipmentCategory.on("mouseenter","a",function(){
		if(!$(this).children('li').hasClass('active')){
			$(this).children('li').addClass('active');
			$(this).siblings('a').children('li').removeClass('active');
			publicItemsUl.fadeOut(1);
			if($(this).index()==1){
				publicItemsUl.children('li:odd').children('img').attr("src","imgs/equipmovie02.jpg");
				publicItemsUl.children('li:even').children('img').attr("src","imgs/equipmovie01.jpg");
			}else if ($(this).index()==2) {	
				publicItemsUl.children('li:odd').children('img').attr("src","imgs/equipcomputer01.jpg");
				publicItemsUl.children('li:even').children('img').attr("src","imgs/equipcomputer02.jpg");
				
			}else{
				publicItemsUl.children('li:odd').children('img').attr("src","imgs/equiphot01.jpg");
				publicItemsUl.children('li:even').children('img').attr("src","imgs/equiphot02.jpg");
			}
			publicItemsUl.fadeIn(1);

		}
	})
	/*家电结束*/
	/*智能结束*/
	var intelligenceCategory=$("#intelligenceCategory");
	var publicItemsUl2=$("#publicItemsUl2");
	intelligenceCategory.on("mouseenter","a",function(){
		// console.log($(this).siblings('a').children('li').removeClass('active'));
		if(!$(this).children('li').hasClass('active')){
			$(this).children('li').addClass('active');
			$(this).siblings('a').children('li').removeClass('active');
			publicItemsUl2.fadeOut(1);
			if($(this).index()==1){
				publicItemsUl2.children('li:odd').children('img').attr("src","imgs/intelligenceOut01.jpg");
				publicItemsUl2.children('li:even').children('img').attr("src","imgs/intelligenceOut02.jpg");
			}else if ($(this).index()==2) {	
				publicItemsUl2.children('li:odd').children('img').attr("src","imgs/intelligencePlay01.jpg");
				publicItemsUl2.children('li:even').children('img').attr("src","imgs/intelligencePlay02.jpg");
				
			}else{
				publicItemsUl2.children('li:odd').children('img').attr("src","imgs/intelligenceHot01.jpg");
				publicItemsUl2.children('li:even').children('img').attr("src","imgs/intelligenceHot02.jpg");
			}
			publicItemsUl2.fadeIn(10);

		}
	})
	/*智能结束*/




	/*内容开始*/

	//小圆圈数量根据li ul>li数量来自动添加
	$.each($(".itemsUl"), function(index, val) {
		 var lis=$(this).children('li').length;
		 var that=$(this).parent("li");
		 for (var i = 0; i < lis; i++) {
		 	if(i==0){
		 		that.children('.page').append($("<span class='active'></span>"));
		 	}else{
		 		that.children('.page').append($("<span></span>"));
		 	}
		 	
		 }
	});
	//动画函数
	function animate4 (item,target) {
		// item.css(left,target);
		item.stop().animate({left: target}, 300);
	}
	//每个小圈的点击事件
	var liWidth=$(".contentUl").children('li').width();
	$.each($(".page1"), function(index, val) {
		 $(this).on("click",'span',function(){
		 	if(!$(this).hasClass('active')){
		 		$(this).parent().children("span").removeClass('active');
			 	$(this).addClass('active');
			 	var item=$(this).parent().parent().children('.itemsUl');
			 	var index=$(this).index();
			 	var target=-liWidth*index;
			 	animate4(item,target);
			 }
		 })
	});

	


	//上下页的点击事件
	$.each($(".pageNextPre"), function(index, val) {

		 $(this).on("click",'span',function(){
		 	var lis=$(this).parent(".pageNextPre").prev("ul").children('li').length;//子元素个数
			var activeSpan=$(this).parent('.pageNextPre').next(".page").children('span.active').index();
		 	var item=$(this).parent('.pageNextPre').prev("ul");//要移动的盒子
		 	var pages=$(this).parent('.pageNextPre').next(".page");
		 	if($(this).hasClass('pre')&&activeSpan>0){
			 	var target=-liWidth*(activeSpan-1);
			 	pages.children('span').removeClass('active');
			 	pages.children('span:eq('+(activeSpan-1)+')').addClass('active');
			 	animate4(item,target);
			 }else if($(this).hasClass('next')&&activeSpan<lis-1){
			 	var target=-liWidth*(activeSpan+1);
			 	pages.children('span').removeClass('active');
			 	pages.children('span:eq('+(activeSpan+1)+')').addClass('active');
			 	animate4(item,target);
			 }
		 })
	});



	/*内容结束*/
 });