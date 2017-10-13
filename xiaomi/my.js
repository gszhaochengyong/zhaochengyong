//获取id
function $id(id){
	return document.getElementById(id);
}
//显示
function show(item){
	item.style.display="block";
}
//隐藏
function hide(item){
	item.style.display="none";
}
//设置背景色
function bgc(item,color){
	item.style.backgroundColor=color;
}
//获取滚轴左边和上面滚动的数值
function scroll() {
		if (window.pageYOffset !=null) {
			return {
				left:window.pageXOffset,
				top:window.pageYOffset
			}
		} else if(document.compatMode=="CSS1Compat"){//声明了doctype的非怪异模式html文档
			return {
				left:document.documentElement.scrollLeft,
				top:document.documentElement.scrollTop
			}
		}
		//没有声明doctype的怪异模式html文档
		return {
			left:document.body.scrollLeft,
			top:document.body.scrollTop
		}
	}
//获取屏幕可视区域高和长函数
function client(){
	if (window.innerWidth !=null) {
		return{
			width:window.innerWidth,
			height:window.innerHeight
		}
	} else if(document.compatMode=="CSS1Compat"){
		return{
			width:document.documentElement.innerWidth,
			height:document.documentElement.innerHeight
		}
	}
	return{
		width:document.body.innerWidth,
		height:document.body.innerHeight
	}
}
//阻止冒泡
  function stopPop(event){
/*  	if (event&&event.stopPropagation) {
  		event.stopPropagation();
  	} else {
  		event.cancelBubble=true;
  	}*/
  		event.stopPropagation?event.stopPropagation():event.cancelBubble=true;
  	
  }

//动画函数 参数分别是 运动对象  属性jason对象  步长大小  回调函数
function animate(item,attr,step,fn){
    if(item.timer){clearInterval(item.timer);}
    item.timer=setInterval(function(){
      var flag=true;
      for (var i in attr) {
        var current=0;
        if (i=="opacity") {
          current=Math.round(parseInt(getStyle(item,i)*100)) || 0;
        } else{
          current=parseInt(getStyle(item,i));
        }; 
        var moving=(attr[i]-current)/step;// var moving=(attr[i]-current)/10;
        moving=moving>0?Math.ceil(moving):Math.floor(moving);

        if(i=="opacity"){
           if("opacity" in item.style)  // 判断 我们浏览器是否支持opacity
                     {
                         // obj.style.opacity
                         item.style.opacity = (moving +current)/100;
                     }
                    else
                     {  // obj.style.filter = alpha(opacity = 30)
                         item.style.filter = "alpha(opacity = "+(moving+step)* 10+")";

                     }
        }else if(i=="zIndex"){
          item.style.zIndex=attr[i];
        }else{
          item.style[i]=moving+current+'px';
        }
        if(current!=attr[i]){
          flag=false;
        }

      }
      if(flag){
          clearInterval(item.timer);
          //回调函数，在函数执行完成后再执行的另一个函数或者动作。
          if(fn){  
            fn();
          }
      }


    }, 20)

}

//获取style属性 attr是单属性 obj是对象
function getStyle(obj,attr){
    if (obj.currentStyle) {
      return obj.currentStyle[attr];
    } else{
      return window.getComputedStyle(obj,null)[attr];
    };
}

//判断是否是回文
//回文就是正反顺序来看是一样的，比如 mamam
function huiwenCheck(str){
	// console.log(str.split("").reverse().join(""));
	return str==str.split("").reverse().join("");
}

//数组去重
//原理，新数组来存储，对储一个新值到新数组后就把这个对象的对应该数
//组值赋值1说明有了，后面如果没有相同的才给到新数组，有相当的就pass
function delelteEepeat(arr){
	var newArr=[];
	var obj={};
	if (arr.length==1) {
		return arr;
	}

	for (var i = 0; i < arr.length; i++) {
		if (!obj[arr[i]]) {
			newArr.push(arr[i]);
			obj[arr[i]]=1;
		}
		
	}
	return newArr;
}

//返回一个字符中出现最多的字符以及出现次数
function strMax(str){
	var obj={};
	var strMax="";
	var strLenght=0
	if (str.length==1) {
		return {
			string:str,
			length:1
		}
	}
	//把每次字母出现的次数写到json对象里
	for (var i = 0; i < str.length; i++) {
		if(!obj[str[i]]){
			obj[str[i]]=1;
		}else{
			obj[str[i]]+=1;
		}
	}
	console.log(obj)
	//根据json对象键值来循环，把最大的值和字符找出来
	for (var k in obj) {
		if(obj[k]>strLenght){
			strLenght=obj[k];
			strMax=k;
		}
	}
	return{
	 	string:strMax,
	 	length:strLenght
	 }
}


//冒泡排序
function pop(arr){
	if(arr.length==1){
		return arr;
	}

	for (var i = 0; i < arr.length; i++) {
		for (var j = i; j<arr.length ; j++) {
			var tmp=arr[j];
			if (arr[i]>arr[j]) {
				arr[j]=arr[i];
				arr[i]=tmp;
			}
		}
	}
	return arr;
}

//交换二个数字数值 
//注释的是借助第三方变量 
//不借助其他变量 把ab中一个作为变量，赋值用ab加一操作，然后再分别去算a,b交易得ba的值 
function exchange(a,b){
/*	var tmp=a;
	a=b;
	b=tmp;*/
	b=a+b;
	a=b-a;
	b=b-a;
	return {
		num1:a,
		num2:b
	}
}

//最大差值  数组  求出的最大值和最小值，取到值后相减就可以了
function maxDif(arr){
	if(arr.length==1){
		return 0;
	}
	var max=arr[0],min=arr[0];
	for (var i = 1; i < arr.length; i++) {
		if(arr[i]>max){
			max=arr[i];
		}
		if(arr[i]<min){
			min=arr[i];
		}
	}
	return{
		max:max,
		min:min
	}
}

//随机生成指定长度的字符串，比如验证码
function randomStr(num){
	var char="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
	var numChar="";
	if(num<=0){
		return numChar="小于0个数的字符串怎么生成呢";
	}
	for (var i = 0; i < num; i++) {
		numChar+=char.substr(Math.ceil(char.length*Math.random()),1);
	}
	return numChar;
}

//getelementbyclassname方法模拟实现
//类名选择函数
function getClass(classname){
	if (document.getElementsByClassName) {//高版本浏览器支持byclassname时
		return document.getElementsByClassName(classname);
		//console.log('支持getElementsByClassName');
	} else {//低版本浏览器不支持byclassname时
		//console.log('不支持getElementsByClassName');
		var arr=[];
		var items=document.getElementsByTagName("*");//获取 所有标签
		for (var i = 0; i < items.length; i++) {
			if(items[i].getAttribute("class")){
				var classes=items[i].getAttribute("class").split(" ");//用className代表getAttri也可以 。类名可能有多个，用空格 分隔开了，所以要转换成数组，再进行循环判断是否有和classname相同的数组元素
				 for (var j = 0; j < classes.length; j++) {
				  	if (classes[j]==classname) {
						arr.push(items[i]);//匹配上了就加到数组里
					} 
				}
			}
		}
		return arr;
	}
	
}

//通用标签 class id选择函数
function $ele(str){
	var firletter=str.substr(0,1);//判断首字条是. # 还是其他
	switch (firletter) {
		case "#":
			return document.getElementById(str.substr(1));//只取#后的id名
			break;
		case ".":
			return getClass(str.substr(1));//只取.后的class名
			break;
		default:
			return document.getElementsByTagName(str);//取标签名就好了
			break;
	}
}


//原生js 
//data是json形式 如 data={"type":"get",url="aaa.php?param=1","flag"="true"}
function ajax(data){

				//获得传递的参数并解析
				var type=data.type=="get"?"get":"post";
				var url="";
				if(data.url){
					url=data.url;
					if(type=="get"){
						url+="?"+data.data+"&_t"+new Date().getTime();
					}
				}
				var flag=data.asyn=="true"?"true":"false";
				console.log(type+','+url+','+flag)


				var xhr=null;
				if(window.XMLHttpRequest){//标准浏览器
					xhr=new XMLHttpRequest();
				}else{
					xhr=new ActiveXObject("Microsoft.XMLHTTP");
				}

				
				
				// 实例化成功后调用 open方法并开始向服务器发送请求
				if (xhr!=null) {
					// xhr.open("get","reginAjaxForme.php",true);//get  post都可以
					xhr.open(type,url,flag);
					xhr.send(null);
					xhr.onreadystatechange=stateChange;//回调函数，state发生变化的时候来执行
				}
				console.log('dd');
				function stateChange(){
					if(xhr.readyState==4 && xhr.status==200){
						alert(document.getElementById("div")+xhr.responseText);
						var resData=xhr.responseText;//如果是json或者xml要进行转换后显示
						document.getElementById("div").innerHTML=resData;
					}
				}
			}