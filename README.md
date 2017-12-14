# pullrefresh
Based on vue, the upper pull and glide refresh

Use the following（slider）：

1  main.js
import lxpullresh from './../lxpullresh'
Vue.use(lxpullresh)

2  <lx_pulltotop :nomore='nomore' v-on:listenToTop='refreshData'>
            <ul slot='content' class='bannerList'>
                <li v-for='item in listBannerData'>
                   {{item}}
                </li>
            </ul>
   </lx_pulltotop>
3   data: function () {
            return {
                listData:[],
                numberLen:20,
                nomore:false,
            }
        },
        
4  created: function () {
            this.getList();
        },       
5  getList:function(){
                var start=this.numberLen-20;
                for(var i=start;i<this.numberLen;i++){
                    this.listData.push(i);
                }
                console.log(this.listData);
   },
    refreshData:function(){
                if(this.numberLen>=100) return;
                this.numberLen+=20;
                this.getList();
    },
