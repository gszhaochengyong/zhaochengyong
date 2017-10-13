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
    
})

   w.jq=jq;
})(window)