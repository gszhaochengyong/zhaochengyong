//分页插件 
/** 
ch 
**/
// (function($){ 
//  var ms = { 
//   init:function(obj,args){ 
//    return (function(){ 
//     ms.fillHtml(obj,args); 
//     ms.bindEvent(obj,args); 
//    })(); 
//   }, 
//   //填充html 
//   fillHtml:function(obj,args){ 
//    return (function(){ 
//     obj.empty(); 
//     //上一页 
//     if(args.current > 1){ 
//      obj.append('<a href="javascript:;" class="prevPage">上一页</a>'); 
//     }else{ 
//      obj.remove('.prevPage'); 
//      obj.append('<span class="disabled">上一页</span>'); 
//     } 
//     //中间页码 
//     if(args.current != 1 && args.current >= 4 && args.pageCount != 4){ 
//      obj.append('<a href="javascript:;" class="tcdNumber">'+1+'</a>'); 
//     } 
//     if(args.current-2 > 2 && args.current <= args.pageCount && args.pageCount > 5){ 
//      obj.append('<span>...</span>'); 
//     } 
//     var start = args.current -2,end = args.current+2; 
//     if((start > 1 && args.current < 4)||args.current == 1){ 
//      end++; 
//     } 
//     if(args.current > args.pageCount-4 && args.current >= args.pageCount){ 
//      start--; 
//     } 
//     for (;start <= end; start++) { 
//      if(start <= args.pageCount && start >= 1){ 
//       if(start != args.current){ 
//        obj.append('<a href="javascript:;" class="tcdNumber">'+ start +'</a>'); 
//       }else{ 
//        obj.append('<span class="current">'+ start +'</span>'); 
//       } 
//      } 
//     } 
//     if(args.current + 2 < args.pageCount - 1 && args.current >= 1 && args.pageCount > 5){ 
//      obj.append('<span>...</span>'); 
//     } 
//     if(args.current != args.pageCount && args.current < args.pageCount -2 && args.pageCount != 4){ 
//      obj.append('<a href="javascript:;" class="tcdNumber">'+args.pageCount+'</a>'); 
//     } 
//     //下一页 
//     if(args.current < args.pageCount){ 
//      obj.append('<a href="javascript:;" class="nextPage">下一页</a>'); 
//     }else{ 
//      obj.remove('.nextPage'); 
//      obj.append('<span class="disabled">下一页</span>'); 
//     } 
//    })(); 
//   }, 
//   //绑定事件 
//   bindEvent:function(obj,args){ 
//    return (function(){ 
//     obj.on("click","a.tcdNumber",function(){ 
//      var current = parseInt($(this).text()); 
//      ms.fillHtml(obj,{"current":current,"pageCount":args.pageCount}); 
//      if(typeof(args.backFn)=="function"){ 
//       args.backFn(current); 
//      } 
//     }); 
//     //上一页 
//     obj.on("click","a.prevPage",function(){ 
//      var current = parseInt(obj.children("span.current").text()); 
//      ms.fillHtml(obj,{"current":current-1,"pageCount":args.pageCount}); 
//      if(typeof(args.backFn)=="function"){ 
//       args.backFn(current-1); 
//      } 
//     }); 
//     //下一页 
//     obj.on("click","a.nextPage",function(){ 
//      var current = parseInt(obj.children("span.current").text()); 
//      ms.fillHtml(obj,{"current":current+1,"pageCount":args.pageCount}); 
//      if(typeof(args.backFn)=="function"){ 
//       args.backFn(current+1); 
//      } 
//     }); 
//    })(); 
//   } 
//  } 
//  $.fn.createPage = function(options){ 
//   var args = $.extend({ 
//    pageCount : 10, 
//    current : 1, 
//    backFn : function(){} 
//   },options); 
//   ms.init(this,args); 
//  } 
// })(jQuery);
// 以上分页代码的调用 方法，但不知道怎么使用
/*     $(".tcdPageCode").createPage({ 
      pageCount:6, 
      current:1, 
      backFn:function(p){ 
       //console.log(p); 
      } 
     }); 

    //console.log($(".current")[0].innerHTML);
    for (var i = 0; i < $(".tcdPageCode")[0].children.length; i++) {
        console.log( $(".tcdPageCode")[0].children[i]);
        $(".tcdPageCode")[0].children[i].onclick=function(){
            console.log(this.innerHTML);
            //console.log("ddd");
            // for (var i = 0; i < $(".college"); i++) {
            //     console.log($(".college").length+'计数');
            // }
        }
    }
*/



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

      //通用标签 class id选择函数
      function $$(str){
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



    //分页函数  参数pagediv分页数字标签容器  pagelabel分页数字标签集合 college分页对象集合 per每页显示数量 page总页数 block显示方式是block还是inline-block
    function pages(pagediv,pagelabel,college,per,page,block){
        // 根据页数来定数字标签数量
        for (var i = 0; i < page+2; i++) {
            var li=document.createElement("li");
            if(i==1){
                li.setAttribute("class", "current");
                li.innerHTML=i;
            }else if (i==0) {
                li.innerHTML="上一页";
            }else if(i==page+1){
                li.innerHTML="下一页";
            }else{
                
                li.innerHTML=i;
            }
            pagediv.appendChild(li);
        }

        for (var i = 0; i < pagelabel.length; i++) {
            pagelabel[i].index=i;
            pagelabel[i].onclick=function() {
                if (page>1) {
                    //点击上一页时
                    if (this.index==0) {
                        var index2;
                         // 将所有college设置不不显示
                        for (var i = 0; i < colleges.length; i++) {
                            college[i].style.display="none";
                        }
                        //将所有标签current的类清为空
                        for (var i = 0; i < pagelabel.length; i++) {
                            if ( pagelabel[i].className=="current") {
                                index2=i;
                                pagelabel[i].className="";
                            }
                            if (pagelabel[i].className=="disabled") {
                                pagelabel[i].className="";
                            }


                        }
                         //根据页数显示相应college
                        for (var i = 0; i < per; i++) {
                            if (0<index2<page) {
                                college[(index2-2)*per+i].style.display=block;
                            } else if(index2>=page){
                                //余数 当是最后一页时要找余数进行处理
                                var over=(college.length)%per;
                                if (i<over) {
                                    college[(this.index-1)*per+i].style.display=block;
                                } 
                                
                            }
                           
                        }
                        //给当前点击的li加current类
                        pagelabel[index2-1].className="current";
                        if (index2<=2) {
                            pagelabel[0].className="disabled";

                        }
                    } else if (this.index==page+1) {
                            var index3;
                             // 将所有college设置不不显示
                            for (var i = 0; i < colleges.length; i++) {
                                college[i].style.display="none";

                            }
                            //将所有标签current的类清为空
                            for (var i = 0; i < pagelabel.length; i++) {
                                if ( pagelabel[i].className=="current") {
                                    index3=i;
                                    pagelabel[i].className="";
                                }
                                if (pagelabel[i].className=="disabled") {
                                    pagelabel[i].className="";
                                }


                            }
                             //根据页数显示相应college
                            for (var i = 0; i < per; i++) {
                                if (index3<page-1) {
                                    college[(index3)*per+i].style.display=block;
                                } else if(index3==page-1){
                                    //余数 当是最后一页时要找余数进行处理
                                    var over=(college.length)%per;
                                    if (i<over) {
                                        college[(index3)*per+i].style.display=block;
                                    } 
                                    
                                }
                               
                            }
                            //给当前点击的li加current类
                            pagelabel[(index3+1)].className="current";
                            if (index3>=page-1) {
                                pagelabel[page+1].className="disabled";

                            }
                    } else {
                        // 将所有college设置不不显示
                        for (var i = 0; i < colleges.length; i++) {
                            college[i].style.display="none";
                        }
                        //将所有标签current的类清为空
                        for (var i = 0; i < pagelabel.length; i++) {
                            if ( pagelabel[i].className=="current") {
                                pagelabel[i].className="";
                            }
                            if (pagelabel[i].className=="disabled") {
                                pagelabel[i].className="";
                            }

                        }
                        //根据页数显示相应college
                        for (var i = 0; i < per; i++) {
                            if (this.index<page) {
                                college[(this.index-1)*per+i].style.display=block;
                            } else if(this.index>=page){
                                //余数 当是最后一页时要找余数进行处理
                                var over=(college.length)%per;
                                if (i<over) {
                                    college[(this.index-1)*per+i].style.display=block;
                                } 
                                
                            }
                           
                        }
                        //给当前点击的li加current类
                        this.className="current";
                        if (this.index==1) {
                            pagelabel[this.index-1].className="disabled";

                        }else if(this.index==page){
                            pagelabel[this.index+1].className="disabled";
                        }
                    }
                   
                } else if(page<=1) {
                    pagelabel[1].innerHTML=1;
                    pagelabel[0].style.display="none";
                    pagelabel[2].style.display="none";
                }
              

            }
            pagelabel[1].click();//初始化点击第一页操作

        }

    }