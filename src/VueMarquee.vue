<template>
    <div class="zzui-broadcast-window" :style="{height: height + 'px'}">
        <ul class="zzui-broadcast-container" ref="container">
            <slot></slot>
        </ul>
    </div>
    
</template>
<script>
export default{
    data (){
        return {
            height: '',
            length: 0,
            currentIndex: 0,
            timer: null
        }
    },
    props: {
        interval: {
            type: Number,
            default: 3000 //ms
        },
        duration: {
            type: Number,
            default: 600 //ms
        },
        direction: {
            validator (val){
                return val === 'up' || val === 'down';
            },
            default: 'up'
        }
    },
    mounted (){
        this.fixList();
        this.start();
    },
    destroyed () {
        clearInterval(this.timer)
    },
    methods: {
        /*
         * 根据方向将第一个或最后一个item复制添加到列表最后或前面，保证下一次轮播连贯
         * 将单个item高度设置为广播视窗高度
         */
        fixList (){
            let cloneNode,
                firstItem = this.$refs.container.firstElementChild;

            // 根据item高度设置视窗container高度
            this.length = this.$refs.container.children.length;

            if(this.direction === 'up'){
                // 向上则clone第一个item置于列表末端
                cloneNode = firstItem.cloneNode(true);
                this.$refs.container.appendChild(cloneNode);
            }else{
                // 向下则clone最后一个item置于列表首部
                cloneNode = this.$refs.container.lastElementChild.cloneNode(true);
                this.$refs.container.insertBefore(cloneNode, firstItem);
            }

            this.$nextTick(()=>{
                // 用总高度/length，减小较小
                this.height = this.$refs.container.offsetHeight / (this.length + 1);
            });
        },
        /*
         * 启动轮播
         */
        start (){
            let currenTransitionTime,
                currenTranslateY;

            // 方向向下，列表初始时跳转到最后item
            if(this.direction === 'down')this.quickJump(false);

            this.timer = setInterval(()=>{
                if(this.direction === 'up'){
                    this.currentIndex += 1;
                }else{
                    this.currentIndex -= 1;
                }

                // 正常轮播transition时间为用户设置duration时间
                currenTransitionTime = 'transform ' + this.duration+ 'ms ease-in-out';
                this.setTransition(this.$refs.container, currenTransitionTime);

                // 正常轮播每次currenTranslateY增加一个item高度
                if(this.direction === 'up'){
                    currenTranslateY = -this.currentIndex * this.height + 'px';
                }else{
                    currenTranslateY = - (this.currentIndex + 1) * this.height + 'px';
                }

                this.setTransform(this.$refs.container, 'translate3d(0,' + currenTranslateY + ',0)');

                // 当滑动到首尾边界替补item时，需即刻跳转到正确item位置
                if(this.currentIndex == this.length){
                    setTimeout(()=>{
                        this.quickJump(true);
                    }, this.duration);
                }else if(this.currentIndex == -1){
                    setTimeout(()=>{
                        this.quickJump(false);
                    }, this.duration);
                }
            }, this.interval + this.duration);
        },
        /*
         * 设置transition 0ms，再设置translatet位置启动跳转
         * 由于跳转前后展现的内容完全一样，肉眼看不到跳转过程
         */
        quickJump (toFirst){            
            let currenTranslateY,
                currenTransitionTime = 'transform 0ms ease-in-out';

            this.setTransition(this.$refs.container, currenTransitionTime);

            if(toFirst){
                // 跳转到首个item
                this.currentIndex = 0;
                currenTranslateY = '0px';
            }else{
                this.currentIndex = this.length - 1;
                currenTranslateY = - (this.currentIndex + 1) * this.height + 'px';
            }
            
            this.setTransform(this.$refs.container, 'translate3d(0,' + currenTranslateY + ',0)');
        },
        /*
         * transition添加浏览器前缀
         * transform同
         */
        setTransition (ele, val){
            ele.style.transition = val;
            ele.style.WebkitTransition = '-webkit-' + val;
            ele.style.MozTransition = '-moz-' + val;
            ele.style.OTransition = '-o-' + val;
        },
        setTransform (ele, val){
            ele.style.transform = val;
            ele.style.WebkitTransform = val;
            ele.style.MozTransform = val;
            ele.style.OTransform = val;
        }
    }
}
</script>
<style lang="less">
    .zzui-broadcast-window{
        width: 100%;
        overflow: hidden;
        transform: translateZ(0);
        height: 100%;
        .zzui-broadcast-container{
            padding: 0;
            margin: 0;
            width: 100%;
            height: auto;
            li{
                margin: 0;
            }
        }
    }
</style>
