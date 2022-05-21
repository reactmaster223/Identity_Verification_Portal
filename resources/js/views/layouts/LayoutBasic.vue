<template>
  <div
    class="template-container app sidebar-mini light-mode default-sidebar"
    id="main_template"
  >
    <div>
      <div class="page-main">
        <site-sidebar
          type="basic"
          v-if="
            user_role === 'admin' ||
            user_role === 'regional_admin' ||
            user_role === 'company_admin'
          "
          :user_avatar="user_avatar"
        />
        <div class="app-content main-content">
          <div class="side-app">
            <site-header
              :user_avatar="user_avatar"
              @occurToggle="onOccurToggle"
              @setUserAvatar="onSetUserAvatar"
            />
          </div>
        </div>
      </div>
    </div>
    <div :class="showToggleButton == true ? 'display_block' : 'display_none'">
      <div
        v-if="
          user_role === 'admin' ||
          user_role === 'regional_admin' ||
          user_role === 'company_admin'
        "
        class="side-bar-toggle d-none d-md-inline"
        :class="toggleEnable == true ? 'side-bar-toggle-enable' : ''"
      >
        <button @click="toggleSidebar" class="heart animated css">
          <i class="fa-solid fa-angles-left"></i>
        </button>
      </div>
    </div>
    <vue-countdown-timer
      v-if="user_role == 'practitioner' || user_role == 'company_admin'"
      @end_callback="endCallBack()"
      :start-time="startTime"
      :end-time="endTime"
      :interval="1000"
      :start-label="'Until start:'"
      :end-label="'登录平台倒计时'"
      label-position="begin"
      :end-text="'时间到!'"
      :day-txt="':'"
      :hour-txt="':'"
      :minutes-txt="':'"
      :seconds-txt="''"
      class="countdown-timer"
    >
      <template slot="start-label" slot-scope="scope">
        <span
          style="color: red"
          v-if="
            scope.props.startLabel !== '' &&
            scope.props.tips &&
            scope.props.labelPosition === 'begin'
          "
          >{{ scope.props.startLabel }}:</span
        >
        <span
          style="color: blue"
          v-if="
            scope.props.endLabel !== '' &&
            !scope.props.tips &&
            scope.props.labelPosition === 'begin'
          "
          >{{ scope.props.endLabel }}:</span
        >
      </template>

      <template slot="countdown" slot-scope="scope">
        <span style="font-size: 25px">{{ scope.props.minutes }}</span
        >{{ scope.props.minutesTxt }}
        <span style="font-size: 25px">{{ scope.props.seconds }}</span
        >{{ scope.props.secondsTxt }}
      </template>

      <template slot="end-label" slot-scope="scope">
        <span
          style="color: red"
          v-if="
            scope.props.startLabel !== '' &&
            scope.props.tips &&
            scope.props.labelPosition === 'end'
          "
          >{{ scope.props.startLabel }}:</span
        >
        <span
          style="color: blue"
          v-if="
            scope.props.endLabel !== '' &&
            !scope.props.tips &&
            scope.props.labelPosition === 'end'
          "
          >{{ scope.props.endLabel }}:</span
        >
      </template>

      <template slot="end-text" slot-scope="scope">
        <span style="color: green">{{ scope.props.endText }}</span>
      </template>
    </vue-countdown-timer>
    <transition name="fade" mode="out-in">
      <router-view
        :emittedRegionAdd="emittedRegionAdd"
        :toggle="toggleEnable"
        :region_name="region_name"
        :region_id_prop="region_id"
        :practitioners="practitioners"
        @userAvatarChange="onUserAvatarChange"
        @addNewRegion="onAddNewRegion"
      />
    </transition>
    <go-top :boundary="boundary" :size="size"></go-top>
    <site-footer />
  </div>
</template>
<script type="text/babel">
import GoTop from "@inotom/vue-go-top";
import SiteHeader from "./partials/TheSiteHeader.vue";
import SiteFooter from "./partials/TheSiteFooter.vue";
import SiteSidebar from "./partials/TheSiteSidebar.vue";
import Ls from "./../../services/ls.js";
import Auth from "./../../services/auth.js";
export default {
  data() {
    return {
      user_role: "",
      user_avatar: "",
      toggleEnable: false,
      showToggleButton: false,
      emittedRegionAdd: "",
      region_name: "",
      region_id: 0,
      practitioners: false,

      startTime: null,
      endTime: null,

      boundary: 100,
      size: 60,
    };
  },
  components: {
    SiteHeader,
    SiteSidebar,
    SiteFooter,
    GoTop,
  },
  mounted() {
    this.$utils.setLayout("default");
  },
  created() {
    this.user_role = Ls.get("Role");
    this.toggleEnable = false;
    let date = new Date();
    let current_timestamp = date.getTime();
    let login_timestamp = Ls.get("Login Time");
    let difference_seconds = (current_timestamp - login_timestamp) / 1000;
    if (this.user_role == "company_admin" && difference_seconds >= 300) {
      window.toastr["info"]("时间到 ...", "信息");
      setTimeout(() => {
        Auth.logout().then(() => {
          this.$router.replace("/login");
        });
      }, 1000);
    } else if (this.user_role == "practitioner" && difference_seconds >= 120) {
      window.toastr["info"]("时间到 ...", "信息");
      setTimeout(() => {
        Auth.logout().then(() => {
          this.$router.replace("/login");
        });
      }, 1000);
    }

    var minutesToAdd;
    if (this.user_role == "practitioner") {
      minutesToAdd = 2;
    } else if (this.user_role == "company_admin") {
      minutesToAdd = 5;
    }
    var futureDate = new Date(
      parseInt(Ls.get("Login Time")) + minutesToAdd * 60000
    );
    this.endTime = futureDate.getTime();

    this.startTime = Ls.get("Login Date");
    this.startTime = this.startTime.toString();
  },
  methods: {
    onUserAvatarChange(path) {
      this.user_avatar = path;
    },
    toggleSidebar() {
      var menu = document.getElementById("main_template");
      if (this.toggleEnable == false) {
        menu.classList.add("sidenav-toggled");
        this.toggleEnable = !this.toggleEnable;
      } else if (this.toggleEnable == true) {
        menu.classList.remove("sidenav-toggled");
        this.toggleEnable = !this.toggleEnable;
      }
    },
    onOccurToggle(e) {
      if (e == true) {
        this.showToggleButton = true;
      }
      this.toggleEnable = e;
    },
    onSetUserAvatar(path) {
      this.user_avatar = path;
    },
    onAddNewRegion(e) {
      this.emittedRegionAdd = JSON.stringify(e);
    },
    endCallBack: function () {
      window.toastr["info"]("时间到 ...", "信息");
      setTimeout(() => {
        Auth.logout().then(() => {
          this.$router.replace("/login");
        });
      }, 1000);
    },
  },
};
</script>

<style lang="scss" scoped>
#main_template {
  height: 100%;
}
.side-bar-toggle {
  position: fixed;
  left: 252px;
  top: 47%;
  z-index: 1000;
  transition: ease 0.3s all;
}
.side-bar-toggle-enable {
  left: 70px !important;
  -webkit-transform: rotate(180deg);
  -moz-transform: rotate(180deg);
  -ms-transform: rotate(180deg);
  -o-transform: rotate(180deg);
  transform: rotate(180deg);
}
.side-bar-toggle button {
  background: transparent;
  border: transparent;
  font-size: 17px;
  color: #8e98db;
}
.side-bar-toggle button:hover {
  color: #c1c7ed;
}
.heart {
  -webkit-transform: scale(1);
  -ms-transform: scale(1);
  -o-transform: scale(1);
  -moz-transform: scale(1);
  transform: scale(1);
  -webkit-transform-origin: center center;
  -moz-transform-origin: center center;
  -ms-transform-origin: center center;
  -o-transform-origin: center center;
  transition: all 1s;
}
.heart.css {
  -webkit-animation-delay: 0.5s;
  -moz-animation-delay: 0.5s;
  -ms-animation-delay: 0.5s;
  -o-animation-delay: 0.5s;
  animation-dely: 0.5s;
}
.heart.animated {
  -webkit-animation: 1600ms pulsate infinite alternate ease-in-out;
  -moz-animation: 1600ms pulsate infinite alternate ease-in-out;
  -ms-animation: 1600ms pulsate infinite alternate ease-in-out;
  -o-animation: 1600ms pulsate infinite alternate ease-in-out;
  animation: 1600ms pulsate infinite alternate ease-in-out;
}
.heart:before,
.heart:after {
  -moz-border-radius: 50px 50px 0 0;
  border-radius: 50px 50px 0 0;
  -webkit-transform: rotate(-45deg);
  -moz-transform: rotate(-45deg);
  -ms-transform: rotate(-45deg);
  -o-transform: rotate(-45deg);
  transform: rotate(-45deg);
  -webkit-transform-origin: 0 100%;
  -moz-transform-origin: 0 100%;
  -ms-transform-origin: 0 100%;
  -o-transform-origin: 0 100%;
  transform-origin: 0 100%;
}
.heart:after {
  left: 0;
  -webkit-transform: rotate(45deg);
  -moz-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  -o-transform: rotate(45deg);
  transform: rotate(45deg);
  -webkit-transform-origin: 100% 100%;
  -moz-transform-origin: 100% 100%;
  -ms-transform-origin: 100% 100%;
  -o-transform-origin: 100% 100%;
  transform-origin: 100% 100%;
}
.heart.css:hover {
  -webkit-transform: scale(1.5);
  -moz-transform: scale(1.5);
  -ms-transform: scale(1.5);
  -o-transform: scale(1.52);
  transform: scale(1.5);
  -webkit-animation: "";
  -moz-animation: none;
  -ms-animation: "";
  -o-animation: "";
  animation: "";
}
@keyframes pulsate {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.3);
  }
  100% {
    transform: scale(1);
  }
}
@-webkit-keyframes pulsate {
  0% {
    -webkit-transform: scale(1);
  }
  50% {
    -webkit-transform: scale(1.3);
  }
  100% {
    -webkit-transform: scale(1);
  }
}
@-moz-keyframes pulsate {
  0% {
    -moz-transform: scale(1);
  }
  50% {
    -moz-transform: scale(1.3);
  }
  100% {
    -moz-transform: scale(1);
  }
}
@-ms-keyframes pulsate {
  0% {
    -ms-transform: scale(1);
  }
  50% {
    -ms-transform: scale(1.3);
  }
  100% {
    -ms-transform: scale(1);
  }
}
@-o-keyframes pulsate {
  0% {
    -o-transform: scale(1);
  }
  50% {
    -o-transform: scale(1.3);
  }
  100% {
    -o-transform: scale(1);
  }
}
.display_block {
  display: block;
}
.display_none {
  display: none;
}
</style>

<style>
.toast-success {
  /* background-color: #51a351; */
  background-color: #51a351 !important;
}
.toast-info {
  background-color: #2f96b4;
}
.toast-error {
  background-color: #bd362f !important;
}
.countdown-timer {
  position: fixed;
  right: 15px;
  top: 95px;
  font-weight: 600;
  color: rgb(229 24 24);
  z-index: 100;
}
</style>

