<template>
  <section id="live2d-box">
    <canvas id="live2d" :width="280" :height="250" />
  </section>
</template>
<script>
// import { changeModel } from '@/api'
export default {
  // mounted() {
  //   const arr = [
  //     'blanc_classic',
  //     'blanc_normal',
  //     'blanc_swimwear',
  //     'histoire',
  //     'nepgear',
  //     'nepgear_extra',
  //     'nepgearswim',
  //     'nepmaid',
  //     'nepnep',
  //     'nepswim',
  //     'neptune_classic',
  //     'neptune_santa',
  //     'noir',
  //     'noir_classic',
  //     'noir_santa',
  //     'noireswim',
  //     'vert_classic',
  //     'vert_normal',
  //     'vert_swimwear'
  //   ]
  //   let i = 0
  //   setInterval(() => {
  //     window.loadlive2d(
  //       'live2d',
  //       `./live2d/model/HyperdimensionNeptunia/${arr[i]}/index.json`
  //     )
  //     console.log(arr[i])
  //     i++
  //     if (i === arr.length) {
  //       i = 0
  //     }
  //   }, 3000)
  // }
  // name: 'Live2d',
  // data() {
  //   return {
  //     Local: null,
  //     showMsg: false, // 显示信息框
  //     showTools: false, // 显示工具栏
  //     showChatBox: false, // 显示聊天框
  //     modelId: 0,
  //     texturesId: 0,
  //     modelLoading: false,
  //     live2dObj: {
  //       isDrag: false,
  //       distanceX: 0,
  //       distanceY: 0
  //     }
  //   }
  // },
  // methods: {
  //   loadingFinish() {
  //     console.log('live2d', `模型${this.modelId}-${this.texturesId}加载完成`)
  //     this.modelLoading = false
  //   },
  //   async initModel() {
  //     const res = await changeModel({
  //       modelId: this.modelId
  //     })
  //     this.modelId = res.data.modelId
  //     this.texturesId = res.data.texturesId
  //     this.modelLoading = true
  //     const url = `http://dzblog.cn/live2d/model/${this.modelId}/textures/${this.texturesId}`
  //     // eslint-disable-next-line no-undef
  //     loadlive2d('live2d', `./model/ShizukuTalk/shizuku-48.index.json`)
  //   }
  // },
  methods: {
    // async init() {
    //   try {
    //     await import('@/assets/live2d/live2d.js')
    //     window.loadlive2d(
    //       'live2d',
    //       `./model/HyperdimensionNeptunia/blanc_swimwear.index.json`
    //     )
    //   } catch (error) {
    //     console.log('loading false')
    //   }
    // }
  },
  mounted() {
    window.loadlive2d(
      'live2d',
      `./model/HyperdimensionNeptunia/blanc_swimwear.index.json`
    )
  }
}
</script>

<style lang="less">
@import './style.less';
</style>
