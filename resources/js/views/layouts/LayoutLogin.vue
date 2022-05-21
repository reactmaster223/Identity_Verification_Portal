<template>
  <div
    v-if="loading == false"
    class="page-style1 page-style2 light-mode default-sidebar"
  >
    <div class="d-md-flex">
      <div class="w-40 bg-style h-100vh page-style">
        <div class="page-content">
          <div class="page-single-content">
            <div>
              <img
                src="/assets/assets/images/brand/logo.png"
                alt="img"
                class="header-brand-img mb-5"
              />
              <span class="header-brand-title">管理平台</span>
            </div>
            <div class="card-body text-white py-5 px-8 text-center">
              <img
                src="/assets/assets/images/png/3.png"
                alt="img"
                class="w-100 mx-auto text-center"
              />
            </div>
          </div>
        </div>
      </div>
      <router-view @loadingTrue="onLoadingTrue" />
    </div>
  </div>
  <fade-loader v-else :loading="loading" class="auth_spinner"></fade-loader>
</template>

<script>
import FadeLoader from "vue-spinner/src/FadeLoader.vue";
export default {
  data() {
    return {
      loading: false,
    };
  },
  components: {
    FadeLoader,
  },
  created() {
    this.loading = false;
  },
  computed: {},
  methods: {
    onLoadingTrue(e) {
      this.loading = e;
    },
  },
};
</script>

<style scoped>
.login-page .logo-main img {
  height: auto;
  width: 120px;
}
.login-page .login-box {
  color: #fff;
  padding: 20px;
  width: 100%;
  max-width: 600px;
}
.login-page .login-box h1 {
  color: white;
  text-align: center;
}
.header-brand-title {
  position: absolute;
  top: 33px;
  left: 110px;
  font-size: 20px;
  color: rgb(249 243 243);
  font-weight: 700;
}
</style>

<style>
.toast-success {
  background-color: #51a351 !important;
}
.toast-info {
  background-color: #2f96b4;
}
.toast-error {
  background-color: #bd362f !important;
}
.auth_spinner {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
}
.auth_spinner .v-fade {
  height: 15px !important;
  width: 5px !important;
  background-color: rgb(125 188 219) !important;
}
</style>
