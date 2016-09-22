import Vue from 'vue';
import BroadcastNewsItem from './BroadcastNewsItem.vue';
import Broadcast from '../dist/index.js';
new Vue({
    el: '#app',
    components: {
        'broadcast-news': Marquee,
        'item': BroadcastNewsItem
    },
    data: function(){
        return {
             listData: ['消息1', '消息2', '消息3', '消息4'],
             reverseData: ['消息4', '消息3', '消息2', '消息1']  
        }
    },
    template: `<div><h2>向上</h2>
                <broadcast-news :duration="600" :interval="2000">
                    <item v-for="i in listData" :content="i"></item>
                </broadcast-news>

                <div style="margin-top: 100px"></div>
                <h2>向下</h2>
                <broadcast-news :duration="600" :interval="2000" :direction="'down'">
                    <item v-for="i in reverseData" :content="i"></item>
                </broadcast-news></div>`
});