<template>
  <div>
    <header class="header">
      <div class="header__wrapper container">
        <div class="header__logo">
          <img src="@/assets/svg/Logo.svg" />
        </div>

        <div class="header__button">
          <Button
            @click="buttonClick"
            :loading="fetchingProducts || !productListRendered"
          >
            Update Products
          </Button>
        </div>
      </div>
    </header>

    <Slider
        v-if="sliderRendered"
        v-bind:slides="slides"
    />

    <ProductList
      v-if="productListRendered"
      v-bind:products="products"
    />
  </div>
</template>

<script>
import Button from "../components/ui/Button.vue";
import Slider from "../components/Slider.vue";
import ProductList from "../components/ProductList.vue";

import ImageService from "../api/ImageService.js";
import ProductService from "../api/ProductService.js";
import { checkIfValidImage } from "../utilities/images.js";
import { setCookie, getCookie } from "../utilities/cookies.js";

export default {
  name: 'Home',
  components: {
    ProductList,
    Slider,
    Button
  },
  data: () => {
    return {
      IMAGES_COOKIE_NAME: 'g5images',
      STORAGE_PRODUCTS_KEY: 'g5products',
      sliderRendered: false,
      slides: [],
      productListRendered: false,
      fetchingProducts: false,
      products: [],
      decreaseInterval: null
    }
  },
  methods: {
    buttonClick () {
      this.getProducts()
    },

    initPage () {
      this.initSlider()
      this.initProductsList()
    },

    async initSlider() {
      const images = getCookie(this.IMAGES_COOKIE_NAME)

      if (images) {
        this.slides = images
      } else {
        await this.getImagesForSlider()
        setCookie(this.IMAGES_COOKIE_NAME, JSON.stringify(this.slides))
      }

      this.sliderRendered = true
    },

    async getImagesForSlider () {
      const images = []

      while (images.length < 10) {
        const response = await ImageService.getImage()

        if (checkIfValidImage(response.data.url)) {
          images.push({ src: response.data.url })
        }
      }

      this.slides = images
    },

    async initProductsList() {
      const items = localStorage.getItem(this.STORAGE_PRODUCTS_KEY)

      if (items) {
        this.products = JSON.parse(items)
      } else {
        await this.getProducts()
      }

      this.productListRendered = true

      if (!this.decreaseInterval) {
        this.dynamicallyDecreaseProductStocks()
      }
    },

    async getProducts() {
      this.fetchingProducts = true
      const response = await ProductService.getProducts()

      if (response?.data?.products) {
        this.products = response.data.products
        localStorage.setItem(this.STORAGE_PRODUCTS_KEY, JSON.stringify(this.products))
      }

      this.fetchingProducts = false
      clearInterval(this.decreaseInterval)
      this.dynamicallyDecreaseProductStocks()
    },

    dynamicallyDecreaseProductStocks() {
      this.decreaseInterval = setInterval(() => {
        let allProductsEmpty = true

        for (const product of this.products) {
          if (Math.random() < 0.5 && product.stock > 0) {
            product.stock -= 1
          }

          if (product.stock > 0 && allProductsEmpty) {
            allProductsEmpty = false
          }
        }

        if (allProductsEmpty) {
          clearInterval(this.decreaseInterval)
        }
      }, 1000)
    }
  },
  mounted() {
    this.initPage()
  },
  beforeDestroy() {
    clearInterval(this.decreaseInterval)
  }
}
</script>
