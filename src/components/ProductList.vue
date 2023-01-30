<template>
  <div class="container product__list">
    <ProductCard
      v-for="(product, index) in products"
      :key="product.id"
      :product="product"
      :index="index"
      :show-badge="index < 3"
    />
  </div>
</template>

<script>
import ProductCard from "./ProductCard.vue";

export default {
  name: 'ProductList',
  components: {
    ProductCard
  },
  props: {
    products: {
      type: Array,
      required: false,
      default: () => []
    }
  },
}
</script>

<style scoped>

</style>