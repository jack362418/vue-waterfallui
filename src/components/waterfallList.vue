<template>
  <div class="waterfallList" ref='waterfallList' style="position: relative;padding:0 15px;"> 
      <div class="col" ref="orginFall" style="display:flex;flex-wrap:wrap;justify-content:space-between;">
          <template v-for="(item,index) in content"> 
              <div :key="index" class="fall_col">
                  <div ref="waterfallDom"  class="box" > 
                     <slot :item="item" :index='index'></slot>
                 </div>
              </div>
          </template>  
     </div>
    <div ref="placeholder_bottom" style="height: 0;">&nbsp;</div>
  </div>
</template>
<script>  
export default {  
    props:{
        // 列数
        columnCount: {
            type: Number,
            default: 2,
        },
        // 数据
        content: {
            type: Array,
            default: () => [],
        },
        // 结束加载
        finished: {
            type: Boolean,
            default: false
        },
        // 偏移量
        offset: {
            type: [Number, String],
            default: 20
        },
        // 每行底部间隔
        bottomH:{
            type: Number,
            default: 20,
        }
    },
    data() {
        return {
            contentHeights:[],
            initDateStyle:[],
            isTouch:false,
            columnArr: [],
            isInit:true,
            lock:true,
            nextFn:null,
            execute:[]
        }
    }, 
    mounted() {   
        this.nextFn = this.renderList()
        this.scrollTarget = this.getScrollParentNode(this.$el) 
        this.scrollTarget.addEventListener('scroll', this.check)
    },
    watch:{
        content(value = []) { 
            if (!value.length) return
            // 防止更新频繁多次触发renderlist挤掉上个执行未完成的promise 储存promise执行栈
            this.execute.push(this.renderList)
            this.$nextTick(() => { 
                if(this.nextFn) {
                    this.nextFn.then(res => { 
                        // 按照顺序依次执行promise执行栈
                        this.executeCb()
                    })
                } 
            })
        },
        finished: 'check'
    },
    methods: {
        executeCb() {
            if(this.execute.length) {
                let proFn = this.execute[0]
                proFn().then(resolve => {
                    this.execute.shift()
                    this.isInit = false
                    this.isTouch = false
                    this.executeCb()
                })
            }
              
        },
        check() { 
            if(this.finished || this.isTouch) {
                return;
            }
            if(!this.scrollTarget) {
                this.scrollTarget = this.getScrollParentNode(this.$el) 
            } 
            let bounding = {
                top: 0,
                bottom: this.scrollTarget.innerHeight || 0,
            }
            if (this.$refs.placeholder_bottom.getBoundingClientRect) {
                bounding = this.$refs.placeholder_bottom.getBoundingClientRect()
            }  
           
            const container = this.scrollTarget.innerHeight || this.scrollTarget.clientHeight
 
            const distance = bounding.bottom - container - this.offset 
            if (distance < 0) {  
                // 发布事件
                this.$emit('load') 
                // 防止多次触发
                this.isTouch = true
                this.isInit = false
            }
        },
          // 获取滚动的父级元素
        getScrollParentNode(el) {
            let node = el
            while (node.nodeName !== 'HTML' && node.nodeName !== 'BODY' && node.nodeType === 1) {
                const parentNode = node.parentNode
                const { overflowY } = window.getComputedStyle(parentNode)
                if (
                (overflowY === 'scroll' || overflowY === 'auto') &&
                    parentNode.clientHeight != parentNode.scrollHeight
                ) {
                    return parentNode
                }
                    node = parentNode
            }
            return window
        },
        async renderList() { 
            const waterfallDom = this.$refs.waterfallDom 
            let arr = []  
            let count = 0 
            return new Promise(resolve => {  
                if(waterfallDom && waterfallDom.length) {
                    waterfallDom.forEach(item => {  
                        if(!item.getAttribute('isreder')) {   
                            let pm = this.getNodeHeight(item)
                            arr.push(pm)  
                            pm.then(res => {
                                count += 1  
                                if(count == arr.length) {
                                    this.promiseCb(arr,waterfallDom)
                                    resolve(true)
                                }
                            }) 
                        } 
                    })         
                }else {
                    this.check()
                    resolve(true)
                }
            })
           
        },
        promiseCb(arr,waterfallDom) {
            Promise.all(arr).then(res => {  
                this.contentHeights = [] 
                if(this.isInit || !this.columnArr.length) { 
                    this.initDateStyle = res.slice(0,this.columnCount)  
                } 
                res.forEach(item => {
                    this.contentHeights.push(item.height)
                })   
                this.setNodeStyle(waterfallDom)
            }).catch(err => { 
                new Error(err)
            })
        },
        getNodeHeight(item) {
            return new Promise((res,rej) => {
                let domImg = item.querySelectorAll('img') 
                let count = 0;
                [...domImg].forEach(it => {
                    let imgPm = this.imgOnload(it)
                    imgPm.then(() => {
                        count += 1 
                        if(count == domImg.length) {
                             res(item.getBoundingClientRect())
                        }
                    }) 
                }) 
            }) 
        },
        // 加载多个图片
        imgOnload(it) {
            return new Promise((res,rej) => {
                it.onload = () => {
                    res(true)
                }
                it.onerror = (err) => {
                    rej(err)
                } 
            }) 
        },
        setNodeStyle() {   
            if(!this.columnArr.length) {
                 this.columnArr = this.contentHeights.slice(0,this.columnCount) 
            }  
            this.$refs.waterfallDom.forEach((item,index) => {  
                if(index >= this.columnCount) {
                    if(!item.getAttribute('isreder')){ 
                        if(this.initDateStyle.length) {
                            let minHeight = Math.min.apply(null,this.columnArr)
                            let minIndex = this.columnArr.indexOf(minHeight) 
                            let boxDom = item.getBoundingClientRect()
                            item.style.position = 'absolute' 
                            item.style.left = this.initDateStyle[minIndex].left + 'px'
                            item.style.top = minHeight + this.bottomH + 'px' 
                            this.columnArr[minIndex] += boxDom.height + this.bottomH 
                            item.setAttribute('isreder',true)
                        }else {
                             this.columnArr = []
                             this.initDateStyle = []
                             this.isInit = true
                             this.renderList()
                        }     
                    } 
                }else {
                    item.style.position = 'absolute' 
                    item.style.left = this.initDateStyle[index].left + 'px'
                    item.setAttribute('isreder',true)
                } 
            })   
            this.$refs.orginFall.style.height = Math.max.apply(null,this.columnArr) + 'px'
        }
    }, 
    beforeDestroy() {
        this.scrollTarget.removeEventListener('scroll', this.check) 
    },
};
</script> 
<style>
.box > div{
    width: 340px;
}
</style>