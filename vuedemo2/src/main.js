// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import $ from 'jquery'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min'
import Router from 'vue-router'
import VSource from 'vue-resource'

import Layout from './components/Layout'
import router1 from './pages/router1'
import router2 from './pages/router2'
import router3 from './pages/router3'
import router11 from './pages/router11'

Vue.config.productionTip = false

Vue.use(Router);
Vue.use(VSource);
let router = new Router({
	mode: 'history',
	routes: [
	  {
	  	path: '/',
	  	redirect: '/1'
	  	/* children: [
	  	  {
	  	  	path: '11',
	  	  	component : router11
	  	  }
	  	] */
	  },
	  {
	  	path: '/1',
	  	// redirect: '/1',
	  	component: router1
	  },
	  {
	  	path: '/2',
	  	component: router2
	  },
	  {
	  	path: '/3',
	  	component: router3
	  }
	]
})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  // render: h => app(h),
  components: { Layout },
  template: '<Layout/>'
})
