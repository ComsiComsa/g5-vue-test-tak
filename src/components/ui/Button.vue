<template>
  <button class="btn btn--white" @click="callback($event)" :disabled="loading" >
    <slot>Button</slot>
  </button>
</template>

<script>
export default {
  name: 'Button',
  props: ['loading'],
  methods: {
    callback (e) {
      this.$emit('click', e)
    }
  }
}
</script>
