<template>
<div class="Dialog" v-if='isShowDialog'>
  <div class="mask" @click.stop="closeDialog">
    
  </div >
  <div class="content">
    <slot>{{isShowDialog}}</slot>
    <p class="close" @click.stop="closeDialog">X</p>
  </div>
</div>
</template>




<script>

export default ({
  props:[
    'isShowDialog'
  ],
  methods: {
    closeDialog(){
      this.$emit('closeDialogEmit');
    }
  }
})

</script>

<style scoped>
@charset "utf-8";
.mask{
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: 1000;
  background: #000;
  opacity: 0.9;
}

.content{
  width: 40%;
  height: 20%;
  position: absolute;
  left: 50%;
  top: 30%;
  margin-left: -20%;
  background: #fff;
  padding: 15px;
  z-index: 1001;
  opacity: 1;

}
.content p.close{
  color: #000;
  position: absolute;
  right: 1.5%;
  top: 2%;
  opacity: 0.6;
}
</style>
