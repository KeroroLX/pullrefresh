<template lang="html">
    <div class="lxScroll"
         @touchstart='touchStart($event)'
         @touchmove='touchMove($event)'
         @touchend='touchEnd($event)'>
        <section class='inner'>
            <div v-if='refreshFlag' class='load-refresh'><span>刷新中...</span></div>
            <slot name='content'></slot>
            <div class="load-more" v-if='moreFlag' style='color: #555' >
                <span>{{loadStr}}</span>
            </div>
        </section>
    </div>
</template>

<style scoped>
    .lxScroll{
        position: relative;
        top:0;
        left:0;
        bottom:0;
        right:0;
    }
    .lxScroll .inner{
        position: relative;
        width: 100%;
        top:0px;
        left:0;
        transition-duration: 300ms;
    }
    .load-more span,.load-refresh span{
        color:#FF8D27;
        text-align: center;
        display: block;
        font-size: 14px;
    }
</style>

<script>
    export default {
        props: {
            nomore: {
                type:Boolean,
            },
          ifRefresh:{//是否要下滑刷新
            default:true,
          },
        },
        data:function() {
            return {
                top: 0,
                state: 0,
                endtouchY: 0,
                starttouchY: 0,
                touching: false,
                infiniteLoading: false,

                lxScrollH:0,
                innerH:0,
                footerH:0,

                loadStr:'⇣ 数据加载中',
                moreFlag:false,
                refreshFlag:false,
                scrollTop:0,

            }
        },
        created: function () {
          this.init();
        },
        mounted: function () {

        },
        methods: {
            init:function(){
                this.innerH=$('.inner').height();
                this.footerH=$('.footer').height();
                this.lxScrollH=$('.lxScroll ul').height();//用来判断可视区的
                this.scrollTop=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop;
            },
            touchStart:function(e) {
                this.init();//重置高
                this.starttouchY = e.changedTouches[0].pageY;
            },
            touchMove:function(e) {
                var moveY=e.changedTouches[0].pageY;
                if((this.starttouchY-moveY)<0){
                    //下滑
                  if(!this.ifRefresh||this.ifRefresh=='false') return;
                    this.refreshFlag=true;
                }else{
                    //上滑
                    this.moreFlag=true;
                }

                if(this.nomore){
                    this.loadStr='☺ 没有更多数据了'
                }else{
                    this.loadStr='⇣ 数据加载中'
                }
            },
            touchEnd:function(e) {
                this.endtouchY = e.changedTouches[0].pageY;
                var targetY=this.starttouchY-this.endtouchY;//  >0 向上滑
                var minH=this.innerH-this.endtouchY-600;
//                console.log(targetY);//方向
                if(minH<this.lxScrollH&&targetY>10){
                  this.$emit('listenToTop')//事件分发，触发，让父组件执行某事件
                }
                else if(targetY<-10&&this.scrollTop<150){
                    this.$emit('listenToDown')
                }
                this.moreFlag=false;
                this.refreshFlag=false;
            },
        },
        components: {}
    }
</script>
