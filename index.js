/**
 * Created by linxue on 2017/8/1.
 */
import pulltodown from './pulltodown.vue'
import pulltotop from './pulltotop.vue'


var lxpullresh = {
    install: function(Vue){
        Vue.component('lx_pulltodown',pulltodown)//定义组件
        Vue.component('lx_pulltotop',pulltotop)
    }
}

// 导出组件
export default lxpullresh