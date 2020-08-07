<template>
  <div>
    <router-view v-wechat-title="$route.meta.name" />
    <live2D />
  </div>
</template>

<script>
import Live2D from '@/components/Live2D/index.vue'
export default {
  name: 'App',
  components: {
    Live2D
  }
}
</script>
