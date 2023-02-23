<script>
import { RouterLink } from 'vue-router';
import apiStore from '@/store/apiStore';
import { mapState } from 'pinia';

export default {
  components: {
    RouterLink,
  },
  methods: {
    checkUser() {
      const url = `${this.VITE_API}v2/api/user/check`;

      const AUTH_TOKEN = document.cookie.replace(
        // eslint-disable-next-line no-useless-escape
        /(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/,
        '$1'
      );

      this.$http.defaults.headers.common.Authorization = AUTH_TOKEN;

      this.$http
        .post(url)
        .then((res) => {
          const { success, message } = res.data;

          if (!success) {
            alert(message);
            this.$router.push('/');
          }
        })
        .catch((err) => {
          const { message } = err.response.data;
          alert(message);
          this.$router.push('/');
        });
    },
    logout() {
      const url = `${this.VITE_API}v2/logout`;

      this.$http
        .post(url)
        .then((res) => {
          const { message } = res.data;
          alert(message);
          this.$router.push('/');
        })
        .catch((err) => {
          alert(err);
        });
    },
  },
  computed: {
    ...mapState(apiStore, ['VITE_API']),
  },
  mounted() {
    this.checkUser();
  },
};
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <router-link to="/admin" class="navbar-brand">香菇園</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <router-link to="/admin/products" class="nav-link">產品</router-link>
          <router-link to="/admin/orders" class="nav-link">訂單</router-link>
          <router-link to="/admin/coupons" class="nav-link">優惠券</router-link>
          <router-link to="/admin/articles" class="nav-link">貼文</router-link>
          <a href="#" @click.prevent="logout" class="nav-link">登出</a>
        </div>
        <div class="navbar-nav ms-auto">
          <router-link to="/user/articles" class="nav-link">Blog</router-link>
          <router-link to="/user/cart" class="nav-link">購物車</router-link>
        </div>
      </div>
    </div>
  </nav>
</template>
