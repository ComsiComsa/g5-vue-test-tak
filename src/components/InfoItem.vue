<template>
  <div class="product__item">
    <span class="item__label">{{ label }}: </span>
    <span class="item__value">{{ value }}</span>
  </div>
</template>

<script>
export default {
  name: 'InfoItem',
  props: ['label', 'value']
}
</script>

<style scoped>

</style>