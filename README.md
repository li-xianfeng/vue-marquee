# vue-marquee

基于`vue2`的垂直跑马灯（广播消息轮播组件）


## Install

```npm install vue-marquee```

```
// in ES6 modules
import Marquee from 'vue-marquee';

// in CommonJS
const Marquee = require('vue-marquee');

// in Global variable
const Marquee = VueMarquee.default;  

```


## Usage

```
new Vue({
  el: 'body',
  data: function(){
  	return {
  		listData: ['item1', 'item2', 'item3']
  	}
  },
  components: {
    'vue-marquee': Marquee,
    'item': '你的列表item组件'
  },
  templete: `<vue-marquee :duration="600" :interval="2000">
				<item v-for="i in listData" :content="i"></item>
			 </vue-marquee>`
});


```

## Config(props)
  
| Name          | Type          | Default  | Description |
|:-------------:|:-------------:|:--------:|:-----------:|
| interval     | `Number`  | `3000` | 上一次轮播完成到下一次轮播开始的间隔时间，ms |
| duration     | `Number`| `600`| 轮播过程耗时，ms |
| direction | `String` | `up`| 轮播方向,'up' || 'down' |

## Attention
* 组件内部slot替换的内容应该为item列表，不能套其他标签；
    
```
正确：
<vue-marquee :duration="600" :interval="2000">
	<item v-for="i in listData" :content="i"></item>
</vue-marquee>
  
错误：
<vue-marquee :duration="600" :interval="2000">
	<div class="container">
		<item v-for="i in listData" :content="i"></item>
	</div>
</vue-marquee>
```

* 默认方式向上滑动，若使用向下滑动，需注意列表是由最后一个往前轮播，故需把列表倒叙排列
  
```
// :direction="down"时列表数据顺序与需要展示的数据顺序相反；
// 例如需要按照item1,2,3的顺序轮播，则如下
vm.listData = ['item3', 'item2', 'item1'];
<vue-marquee :direction="down">
	<item v-for="i in listData" :content="i"></item>
</vue-marquee>
``` 