	//框架主类
	function Factory(ele){
		//jq版本号
		this.version="1.3";
		this.ele=ele;
		// var that=this;
		//初始化
		this.ini();
		
	}


	//框架函数属性
	Factory.prototype={
		ini:function(){
			//传的对象是否为空或者未定义
			if(this.ele==null||this.ele==""||this.ele=="[object Undefined]"){
				this.dom=null;
			}else if (toString.call(this.ele)=="[object Object]") {
				this.dom=this.ele;
			}else if(toString.call(this.ele)=="[object String]"){//对象首字符和除首字符以外字条
				var first=this.ele.substr(0,1);
				var qFirst=this.ele.substr(1);
				//判断id class tag
				if(first==="#"){
					this.dom=document.getElementById(qFirst);
				}else if(first==="."){
					// this.dom=document.getElementsByClassName(qFirst);
					this.dom=this.getClass(qFirst);
				}else{
					this.dom=document.getElementsByTagName(ele);
				}
			}
		},
		//版本信息
		ver:function(){
			return this.version;
		},
		getClass(qFirst){
			var arr=[];
			var domAll=document.getElementsByTagName("*");
	        for(var i=0 ; i<domAll.length;i++){
	            var dataItem=domAll[i];
	            //找出类名不为空的
	            if(dataItem.className!=""){
	                //类名变成数组
	                cArray=dataItem.className.split(" ");
	                //类名数组长度大于1个时就要判断每个数组项是不是与className相等
	                if(cArray.length>1){
	                    for(var j=0 ; j<cArray.length;j++){
	                        var dataItem2=cArray[j];
	                        if(dataItem2==qFirst){
	                            arr.push(dataItem);
	                        }
	                    }
	                //类名数组长度为1直接判断，不用循环
	                }else{
	                    if (cArray[0]==qFirst) {
	                        arr.push(dataItem);
	                    }
	                }
	            }
        	}
        	return arr;
		},
		//循环对象集合  fn就是对每个元素的处理函数
		each:function(fn){
            console.log(this.dom);
			// var data={};
			for (var i = 0; i < this.dom.length; i++) {
				fn(i,this.dom[i]);
			}
		},
		id:function(id){
			var dom=this.isString(id)?document.getElementById(id):id;
			return dom;
		},
		  //获取直接子标签元素或者所有标签元素
	    tag:function(tag,id){
	        var dom=this.isString(id)?this.id(id):id;
            var childrens=dom.children;
            var arr=[];
	        if(id){
	            return get();
	        }else{
	           return document.getElementsByTagName(tag);  
	        }
            //获得直接子元素
	        function get(){
                 for (var i = 0; i < childrens.length; i++) {
                   if (childrens[i].tagName.toLowerCase()==tag) {
                        arr.push(childrens[i]);
                    }
                }
                return arr;
            }
	    },
		//设置和获取元素html内容
		html:function(str){
			//考虑对象可能是集合，这里按集合处理，不过可以在html里调用这个thml方法处理就好了，要写个each方法
			/*		
			if(this.dom.length>0){
				for (var i = 0; i < this.dom.length; i++) {
					this.dom[i].innerHTML=str;
				}
			}*/
			this.dom.innerHTML=str;
			return this;
		},
		//设置标签值
		val:function(value){
			this.dom.setAttribute("value",value);
			return this;
		},
		//传入json对象，键值是一级菜单，二级菜单用数组，如果是空就是没有子菜单
		menu:function(menuData){
			// var domBox=this.isString(id)?this.id(id):id;
			var str="<ul id='menuId'>";
			for(var i in menuData){
				str+="<li>"+i+"";
				if(menuData[i].length>0){
					str+="<ol id='chiMenuId'>";
					for (var j = 0; j < menuData[i].length; j++) {
						str+="<li>"+menuData[i][j]+"</li>"
					}
					str+="</ul></li>";
				}else{
					str+="</li>";
				}
			}
			return str;
		},
		eq:function(index){
			for (var i = 0; i < this.dom.length; i++) {
				if(i==index){
                    console.log(this.dom)
					return this.dom[i];
				}
			}
			
		},
		//获取元素，e可以是标签，可以是类.class可以#id
    ele:function(e){
        var first=this.trim(e).charAt(0);//第一个字符
        var sEle=this.trim(e).substr(1,e.length-1);//第一个字条之后所有字符className和id       
        var res=[];
        if(first=="."){
            res=jq.cName(sEle);
    /*              console.log(dom);
            for(var i=0 ; i<dom.length;i++){
                //console.log(dom[i]);
                res.push(dom[i]);
            }*/
        }else if(first=="#"){
             res=jq.id(sEle);
        }else{
            res =jq.tag(e);
        }

        return res;
    },
    //层次选择器，比如#div1 span 管道原理，从上次管道输出的结果用下级管道来做筛选范围
     lE:function(select){
        //个个击破法则 -- 寻找击破点
        var sel = this.trim(select).split(' ');
        var result=[];//管道临时结果
        var context=[];//上级管道输出结果
        for(var i = 0, len = sel.length; i < len; i++){
                result=[];
                var item = this.trim(sel[i]);
                var first = sel[i].charAt(0)
                var index = item.indexOf(first)
                if(first ==='#'){
                    //如果是#，找到该元素，
                    pushArray([this.id(item.slice(index + 1))]);
                    context = result;
                }else if(first ==='.'){
                    //如果是.
                    //如果是.
                    //找到context中所有的class为【s-1】的元素 --context是个集合
                    if(context.length){
                        for(var j = 0, contextLen = context.length; j < contextLen; j++){
                            pushArray(this.cName(item.slice(index + 1), context[j]));
                        }
                    }else{
                        pushArray(this.cName(item.slice(index + 1)));
                    }
                    context = result;
                }else{
                    //如果是标签
                    //遍历父亲，找到父亲中的元素==父亲都存在context中
                    if(context.length){
                        for(var j = 0, contextLen = context.length; j < contextLen; j++){
                            pushArray(this.tag(item, context[j]));
                        }
                    }else{
                        pushArray(this.tag(item));
                    }
                    context = result;
                }
        }
        return context;

        //封装重复的代码，把dom元素集合添加给result数组里去
        function pushArray(doms){
            for(var j= 0, domlen = doms.length; j < domlen; j++){
                result.push(doms[j])
            }
        }
    },
    //分组选择器
    gE:function(content) {
        var result=[],doms=[];
        var arr = this.trim(content).split(',');
        //alert(arr.length);
        for(var i=0,len=arr.length;i<len;i++) {
            var item = this.trim(arr[i])
            var first= item.charAt(0)
            var index = item.indexOf(first)
            if(first === '.') {
                doms=this.cName(item.slice(index+1))
                //每次循环将doms保存在reult中
                //result.push(doms);//错误来源

                //陷阱1解决 封装重复的代码成函数
                pushArray(doms,result)

            }else if(first ==='#'){
                doms=[this.id(item.slice(index+1))]//陷阱：之前我们定义的doms是数组，但是$id获取的不是数组，而是单个元素
                //封装重复的代码成函数
                pushArray(doms,result)
            }else{
                doms = this.tag(item)
                pushArray(doms,result)
            }
        }
        return result;

        //封装重复的代码
        function pushArray(doms,result){
            for(var j= 0, domlen = doms.length; j < domlen; j++){
                result.push(doms[j])
            }
        }
    },
    //多组+层次
    lgE:function(str) {
        var result = [];
        var item = this.trim(str).split(',');
        for(var i = 0, glen = item.length; i < glen; i++){
            var select = this.trim(item[i]);
            var context = [];
            context = this.lE(select);
            pushArray(context);

        };
        return result;

        //封装重复的代码
        function pushArray(doms){
            for(var j= 0, domlen = doms.length; j < domlen; j++){
                result.push(doms[j])
            }
        }
    },
    //封装h5querySelecterAll方法
    //this.dom为空时就找window，有的时候就用this.dom父元素
    all:function(selector){
        context = this.dom || document;
        return  context.querySelectorAll(selector);
    },
    //去除左右二端空格
    trim:function(str){
        return str.replace(/(^\s*)|(\s*$)/g, '');
    },
    //去除左边空格
    ltrim:function(str){
        return str.replace(/(^\s*)/g,'');
    },
    //去除右边空格
    rtrim:function(str){
        return str.replace(/(\s*$)/g,'');
    },
    ajax:function(url,fn){
        //调用创建函数创建xmlhttp请求并赋值
        var xmlhttp=createXHR();

        //xmlhttp请求发生变化时要监听，因为要等到状态4和200完成才能正常得到返回值
        xmlhttp.onreadystatechange=function(){
            //请求准备就绪 
            if(xmlhttp.readyState==4){
                //请求完成得到返回数组
                if(xmlhttp.status==200){
                    //$j.id("div1").innerHTML=xmlhttp.responseText;
                    fn(xmlhttp.responseText);
                    //return xmlhttp.responseText;//为啥不行//一个函数只能有一个return?
                    //console.log(xmlhttp.responseText);
                }
            }
        }
        //建立请求
        xmlhttp.open("get",url,true);
        //发送数据
        xmlhttp.send();

        //创建xmlHttp请求对象
        function createXHR(){
            if (window.XMLHttpRequest) {
                return new window.XMLHttpRequest();
            } else{
                return new ActiveXObject("Microsoft.XMLHTTP");
            }
        }
        return this;
    },
    //tab函数 参加是大盒子id  li是图片标签 span是数字标签
    //原理先将box盒子里的Li定位，active的是zInde为10，其他是1，span默认是1active,
    //鼠标移向不同span时，给当前spanactive类，相同li下标的也给active,其他全是空。
    tab:function(id){
        var box=this.isString(id)?this.id(id):id;
        var li=box.getElementsByTagName("li");
        var span=box.getElementsByTagName("span");
        for(var i=0 ; i<span.length;i++){
            //console.log(span[i]);
            var dataItem=span[i];
/*          dataItem.index=i;
            dataItem.onmouseover=function(){
                for(var j=0 ; j<span.length;j++){
                    //console.log(span[i]);
                    var dataItem=span[j];
                    dataItem.className='';
                    li[j].className="";
                }
                this.className="active";
                li[this.index].className="active";
            }*/
            //闭包方式解决上面问题，就不需要dataItem.index中间变量了，
            //注意，不能真接用（function(i){})(i)要在function(i)中返回操作内部操作函数，真正mouseover时才执行、
            //不然是已经全部直接执行了
            dataItem.onmouseover=(function(i){
                return function(){
                    for(var j=0 ; j<span.length;j++){
                        //console.log(span[i]);
                        var dataItem=span[j];
                        dataItem.className='';
                        li[j].className="";
                    }
                    span[i].className="active";//后面这里可以考虑用动画函数来显示出来
                    li[i].className="active";
                }
                
            })(i);
        }
        return this;
    },
    //简单的数据绑定formateString
    //还没测试完，不知道是怎样的规则
/*    formateString:function(str, data){
        return str.replace(/@\((\w+)\)/g, function(match, key){
            return typeof data[key] === "undefined" ? '' : data[key];
        });
    }*/
    //对象合并 把source对象每个元素和方法合并拷贝到tar对象中去。
    extend:function(tar,source){
        for(var i in source){
            tar[i]=source[i];
        }
        return tar;
    },
    //数字
    isNumber:function(ele){
        return typeof ele==="Number"&& isFinite(ele);//isFinite判断元素是否是无穷大,否的话返回真，是的话返回false,字符也返回false
    },
    //逻辑值
    isBoolean:function(ele){
        return typeof ele==="boolean";
    },
    //字符
    isString:function(ele){
        return typeof ele === "string";
    },
    //undefined
    isUndefined:function (ele) {
        return typeof ele === "undefined";
    },
    //对象 typeof判断不准确
    isObj:function (ele){
        if(ele === null || typeof ele === 'undefined'){
            return false;
        }
        // return typeof str === 'object';
        return toString.call(ele)==="[object Object]";
    },
    //null
    isNull:function (ele){
        return  ele === null;
    },
    //数组
    isArray:function(ele){
        if(ele===null || ele==="undefined"){
            return false;
        }
        // return typeof ele===Array;
        return toString.call(ele)==="[object Array]";
    },
    //深度查看原来类型
    typeIn:function(ele){
        return toString.call(ele);
    },
    //随机数 a到b之间的任意整数
    ranNumber:function(min,max){
        return (Math.floor(Math.random()*(max-min))+min);//生成的数组是包含min不包含max.因为random是生成0到1之间，不包含1
    },
    //生成一个X位数字0到9之间，首字符不能为0
    xNumber:function(num){
        var str="";
        for(var i=0 ; i<num;i++){
            if(i==0){
                str+=this.ranNumber(1,10);
            }else{
                str+=this.ranNumber(0,10);
            }
        }
        return parseInt(str);
    },
    
}
//事件模块事件结束


//事件模块开始
var eventsf=function(){

}

eventsf.prototype={
     //on方法给对象绑定事件和回调方法
    on:function(type,fn){
        if(this.dom.addEventListener){//如果id或者dom不存在，这里会报错
            this.dom.addEventListener(type,fn,false);//w3c版本浏览器
        }else{
            this.dom.attachEvent("on"+type,fn);//ie
        }
        return this;
    },
    /*解除事件*/
    un:function(type, fn) {
        //var this.dom. = document.getElementById(id);
        // var this.dom. = jq.isString(id)?document.getElementById(id):id;
        if(this.dom.removeEventListener){
            this.dom.removeEventListener(type, fn);
        }else if(this.dom.detachEvent){
            this.dom.detachEvent(type, fn);
        }
        return this;
    },
    //点击
    click:function(fn){
        this.on("click",fn);
        return this;
    },
    //鼠标指向
    mouseover:function(fn){
        this.on("mouseover",fn);
        return this;
    },
    //鼠标移出
    mouseout:function(fn){
        this.on("mouseout",fn);
        return this;
    },
    //鼠标指向与移出 hover函数，结合上面的over out
    hover:function(fnOn,fnOut){
        if(fnOn){
            // this.on(id,"mouseover",fnOn);
            this.mouseover(fnOn)
        }
        if(fnOut){
            // this.on(id,"mouseout",fnOut);
            this.mouseout(fnOut)
        }
        return this;
    },
    //获取 事件 这个对象
    getEvent:function(event){
        return event||window.event;
    },
    //获得事件对象源目标
    getTarget:function(event){
        var event=this.getEvent(event);
        return event.target||event.srcElement;
    },
    //阻止默认行为
    preventDefault:function(event){
        var event=event||window.event;
        if(event.preventDefault){
            event.preventDefault();
        }else{
            event.returnValue=false;
        }
        return this;
    },
    //阻止冒泡
    stopPropagation:function(event){
        var event=this.getEvent(event);
        if(event.stopPropagation){
            event.stopPropagation();
        }else{
            event.calcelBubble=true;
        }
        return this;
    },
    //事件委托
    onChild:function (id,selector,eventType, fn) {
        //参数处理
        var parent = this.isString(id)?this.id(id):id;
        //var parent = this.id(id);//为什么this可以用。this里没有id方法呀，jq基本函数里才有呀
        function handle(e){
            var target = jq().getTarget(e);
            if(target.nodeName.toLowerCase()=== selector || target.id === selector || target.className.indexOf(selector) != -1){
                // 在事件冒泡的时候，回以此遍历每个子孙后代，如果找到对应的元素，则执行如下函数
                // 为什么使用call，因为call可以改变this指向
                // 大家还记得，函数中的this默认指向window，而我们希望指向当前dom元素本身
                fn.call(target);
            }
        }
        //当我们给父亲元素绑定一个事件，他的执行顺序：先捕获到目标元素，然后事件再冒泡
        //这里是是给元素对象绑定一个事件
        parent[eventType]=handle;
        return this;
    }

}





// css类开始
var cssf=function(){};
cssf.prototype={
	//设置css属性 object为对象形式
    css:function(object){
        if (this.isObj(object)) {
            for(var i in object){
                this.dom.style[i]=object[i];//dom.style.i貌似不行
            }
        } else{
            // alert("没有属性");
            return;
        };
        return this;
    },
    //隐藏
    hide:function(){
        this.dom.style.display="none";
        return this;
    },
    //显示
    show:function(){
        this.dom.style.display="block";
        return this;
    },
    getCss:function(attName){
         var style=null;
        if (window.getComputedStyle) {
        	console.log(this.dom);
            style = window.getComputedStyle(this.dom, null);    // 非IE
        } else { 
            style = this.dom.currentStyle;  // IE
        }
        return style[attName]||style.attName;

    },
    //元素宽度
    width:function(){
        var style=null;
        if (window.getComputedStyle) {
            style = window.getComputedStyle(this.dom, null);    // 非IE
        } else { 
            style = this.dom.currentStyle;  // IE
        }
        return style.width||style[width];
    },
    //元素长度
    height:function(){
        var style=null;
        if (window.getComputedStyle) {
            style = window.getComputedStyle(this.dom, null);    // 非IE
        } else { 
            style = obj.currentStyle;  // IE
        }
        return style.height||style[height];
    },
    //获取和设置卷轴高度值 value为空是获取，不为空是设置
    scrollTop:function(value) {
         if(value){
            this.dom.scrollTop=value;
         }else{
            return this.dom.scrollTop;
         }
         
    },
    //获取和设置卷轴左侧值 value为空是获取，不为空是设置
    scrollLeft:function(value) {
         if(value){
            this.dom.scrollLeft=value;
         }else{
            return this.dom.scrollLeft;
         }
         
    },
    //获取和设置属性
    attr:function(attr,attrValue){
        if(!attrValue && attrValue!=""){//属性值不为""空时
            console.log(this.dom)
            return this.dom.getAttribute(attr);
        }else{
            this.dom.setAttribute(attr,attrValue)
        }
        // return this;
    },
    //添加类
    addClass:function(className){
        this.attr('class',this.attr('class')+" "+className);
        return this;
    },
    //删除类
    removeClass:function(className){
        // var dom=this.isString(id)?this.id(id):id;
        // return this.attr(dom,'class',this.attr(dom,'class')+" "+className);
        var oClass=this.trim(this.attr('class'));
        var oClassArr=this.attr('class').split(" ");
        var strClass;
        if(oClassArr.length>0){
            for(var i=0 ; i<oClassArr.length;i++){
                var dataItem=oClassArr[i];
                if(dataItem==className){
                    oClassArr.splice(i,1);
                }
            }
            strClass=oClassArr.join(" ");
        }else if(oClassArr[0]==className){
            strClass=" ";
        }
         this.attr('class',strClass);
        //dom.setAttribute('class',strClass);
    },
    // 多个属性运动框架  添加回调函数 json数据格式 id 时间time毫秒 回调函数
    animates:function (json,id,time,fn) {  // 给谁    json
        var dom=this.isString(id)?this.id(id):id;
        //先清定时器
        clearInterval(dom.timer);
        //根据时间计算速度快慢，频率
        var speeds;
        if(time){
                speeds=parseInt(time/1000*30);
        }else{
                speeds=30;
        }
        //给对象绑定定时器
        dom.timer = setInterval(function() {
            var flag = true;  // 用来判断是否停止定时器   一定写到遍历的外面
            for(var attr in json){   // attr  属性     json[attr]  值
                //开始遍历 json
                // 计算步长    用 target 位置 减去当前的位置  除以 10
                var current = 0;
                if(attr == "opacity")
                {
                    current = Math.round(parseInt(jq("#"+id).getCss(attr)*100)) || 0;
                }
                else
                {
                	console.log(jq());
                   current=parseInt(jq("#"+id                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    ).getCss(attr));
                }
                 // 目标位置就是  属性值
                var step = ( json[attr] - current) / 10;  // 步长  用目标位置 - 现在的位置 / 10
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                //console.log(step+'step');
                //判断透明度
                if(attr == "opacity")  // 判断用户有没有输入 opacity
                {
                     if("opacity" in dom.style)  // 判断 我们浏览器是否支持opacity
                     {
                         // obj.style.opacity
                         dom.style.opacity = (current + step) /100;
                     }
                    else
                     {  // obj.style.filter = alpha(opacity = 30)
                         dom.style.filter = "alpha(opacity = "+(current + step)* 10+")";

                     }
                }
                else if(attr == "zIndex")
                {
                    dom.style.zIndex = json[attr];
                }
                else
                {
                    dom.style[attr] = current  + step + "px" ;
                }

                if(current != json[attr])  // 只要其中一个不满足条件 就不应该停止定时器  这句一定遍历里面
                {
                    flag =  false;
                }
            }
            if(flag)  // 用于判断定时器的条件
            {
                clearInterval(dom.timer);
                if(fn)   // 很简单   当定时器停止了。 动画就结束了  如果有回调，就应该执行回调
                {
                    fn(); // 函数名 +  （）  调用函数  执行函数
                }
            }
          
        },speeds)
    },
    //幻灯片函数，参数分别是移动ulBOX大盒子,uiID，数字标签盒子,上下页BOX 
    slide:function(boxID,ulID,numberID,pageID){
        var ul=this.isString(ulID)?this.id(ulID):ulID;
        var page=this.isString(pageID)?this.id(pageID):pageID;
        var number=this.isString(numberID)?this.id(numberID):numberID;
        var ulParent=ul.parentNode;
        var boxWidth=parseInt(jq("#"+boxID).width());

        //根据ul下ul li数量来动态生成number下的span元素
        var lis=this.tag("li",ul);
        var lisLength=lis.length;

        //初始化
        genSpans();
        autoPlay();

        //生成数字
        function genSpans() {
            for(var i=0 ; i<lisLength;i++){
                var span=document.createElement("span");
                span.innerHTML=i+1;
                if (i==0) {
                    // jq.attr(span,'class','active');
                    span.className="active";
                };
                number.appendChild(span);
            }
        };
        
        var index=0;//默认索引
        var left=0;//默认left值
        var maxLeft=(lisLength-1)*(-boxWidth);//最大left值

        //运动定时器
        var span=this.tag("span",number);
        var pages=this.tag("span",page);
        function autoPlay(){
            clearInterval(ul.timer);
            ul.timer=setInterval(function(){
                index+=1;
                index=index>span.length-1?0:index;
                change(index); 
                index=left<=maxLeft?-1:index; 
            },3000);
        }
        //change函数
        function change(index){
             left=index*(-boxWidth);
            jq("#"+ulID).css({"left":left+'px'});
            //jq.animate(ul,{"left":left});//用动画执行一张图后就停止了，是不是定时器时间的问题影响的。
            for(var i=0 ; i<span.length;i++){
                var dataItem=span[i];
                // jq.attr('class','');
                dataItem.className="";
            }
            // jq("#ul").tag("span").eq(index).addClass('active');
            //console.log(jq().tag("span",numberID).index(0))
            span[index].className="active";
           
        }
        //鼠标移向时
        jq("#"+boxID).hover(function(){
                clearInterval(ul.timer)
            },function(){
                autoPlay();
            });
        //点击数字

        //方法二，用框架方法绑定事件
        this.onChild(numberID,"span","onclick",function(){
            index=this.innerHTML-1;
            change(index);
        })
       //上下页方法二，用框架方法绑定事件
        this.onChild(pageID,"span","onclick",function(){
            // console.log(this.attr(this,'class'));
            if(this.className=="pre"){
                index-=1;
            }else{
                index+=1
            }
            index=index<0?0:index;
            index=index>span.length-1?span.length-1:index;
            change(index);
        });

    }
}

//定义变量等于这个框架类，传元素，就初始化这个类，直接(ele)运行。类jQuery
var jq=function(ele){

	//基础类对象
	var jq= new Factory(ele);
	//事件类对象
	var events=new eventsf();
	//css类对象
	var css=new cssf();
	// 将事件对象克隆给其他类jq对象
	jq.extend(jq,events);
	jq.extend(jq,css);


    jq.extend(jq,{
        //最大与最小值  数组  求出的最大值和最小值，取到值后相减就可以了
        maxDif:function (arr){
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
        },
        //交换二个数字数值 
        //注释的是借助第三方变量 
        //不借助其他变量 把ab中一个作为变量，赋值用ab加一操作，然后再分别去算a,b交易得ba的值 
        exchange:function(a,b){
        /*  var tmp=a;
            a=b;
            b=tmp;*/
            b=a+b;
            a=b-a;
            b=b-a;
            return {
                num1:a,
                num2:b
            }
        },
        //冒泡排序
        pop:function(arr){
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
        },
        //返回一个字符中出现最多的字符以及出现次数
        strMax:function(str){
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
        },
        //数组去重
        //原理，新数组来存储，对储一个新值到新数组后就把这个对象的对应该数
        //组值赋值1说明有了，后面如果没有相同的才给到新数组，有相当的就pass
       delelteEepeat: function (arr){
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
        },
        //判断是否是回文
        //回文就是正反顺序来看是一样的，比如 mamam
        huiwenCheck:function (str){
            // console.log(str.split("").reverse().join(""));
            return str==str.split("").reverse().join("");
        },
        //阻止冒泡
        stopPop:function(event){
            event.stopPropagation?event.stopPropagation():event.cancelBubble=true;
        
        },
        //获取屏幕可视区域高和长函数
        client:function(){
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
        },
        //获取滚轴左边和上面滚动的数值
        scroll:function () {
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

    })
 





	return jq;
}


