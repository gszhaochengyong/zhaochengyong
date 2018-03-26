<template>
  <div class="row">
    <div class="col-sm-3 col-md-3 col-lg-3 hidden-xs left-content">
      <div class="nav navbar navbarLeft">
        <h3 class="bigTitle">全部产品</h3>
        	<template v-for="item in productList">
	        	<h4 class="smallTitle">{{item.title}}</h4>
	        	<div class="list" :class="{'underLine':item.last==true}">
		        	<ul >
		        		<li v-for="item2 in item.producuts"><a :href="item2.url">{{item2.title}}</a><span v-if="item2.hot" class="hot">hot</span></li>
		        	</ul>
	        	</div>
	        </template>
        
      </div>
      <div class="nav navbar navbarLeft">
        <h3 class="bigTitle">最新消息</h3>
        	<template v-for="(item,index) in productList">
	        	<div class="list">
		        	<ul v-if="index == 0">
		        		<li v-for="item2 in item.producuts"><a :href="item2.url">{{item2.title}}--新消息</a><span v-if="item2.hot" class="hot">hot</span></li>
		        	</ul>
	        	</div>
	        </template>
        
      </div>
      <div class="nav navbar navbarLeft">
      	<h3 class="bigTitle">产品消息2</h3>
	      	<template v-for="(item,index) in productList">
	      		<div class="list">
	        	<ul v-if="index == 1">
	        		<li v-for="item2 in item.producuts"><a :href="item2.url">{{item2.title}}--新消息2</a><span v-if="item2.hot" class="hot">hot</span></li>
	        	</ul>
	        	</div>
	        </template>
      </div>
    </div>
    <div class="col-xs-12 col-sm-9 col-md-9 col-lg-9 right-content">
    	<!-- 轮播图 -->
    	<div class="slider">
    		<slider-show></slider-show>
    	</div>
    	<div class="slider" style="margin-bottom:30px;">
    		<h2 class="text-center" style="margin-bottom:0px;line-height:50px;background:#e3e3d3;">这个不能写在slide里，不然会报错，为啥呢？</h2>
			<slider animation="fade">
		      <slider-item v-for="(i, index) in list" :key="index">
		        <div :style="i">
		          <p style="line-height: 280px; font-size: 5rem; text-align: center;">Page{{ index + 1 }}</p>
		        </div>
		      </slider-item>
		    </slider>
    	</div>
    	<!-- 品牌显示 -->
    	<div class="show">
<!--     		<div v-for="(item,index) in boardList" :class="{'row':index % 2 == 0}">
	    		<div class="media col-xs-12 col-sm-6 col-md-6 col-lg-6" >
				    <a class="media-left" href="#">
				        <span class="media-object" :class="'media-'+item.id"></span>
				    </a>
				    <div class="media-body">
				        <h4 class="media-heading">{{item.title}}</h4>
				        <p>{{item.description}}</p>
				    </div>
				</div>
	    	</div> -->
	    	<div  class='row'>
	    		<div class="board-item col-xs-12 col-sm-6 col-md-6 col-lg-6" v-for="(item,index) in boardList">
	    			<div class="media" >
					    <a class="media-left" href="#">
					        <span class="media-object" :class="'media-'+item.id"></span>
					    </a>
					    <div class="media-body">
					        <h4 class="media-heading">{{item.title}}</h4>
					        <p>{{item.description}}</p>
					        <p class="text-right">
					        	<button class="btn btn-default btn-success ">立即购买</button>
					        </p>
					        
					    </div>
					</div>
	    		</div>
	    	</div>
    	</div>
    </div>
  </div>
</template>
<script type="text/javascript">
import sliderShow from '../components/slider'
import { Slider, SliderItem } from 'vue-easy-slider'
	export default({
		components: {
			sliderShow,
			Slider,
			SliderItem
		},
		created(){
			// 异步请求数据，因为没有服务器，所以404失败，可以用jsonserver实现模拟数据
			/* this.$http.get('getList').then(function(data){
				console.log(data);
			},function(error){
				console.log(error);
			}) */
			// console.log("ddd");
		},
		data() {
		  return {
		  	list: [
	          { backgroundColor: '#3f51b5', width: '100%', height: '100%' },
	          { backgroundColor: '#eee', width: '100%', height: '100%' },
	          { backgroundColor: '#f44336', width: '100%', height: '100%' },
	        ],
			productList: [
				  {
					title: 'PC产品',
					producuts: [
					  {
					  	title: '数据统计',
					  	url: 'http://www.baidu.com',
					  	hot: true
					  },
					  {
					  	title: '数据预测',
					  	url: 'http://www.baidu.com'
					  },
					  {
					  	title: '流量分析',
					  	url: 'http://www.baidu.com'
					  },
					  {
					  	title: '广告发布',
					  	url: 'http://www.baidu.com'
					  }
					],
				    last: true
				  },
				  {
					title: '应用类',
					producuts: [
					  {
					  	title: '91助手',
					  	url: 'http://www.baidu.com',
					  	hot: true
					  },
					  {
					  	title: '产品助手',
					  	url: 'http://www.baidu.com'
					  },
					  {
					  	title: '智能地图',
					  	url: 'http://www.baidu.com',
					  	hot: true
					  },
					  {
					  	title: '团队语音',
					  	url: 'http://www.baidu.com'
					  }
					]
				  }
				],
			boardList: [
			  {
			  	title: '开放产品',
			  	description: '开放产品是一开放产品',
			  	id: 'car',
			  	saleout: false
			  },
			  {
			  	title: '品牌营销',
			  	description: '品牌营销帮助你的产品更好的找到定位',
			  	id: 'earth',
			  	saleout: true
			  },
			  {
		        title: '使命必达',
		        description: '使命必达快速迭代永远保持最前端的速度',
		        id: 'loud',
		        toKey: 'forecast',
		        saleout: true
		        },
	          {
	            title: '勇攀高峰',
	            description: '帮你勇闯高峰，到达事业的顶峰',
	            id: 'hill',
	            toKey: 'publish',
	            saleout: false
	            },
			  {
			  	title: '推广方案',
			  	description: '网络推广方案就是通过研究网络推广的方法，制定出一套适合宣传和推广商品、服务甚至人的方案，而其中的媒介就是通过网络',
			  	id: 'earth',
			  	saleout: true
			    },
			  {
			  	title: '成本控制',
			  	description: '有效的网络推广应该是利用尽可能少的成本获取最大的回报',
			  	id: 'loud',
			  	saleout: false
			    }
			]
			}
			
		}
	})
</script>
<style type="text/css">
	.left-content .navbar .underLine{
		border-bottom: 1px solid #ccc;
		padding-bottom: 10px;
	}
	.left-content .navbar span.hot{
		padding:0 2px;
		background: red;
		color: #fff;
		margin-left: 2px;
	}
	.left-content .navbar.navbarLeft{
		border: 1px solid #ddd;
		background: #fff;
	}
	.left-content .navbar h3.bigTitle{
		padding:10px;
		background: #e3e3d3;
		/*margin-bottom: 20px;*/
	}
	.left-content .navbar h4.smallTitle{
		padding: 15px 0 0px 20px;
	}
	.left-content .navbar .list{
		padding-left: 20px;
	}
	.left-content .navbar .underLine{
		border-bottom: 1px solid #ccc;
	}
	.left-content .navbar .list ul{
		padding-top: 10px;
		padding-bottom: 10px;
	}
	.left-content .navbar .list ul li{
		padding-left: 10px;
		font-size: 15px;
		line-height: 26px;
	}
	.right-content .show a.media-left{
		/*background: pink;*/
	}
	.right-content .show .media-left span.media-object{
		width: 100px;
		height: 100px;
	}
	.right-content .show .media-left span.media-object.media-car{
		background: url("../assets/imgs/icon2.png");
	}
	.right-content .show .media-left span.media-object.media-earth{
		background: url("../assets/imgs/icon1.png");
	}
	.right-content .show .media-left span.media-object.media-loud{
		background: url("../assets/imgs/icon3.png");
	}
	.right-content .show  .media-left span.media-object.media-hill{
		background: url("../assets/imgs/icon4.png");
	}
	.right-content .show .row{
		/*padding:10px 10px 10px 10px;*/
	}
	.right-content .show .row .board-item{
		padding:0px 10px 10px 0px;
	}
	.right-content .show .row .board-item:nth-child(2n){
		padding:0px 0px 10px 0px;
	}
	.right-content .show .row .board-item .media{
		background: #fff;
		padding:10px;
	}
	.right-content .show .row .board-item h4{
	}
	.right-content .show .row .board-item p{
		text-indent: 20px;
		font-size: 15px;
		line-height: 20px;
		height: 40px;
		margin-top: 8px;
		margin-bottom: 5px;
		max-width: 100%;
		/* overflow: hidden;
		text-overflow:ellipsis;  */
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
		/*white-space: nowrap;不换行*/ 
	}
</style>