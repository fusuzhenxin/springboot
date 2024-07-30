<template>
  <div class="foote">
      <p>技术支持：xxxxxx</p>
      <p>
        <a href="/" target="_blank">xxxxxx</a>     xxx：\
        <a href="/" target="_blank">xxxxxxx</a>
      </p>
      <div class="line"></div>
      <p>xxxxxxxxx</p>
  </div>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style scoped>
.foote {
  background: #fff;
  box-shadow: 0 -1px 3px 0 #e9eaeb;
  color: #B3B8BB;
}
.foote .line {
  height: 0;
  border-bottom: 0.5px solid #f4f4f4;
}
</style>
