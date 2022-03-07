<template>
  <div id="app"> 
    <div>
      <vueWaterfall :content='content' :finished='finished'  @load="getTripList"> 
        <template v-slot="{ item,index }"> 
            <div class="testWatefall"> 
              <img :src="item.path" alt="" class=""> 
              <span class="title">{{ item.title }} {{ index }}</span>  
              <img src="https://img12.360buyimg.com/img/s88x28_jfs/t1/146453/17/3463/2553/5f165cc2E2cefcb9b/a5d5ac58ad1436b7.png" alt="">
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
          path:"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.pconline.com.cn%2Fimages%2Fupload%2Fupc%2Ftx%2Fphotoblog%2F1707%2F18%2Fc0%2F53025210_1500312168299.jpg&refer=http%3A%2F%2Fimg.pconline.com.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1643426305&t=6bf057b85da2baf37e8abc48f1768440",
          title:"新款第3代车载手机支架车载后视镜手机支架导航支架多功能车载手机支架汽车用品后视镜挂架多功能热门同款 第3代【创意款】不遮视线/用坏免费换新",
          id:7+i
        }
        if(i % 2 != 0) {
          obj.title = '【驱寒神器】锐舞 热水袋暖手宝暖宝宝暖水袋电暖宝大姨妈神器热敷充电式暖手暖脚暖宫暖腰石墨烯保暖神器 无水加热|持久恒温'
          obj.path = 'https://img10.360buyimg.com/mobilecms/s360x360_jfs/t1/204541/35/17078/91200/61a4521aEa808663f/d46247ae4de8d00d.jpg!q70.dpg.webp'
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
