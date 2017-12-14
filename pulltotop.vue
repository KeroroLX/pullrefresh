<template lang="html">
    <div class="lxScroll"
         @touchstart='touchStart($event)'
         @touchmove='touchMove($event)'
         @touchend='touchEnd($event)'>
        <section class='inner'>
            <slot name='content'></slot>
            <footer class="load-more" v-if='moreFlag' style='color: #555' >
                <slot name="load-more">
                     <span>{{loadStr}}</span>
                     <span></span>
                </slot>
            </footer>
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
    /*.lxScroll .inner ul{*/
        /*margin-bottom: 70px;*/
    /*}*/
    .load-more{
        /*margin-top: -75px;*/
        /*z-index: 56;*/
        text-align: center;
        color: #eee;
        font-size: 14px;
    }
</style>

<script>
    export default {

        props: {
            nomore: {
                type:Boolean,
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

                loadStr:'',
                moreFlag:true,

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
            },
            touchStart:function(e) {
                this.init();//重置高
                this.starttouchY = e.changedTouches[0].pageY;
            },
            touchMove:function(e) {
                var moveY=e.changedTouches[0].pageY;
                if((this.starttouchY-moveY)<0){
                    this.moreFlag=false;
                }else{
                    this.moreFlag=true;
                }

                if(this.nomore){
                    this.loadStr='没有更多数据了'
                }else{
                    this.loadStr='放开刷新数据'
                }
            },
            touchEnd:function(e) {

                this.endtouchY = e.changedTouches[0].pageY;
                var targetY=this.starttouchY-this.endtouchY;//  >0 向上滑
                var minH=this.innerH-this.endtouchY-600;
                if(minH<this.lxScrollH&&targetY>10){
                    this.$emit('listenToTop')//事件分发，触发，让父组件执行某事件
                }
                else if(targetY<-10){
                    this.$emit('listenToDown')
                }
                this.loadStr='上拉刷新'
                this.moreFlag=false;
            },
        },
        components: {}
    }
</script>