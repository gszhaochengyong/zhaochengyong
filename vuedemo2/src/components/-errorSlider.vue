<template>
  <div>
   <slider animation="fade">
     <slider-item v-for="(i, index) in list" :key="index">
       <div :style="i">
         <p style="line-height: 280px; font-size: 5rem; text-align: center;">Page{{ index + 1 }}</p>
       </div>
     </slider-item>
   </slider>
   <ul>
     <li v-for="item in list">{{item.width}}</li>
   </ul>
  </div>
</template>

<script type="text/javascript">
import { Slider, SliderItem } from 'vue-easy-slider'
  export default({
    name: 'slider',
    components: {
      Slider,
      SliderItem
    },
    data () {
      return {
        list: [
          { backgroundColor: '#3f51b5', width: '100%', height: '100%' },
          { backgroundColor: '#eee', width: '100%', height: '100%' },
          { backgroundColor: '#f44336', width: '100%', height: '100%' },
        ]
      }
    }
  })
</script>