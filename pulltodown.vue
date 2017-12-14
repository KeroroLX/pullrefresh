<template lang="html">
    <div class="lxScroll"
         @touchstart='touchStart($event)'
         @touchmove='touchMove($event)'
         @touchend='touchEnd($event)'>
        <section class='inner'>
            <header class="load-more" v-if='moreFlag'>
                <slot name="load-more">
                    <span>{{loadStr}}</span>
                </slot>
            </header>
            <slot name='content'></slot>

        </section>
    </div>
</template>

<style scoped>
    .lxScroll{
        position: absolute;
        top:0;
        left:0;
        bottom:0;
        right:0;
        background-color: #3BBDEC;
    }
    .lxScroll .inner{
        position: absolute;
        width: 100%;
        top:0px;
        left:0;
        transition-duration: 300ms;
        background-color: navajowhite;
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

                loadStr:'下滑刷新',
                moreFlag:false,

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
                this.lxScrollH=$('.lxScroll').height();//用来判断可视区的
            },
            touchStart:function(e) {
                this.init();//重置高
                this.starttouchY = e.changedTouches[0].pageY;
            },
            touchMove:function(e) {
                this.moreFlag=true;
                if(this.nomore){
                    this.loadStr='没有更多数据了'
                }else{
                    this.loadStr='放开刷新数据'
                }
            },
            touchEnd:function(e) {
                this.endtouchY = e.changedTouches[0].pageY;
                var targetY=this.starttouchY-this.endtouchY;//  >0 向上滑
                if(this.endtouchY<this.lxScrollH&&targetY<-10){
                        this.$emit('listenToBottom')//事件分发，触发，让父组件执行某事件
                }
                this.loadStr='下滑刷新'
                this.moreFlag=false;
            },
        },
        components: {}
    }
</script>