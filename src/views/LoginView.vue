<script>
export default {
  data() {
    return {
      user: {},
    };
  },
  methods: {
    login() {
      const { VITE_API } = import.meta.env;

      const url = `${VITE_API}/v2/admin/signin`;
      const data = this.user;

      this.$http
        .post(url, data)
        .then((res) => {
          const { token, expired } = res.data;
          document.cookie = `hexToken=${token};expires=${new Date(expired)}`;
          this.$router.push('/admin');
        })
        .catch((err) => {
          alert(err);
        });
    },
  },
};
</script>

<template>
  <div class="container mt-5">
    <form class="row justify-content-center" @submit.prevent="login">
      <div class="col-md-6">
        <h1 class="h3 mb-3 font-weight-normal">請先登入</h1>
        <div class="mb-2">
          <label for="inputEmail" class="sr-only">Email address</label>
          <input
            type="email"
            id="inputEmail"
            class="form-control"
            placeholder="Email address"
            required
            autofocus
            v-model="user.username"
          />
        </div>
        <div class="mb-2">
          <label for="inputPassword" class="sr-only">Password</label>
          <input
            type="password"
            id="inputPassword"
            class="form-control"
            placeholder="Password"
            required
            autocomplete=""
            v-model="user.password"
          />
        </div>
        <div class="text-end mt-4">
          <!-- <router-link to="/admin/"> -->
          <button class="btn btn-lg btn-primary btn-block" type="submit">
            登入
          </button>
          <!-- </router-link> -->
        </div>
      </div>
    </form>
  </div>
</template>
