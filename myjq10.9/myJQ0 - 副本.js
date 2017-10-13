(function(w){
    //定义一个类，赋值给变量
var myJQ=function(){
    // console.log("dd");
}
//相当于 
//function $my(){ }

//原型方法函数多个编写
//基础模块
myJQ.prototype={
    //获取id元素
    //缩小搜索范围，不全局搜索，搜索id元素里的tag标签 //
    id:function(id){
        return document.getElementById(id);
    },
    //获取标签元素
    tag:function(tag,id){
        var dom=this.isString(id)?this.id(id):id;
        if(id){
            return dom.getElementsByTagName(tag);
        }else{
          return document.getElementsByTagName(tag);  
        }
        
    },
/*  //获取类元素,兼容性问题
    cName:function(className){
        return document.getElementsByClassName(className);
    },*/
    //获取类元素2
    cName:function(className,id){
        var idDom=this.isString(id)?this.id(id):id;
        if (idDom) {
            var dom=idDom.getElementsByTagName("*");
        } else{
           var dom=document.getElementsByTagName("*");
        };
        // var dom=document.getElementsByTagName("*");
        var arr=[];
        for(var i=0 ; i<dom.length;i++){
            var dataItem=dom[i];
            //找出类名不为空的
            if(dataItem.className!=""){
                //类名变成数组
                cArray=dataItem.className.split(" ");
                //类名数组长度大于1个时就要判断每个数组项是不是与className相等
                if(cArray.length>1){
                    for(var j=0 ; j<cArray.length;j++){
                        var dataItem2=cArray[j];
                        if(dataItem2==className){
                            arr.push(dataItem);
                        }
                    }
                //类名数组长度为1直接判断，不用循环
                }else{
                    if (cArray[0]==className) {
                        arr.push(dataItem);
                    }
                }
            }
        }
  /*           //下面这种方式直接判断消耗时间更多
           for(var i=0 ; i<dom.length;i++){
                var dataItem=dom[i];
                    cArray=dataItem.className.split(" ");
                        for(var j=0 ; j<cArray.length;j++){
                            var dataItem2=cArray[j];
                            if(dataItem2==className){
                                arr.push(dataItem);
                            }
                }
            }*/
        return arr; 
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
     cEle:function(select){
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
    group:function(content) {
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
    cTeam:function(str) {
        var result = [];
        var item = this.trim(str).split(',');
        for(var i = 0, glen = item.length; i < glen; i++){
            var select = this.trim(item[i]);
            var context = [];
            context = this.cEle(select);
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
    all:function(selector,content){
        var cont=content?content:document;
        console.log(cont);
        return cont.querySelectorAll(selector);
    },
    $all:function(selector,context){
        context = context || document;
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
    },
    //tab函数 参加是大盒子id  li是图片标签 span是数字标签
    //原理先将box盒子里的Li定位，active的是zInde为10，其他是1，span默认是1active,
    //鼠标移向不同span时，给当前spanactive类，相同li下标的也给active,其他全是空。
    tab:function(id){
        //var box=document.getElementById(id);//this.id(id)
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
    }
   
}
//基础模块结束


//事件模块
var eventsf=function(){

}

eventsf.prototype={
     //on方法给对象绑定事件和回调方法
    on:function(id,type,fn){
        // var dom=this.isString(id)?document.getElementById(id):id;
        // 如果是字符串就根据id获取，如果不是，代表id已经是dom对象了，比如html里已经用document.getElementById
        var dom=this.isString(id)?this.id(id):id;
        if(dom.addEventListener){//如果id或者dom不存在，这里会报错
            dom.addEventListener(type,fn,false);//w3c版本浏览器
        }else{
            dom.attachEvent("on"+type,fn);//ie
        }
    },
    /*解除事件*/
    un:function(id, type, fn) {
        //var dom = document.getElementById(id);
        var dom = this.isString(id)?document.getElementById(id):id;
        if(dom.removeEventListener){
            dom.removeEventListener(type, fn);
        }else if(dom.detachEvent){
            dom.detachEvent(type, fn);
        }

    },
    //点击
    click:function(id,fn){
        this.on(id,"click",fn);
    },
    //鼠标指向
    mouseover:function(id,fn){
        this.on(id,"mouseover",fn);
    },
    //鼠标移出
    mouseout:function(id,fn){
        this.on(id,"mouseout",fn);
    },
    //鼠标指向与移出 hover函数，结合上面的over out
    hover:function(id,fnOn,fnOut){
        if(fnOn){
            // this.on(id,"mouseover",fnOn);
            this.mouseover(id,fnOn)
        }
        if(fnOut){
            // this.on(id,"mouseout",fnOut);
            this.mouseout(id,fnOut)
        }
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
        var event=e||window.event;
        if(event.preventDefault){
            event.preventDefault();
        }else{
            event.returnValue=false;
        }
    },
    //阻止冒泡
    stopPropagation:function(event){
        var event=this.getEvent(event);
        if(event.stopPropagation){
            event.stopPropagation();
        }else{
            event.calcelBubble=true;
        }
    },
    //事件委托
    onChild:function (id,selector,eventType, fn) {
        //参数处理
        var parent = this.isString(id)?this.id(id):id;
        //var parent = this.id(id);//为什么this可以用。this里没有id方法呀，jq基本函数里才有呀
        function handle(e){
            var target = jq.getTarget(e);
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
    }

}
//事件模块结束





// 实例化和合并多个模块功能
//实例化对象或者函数，就变成了对象，有了对象的构造函数和prototype以及__ptoto__
var jq=new myJQ();//基础模块
var events=new eventsf();//事件模块




//这个方法就是将{}对象里的方法和属性拷贝给前面$j对象，$j就可以直接调用，相当于多个模块功能合并互相调用 。
jq.extend(jq,events);


jq.extend(jq,{
    //设置css属性 object为对象形式
    css:function(id,object){
        var dom=this.isString(id)?this.id(id):id;
        if (this.isObj(object)) {
            for(var i in object){
                dom.style[i]=object[i];//dom.style.i貌似不行
            }
        } else{
            // alert("没有属性");
            return;
        };
    },
    //隐藏
    hide:function(id){
        var dom=this.isString(id)?this.id(id):id;
        dom.style.display="none";
    },
    //显示
    show:function(id){
        var dom=this.isString(id)?this.id(id):id;
        dom.style.display="block";
    },
    getCss:function(id,attName){
         var dom=this.isString(id)?this.id(id):id;
         var style=null;
        if (window.getComputedStyle) {
            style = window.getComputedStyle(dom, null);    // 非IE
        } else { 
            style = dom.currentStyle;  // IE
        }
        return style[attName]||style.attName;
    },
    //元素宽度
    width:function(id){
        var dom=this.isString(id)?this.id(id):id;
        var style=null;
        if (window.getComputedStyle) {
            style = window.getComputedStyle(dom, null);    // 非IE
        } else { 
            style = dom.currentStyle;  // IE
        }
        return style.width||style[width];
    },
    //元素长度
    height:function(id){
        var dom=this.isString(id)?this.id(id):id;
        var style=null;
        if (window.getComputedStyle) {
            style = window.getComputedStyle(dom, null);    // 非IE
        } else { 
            style = obj.currentStyle;  // IE
        }
        return style.height||style[height];
    },
    //获取和设置卷轴高度值 value为空是获取，不为空是设置
    scrollTop:function(id,value) {
         var dom=this.isString(id)?this.id(id):id;
         if(value){
            dom.scrollTop=value;
         }else{
            return dom.scrollTop;
         }
         
    },
    //获取和设置卷轴左侧值 value为空是获取，不为空是设置
    scrollLeft:function(id,value) {
         var dom=this.isString(id)?this.id(id):id;
         if(value){
            dom.scrollLeft=value;
         }else{
            return dom.scrollLeft;
         }
         
    },
    //获取和设置属性
    attr:function(id,attr,attrValue){
        var dom=this.isString(id)?this.id(id):id;
        if(!attrValue && attrValue!=""){//属性值不为""空时
            return dom.getAttribute(attr);
        }else{
            dom.setAttribute(attr,attrValue)
        }
    },
    //添加类
    addClass:function(id,className){
        var dom=this.isString(id)?this.id(id):id;
        return this.attr(dom,'class',this.attr(dom,'class')+" "+className);
    },
    //删除类
    removeClass:function(id,className){
        var dom=this.isString(id)?this.id(id):id;
        // return this.attr(dom,'class',this.attr(dom,'class')+" "+className);
        var oClass=this.trim(this.attr(dom,'class'));
        var oClassArr=this.attr(dom,'class').split(" ");
        console.log(oClassArr);
        if(oClassArr.length>0){
            for(var i=0 ; i<oClassArr.length;i++){
                var dataItem=oClassArr[i];
                if(dataItem==className){
                    oClassArr.splice(i,1);
                }
            }
            console.log(oClassArr);
            strClass=oClassArr.join(" ");
        }else if(oClassArr[0]==className){
            strClass=" ";
        }
        console.log(strClass);
         this.attr(dom,'class',strClass);
        //dom.setAttribute('class',strClass);
    },
    // 多个属性运动框架  添加回调函数
    animate:function (id,json,fn) {  // 给谁    json
        var dom=this.isString(id)?this.id(id):id;
        clearInterval(dom.timer);
        dom.timer = setInterval(function() {
            var flag = true;  // 用来判断是否停止定时器   一定写到遍历的外面
            for(var attr in json){   // attr  属性     json[attr]  值
                //开始遍历 json
                // 计算步长    用 target 位置 减去当前的位置  除以 10
                var current = 0;
                if(attr == "opacity")
                {
                    current = Math.round(parseInt(jq.getCss(dom,attr)*100)) || 0;
                }
                else
                {
                   current=parseInt(jq.getCss(dom,attr))
                }
               // console.log(current);
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
                //alert("ok了");
                if(fn)   // 很简单   当定时器停止了。 动画就结束了  如果有回调，就应该执行回调
                {
                    fn(); // 函数名 +  （）  调用函数  执行函数
                }
            }
        },30)
    },
    //幻灯片函数，参数分别是移动ul大盒子，上下页BOX ，数字标签盒子
    slide:function(ul,page,number){
        var ul=this.isString(ul)?this.id(ul):ul;
        var page=this.isString(page)?this.id(page):page;
        var number=this.isString(number)?this.id(number):number;
        var ulParent=ul.parentNode;
        var boxWidth=parseInt(this.width(ul.parentNode));

        //根据ul下ul li数量来动态生成number下的span元素
        var lis=jq.tag("li",ul);
        var lisLength=lis.length;

        //初始化
        genSpans();
        autoPlay();

        function genSpans() {
            for(var i=0 ; i<lisLength;i++){
                var span=document.createElement("span");
                span.innerHTML=i+1;
                if (i==0) {
                    jq.attr(span,'class','active');
                };
                number.appendChild(span);
            }
        };
        
        var index=0;//默认索引
        var left=0;//默认left值
        var maxLeft=(lisLength-1)*(-boxWidth);//最大left值

        //运动定时器
        var span=jq.tag("span",number);
        var pages=jq.tag("span",page);
        function autoPlay(){
            clearInterval(ul.timer);
            ul.timer=setInterval(function(){
                index+=1;
                index=index>span.length-1?0:index;
                console.time("111");
                change(index); 
                index=left<=maxLeft?-1:index; 
            },3000);
            
        }
        //change函数
        function change(index){
             left=index*(-boxWidth);
            jq.css(ul,{"left":left+'px'});
            //jq.animate(ul,{"left":left});//用动画执行一张图后就停止了，是不是定时器时间的问题影响的。
            for(var i=0 ; i<span.length;i++){
                var dataItem=span[i];
                jq.attr(dataItem,'class','');
            }
            jq.addClass(span[index],'active');
           
        }
        //鼠标移向时
        jq.hover(ulParent,function(){
                clearInterval(ul.timer)
            },function(){
                autoPlay();
            });
        //点击数字

        //方法二，用框架方法绑定事件
        jq.onChild(number,"span","onclick",function(){
            index=this.innerHTML-1;
            change(index);
        })
        //上下页
/*        pages[0].onclick=function(){
            index-=1;
            index=index<0?0:index;
            index=index>span.length-1?span.length-1:index;
            change(index);
        }
        pages[1].onclick=function(){
            index+=1;
            index=index<0?0:index;
            index=index>span.length-1?span.length-1:index;
            change(index);
        }*/

       //上下页方法二，用框架方法绑定事件
        jq.onChild(page,"span","onclick",function(){
            console.log(jq.attr(this,'class'));
            if(jq.attr(this,'class')=="pre"){
                index-=1;
            }else{
                index+=1
            }
            index=index<0?0:index;
            index=index>span.length-1?span.length-1:index;
            change(index);
        });

    }
})

   w.jq=jq;
})(window)