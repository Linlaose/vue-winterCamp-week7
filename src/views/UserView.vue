<script>
import { RouterView } from 'vue-router';
import Navbar from '@/components/NavbarComponent.vue';

export default {
  components: {
    RouterView,
    Navbar,
  },
};
</script>

<template>
  <navbar />
  <router-view />
</template>
