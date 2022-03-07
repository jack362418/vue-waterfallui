# vue-waterfallui
[![npm version](https://img.shields.io/npm/v/vue-waterfallui.svg?style=flat-square)](http://badge.fury.io/js/vue-waterfallui) 
[![npm downloads](https://img.shields.io/npm/dm/vue-waterfallui.svg?style=flat-square)](http://badge.fury.io/js/vue-waterfallui)
![vue](https://img.shields.io/badge/vue-2.0.0-green.svg)

这是一款基于 vue2.x 的轻量级瀑布流插件  

## npm
```bash

npm install --save vue-waterfallui

```
## yarn

```bash

$ yarn add save vue-waterfallui

```
# code

main.js:

```javascript


import Vue from 'vue'
import vueWaterfall from 'vue-waterfallui'
Vue.use(vueWaterfall);

```

template:

```javascript

<template>
  <div id="app"> 
    <div>
      <vueWaterfall :content='content' :finished='finished'  @load="getTripList"> 
        <template v-slot="{ item,index }"> 
            <div class="testWatefall"> 
              <img :src="item.path" alt="" class=""> 
              <span class="title">{{ item.title }} {{ index }}</span>  
              <img src="https:xxxxxxxxxxxxxx.png" alt="">
            </div> 
        </template> 
      </vueWaterfall>  
    </div>
  </div>
</template>
<script>   
export default {   
  data() {
    return {
      date: '',
      show: false,
      content:[],
      loading:false,
      finished:false
    }
  },
   methods: { 
    getTripList() {   
      for(let i = 0; i < 20; i++){
        let obj = {
          path:"https:xxxxx.png",
          title:"新款第3代车载手机支架车载后视镜手机支架导航支架多功能车载手机支架汽车用品后视镜挂架多功能热门同款 第3代【创意款】不遮视线/用坏免费换新",
          id:7+i
        }
        if(i % 2 != 0) {
          obj.title = '【驱寒神器】锐舞 热水袋暖手宝暖宝宝暖水袋电暖宝大姨妈神器热敷充电式暖手暖脚暖宫暖腰石墨烯保暖神器 无水加热|持久恒温'
          obj.path = 'https:xxxxx.png'
        }
        this.content.push(obj)
      }
      this.finished = true
    }
  },
};
</script>

<style lang="less" scoped> 
img{
  width: 100%; 
}
*{
  padding: 0;
  margin: 0;
}
.title{
  font-size: 25px;
}
.testWatefall{
  width:  340px;
  background: #cccc;
  border-radius: 10px;
  overflow: hidden;
  padding: 5px;
  margin-bottom: 10px;
}
</style>

```



### API

| 参数           | 说明                                        | 类型             | 默认值  | 版本 |
| -------------- | ------------------------------------------- | ---------------- | ------- | ---- |
| columnCount            | 列数                                        | `Number`         | 2       | -    |
| content       |  数据列表 | `Array`          | []      | -    |
| finished      |  是否结束加载数据                   | `Boolean`        | `false` | -    |
| offset         | 触发加载的距离阈值，单位为px                          | `Number` | `300`   | -    |
| bottomH       | 每行底部间隔                                  | `Number`        |  20   | -    |

### Event

| 事件名 | 说明                                 | 参数 |
| ------ | ------------------------------------ | ---- |
| load | 滚动条与底部距离小于 `offset` 时触发 | -    | 

### Slot

| 名称    | 说明                 |
| ------- | -------------------- | 
| item    | 单条数据             |
| index   | 当前数据所在列的下标 |