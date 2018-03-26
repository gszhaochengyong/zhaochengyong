<template>
  <div id="app">
    <div class="app-header">
      <nav class="navbar navbar-default container-fluid" role="navigation">
        <div class="container">
          <div class="navbar-header">
            <a class="navbar-brand" href="#"><img src="../assets/logo.png" alt=""></a>
          </div>
          <div>
            <!-- 这里要处理一个手机端小屏幕缩起来的效果 -->
            <!--向右对齐-->
            <ul class="nav navbar-nav navbar-right">
              <li class="nav-item">
                <a href="#" @click="showRegDialog">注册</a>
              </li>
              <li class="nav-item">
                <a href="#" @click="showLogDialog">登陆</a>
              </li>
              <li class="">
                <a href="#" @click="showAboDialog">关于</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
    <div class="app-content">
      <div class="container">
        <keep-alive>
          <router-view>
            <router-link :to="{path:'/1'}">1111</router-link>
            <router-link :to="{path:'/2'}">2222</router-link>
            <router-link :to="{path:'/3'}">333</router-link>
          </router-view>
        </keep-alive>
      </div>
    </div>
    <float-dialog :isShowDialog="ShowReg"  @closeDialogEmit="closeDialog('ShowReg')">
      <p>注册</p>
    </float-dialog>
    <float-dialog :isShowDialog="ShowLog"  @closeDialogEmit="closeDialog('ShowLog')">
      <login-form></login-form>
    </float-dialog>
    <float-dialog :isShowDialog="ShowAbo"  @closeDialogEmit="closeDialog('ShowAbo')">
      <p>关于</p>
    </float-dialog>
    <div class="app-footer">
      <div class="footer">
        <div class="text-center">
          <p>@copyright2017</p>
          <p>联系我们--QQ:309938723</p>
        </div>
      </div>
    </div>

  </div>
</template>




<script>
import Dialog from './Dialog'
import loginForm from './login'
import registerForm from './register'
export default {
  components:{
    floatDialog: Dialog,
    loginForm,
    registerForm
  },
  name: 'App',
  data(){
    return {
      ShowLog: false,
      ShowReg: false,
      ShowAbo: false
    }
  },
  methods: {
    showLogDialog(){
      this.ShowLog = true;
    },
    showRegDialog(){
      this.ShowReg = true;
    },
    showAboDialog(){
      this.ShowAbo = true;
    },
    closeDialog(attr){
      //为啥不同呢？
/*      console.log(this);
      console.log(this.attr);*/
      console.log(this[attr]+'ew');
      this[attr]=false;
      // console.log(this[attr]);
    }
  }
}
// alert($("#app"))测试jq引入正常。btn测试bootstrap引入正常
// <style scoped> style里加scoped代表css只在当前组件生效
</script>

<style>
@charset "utf-8";
body {
  font-family: "Helvetica Neue", Helvetica, Arial, "Microsoft YaheiUI", "Microsoft YaHei", SimHei, "\5B8B\4F53", simsun, sans-serif;
  color:#666;
  background: #eee;
}
body,ul,ol,li,p,h1,h2,h3,h4,h5,h6,form,fieldset,table,td,img,div{
  margin:0;padding:0;border:0;
}
ul,ol{
    list-style-type:none;
}
select,input,img,select{
    vertical-align:middle;
}
a{text-decoration:none;}
a:link{color:#009;}
a:visited{color:#666;}
a:hover,a:active,a:focus{color:#c00;text-decoration:underline;}
/*头部*/
.navbar .navbar-brand{
  padding-top: 0px;
}
.navbar .navbar-brand img{
  max-height: 50px;
}
/*底部*/
.app-footer .footer{
  padding:30px 0px;
  font-size: 16px;
  color: #999;
  background:#f8f8f8;
}
</style>
