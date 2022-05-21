<template>
  <div class="page-profile" :class="myClass">
    <!-- Page Header  -->

    <div class="page-header">
      <h3 class="page-title">地区 - {{ region_name }} 信息</h3>
    </div>

    <div>
      <b-tabs
        active-nav-item-class="text-uppercase text-warning"
        content-class="mt-3"
      >
        <b-tab active>
          <template #title>
            <span><i class="fa fa-user" aria-hidden="true"></i></span>
            <span>区域管理员</span>
          </template>

          <!-- User Information -->

          <Users
            v-if="region_name != ''"
            :region_name="region_name"
            :toggle="toggle"
          />
        </b-tab>
        <b-tab>
          <template #title>
            <span><i class="fa fa-industry" aria-hidden="true"></i></span>
            <span>区域公司</span>
          </template>
          <RegionComponent
            v-if="region_id"
            :region_id_prop="region_id"
            :region_name="region_name"
          />
        </b-tab>
        <b-tab>
          <template #title>
            <span><i class="fa fa-users" aria-hidden="true"></i></span>
            <span>区域从业者</span>
          </template>
          <Practitioners
            v-if="region_name != ''"
            :region_name="region_name"
            :toggle="toggle"
            :practitioners="practitioners"
          />
        </b-tab>
      </b-tabs>
    </div>
  </div>
</template>
<script>
import Users from "./../users/Users.vue";
import Practitioners from "./../users/Practitioners.vue";
import RegionComponent from "./../users/RegionComponent.vue";
import Ls from "./../../../services/ls.js";
export default {
  props: ["toggle"],
  data() {
    return {
      current_user_role: "",
      region_name: "",
      region_id: 0,
      practitioners: true,
    };
  },
  components: {
    Users,
    RegionComponent,
    Practitioners,
  },
  async created() {
    this.current_user_role = Ls.get("Role");
    this.region_name = this.$route.params.regionName;
    let response = await axios.get(`/api/regionIDWithName/${this.region_name}`);
    this.region_id = response.data;
  },
  computed: {
    myClass() {
      if (this.current_user_role == "practitioner") {
        return "practitioner_content";
      } else if (
        this.current_user_role == "admin" ||
        this.current_user_role == "company_admin" ||
        this.current_user_role == "regional_admin"
      ) {
        if (this.toggle == true) {
          return "role_practitioner";
        } else if (this.toggle == false) {
          return "main-content";
        }
      }
    },
  },
  methods: {},
};
</script>

<style scoped>
.page-profile {
  transition: ease 0.3s all;
}
.practitioner_content {
  padding: 35px 30px 0px 40px;
  min-height: calc(100% - 90px);
}
.role_practitioner {
  padding: 35px 30px 0px 105px;
  min-height: calc(100% - 90px);
}
.page-header {
  text-align: center;
}
</style>
<style>
.nav-tabs .nav-link:hover {
  color: #6b6f80 !important;
}
.nav-tabs .active {
  border: 1px solid #dee2e6 !important;
  border-bottom: 0px !important;
}
@media only screen and (max-width: 500px) {
  .nav-tabs .nav-link {
    width: 119px !important;
  }
}
</style>

<style>
.nav-tabs {
  width: 100%;
  margin: 0px auto;
}
</style>
