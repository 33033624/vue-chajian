import './toast.css'
import A from './itemcontainer.vue'
import Toast from './toast.vue'
// Vue 为在使用Vue.use(Toast) 自动传递进来的
// options是在use的时候传递的第二个参数 如果不传递存在初始值  传递则为传递后的值
export default {
  // install 是vue插件中公开的方法 在调用的过程中 会直接指向该方法
  install: function (Vue, options) {
    let opt = {
      defaultType: 'bottom',
      duration: '2500'
    }

    // 1、以组件的形式注册插件
    Vue.component('A', A)

    // 2、以实例调用的方式注册插件
    // 如果传递进行属性覆盖
    Object.assign(opt, options)
    Vue.prototype.$toast = (tips, type, duration) => {
      if (type) {
          // 如果在实例化的时候参数传递type  defaultType
        opt.defaultType = type
      }
      if (duration) {
        opt.duration = duration
      }
      if (document.getElementsByClassName('lx-toast').length) {
        return
      }

        // 继承该组件
      let ToastTpl = Vue.extend(Toast)

        // 创建实例 并且进行挂载
      let tpl = new ToastTpl({
        el: document.createElement('div')
      })

        // 利用此方式可以设置实例的属性
      tpl.message = tips
      console.log(tpl)

        // 执行$mount手动挂载  但是返回的仍然是vue组件  只有挂载之后才存在真实的$el 也就是dom元素
      let eleDom = tpl.$el
      console.log(tpl.$el)

       // append到body中
      document.body.appendChild(eleDom)

        // 定时移除dom元素
      setTimeout(function () {
        document.body.removeChild(eleDom)
      }, opt.duration)
    }

    // 在原型上添加toast的另一种使用形式  以属性的方式进行使用
    ['bottom', 'center', 'top'].forEach(type => {
      Vue.prototype.$toast[type] = (tips, duration) => {
          // 调用上面已经完成的形式
        return Vue.prototype.$toast(tips, type, duration)
      }
    })

    // 3、自定义指令部分
    Vue.directive('log', {
      bind: function (el, binding, vnode, oldVnode) {
        el.addEventListener('click', function () {
          console.log('click')
        }, false)
      },
      update: function () {
      }
    })
  }
}
