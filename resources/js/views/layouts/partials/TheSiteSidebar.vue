<template>
  <div>
    <div class="app-sidebar app-sidebar2">
      <div class="app-sidebar__logo">
        <span class="main_brand" style="cursor: pointer">
          <img
            src="/assets/assets/images/brand/logo.png"
            class="header-brand-img desktop-lgo"
            alt="Dashtic logo"
          />
          <img
            src="/assets/assets/images/brand/logo.png"
            class="header-brand-img dark-logo"
            alt="Dashtic logo"
          />
          <img
            src="/assets/assets/images/brand/logo.png"
            class="header-brand-img mobile-logo"
            alt="Dashtic logo"
          />
          <img
            src="/assets/assets/images/brand/logo.png"
            class="header-brand-img darkmobile-logo"
            alt="Dashtic logo"
          />
          <h4 class="main-brand_title desktop-lgo">管理平台</h4>
        </span>
      </div>
    </div>
    <aside class="app-sidebar app-sidebar3">
      <div class="app-sidebar__user">
        <div class="dropdown user-pro-body text-center">
          <div class="user-pic">
            <img
              :src="avatar"
              alt="user-img"
              class="avatar-xl rounded-circle mb-1"
            />
          </div>
          <div class="user-info">
            <h5 class="mb-1 font-weight-bold">
              {{ name }}
            </h5>
            <span class="text-muted app-sidebar__user-name text-sm">{{
              role_val
            }}</span>
          </div>
        </div>
      </div>
      <ul class="side-menu">
        <li class="slide side-nav">
          <v-collapse accordion>
            <v-collapse-item active-url="/admin/dashboard">
              <router-link
                v-if="
                  user_role === 'admin' ||
                  user_role === 'regional_admin' ||
                  user_role === 'company_admin'
                "
                slot="item-title"
                to="/admin/dashboard/basic"
                class="side-menu__item"
              >
                <svg
                  class="side-menu__icon"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="26"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path
                    d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"
                  ></path>
                  <polyline points="9 22 9 12 15 12 15 22"></polyline></svg
                ><span class="side-menu__label">仪表盘</span>
              </router-link>
            </v-collapse-item>

            <v-collapse-item active-url="/admin/users">
              <a slot="item-title" href="#" class="side-menu__item">
                <svg
                  class="side-menu__icon"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg
                ><span class="side-menu__label">员工管理</span>
                <span class="icon-fa arrow icon-fa-fw side-menu__label" />
              </a>
              <router-link
                v-if="
                  user_role === 'admin' ||
                  user_role === 'regional_admin' ||
                  user_role === 'company_admin'
                "
                to="/admin/users/all"
                class="side-menu__item sub_menu_item side-menu__label"
              >
                <span><i class="fa-solid fa-angles-right"></i>所有用户</span>
              </router-link>

              <router-link
                :to="'/admin/users/profile/' + user_id"
                class="side-menu__item sub_menu_item side-menu__label"
              >
                <span><i class="fa-solid fa-angles-right"></i>个人信息</span>
              </router-link>

              <router-link
                to="/admin/users/verification"
                class="side-menu__item sub_menu_item side-menu__label"
              >
                <span><i class="fa-solid fa-angles-right"></i>从业者验证</span>
              </router-link>

              <router-link
                to="/admin/users/health_status"
                class="side-menu__item sub_menu_item side-menu__label"
              >
                <span><i class="fa-solid fa-angles-right"></i>健康状况</span>
              </router-link>
            </v-collapse-item>

            <v-collapse-item active-url="/admin/settings">
              <a slot="item-title" href="#" class="side-menu__item">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="side-menu__icon"
                >
                  <line x1="4" y1="21" x2="4" y2="14"></line>
                  <line x1="4" y1="10" x2="4" y2="3"></line>
                  <line x1="12" y1="21" x2="12" y2="12"></line>
                  <line x1="12" y1="8" x2="12" y2="3"></line>
                  <line x1="20" y1="21" x2="20" y2="16"></line>
                  <line x1="20" y1="12" x2="20" y2="3"></line>
                  <line x1="1" y1="14" x2="7" y2="14"></line>
                  <line x1="9" y1="8" x2="15" y2="8"></line>
                  <line x1="17" y1="16" x2="23" y2="16"></line></svg
                ><span class="side-menu__label">系统管理</span>
                <span class="icon-fa arrow icon-fa-fw side-menu__label" />
              </a>
              <router-link
                v-if="
                  user_role === 'admin' ||
                  user_role === 'regional_admin' ||
                  user_role === 'company_admin'
                "
                to="/admin/new_user"
                class="side-menu__item sub_menu_item side-menu__label"
              >
                <span style="left: 20px"
                  ><i class="fa-solid fa-angles-right"></i>新增用户</span
                >
              </router-link>

              <router-link
                v-if="user_role === 'admin' || user_role === 'regional_admin'"
                to="/admin/new_admin_user"
                class="side-menu__item sub_menu_item side-menu__label"
              >
                <span style="left: 20px"
                  ><i class="fa-solid fa-angles-right"></i>新增管理员</span
                >
              </router-link>

              <router-link
                v-if="user_role === 'admin'"
                to="/admin/region_management"
                class="side-menu__item sub_menu_item side-menu__label"
              >
                <span style="left: 15px"
                  ><i class="fa-solid fa-angles-right"></i>区域管理</span
                >
              </router-link>

              <router-link
                v-if="user_role === 'regional_admin'"
                :to="'/admin/regions/' + region_id"
                class="side-menu__item sub_menu_item side-menu__label"
              >
                <span style="left: 15px"
                  ><i class="fa-solid fa-angles-right"></i>区域管理</span
                >
              </router-link>
            </v-collapse-item>
          </v-collapse>
        </li>
      </ul>
    </aside>
  </div>
</template>

<script>
import Ls from "./../../../services/ls.js";
export default {
  props: ["user_avatar"],
  watch: {
    user_avatar: function (newVal, oldVal) {
      if (newVal != "") {
        this.avatar = newVal;
      }
    },
  },
  data() {
    return {
      lang_set: "",
      user_id: "",
      user_role: "",
      role_val: "",
      avatar: "",
      name: "",
      region_id: "",
    };
  },
  created() {
    this.user_id = Ls.get("user_id");
    this.user_role = Ls.get("Role");
    if (this.user_avatar != "") {
      this.avatar = this.user_avatar;
    } else {
      this.avatar = "/assets/img/default-user-avatar.jpg";
    }
    this.name = Ls.get("Name");
    this.region_id = Ls.get("User Region ID");
    this.setMemberProperty();
  },
  methods: {
    setMemberProperty() {
      if (this.user_role == "admin") {
        this.role_val = "系统总管理员";
      } else if (this.user_role == "regional_admin") {
        this.role_val = "区域管理员";
      } else if (this.user_role == "company_admin") {
        this.role_val = "各养老服务单位";
      } else {
        this.role_val = "从业者";
      }
    },
  },
};
</script>
<style scoped>
.width_toggle-disable {
  width: 250px !important;
  transition: ease 0.3s all;
}
.width_toggle-enable {
  width: 0px !important;
  transition: ease 0.3s all;
}
.display_none {
  display: none;
}
.active .side-menu__label {
  color: #4454c3 !important;
}
.active .arrow {
  color: #4454c3 !important;
}
.sub_menu_item {
  text-align: left;
}
.sub_menu_item span {
  position: relative;
  left: 25px;
  font-size: 13px;
}
.sub_menu_item i {
  font-size: 11px !important;
}
.sub_menu_item span:hover {
  color: #4454c3 !important;
}
.main_brand {
  display: flex;
  align-items: center;
  justify-content: center;
}
.main_brand img {
  margin-right: 10px;
}
.main-brand_title {
  color: rgb(80 74 74);
  font-weight: 700;
  margin-bottom: 0px !important;
}
.app-sidebar__logo {
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
}
</style>

<style>
.active .collapse-item-title {
  background-color: rgb(226 237 255) !important;
}
.active .collapse-group-items .active {
  background-color: rgb(180 201 235) !important;
  margin-left: 5px !important;
  margin-right: 5px !important;
}
</style>
