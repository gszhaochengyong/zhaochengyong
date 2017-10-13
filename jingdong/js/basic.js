	//通用 标签 class id选择函数
	function $(str){
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
				//console.log(items[i]);
				var classes=items[i].getAttribute("class").split(" ");//用className代表getAttri也可以 。类名可能有多个，用空格 分隔开了，所以要转换成数组，再进行循环判断是否有和classname相同的数组元素
				//console.log(classes.length);
				  for (var i = 0; i < classes.length; i++) {
				  	if (classes[i]==classname) {
						arr.push(items[i]);//匹配上了就加到数组里
					} 
				}
				
			}
			return arr;
		}
		
	}
