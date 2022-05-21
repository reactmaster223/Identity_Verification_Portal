<template>
  <div
    id="all-users"
    :class="
      user_role == 'practitioner' || toggle == true
        ? 'role_practitioner'
        : 'main-content'
    "
  >
    <div class="page-header">
      <h3 class="page-title">新增用户</h3>
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <a href="#">系统管理</a>
        </li>
        <li class="breadcrumb-item active">新增用户</li>
      </ol>
    </div>
    <div class="row">
      <div class="col-sm-12">
        <div class="card">
          <div class="card-header">
            <h6>新增用户</h6>
          </div>
          <div class="card-body">
            <div class="edit-personal-profile">
              <b-form @submit.stop.prevent="addNewMember">
                <div class="user-name-edit">
                  <b-form-group
                    id="name-input-group"
                    label="真实姓名"
                    label-for="name-input"
                  >
                    <b-form-input
                      id="name-input"
                      name="name-input"
                      v-model="addMemberData.name"
                      v-validate="{ required: true, min: 2 }"
                      :state="validateState('name-input')"
                      aria-describedby="name-input-live-feedback"
                      data-vv-as="姓名"
                    ></b-form-input>

                    <b-form-invalid-feedback id="name-input-live-feedback">{{
                      veeErrors.first("name-input")
                    }}</b-form-invalid-feedback>
                  </b-form-group>
                </div>

                <div class="username-edit">
                  <b-form-group
                    id="username-input-group"
                    label="用户名"
                    label-for="username-input"
                  >
                    <b-form-input
                      id="username-input"
                      name="username-input"
                      v-model="addMemberData.username"
                      v-validate="{ required: true, min: 3 }"
                      :state="validateState('username-input')"
                      aria-describedby="username-input-live-feedback"
                      data-vv-as="用户名"
                    ></b-form-input>

                    <b-form-invalid-feedback
                      id="username-input-live-feedback"
                      >{{
                        veeErrors.first("username-input")
                      }}</b-form-invalid-feedback
                    >
                  </b-form-group>
                </div>

                <div class="password-edit">
                  <b-form-group
                    id="new-password-input-group"
                    label="密码"
                    label-for="new-password-input"
                  >
                    <b-form-input
                      id="new-password-input"
                      name="new-password-input"
                      v-model="addMemberData.password"
                      v-validate="{ required: true, min: 6 }"
                      :state="validateState('new-password-input')"
                      aria-describedby="new-password-input-live-feedback"
                      data-vv-as="新密码"
                      type="password"
                      ref="new-password-input"
                    ></b-form-input>

                    <b-form-invalid-feedback
                      id="new-password-input-live-feedback"
                      >{{
                        veeErrors.first("new-password-input")
                      }}</b-form-invalid-feedback
                    >
                  </b-form-group>

                  <b-form-group
                    id="confirm-password-input-group"
                    label="确认密码"
                    label-for="confirm-password-input"
                  >
                    <b-form-input
                      id="confirm-password-input"
                      name="confirm-password-input"
                      v-model="addMemberData.password_confirmation"
                      v-validate="'required|confirmed:new-password-input'"
                      :state="validateState('confirm-password-input')"
                      aria-describedby="confirm-password-input-live-feedback"
                      data-vv-as="确认密码"
                      type="password"
                    ></b-form-input>

                    <b-form-invalid-feedback
                      id="confirm-password-input-live-feedback"
                      >{{
                        veeErrors.first("confirm-password-input")
                      }}</b-form-invalid-feedback
                    >
                  </b-form-group>
                </div>

                <div class="user-gender-role-edit">
                  <b-form-group
                    id="gender-input-group"
                    label="性別"
                    label-for="gender-input"
                  >
                    <b-form-select
                      id="gender-input"
                      name="gender-input"
                      v-model="addMemberData.gender"
                      v-validate="{ required: true }"
                      :state="validateState('gender-input')"
                      aria-describedby="gender-input-live-feedback"
                      data-vv-as="性别"
                      :options="genders"
                    ></b-form-select>

                    <b-form-invalid-feedback id="gender-input-live-feedback">{{
                      veeErrors.first("gender-input")
                    }}</b-form-invalid-feedback>
                  </b-form-group>
                  <b-form-group
                    id="id-input-group"
                    label="身份证号"
                    label-for="id-input"
                  >
                    <b-form-input
                      id="id-input"
                      name="id-input"
                      v-model="addMemberData.id_number"
                      v-validate="{ required: true, min: 5 }"
                      :state="validateState('id-input')"
                      aria-describedby="id-input-live-feedback"
                      data-vv-as="身份证号码"
                    ></b-form-input>

                    <b-form-invalid-feedback id="id-input-live-feedback">{{
                      veeErrors.first("id-input")
                    }}</b-form-invalid-feedback>
                  </b-form-group>
                </div>
                <!-- 
                <div class="serial-number-edit">
                  <b-form-group
                    id="serial-input-group"
                    label="序列号"
                    label-for="serial-input"
                  >
                    <b-form-input
                      id="serial-input"
                      name="serial-input"
                      v-model="addMemberData.serial_number"
                      v-validate="{ required: true, min: 5 }"
                      :state="validateState('serial-input')"
                      aria-describedby="serial-input-live-feedback"
                      data-vv-as="序列号"
                    ></b-form-input>

                    <b-form-invalid-feedback id="serial-input-live-feedback">{{
                      veeErrors.first("serial-input")
                    }}</b-form-invalid-feedback>
                  </b-form-group>
                </div> -->

                <div class="validiaty_period-edit">
                  <b-form-group
                    id="vp-input-group"
                    label="失效日期"
                    label-for="vp-input"
                  >
                    <b-form-datepicker
                      id="vp-input"
                      name="vp-input"
                      :state="validateState('vp-input')"
                      v-validate="{ required: true }"
                      v-model="addMemberData.validity_period"
                      locale="zh"
                      :start-weekday="weekday"
                      :show-decade-nav="showDecadeNav"
                      :hide-header="hideHeader"
                      aria-describedby="vp-input-live-feedback"
                      data-vv-as="有效期"
                    ></b-form-datepicker>
                    <b-form-invalid-feedback id="vp-input-live-feedback">{{
                      veeErrors.first("vp-input")
                    }}</b-form-invalid-feedback>
                  </b-form-group>
                </div>

                <div class="company-region-edit">
                  <b-form-group
                    id="company-input-group"
                    label="公司"
                    label-for="company-input"
                  >
                    <b-form-select
                      id="company-input"
                      name="company-input"
                      v-model="addMemberData.company"
                      v-validate="{ required: true }"
                      :state="validateState('company-input')"
                      aria-describedby="company-input-live-feedback"
                      data-vv-as="公司"
                      :options="companies"
                    ></b-form-select>

                    <b-form-invalid-feedback id="company-input-live-feedback">{{
                      veeErrors.first("company-input")
                    }}</b-form-invalid-feedback>
                  </b-form-group>

                  <b-form-group
                    id="region-input-group"
                    label="地区"
                    label-for="region-input"
                  >
                    <b-form-select
                      id="region-input"
                      name="region-input"
                      v-model="addMemberData.region"
                      v-validate="{ required: true }"
                      :state="validateState('region-input')"
                      aria-describedby="region-input-live-feedback"
                      data-vv-as="地区"
                      :options="regions"
                      @change="onUpdate('region', addMemberData.region)"
                    ></b-form-select>

                    <b-form-invalid-feedback id="region-input-live-feedback">{{
                      veeErrors.first("region-input")
                    }}</b-form-invalid-feedback>
                  </b-form-group>
                </div>

                <div class="phone-number-edit">
                  <b-form-group
                    id="phone-number-input-group"
                    label="手机号"
                    label-for="phone-number-input"
                  >
                    <b-form-input
                      id="phone-number-input"
                      name="phone-number-input"
                      v-model="addMemberData.phone_number"
                      v-validate="{ required: true }"
                      :state="validateState('phone-number-input')"
                      aria-describedby="phone-number-input-live-feedback"
                      data-vv-as="手机号"
                    ></b-form-input>

                    <b-form-invalid-feedback
                      id="phone-number-input-live-feedback"
                      >{{
                        veeErrors.first("phone-number-input")
                      }}</b-form-invalid-feedback
                    >
                  </b-form-group>
                </div>

                <div class="submit-reset">
                  <b-button class="user-info-submit" type="submit">
                    <span v-if="loadingPage == false">确认</span>
                    <clip-loader :loading="loadingPage"></clip-loader>
                  </b-button>
                </div>
              </b-form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <sweet-modal ref="success_modal" icon="success">
      {{ addMemberData.role }} 创建成功！
    </sweet-modal>
  </div>
</template>

<script>
import generator from "generate-serial-number";
import ClipLoader from "vue-spinner/src/ClipLoader.vue";
import { SweetModal, SweetModalTab } from "sweet-modal-vue";
import Ls from "./../../../services/ls.js";
import Auth from "./../../../services/auth.js";
export default {
  props: ["toggle"],
  data() {
    return {
      user_role: "",
      user_region: "",
      user_company: "",
      addMemberData: {
        name: "",
        password: "",
        password_confirmation: "",
        email: "",
        gender: "male",
        role: "practitioner",
        region: "",
        id_number: "",
        serial_number: "",
        validity_period: "...",
        company: "",
        phone_number: "",
      },
      genders: [
        { value: "male", text: "男" },
        { value: "female", text: "女" },
      ],
      regions: [],
      companies: [],
      weekday: 0,
      weekdays: [
        { value: 0, text: "Sunday" },
        { value: 1, text: "Monday" },
        { value: 6, text: "Saturday" },
      ],
      showDecadeNav: false,
      hideHeader: false,
      loadingPage: false,
    };
  },
  created() {
    this.user_role = Ls.get("Role");
    this.user_region = Ls.get("Region Name");
    this.user_company = Ls.get("Company Name");
    var today = new Date();
    var date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    this.addMemberData.validity_period = date;
    this.getAllRegions().then((res) => {
      this.regions = res.map((region) => {
        return {
          value: region.name,
          text: region.name,
        };
      });
      if (
        this.user_role == "regional_admin" ||
        this.user_role == "company_admin"
      ) {
        this.regions = this.regions.filter(
          (item) => item.value == this.user_region
        );
      }
    });
    this.loadingPage = false;
  },
  install(Vue, options) {
    Vue.component("SweetModal", SweetModal);
    Vue.component("SweetModalTab", SweetModalTab);
  },
  components: {
    SweetModal,
    SweetModalTab,
    ClipLoader,
  },
  methods: {
    getAllRegions() {
      let regions = Auth.getAllRegions().then((res) => {
        return res.data;
      });
      return regions;
    },
    addNewMember() {
      this.$validator.validateAll().then(async (result) => {
        if (!result) {
          return;
        }
        this.loadingPage = true;
        let response = await axios.post("/api/email-exist", {
          username: this.addMemberData.username,
        });
        if (response.data == false) {
          toastr["error"]("用户名已经存在", "输入另一个用户名");
          this.loadingPage = false;
        } else {
          var serialNumber = generator.generate(12);
          this.addMemberData.serial_number = serialNumber;
          Auth.addNewMemberRegister(this.addMemberData)
            .then((res) => {
              if (res) {
                this.loadingPage = false;
                this.$refs.success_modal.open();
              }
            })
            .catch((error) => {
              console.log("eror => ", error);
              this.loadingPage = false;
            });
        }
      });
    },
    validateState(ref) {
      if (
        this.veeFields[ref] &&
        (this.veeFields[ref].dirty || this.veeFields[ref].validated)
      ) {
        return !this.veeErrors.has(ref);
      }
      return null;
    },
    onUpdate(type, value) {
      if (type == "region") {
        this.getCompaniesWithRegionName(value);
      }
    },
    async getCompaniesWithRegionName(region_name) {
      let info = {
        region_name: region_name,
      };
      let response = await axios.post(
        "/api/admin/region/companieswithname",
        info
      );
      if (response.data) {
        let length = response.data.split(" / ").length;
        let companies = response.data.split(" / ").slice(0, length);
        this.companies = companies.map((item) => {
          return {
            value: item,
            text: item,
          };
        });
        if (this.user_role == "company_admin") {
          this.companies = this.companies.filter(
            (item) => item.value == this.user_company
          );
        }
      } else {
        this.companies = [
          {
            value: "...",
            text: "该地区没有公司",
          },
        ];
      }
    },
  },
};
</script>

<style scoped>
.role_practitioner {
  padding: 35px 30px 0px 105px;
  min-height: calc(100% - 90px);
}
.edit-personal-profile {
  background-color: rgb(240 246 247);
  padding: 10px;
}
.id-serial-edit,
.user-gender-role-edit,
.company-region-edit {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
}
.user-gender-role-edit #gender-input-group,
.user-gender-role-edit #id-input-group,
.id-serial-edit #id-input-group,
.id-serial-edit #serial-input-group,
.company-region-edit #region-input-group,
.company-region-edit #company-input-group {
  width: 48%;
}
.submit-reset {
  display: flex;
  align-items: center;
  justify-content: right;
  flex-direction: row;
  margin-top: 30px;
}
.user-info-submit {
  margin-right: 20px;
  background-color: #ffde00;
  border-color: #ffde00;
  color: #5c5959;
}
.breadcrumb {
  align-items: center;
  justify-content: center;
}
.page-header {
  text-align: center;
}
</style>