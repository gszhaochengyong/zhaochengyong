<template>
  <div>
    <h4 class="text-left title">请登陆</h4>
     <form class="form-horizontal" role="form">
      <div class="form-group">
        <label for="firstname" class="col-sm-3 control-label">用户名</label>
        <div class="col-sm-5">
          <input type="text" class="form-control" id="firstname" placeholder="请输入用户名……" v-model="username" >
        </div>
         <div class="col-sm-4 info">
      <!--     <span class="text-danger" v-if="{{changeNameInfo.errorInfo}}">{{changeNameInfo.errorInfo}}</span> -->
          <span class="text-danger">{{changeNameInfo.errorInfo}}</span>
        </div>
      </div>
      <div class="form-group">
        <label for="lastname" class="col-sm-3 control-label">密码</label>
        <div class="col-sm-5">
          <input type="text" class="form-control" id="lastname" placeholder="请输入密码……" v-model="password">
        </div>
        <div class="col-sm-4 info">
          <span class="text-danger">{{changePwdInfo.errorInfo}}</span>
        </div>
      </div>
      
      <div class="form-group">
        <div class="col-sm-offset-3 col-sm-2">
          <button type="submit" class="btn btn-default" @click='loginRequest'>登录</button>
        </div>
        <div class="col-sm-offset-0 col-sm-7">
          <button type="submit" class="btn btn-default" @click='resetData'>重置</button>
        </div>
      </div>
    </form>
  </div>
  
</template>




<script>

export default ({
   data() {
     return {
      username: '',
      password: '',
      loginState: false
    }
   },
   methods: {
    resetData() {
      this.username = '', this.password = '';
    },
    loginRequest(){
      //http请求
      this.$http.get('api/login').then(
        function(data) {
        console.log(data);
        },
        function(e){
          // console.log(e);
          this.loginState = true;
          this.$emit("closeDialogEmit",'ShowLog');
          console.log(this.loginState);
        }
      )
    }
   },
   computed: {
      changeNameInfo: function(){
        let status,errorInfo
        if(this.username!=''){
          if (!/\@\w{1,}/g.test(this.username)) {
            return {
              status: false,
              errorInfo: '用户名需包括@'
            }
          }else{
            return {
              status: true,
              errorInfo: 'ok'
            }
          }
        }else{
          return {
              status: false,
              errorInfo: '*'
            }
        }
      },
      changePwdInfo: function(){
        let status,errorInfo
        if(this.password!=''){
          if (!/^\w{3,6}$/g.test(this.password)) {
            return {
              status: false,
              errorInfo: '密码是3到6位之间'
            }
          }else{
            return {
              status: true,
              errorInfo: 'ok'
            }
          }
        }else{
          return {
              status: false,
              errorInfo: '*'
            }
        }
      }
   }
})

</script>

<style scoped>
@charset "utf-8";
h4.title{
  margin-bottom: 10px;
  margin-left: 10px;
}
div.info{
  padding-top: 6px;
}
</style>
