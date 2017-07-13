<template>
  	<div id='item'>
    <button @click='toast' v-log>点击</button>
    <A></A>
  	</div>
</template>

<script>
import itemcontainer from '../../components/itemcontainer'
import Toast from '../../components/toast.js'
import Vue from 'vue'
Vue.use(Toast,  {
    defaultType: 'top',
    duration: '3000'
})
export default {
  	components: {
   		itemcontainer
  	},
  	created(){
  		this.$store.commit('REMBER_TIME')
  	},
    methods: {
      toast () {
          this.$toast('center', 'center');
      }
   }
}

</script>

<style lang="scss">
    .item{
      height: 400px;
      width: 200px;
      background: red;
    }


</style>
