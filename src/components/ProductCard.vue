<template>
  <div class="product__card">
    <div class="product__header">
      <img class="product__image" :src="product.images[0]" alt="product-image" />
      <Badge
        v-if="showBadge"
        :class="`${badgePosition[index]} ${badgeColor[index]}`"
      >
        {{ badgeLabel[index] }}
      </Badge>
    </div>

    <div class="product__info">
      <InfoItem
          v-for="(key, index) in infoKeys"
          :key="index"
          :label="key"
          :value="product[key]"
      />
    </div>
  </div>
</template>

<script>
import InfoItem from "./InfoItem.vue";
import Badge from "./ui/Badge.vue";

export default {
  name: 'ProductCard',
  components: {
    Badge,
    InfoItem
  },
  props: {
    product: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    },
    showBadge: {
      type: Boolean,
      required: true
    }
  },
  data: () => {
    return {
      badgePosition: ['badge--top-left', 'badge--top-middle', 'badge--bottom-right'],
      badgeLabel: ['top', 'sale', 'popular'],
      badgeColor: ['badge--red', 'badge--yellow', 'badge--purple'],
      infoKeys: ['brand', 'category', 'description', 'stock']
    }
  }
}
</script>

<style scoped>

</style>