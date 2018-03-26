<template>
<div class="slide">
  <p class="title">图片轮播</p>
<!--   <div class="photos" id="photos" @mouseover="stopSlider" @mouseout="startSlider" >
  <ul class="photo">
    <li><img class="responsive" src="../assets/imgs/slider1.jpg" alt=""></li>
    <li><img src="../assets/imgs/slider2.jpg" alt=""></li>
    <li><img src="../assets/imgs/slider3.jpg" alt=""></li>
  </ul>
  <p>图片名称</p>
  <div class="page">
    <span class="pre" @click="change">&lt;</span>
    <span @click="change">1</span>
    <span @click="change">2</span>
    <span @click="change">3</span>
    <span class="next" @click="change">&gt;</span>
  </div>
</div> -->
  <!-- <div style="clear:both"></div> -->
  <div class="photos" id="photos" @mouseover="stopSlider" @mouseout="startSlider" >
    <ul class="photo">
      <li v-for="(item,index) in photoList"><img :src="item.url" alt="">
        <p class="name">{{item.title}}</p></li>
    </ul>
    <div class="page">
      <span class="pre" @click="change">&lt;</span>
      <span @click="change" v-for="(item,index) in photoList" :class="{active:index==nowIndex}">{{index+1}}</span>
      <span class="next" @click="change">&gt;</span>
    </div>
  </div>
</div>
</template>




<script>
$(function(){
  function imgAuto(){
    // let boxHeight = $("#photos").height();
    //根据盒子宽度来设定图片宽度，再根据自动生成的图片高度来生成盒子高度
    let boxWidth = $("#photos").width();
    $("#photos ul li img").css({
      width:boxWidth+'px'
    });
    let imgHeight = $("#photos ul li img").height();
    $("#photos").css({
      height:imgHeight+'px'
    })
  }
  imgAuto();
  $(window).on('resize',function(){
    imgAuto();
  })
})
export default {
  name: 'slide',
  data() {
    return {
      nowIndex: 0,
      imgInterval: setInterval(this.change,2000),
      test: null,
      photoList: [
        {
          title: 'REACT入门与实战',
          url: require('../assets/imgs/slider1.jpg')
        },
        {
          title: '安卓开发工程师',
          url: require('../assets/imgs/slider2.jpg')
        },
        {
          title: '玩转算法面试',
          url: require('../assets/imgs/slider3.jpg')
        },
        {
          title: '跨平台GITHUB APP',
          url: require('../assets/imgs/slider4.jpg')
        }
      ]
    }
  },
  methods: {
    change:function(e) {
      let photoBox=$("ul.photo");
      let imgWidth=$("ul.photo li img").width();
      let imgNumber=$("ul.photo li img").length;
      //e无值代表是定时器非点击事件
      if(!e){
        this.nowIndex=this.nowIndex+1;
      }else{
        let index=parseInt($(e.target).html());
        //上下页
        if (isNaN(index)) {
          // console.log("不是数字");
          if($(e.target).hasClass('pre')){
            this.nowIndex=this.nowIndex-1;
          }else if ($(e.target).hasClass('next')) {
            this.nowIndex=this.nowIndex+1;
          }
          //点击的是数字
        }else{
          this.nowIndex=index-1;
        }
       
      }
      //index处理
      this.nowIndex=this.nowIndex<0?(imgNumber-1):this.nowIndex;
      this.nowIndex=this.nowIndex>(imgNumber-1)?0:this.nowIndex;
      let leftValue=-(this.nowIndex)*imgWidth+'px';

      photoBox.stop(false,false).animate({
          left:leftValue
      })
    },
    stopSlider: function(){
      clearInterval(this.imgInterval);
    },
    startSlider: function(){
      this.imgInterval=setInterval(this.change,3000)
    }/*, //这种方式为啥不行呢？
    imgIntval: function(){
      console.log("定时器");
      console.log(this.nowIndex);
      this.imgInterval=setInterval(this.change,2000)
    }*/
  },
  created() {
    /* this.imgAuto();
     let thisVue = this;
     $(window).on('resize',function(){
      thisVue.imgAuto();
     })*/
     this.imgIntval;
  }
}

</script>

<style scoped>
@charset "utf-8";
.slide p.title{
  font-size: 22px;
  text-align:center;
  line-height: 60px;
  background: #e3e3d3;
    
}
.slide{
  width: 100%;
  height: 100%;
  margin-bottom: 30px;
}
.slide .photos{
  /*width: 100%;*/
  position: relative;
  overflow: hidden;
}
.slide .photos ul.photo{
  width: 600%;
  /*height: 100%;*/
  position: absolute;
  left: 0px;
  top: 0;
}
.slide .photos ul.photo:after{
  display: table;
  content: '';
  height:0;
  clear: both;
}
.slide .photos ul.photo{
  /*height: 100%;*/
}
.slide .photos ul.photo li{
  float: left;
  position: relative;
}
.slide .photos ul.photo li p.name{
  position: absolute;
  bottom: 5px;
  left: 20px;
}
.slide .photos ul.photo li img{
/*   max-width: 100%;
max-height: 100%; */
}
.slide .photos p{
  position: absolute;
  left: 30px;
  bottom: 10px;
  z-index: 100;
  color: #fff;
  font-size: 18px;
  color: #eee;
}
.slide .photos .page{
  position: absolute;
  width: 30%;
  text-align:center;
  right: 30px;
  bottom: 5px;
  height: 20px;
  z-index: 100;
  color: #fff;
}
.slide .photos .page span.pre,.slide .photos .page span.next{
  font-family: Simsun;/*字体宋*/
}
.slide .photos .page span{
  display: inline-block;
  width: 20px;
  height: 20px;
  background: #333;
  border-radius: 10px;
  line-height: 20px;
  font-size: 16px;
  margin-right: 10px;
  cursor: pointer;
}
.slide .photos .page span.active{
  background: orange;
}
</style>
