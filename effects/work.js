 window.onload=function(){

	/*轮播图1开始*/
	var imgBox=document.getElementById("imgBox");
	var liOne=imgBox.children[0].children[0];//第一个li
	var ul=imgBox.children[0];
	var iniNum=imgBox.children[0].children.length;//初始图片个数

	// 将第一个图添加到ul最后面
	ul.appendChild(liOne.cloneNode(liOne));
	var lasNum=imgBox.children[0].children.length;

	//添加数字标签容器
	var divUl=document.createElement("div");
	var ol=document.createElement("ol");
	imgBox.appendChild(divUl);
	divUl.appendChild(ol);

	//添加数字标签
	for (var i = 0; i < iniNum; i++) {
		var li=document.createElement("li");
		if (i==0) {
			li.className="current";
		}
		li.innerHTML=i+1;
		ol.appendChild(li);
	}

	//定义变量
	var timer2=null;//数字循环定时器
	var autoNum=0;//标签数字
	var start=0,target=0,speed=10;

	//数字标签定时器
	timer2=setInterval(autoPlay, 2000);

	//播放函数
	function autoPlay(){
		//初始值  终点   步长
		start=ul.offsetLeft,target=-liOne.offsetWidth;
		autoNum++;
		autoNum=autoNum>=iniNum?0:autoNum;
		for (var i = 0; i < ol.children.length; i++) {
			ol.children[i].className='';
		}
		ol.children[autoNum].className="current";
		target=target*autoNum;
		animates(ul,start,target,speed);
	}
	
	
	//每个数字标签事件
	for (var i = 0; i < ol.children.length; i++) {
		ol.children[i].onmouseover=function(){
			clearInterval(timer2);
			for (var i = 0; i < ol.children.length; i++) {
				ol.children[i].className='';
			}
			// ol.children[autoNum].className="current";
			this.className="current";
			// start=(this.innerHTML)*liOne.offsetWidth;
			// target=(this.innerHTML-1)*liOne.offsetWidth;
			autoNum=this.innerHTML-1;
			start=ul.offsetLeft;
			target=-(this.innerHTML-1)*liOne.offsetWidth;
			// console.log('start:'+start+'--target:'+target)
			animates(ul,start,target,speed);
		}
	}

	//ul图片大盒子鼠标事件
	ul.onmouseover=function(){
			clearInterval(timer2);
	}
	ul.onmouseout=function(){
		start=ul.offsetLeft;
		target=ul.offsetLeft-liOne.offsetWidth;
		timer2=setInterval(autoPlay, 2000);
		// animates(ul,start,target,speed);
	}

	//动画函数
	function animates(item,start,target,speed){
		// console.log('start'+start+'target'+target);
		clearInterval(item.timer);
		item.timer=setInterval(function(){
			// console.log('start'+start+'target'+target);
			start=Math.floor(start+(target-start)/speed);
			target=target<=-liOne.offsetWidth*iniNum?0:target;
			start=start<=target?target:start;
			if(start==target){
				clearInterval(item.timer);
			}
			item.style["left"]=start+'px';
		}, speed*3);
		
	}

	/*轮播图结束*/

	/*3D轮播图开始*/
	// 参数定义
	var arr=["800-600-01.jpg","800-600-02.jpg","800-600-03.jpg","800-600-04.jpg","800-600-05.jpg",]//图片名称数组
	var imgBox2=document.getElementById("imgBox2");//大盒子
	//位置数组
	var position=[
				{
					top:20,
					left:20,
					width:200,
					height:200,
					zIndex:2
				},
				{
					top:120,
					left:80,
					width:250,
					height:250,
					zIndex:3
				},
				{
					top:250,
					left:250,
					width:300,
					height:300,
					zIndex:200
				},
				{
					top:120,
					left:470,
					width:250,
					height:250,
					zIndex:3
				},
				{
					top:20,
					left:580,
					width:200,
					height:200,
					zIndex:2
				}];
	//定时器
	var timer3d=null;

	//定义图片类
	function Img(box,position,arr){
		this.box=box;
		this.arr=arr;
		this.imgs=this.box.getElementsByTagName("img");
	}


	//初始化属性 添加图片
	Img.prototype.ini2 = function(){
		for (var i = 0; i < this.arr.length; i++) {
			// console.log(i);
			this.img=document.createElement("img");
			this.img.setAttribute("src", "imgs/"+this.arr[i]);
			this.box.appendChild(this.img);
		}	
	};
	
	//滚动图片效果
	Img.prototype.move = function(position){
		for (var i = 0; i < this.imgs.length; i++) {
			animate(this.imgs[i],position[i], 10);
		}
	};

	//初始化
	var Img=new Img(imgBox2,position,arr);
	Img.ini2();
	Img.move(position);

	// 上下面显示显示隐藏
	var spans=imgBox2.getElementsByTagName("span");
	imgBox2.onmouseover=function(){
		for (var i = 0; i < spans.length; i++) {
			spans[i].style.display="block";
			clearInterval(timer3d);
		}
	}
	imgBox2.onmouseout=function(){
		for (var i = 0; i < spans.length; i++) {
			spans[i].style.display="none";
		}
		timer3d=setInterval(threedPlay, 2000);
	}

	//位置数组处理
	for (var i = 0; i < spans.length; i++) {
		if(i==0){
			spans[i].onclick=function(){
				position.unshift(position.pop(position[0]));
				
				 Img.move(position);
				console.log(position)
			}
		}else if(i==1){
			spans[i].onclick=function(){
				position.push(position.shift(position[0]));
				Img.move(position);
			}
		}else{
			console.log('只有二个span,查检下哪里出错了');
		}
		
	}
	
	//定时器定时播放
	timer3d=setInterval(threedPlay, 2000);
	function threedPlay(){
		position.unshift(position.pop(position[0]));
		Img.move(position);
	}
	// // 3D轮播图结束



	/*贪吃蛇部分开始*/
	var snakeDiv=document.getElementById("snake");
	var iniBody=[[5,10,"red",null],[5,9,"yellow",null],[5,8,"yellow",null]];
	//蛇类
	function  Snake(parDiv){
		// 盒子参数
		this.parDiv=parDiv;
		this.width=800;
		this.height=600;
		this.background="#d2e8f3";
		this.position="relative";
		this.border="1px solid #eee";
		this.div=null;


		//蛇格子参数
		this.snakeWidth=20;
		this.snakeHeight=20;
		this.snakePosition="absolute";
	}
	//背景图方法
	Snake.prototype.map=function(){
			this.div=document.createElement("div");
			this.div.style.width=this.width+'px';
			this.div.style.height=this.height+'px'
			this.div.style.background=this.background;
			this.div.style.position=this.position;
			this.div.style.border=this.border;
			this.parDiv.appendChild(this.div);
	}

	//生成蛇
	Snake.prototype.show = function(iniBody){
		for (var i = 0; i < iniBody.length; i++) {
			// console.log(iniBody[i][0]);
			if(iniBody[i][3]==null){
				iniBody[i][3]=document.createElement("div");
				iniBody[i][3].style.width=this.snakeWidth+'px';
				iniBody[i][3].style.height=this.snakeHeight+'px';
				iniBody[i][3].style.position=this.snakePosition;
				iniBody[i][3].style.background=iniBody[i][2];
				this.div.appendChild(iniBody[i][3]);
			}
			iniBody[i][3].style.top=iniBody[i][0]*this.snakeHeight+'px';
			iniBody[i][3].style.left=iniBody[i][1]*this.snakeWidth+'px';
		}
	};

	//食物生成及位置移动 
	Snake.prototype.foodShow=function(){
		this.foodWidth=20;
		this.foodHeight=20;
		this.foodPosition="absolute";
		this.background="blue";
		// this.food=null;
		if (this.food==null) {
			this.food=document.createElement("div");
			this.food.style.width=this.foodWidth+'px';
			this.food.style.height=this.foodHeight+'px';
			this.food.style.position=this.foodPosition;
			this.food.style.background=this.background;
			// console.log(this.food);
			this.div.appendChild(this.food);
		}
		this.food.style.left=Math.floor(Math.random()*this.div.offsetWidth/this.snakeWidth)*this.snakeWidth+'px';
		this.food.style.top=Math.floor(Math.random()*this.div.offsetHeight/this.snakeHeight)*this.snakeHeight+'px';
	}
	//蛇移动
	Snake.prototype.move=function(key){
		// console.log(key);
		// console.log(iniBody);
		for (var i = iniBody.length-1; i>0; i--) {
			iniBody[i][0]=iniBody[i-1][0];
			iniBody[i][1]=iniBody[i-1][1];
			// iniBody[i][2]=iniBody[i-1][2];
		}
		key=lastKey;
		switch (key) {
			case 38:
				iniBody[0][0]=iniBody[0][0]-1;
				break;
			case 40:
				iniBody[0][0]=iniBody[0][0]+1;
				break;
			case 37:
				iniBody[0][1]=iniBody[0][1]-1;
				break;
			case 39:
				iniBody[0][1]=iniBody[0][1]+1;
				break;
			case 32:
				// snake.move(lastKey);
				break;
			default:
				iniBody[0][1]=iniBody[0][1]+1;
				break;
		}
		//吃到自己
		for (var j =1 ; j < iniBody.length; j++) {
			// console.log(iniBody[j]);
			if(iniBody[0][3].offsetLeft==iniBody[j][3].offsetLeft && iniBody[0][3].offsetTop==iniBody[j][3].offsetTop){
				clearInterval(snakeTimer);
				alert("结束了，获得了"+score+'分');
				return;
				console.log(iniBody[0][3].offsetLeft+'--'+iniBody[j][3].offsetLeft);
			}
		}
		
		//撞墙
		// console.log(iniBody[0][3].offsetLeft+'ddd'+(this.div.offsetLeft+this.div.offsetWidth));
		if(iniBody[0][3].offsetLeft<this.div.offsetLeft||iniBody[0][3].offsetLeft>=(this.div.offsetLeft+this.div.offsetWidth-2)
			||iniBody[0][3].offsetTop<this.div.offsetTop||iniBody[0][3].offsetTop>=(this.div.offsetTop+this.div.offsetHeight-2)){
			// console.log("出墙了");
			clearInterval(snakeTimer);
			alert("结束了，获得了"+score+'分');
			return;
		}

		//吃到食物
		if(iniBody[0][3].offsetLeft==this.food.offsetLeft&&iniBody[0][3].offsetTop==this.food.offsetTop){
			score++;

			speedSnake=speeds(score);
			// console.log('现在的分数是'+score+'现在的速度是'+speed);
			this.foodShow();
			iniBody.push([iniBody[iniBody.length-1][0],iniBody[iniBody.length-1][1],"yellow",null]);
		}

		
		
		this.show(iniBody);
	}

	// 实例化
	var snake=new Snake(snakeDiv);
	snake.map();
	snake.show(iniBody);
	snake.foodShow();

	var keyIni=39;//初始方向
	var snakeTimer=null;//定时器
	var flag=0;//暂停
	var score=0;//分数
	var lastKey=39;//空格键使用上一次使用的键值
	function speeds(score){
		if(score>=1&&score<2){
			speedSnake=200;
		}else if (score<3&&score>=2) {
			speedSnake=150;
		}else if (score<5&&score>=3) {
			speedSnake=100;
		}else if (score>=7) {
			speedSnake=50;
		}else if(score<=1){
			speedSnake=250;
		}
		return speedSnake;
	}

	var speedSnake=speeds(score);//速度
	//初始化定时器
	function autoPlayTimer(flag){
		if(flag){
			snakeTimer=setInterval(
						function(){
								snake.move(keyIni);
								// console.log("现在的速度是"+speed);/
						}, speedSnake);
		}else{
			clearInterval(snakeTimer);
		}
		
	}
	autoPlayTimer(flag);

	
	//鼠标事件
	window.onkeyup=function(e){
		var event=e||window.e;
		keyIni=event.keyCode;//上下左右空格分别是38 40 37 39 32
		clearInterval(snakeTimer);
		if(keyIni==32){
			flag=flag==1?0:1;
		}else if (keyIni==38||keyIni==40||keyIni==39||keyIni==37) {
			lastKey=keyIni;
			flag=1;
		}
		// autoPlayTimer(flag);
		autoPlayTimer(0);
		
	}
	/*贪吃蛇部分结束*/





	/*打气球开始*/
	//原生JS完成
	var balloonBox=document.getElementById("balloonBox");
	var balloonBoxW=balloonBox.offsetWidth;//盒子宽度
	var balloonBoxH=balloonBox.offsetHeight;
	var balloonW=132;//球形高度，不是变通width大小，因为有旋转
	var balloonNum=7;//生成气球的个数
	var balloons=[];//球保存的数组
	var top=balloonBoxH-balloonW;//气球默认高度值
	init();
	//初始化函数
	function  init(){
		var frageElement=document.createDocumentFragment();
		//使用framement代码片段，不用在for循环里每次用document.body每次回流渲染，损耗性能
		for (var i = 0; i < balloonNum; i++) {
			var balloon=document.createElement("div");
			var handle=document.createElement("div");
			balloon.className="balloon";
			var left=Math.floor(Math.random()*(balloonBoxW-balloonW));
			left=Math.max(0,left);
			balloon.style.top=top+'px';
			balloon.speed=Math.ceil(Math.random()*6);//给每个气球对象生成 的时候绑定一个速度，后面可以匀速移动
			balloon.style.left=left+'px';
			handle.className="handle";
			balloon.appendChild(handle);
			balloons.push(balloon);
			frageElement.appendChild(balloon);
		}
		balloonBox.appendChild(frageElement);
	}
	//移动
	function move(){
		for (var i = 0; i < balloons.length; i++) {
			var tmpTop=balloons[i].offsetTop-balloons[i].speed;
			// var tmpLeft=balloons[i].offsetLeft-balloons[i].speed;
			// balloons[i].style.top=balloons[i].offsetTop-balloons[i].speed+'px';
/*			balloons[i].style.top=(tmpTop<0?top:tmpTop)+'px';//上升到顶部重新回到起点
			var left=Math.floor(Math.random()*(balloonBoxW-balloonW));
			left=Math.max(0,left);
			balloons[i].style.left=(tmpTop<0?left:balloons[i].offsetLeft)+'px';*/
			if (tmpTop<0) {
				balloons[i].style.top=top+'px';
				var left=Math.floor(Math.random()*(balloonBoxW-balloonW));
				left=Math.max(0,left);//取二个值中的大值
				balloons[i].style.left=left+'px';
			}else{
				balloons[i].style.top=tmpTop+'px';
			}
		}
	}
	// move();//移动一次，用下面定时器来循环移动，速度是之前生成目标时绑定的属性，固定
	var balloontimer;//定时器
	balloontimer=setInterval(move,30);
	

	//点击事件
	var timeStart;//消耗时间变量
	if(balloonBox.attachEvent){//ie8以下
		console.log('1118以下');
		balloonBox.attachEvent("onclick",balloonBoxClickFunction,false);
	}else{
		console.log('1119');
		balloonBox.addEventListener("onclick",balloonBoxClickFunction,false)
	}
	function balloonBoxClickFunction(){
		if(!timeStart){
			timeStart=new Date().getTime();//取时间戳
		}
		var target=e.target;
		if(target.className.toLowerCase()==="balloon"){
			target.speed++;
			target.speed=target.speed>10?10:target.speed;
			var randomNum=Math.ceil(Math.random()*10);
			randomNum=randomNum<2?2:randomNum;
			target.style.width=target.offsetWidth-randomNum+'px';
			target.style.height=target.offsetHeight-randomNum+'px';
			if (target.offsetHeight<=balloonW/3*2) {//变为 原来大小三分之二时
				target.parentNode.removeChild(target);//移除自己，只能通过找到父亲，再用父亲来删除
				//balloons.splice(balloon.lastIndexOf(target, position?: int),1)
				balloons.splice(balloons.lastIndexOf(target),1);//splice(起始位置,删除个数)
				//lastIndexOf(参数)找到参数最后一次出现的位置，效率好点吧？

			}
			//因为有定时器，这里不能直接alert,要延时时间大于定时器时间才行吧
			setTimeout(function(){
				if(balloons.length<=0){
					var timeEnd=new Date().getTime();
					var timeSpend=((timeEnd-timeStart)/1000).toFixed(1);// /1000是取得毫秒数，还有多位小数，foFixed(1)最一位小数
					alert("恭喜你，你打完了所有的气球,花费了"+timeSpend+"秒");
				}
			},100);
		}

	}
		



	/*打气球结束*/






	/*楼层导航和去顶部开始*/

	//楼层
	var floorItem=$(".w");
	var floorNav=$("<div class='floorNav'></div>");
	var floorUl=$("<ul class='floorUl'></ul>");
	//根据各块h2把h2内容填充到li里
	$(".main").append(floorNav);
	floorNav.append(floorUl);
	$.each(floorItem, function(index, val) {
		var floorText=$(floorItem[index]).children("h2:first-child").text();

		floorText=floorText.length>10?floorText.substr(0,10)+'...':floorText;
		// console.log(floorText);
		var li=$("<li></li>");
		if(index==0){
			li.addClass('current');
		}
		li.html(floorText);
		floorUl.append(li);
	});
	//添加楼层导航tips小说明
	var spanTips=$("<span>楼层导航</span>");
	floorNav.append(spanTips);

	//楼层点击操作
	$("ul.floorUl").on("click","li",function(e){
		$(this).addClass('current');//给当前元素加current
		$(this).siblings('li').removeClass('current');//给兄弟元素去除current
		var liIndex=$(this).index();
		var offsetTop=$(".w:nth-child("+(liIndex+1)+")").offset().top;

		//$(window).scrollTop(offsetTop);  //这种方法直接跳转不能使用下面的方法动画
		$("html,body").animate({scrollTop:offsetTop}, 300);
	})

	//top部分
	$(".main").append($("<div class='toTop'><img src='imgs/toTop.png'></img></div>"));
	//根据scrolltop的值来显示或者隐藏totop
	$(window).on("scroll",function(){
		if ($(this).scrollTop()>200) {
			$(".toTop").addClass('show');
		}else{
			$(".toTop").removeClass('show');
		}
	})
	$(".toTop").on("click",function(){
		$(window).scrollTop(0);
	})
	/*楼层导航和去顶部结束*/

	/*	重复弹窗广告开始*/
	$(".main").append($("<div class='adds' id='adds'></div>"));
	$(".adds").append($("<span class='one' title='关闭一次'></span><span class='all' title='永久关闭'></span>"));

	var addFlag;//广告显示标记
	var addDiv=document.getElementById("adds");
	setTimeout(function(){
				addDiv.style.display="block";
			}, 1000)
	$(".adds .one").on("click",function(){
		addDiv.style.display="none";
		addFlag=false;
		if(addFlag==false){
			setTimeout(function(){
				addDiv.style.display='block';
			},3000);
		}
	});
	$(".adds .all").on("click",function(){
		console.log('all');
		addDiv.style.display="none";
	})
	/*	重复弹窗广告结束*/


	/* 动态加载图片开始 */
	var photoId=$("#photo");
	var photoNum=3;//暂时关闭，默认为5

	//添加图片元素
	for (var i = 0; i < photoNum; i++) {
		photoItem=$("<div><img src1='imgs/800-600-0"+(i+1)+".jpg'></div>");
		photoId.append(photoItem);
	};

	var imgDiv=$("#photo>div");
	var windowHeight=$(window).height();
	$(window).on("scroll",function(e){
		// console.log(photoId.height());
		for(var i=0 ; i<imgDiv.length;i++){
			var dataItem=$(imgDiv[i]);
			var scrollTop=$(this).scrollTop();
			var itemTop=dataItem.offset().top;
			if(itemTop-windowHeight<=scrollTop){
				// console.log('大于啦'+itemTop+','+scrollTop);
				var src1=dataItem.children("img").attr("src1");
				dataItem.children("img").css("height","600px");
				dataItem.children("img").attr("src",src1);
			}

		}
	})
	/* 动态加载图片结束 */

	/*放大镜效果开始*/
	var zoomBox=$("#zoom");//大盒子
	var smallPhotoLocation="imgs/photosmall.jpg";//小图地址
	var bigPhotoLocation="imgs/photobig.jpg";//大图地址
	//添加元素
	var smallPhoto=$("<div class='small'><img src='"+smallPhotoLocation+"'></img><div class='section'></div></div>");
	var bigPhoto=$("<div class='big'><img src='"+bigPhotoLocation+"'></img></div>");
	zoomBox.append(smallPhoto).append(bigPhoto);

	var sectionWidth=$(".section").width();
	var smallWidth=$(".small").width();
	var bigWidth=$(".big").width();
	var imgWidth=$(".big img").width();
	var rat=imgWidth/smallWidth;//大图与小图的比例
	// 鼠标在小图区域移动 时 不注释会有闪的现象，看看怎么处理
	/*	$(".small").on("mouseover",function(e){
		// console.log('进入小图区域');
		$(".section").css('display', 'block');
		$(".big").css('display', 'block');
	});*/
	//鼠标离开时要隐藏section和大图区域
	$(".small").on("mouseout",function(){
		// console.log('离开小图区域');
		$(".section").css('display', 'none');
		$(".big").css('display', 'none');
	})
	//鼠标在小图区域内移动时
	$(".small").on("mousemove",function(e){
		var left=e.offsetX,top=e.offsetY;
		//鼠标区域在边界到区域框二分之一之间处理
		if(left>=0&&left<=sectionWidth/2){
			left=sectionWidth/2;
		}else if(left>=(smallWidth-sectionWidth/2)&&left<=smallWidth){
			left=smallWidth-sectionWidth/2;
		}
		if(top>=0&&top<=sectionWidth/2){
			top=sectionWidth/2;
		}else if(top>=(smallWidth-sectionWidth/2)&&top<=smallWidth){
			top=smallWidth-sectionWidth/2;
		}
		//显示元素，本来应该用上面的mouseover的，可是会闪
		$(".section").css('display', 'block');
		$(".big").css('display', 'block');
		//放大镜位置
		$(".section").css({
			left: left-sectionWidth/2+'px',
			top: top-sectionWidth/2+'px'
		});
		//预览图位置，与鼠标移动的反方向并且还要加大盒子的一半
		var left1=-left*rat+bigWidth/2;
		left1=left1<(-imgWidth)?(-imgWidth):left1;
		var top1=-top*rat+bigWidth/2;
		top1=top1<(-imgWidth)?(-imgWidth):top1;
		// console.log(left1+'left1');
		$(".big img").css({
			left: left1+'px',
			top: top1+'px'
		});
	});
	/*放大镜效果结束*/



	 /*商品布局开始*/
	 var layoutBox=$("#layoutBox");
	 var lis=layoutBox.find("li");
	 // console.log(lis);
	 lis.each(function(){
	 	// console.log(this);
	 	$(this).on("mouseover",function(){
	 		$(this).find("img").stop().animate({left:"-20px"},500);
	 	})
	 	$(this).on("mouseout",function(){
	 		$(this).find("img").stop().animate({left:"0px"},500);
	 	})
	 	
	 })
	/*商品布局结束*/	

/*3D动画 开始*/

//纯css效果，js代码部分暂时为空	



/*3D动画 结束*/



/*ajax异步请求 开始*/
	// 获取菜单
	var menu=$("#menuBox");
	$.ajax({
		url: 'menu.php',
		type: 'get',
		dataType: 'json',
		data: {menu: 'menu1'},
		success:function(data){
			var str='<ul>'
			for (var i in data) {
				str+="<li>"+i+"<span><i>◇</i></span><ul>";
				for (var j in data[i]) {
					str+="<li>"+j+"<e><m>◇</m></e><ul>";
					for (var k in data[i][j]) {
						str+="<li class='itemMenu'>"+data[i][j][k]+"</li>";
					}
					str+="</ul></li>";
				}
				str+="</ul></li>";
			}
			str+='</ul>';
			menu.append($(str));
		},
		error:function(e){
			console.log("获取菜单信息出错啦");
		}
	});

	//菜单操作选择文章 
	var page=1;
	var articles=$("#articles");
	var menuItem="三级菜单111";
	var itemDes=null;
	var datas=[];
	menu.on("click",'.itemMenu',function(){
		menuItem=$(this).text();
		page=1;
		getArticles(menuItem,page,itemDes);
		// console.log(menuItem);
	});
	//初始化
	getArticles(menuItem,page,itemDes);
	
	//函数文章函数，目录项和page参数
	function getArticles(menuItem,page,itemDes){
		// console.log(datas);
		// 标记，0代表没有缓存数据，1是有缓存数据
		var flag=0;
		for (var i = 0; i < datas.length; i++) {
			if(datas[i].menuItem==menuItem&&datas[i].page==page){
				showArticles(datas[i],menuItem,page);//有缓存数据的时候直接调用缓存
				flag=1;
			}
			// return;
		}
		//没有缓存数据就发起ajax请求
		if(flag==0){
			$.ajax({
				url:"articles.php",
				type:"get",
				dataType:"json",
				data:{
					menuItem:menuItem,
					page:page,
					itemDes:itemDes
				},
				success:function(data){
					// 保存数据到缓存数组里，同样要保存这些标识
					data.menuItem=menuItem;
					data.page=page;
					datas.push(data);

	/*				for(var i in data){
						var h2=$("<h2 class='titleArt'>"+i+"</h2>");
						articles.append(h2);
					}*/
					showArticles(data,menuItem,page);
				},
				error:function(e){
					articles.html($("<h2>此目录下数据为空或者请求数据失败</h2>"));
				}
			})
		}
		
	}

	// 显示文章标题  传入参数分别是  文章数据  菜单标识 页数标记
	function showArticles(data,menuItem,page){
		//先清空原来的数据
		articles.html("");
		for(var i in data){
			//缓存数据的标识部分不需要输出
			if(data[i]==menuItem||[i]==page){
				return;
			}
			var h2=$("<h2 class='titleArt'>"+i+"</h2>");
			articles.append(h2);
		}
	}

	//上下页
	var pre=$(".pre");
	var next=$(".next");
	pre.on("click",function(){
		page-=1;
		page=page<1?1:page;
		getArticles(menuItem,page,itemDes);
	});
	next.on("click",function(){
		page+=1;
		//这里有个BUG，就是总共有多少页上限不能判断，比如说共3页，
		//这里点一下加1加到6了，后面点到第三页，要点4下，因为服务器的页数3传不过来
		page=page>3?3:page;
		getArticles(menuItem,page,itemDes);
	})

	//点击标题出来详情操作
	$("#articles").on("click","h2.titleArt",function(){
		var that=$(this);
		var title=$(this).text();

		//隐藏兄弟元素h2的子元素p
		var brother=$(this).siblings('h2');
		for (var i = 0; i < brother.length; i++) {
			$(brother[i]).children('p').addClass('notactive');
		}

		//当前点击元素的p元素操作
		var p=$(this).children("p");
		if(p.length>0){
			if(p.toggleClass('notactive'));
		}else{
			$.ajax({
			url: 'articles.php',
			type: 'get',
			dataType:"html",
			data: {itemDes: title,
					menuItem:menuItem,
					page:page
			},
			success:function(data){
				// console.log(eval("("+data+")"));
				var p=$("<p class='artDetails'></p>");
				that.append(p);
				p.html(data);
			},
			error:function(e){
				// console.log('获取文章详情失败');
				console.log(e.responseText);
			}
			})
		}
	})
/*ajax异步请求结束 结束*/


/*jsonp跨域异步请求数据开始*/
   var team=$("#selectTeam");
   var city=$("#city");
   var search=$("#search");
   var message=$("#message");

   // console.log(team.val()+","+city.attr('id')+","+search.attr('id'));
   
   //查询天气
   search.on("click",function(){
   		var text=city.val();
   		if(text==""){
   			return;
   		}
   		//这个接口使用有问题，数据有反应，但一直报错，下面篮球的就不会，要考虑换其他接口看看
/*   		$.ajax({
   			url: 'http://www.sojson.com/open/api/weather/json.shtml?city='+text,
   			type: 'get',
   			dataType: 'jsonp',
   			// data: {city: text},
   			callback:'callback2',
   			success:function(data){
   				console.log('请求成功');
   			},
   			error:function(e){
   				 // console.log(e.res);
   				 console.log('错误了');
   			}
   		});*/
   	});

   var flag_team;//缓存标记
   var teamInfo=[];//缓存数组
   // 选择球队
    team.on("change",function(){
    	flag_team=0;
   		var teamId=$(this).val();
   		for (var i = 0; i < teamInfo.length; i++) {
			if(teamInfo[i].id==teamId){
				console.log(teamInfo[i]+'输出了缓存');
				showInfo(teamInfo[i]);
				flag_team=1;//有缓存的时候
			}
				
	   	}
	   	//无缓存的时候
	   	if(flag_team==0){
	   		getTeamInfo(teamId);
	   	}
   	});
   	//初始化
    getTeamInfo(1);

    //获取球队信息
   	function getTeamInfo(teamId){
	  		$.ajax({
	   			url: 'http://v.juhe.cn/nba/team_info_byId.php?key=9569e2f3d6dbd1447a9c9970651a2ca8&team_id='+teamId,
	   			type: 'get',
	   			dataType: 'jsonp',
	   			// data: {city: text},
	   			callback:'callback2',
	   			success:function(data){

	   				//如果错误代码112即次数不足，就调用本地数据
	   				if(data.resultcode=="112"){
	   					// alert(data.reason);
	   					$.ajax({
	   						url: 'nbateam.json',
	   						type: 'get',
	   						dataType:'json',
	   						success:function(data){
								// console.log('本地数据请求成功');
								// console.log(data.result);
								// showInfo(data)
								for (var i in data.result) {
									if(i==teamId){
										var res=data.result[i];
										//根据id缓存数据
										res.id=teamId;
										teamInfo.push(res);
										showInfo(res);
									}
								}
	   						},
	   						error:function(e){
	   							console.log('本地数据请求失败');
	   							// console.log(e.responseText);
	   						}
	   						
	   					})
	   					return;
	   				}else{
	   					var res=data.result;
		   				res.id=teamId;
		   				teamInfo.push(res);
		   				showInfo(res);
	   				}
	   				
	   			},
	   			error:function(e){
	   				 // console.log(e.res);
	   				 console.log('错误了');
	   			}
	   		});
	 }
	 function showInfo(res){
	 	//清空原数据
	 	message.html("");
		for (var i in res) {
			//场馆信息
			if(i=="stadiumsInfo"){
				for (var k in res[i][0]) {
					var p=$("<p></p>");
					var pinside=$("<p class='pinside'></p>");
					pinside.html(k+":"+res[i][0][k]);
					p.append(pinside);
					message.append(p);
				}
			}else if(i=="playersInfo"){//球员信息有太多，如果需要应该单独处理
				// return;
				// console.log(i)
			}else{
				var itemT=$("<label class='title'></label>");
				var itemSpace=$("<label class='space'>:</label>");
				var itemD
				if(i=="logo_link"){
					itemD=$("<img></img>");
					itemD.attr('src', res[i]);
				}else if(i=="players"){
					return;
				}else{
					itemD=$("<label class='des'></label>");
					itemD.text(res[i]);
				}
					itemT.text(i);
					var p=$("<p></p>");
					p.append(itemT).append(itemSpace).append(itemD);
					if(i=="name"||i=="full_name"||i=="eng_name"){
						message.prepend(p);
					}else{
						message.append(p);
					}
				
				
			}
		}
	 }


/*jsonp跨域异步请求数据结束*/autoInfoInput


/*输入文字提示选项异步加载开始*/
	var autoInfoInput=$("#autoInfoInput");
	var autoInfoList=$("#autoInfoList");
	var autoInfoMessage=$("#autoInfoMessage");
	var autoInfoSearch=$("#autoInfoSearch");
	var inputBox=$("#inputBox");
	var inputValue;//输入框文字
	// 鼠标输入文字松起时操作
	autoInfoInput.on("keyup click",function(){
		inputValue=autoInfoInput.val();
		$.ajax({
			url: 'keywords.php',
			type: 'get',
			dataType: 'json',
			data: {input:inputValue },
			success:function(data){
				if(data.length>0){
					autoInfoList.html("");
					autoInfoList.css('display', 'block');
					// console.log(data.length);
					for (var i in data) {
						var h3Item=$("<h3></h3>");
						h3Item.html(data[i][0]);
						autoInfoList.append(h3Item);
					}
				}else{
					autoInfoList.css('display', 'none');
				}
			},
			error:function(e){
				console.log('获得关键字失败了');
			}
		})	
	});
	//点击提示选项时
	autoInfoList.on('click','h3',function(){
		autoInfoInput.html("");
		var selectValue=$(this).text();
		autoInfoInput.val(selectValue);
		searchInfo(selectValue);
	});
	$("body").on('click' , function(event) {
		autoInfoList.css('display', 'none');
	});
	//点击百度一下
	autoInfoSearch.on("click",function(){
		inputValue=autoInfoInput.val();
		searchInfo(inputValue);
		
	})
	//函数，查询，比如点击提示选项或者搜索一下
	function searchInfo(inputValue){
		$.ajax({
			url: 'keywords.php',
			type: 'get',
			dataType: 'json',
			data: {input:inputValue },
			success:function(data){
				autoInfoMessage.html("");
				if(data.length>0){
					for (var i in data) {
						var pItem=$("<p></p>");
						var h2Item=$("<h2></h2>");
						pItem.html(data[i][1]);
						h2Item.html(data[i][0]);
						autoInfoMessage.append(h2Item);
						autoInfoMessage.append(pItem);
					}
				
					
				}else{
					var h2Item=$("<h2></h2>");
					h2Item.text('你查询的数据没有结果，请重试');
					autoInfoMessage.append(h2Item);
				}
			},
			error:function(e){
				console.log('百度一下查询关键字失败了');
			}
		});
	}

/*输入文字提示选项异步加载结束*/

/*拖拽切换效开始*/
	function dragFun(){
		var liWidth=245;
		var liHeight=180;
		var distance=15;
		//暂时定的是3*3 9个格
		var num=9;
		var line=3;
		var frageElement=document.createDocumentFragment("frageElement");
		var ul=document.getElementById("ul");
		var dragBox=document.getElementById("dragBox");
		var dragBoxLeft=dragBox.offsetLeft;//
		var dragBoxTop=dragBox.offsetTop;//大盒子距离上层盒子距离，0 0 父盒子是相对定位 
		var dragBoxWidth=dragBox.offsetWidth;//大盒子宽和高
		var dragBoxHeight=dragBox.offsetHeight;
		var zIndex=0;//默认层级 

		//生成图片并定位
		for (var i = 0; i < num; i++) {
			var li=document.createElement("li");
			var img=document.createElement("img");
			img.setAttribute("src","imgs/drag0"+(i+1)+'.png');

			//根据行列求left top值
			var liLine=Math.floor(i/line);//取得第几行
			var liNum=i%line;//取得第几列
			var left=(liNum+1)*distance+liNum*liWidth;
			var top=(liLine+1)*distance+liLine*liHeight;
			li.style.left=left+'px';
			li.style.top=top+'px';

			li.appendChild(img);
			frageElement.appendChild(li);
		}
		ul.appendChild(frageElement);

		var lis=ul.getElementsByTagName("li");
		var flag;//是否碰撞到对象
		var now;//当前拖拽对象
		var target;//碰撞的目标对象
		var iniLeft,iniTop;//拖拽元素li初始left top值
		//绑定拖拽事件
		for (var i = 0; i < lis.length; i++) {
			lis[i].onmousedown=function(event){
				var mDrag=true;
				var event=event||window.event;
				if (event.preventDefault) {
					event.preventDefault();
				}else{
					event.returnValue = false;
				}
				now=this;//当前拖动对象
				// 取得当前拖动对象的left top值
				var targetLi=event.target.parentNode||event.srcElement.parentNode;//target是img,要取li
				iniLeft=targetLi.offsetLeft;//当前li对象距离盒子左上距离
				iniTop=targetLi.offsetTop;
				var mLeft=event.pageX;//鼠标起始坐标，距离body顶部左上距离
				var mTop=event.pageY;
				zIndex++;
				now.style.zIndex=zIndex;
				this.style.border="1px solid orange";
				flag=false;
				document.onmousemove=function(event){
					var event=event||window.event;
					var mMovLeft=event.pageX;//移动时距body顶部区域左上距离
					var mMovTop=event.pageY;
					var liNowLeft=mMovLeft-mLeft+iniLeft;//li拖拽元素坐标
					var liNowTop=mMovTop-mTop+iniTop;
					//边界判断
					var liLeftMax=dragBoxWidth-liWidth;//最大宽度
					var liTopMax=dragBoxHeight-liHeight;
					liNowLeft=liNowLeft<0?0:liNowLeft;
					liNowLeft=liNowLeft>liLeftMax?liLeftMax:liNowLeft;
					liNowTop=liNowTop<0?0:liNowTop;
					liNowTop=liNowTop>liTopMax?liTopMax:liNowTop;

					now.style.left=liNowLeft+'px';//li元素拖拽实时位置
					now.style.top=liNowTop+'px';
					var mToLiLeft=event.offsetX;//鼠标距离li边框的距离 
					var mToLiTop=event.offsetY;
					var mNowLeft=liNowLeft+mToLiLeft;//鼠标离box的距离是li到BOX距离+X加li距离
					var mNowTop=liNowTop+mToLiTop;

					for (var j = 0; j < lis.length; j++) {
						var otherLiLeft=lis[j].offsetLeft;
						var otherLiTop=lis[j].offsetTop;
						//碰撞判断
						if(mNowLeft>otherLiLeft && mNowLeft<otherLiLeft+liWidth
							&&mNowTop>otherLiTop&&mNowTop<otherLiTop+liHeight&& lis[j]!=now
							){
							target=j;
							flag=true;
							lis[j].style.boxShadow="0 0 15px #333";
						}else{
							lis[j].style.boxShadow="";
						}
					}
					


				}
					//松开鼠标
				document.onmouseup=function(){
					document.onmousemove=null;
					if(!(flag)&&now){//没有碰撞对象
						now.style.left=iniLeft+'px';
						now.style.top=iniTop+'px';
						now.style.border="";
					}else if(flag &&now){//有碰撞对象
						now.style.left=lis[target].offsetLeft+'px';
						now.style.top=lis[target].offsetTop+'px';
						lis[target].style.left=iniLeft+'px';

						lis[target].style.top=iniTop+'px';
						lis[target].style.boxShadow='';
						now.style.border="";
						now=null;
						flag=false;
					}
				}
				

			};
		
		}

	};
	dragFun();
/*拖拽切换效结束*/
(function(){
	var a=function(){
		var aaa="ccc";
		console.log(aaa);
		return {str:aaa}
	}()
	console.log(a)
})()










//jq结束标记，不要跑到外面去了
 };