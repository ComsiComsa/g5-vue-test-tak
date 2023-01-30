<template>
  <div ref="swiper" class="swiper container">
    <div class="swiper-wrapper">
      <div
          v-for="(slide, index) in slides"
          :key="index"
          class="swiper-slide"
      >
        <img class="swiper__image" :src="slide.src" alt="Slider-Image" />
      </div>
    </div>

    <div class="swiper-pagination"></div>
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
    <div class="swiper-scrollbar"></div>
  </div>
</template>

<script>
import Swiper, { Navigation, Pagination } from 'swiper'

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default {
  name: 'Slider',
  props: {
    slides: {
      type: Array,
      required: false,
      default: () => []
    }
  },
  methods: {
    renderSwiper () {
      new Swiper(this.$refs.swiper, {
        modules: [Navigation, Pagination],
        slidesPerView: 1,
        breakpoints: {
          768: {
            slidesPerView: 2
          },
          1440: {
            slidesPerView: 3
          }
        },
        spaceBetween: 30,
        loop: false,
        pagination: {
          el: '.swiper-pagination',
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        scrollbar: {
          el: '.swiper-scrollbar',
        },
      })
    }
  },
  mounted() {
    try {
      this.renderSwiper()
    } catch (e) {
      console.log(e)
    }
  }
};
</script>

<style>
.swiper-button-prev,
.swiper-button-next {
  background-color: rgba(0, 0, 0, .5);
  width: 40px;
  height: 40px;
  top: 45%;
  color: var(--color-white);
  border-radius: 50% 50%;
}

.swiper-button-prev::after,
.swiper-button-next::after {
  font-size: 24px;
}

.swiper__image {
  object-fit: cover;
  width: 100%;
  height: 100%;
}

.swiper-wrapper {
  height: 90%;
}

.swiper-pagination {
  margin-top: 16px;
}
</style>