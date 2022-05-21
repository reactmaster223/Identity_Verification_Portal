<template>
  <div id="all-users" :class="myClass">
    <!-- Users Page Header  -->

    <div class="page-header" v-if="region_name == ''">
      <h3 class="page-title">用户资料</h3>
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <a href="#">员工管理</a>
        </li>
        <li class="breadcrumb-item active">用户资料</li>
      </ol>
    </div>

    <!-- Users Page Header  -->

    <div class="row">
      <div class="col-sm-12">
        <div class="card">
          <div class="card-header">
            <h6 v-if="region_name == ''">所有用户</h6>
            <h6 v-else>所有区域管理员</h6>
            <div class="card-actions" />
          </div>
          <div class="card-body">
            <!-- Users Query Conditions Group  -->

            <div class="query-group">
              <b-form-select
                id="gender-input"
                name="gender-input"
                v-model="member_gender"
                :options="memberGenders"
                @change="changeMemberProperty('gender', member_gender)"
              ></b-form-select>
              <b-form-select
                id="verification-result-input"
                name="verification-result-input"
                v-model="member_verification_result"
                :options="verificationResults"
                @change="
                  changeMemberProperty(
                    'verification_result',
                    member_verification_result
                  )
                "
              ></b-form-select>
              <b-form-select
                id="health-status-input"
                name="health-status-input"
                v-model="member_health_status"
                :options="healthStatues"
                @change="
                  changeMemberProperty('health_status', member_health_status)
                "
              ></b-form-select>
              <b-form-select
                id="company-input"
                name="company-input"
                v-model="member_company"
                :options="companies"
                @change="changeMemberProperty('company', member_company)"
              ></b-form-select>
              <b-form-select
                id="region-input"
                name="region-input"
                v-model="member_region"
                :options="regions"
                @change="changeMemberProperty('region', member_region)"
              ></b-form-select>
              <b-form-input
                id="serial-input_query"
                name="serial-input"
                v-model="member_serial"
                :placeholder="serial_placeholder"
                @change="changeMemberProperty('serial_number', member_serial)"
              ></b-form-input>
            </div>

            <!-- Users Query Conditions Group  -->

            <table-component
              :data="region_name == '' ? getUsers : getAllRegionalAdmins"
              sort-by="full_name"
              sort-order="desc"
              table-class="table"
              ref="table"
            >
              <table-column show="full_name" label="全名">
                <template slot-scope="row">
                  <div class="user-profile-name">
                    <span>{{ row.name }}</span>
                  </div>
                </template>
              </table-column>
              <table-column
                :sortable="false"
                :filterable="false"
                label="用户头像"
              >
                <template slot-scope="row">
                  <div class="user-profile-avatar">
                    <img :src="row.user_avatar" />
                  </div>
                </template>
              </table-column>
              <table-column label="性別">
                <template slot-scope="row">
                  <div class="user-gender">
                    <span v-if="row.gender == 'male'">男</span>
                    <span v-if="row.gender == 'female'">女</span>
                  </div>
                </template>
              </table-column>
              <table-column label="用户名">
                <template slot-scope="row">
                  <div class="user-name">
                    {{ row.username }}
                  </div>
                </template>
              </table-column>
              <table-column label="角色">
                <template slot-scope="row">
                  <div class="user-role">
                    <span v-if="row.role == 'practitioner'">从业者</span>
                    <span v-if="row.role == 'company_admin'"
                      >各养老服务单位</span
                    >
                    <span v-if="row.role == 'regional_admin'">区域管理员</span>
                    <span v-if="row.role == 'admin'">系統管理員</span>
                  </div>
                </template>
              </table-column>
              <table-column show="id_number" label="身份证号" />
              <table-column show="serial_number" label="序列号" />
              <table-column show="company_phone_number" label="手机号" />
              <table-column show="validity_period" label="失效日期" />
              <table-column show="company" label="公司" />
              <table-column show="region" label="地区" />
              <table-column show="verification_result" label="验证结果">
                <template slot-scope="row">
                  <div class="user-verification-status">
                    <span v-if="row.verification_result == 'nonactivated'"
                      >没有激活</span
                    >
                    <span v-if="row.verification_result == 'processing'"
                      >加工</span
                    >
                    <span v-if="row.verification_result == 'activated'"
                      >已激活</span
                    >
                  </div>
                </template>
              </table-column>
              <table-column label="健康状况">
                <template slot-scope="row">
                  <div class="user-name">
                    <span
                      :class="row.health_status == '绿码' ? 'safe_health' : ''"
                      >{{ row.health_status }}</span
                    >
                  </div>
                </template>
              </table-column>
              <table-column :sortable="false" :filterable="false" label="">
                <template slot-scope="row">
                  <div
                    class="table__actions"
                    :class="actionClass"
                    v-if="
                      user_role == 'admin' ||
                      (user_role == 'regional_admin' &&
                        row.region == user_region) ||
                      (user_role == 'company_admin' &&
                        row.company == user_company)
                    "
                  >
                    <router-link :to="'/admin/users/profile/' + row.id">
                      <a class="btn btn-default btn-sm">
                        <i class="icon-fa icon-fa-edit" />
                        編輯
                      </a>
                    </router-link>
                    <a
                      class="btn btn-default btn-sm delete_color"
                      data-delete
                      data-confirmation="notie"
                      @click="deleteUser(row.id)"
                    >
                      <i class="icon-fa icon-fa-trash" />
                      刪除
                    </a>
                  </div>
                </template>
              </table-column>
            </table-component>
            <div v-if="empty_users == true" class="empty-users">
              <span>本地区无从业者</span>
            </div>
            <fade-loader :loading="loading" class="auth_spinner"></fade-loader>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { TableComponent, TableColumn } from "vue-table-component";
import FadeLoader from "vue-spinner/src/FadeLoader.vue";
import Ls from "./../../../services/ls.js";
import Auth from "./../../../services/auth.js";
export default {
  props: ["toggle", "emittedRegionAdd", "region_name"],
  components: {
    TableComponent,
    TableColumn,
    FadeLoader,
  },
  data() {
    return {
      user_role: "",
      user_id: "",
      user_region: "",
      user_company: "",
      save: false,
      keys: [
        "name",
        "username",
        "role",
        "gender",
        "id_number",
        "serial_number",
        "company",
        "region",
        "health_status",
      ],
      memberGenders: null,
      member_gender: "",
      verificationResults: null,
      member_verification_result: "",
      healthStatues: null,
      member_health_status: "",
      member_company: "",
      member_region: "",
      serial_placeholder: "",
      member_serial: "",
      companies: null,
      availableRegions: [],
      regions: null,
      tooltipText: null,
      position: "top",
      empty_users: false,
      loading: true,
    };
  },
  watch: {
    emittedRegionAdd: function (newVal, oldVal) {
      if (newVal != "") {
        let parsedObject = JSON.parse(newVal);
        let role = parsedObject.role;
        let regionName = Ls.get("Region Name");
        this.setRegionWithLangRole(role, regionName);
      }
    },
  },
  computed: {
    myClass() {
      if (this.region_name == "") {
        if (this.user_role == "practitioner" || this.toggle == true) {
          return "role_practitioner";
        } else {
          return "main-content";
        }
      } else {
        return "";
      }
    },
    actionClass() {
      if (this.region_name != "") {
        if (
          this.user_role == "admin" ||
          (this.user_role == "regional_admin" &&
            Ls.get("Region Name") == this.region_name)
        ) {
          return "display_block";
        } else {
          return "display_none";
        }
      } else {
        return "display_block";
      }
    },
  },
  created() {
    this.user_id = Ls.get("user_id");
    this.user_role = Ls.get("Role");
    this.user_region = Ls.get("Region Name");
    this.user_company = Ls.get("Company Name");
    this.setRegionWithLangRole(this.user_role, this.user_region);
  },
  methods: {
    setRegionWithLangRole(role, region = "") {
      this.getAllRegions().then((res) => {
        if (role == "admin") {
          this.availableRegions = res;
        } else if (role == "regional_admin") {
          this.availableRegions = res.filter((item) => item.name == region);
        } else if (role == "company_admin") {
          this.availableRegions = [{ name: this.user_region }];
        }
        if (this.availableRegions.length != 0) {
          this.setCh();
        }
      });
    },
    getAllRegions() {
      let regions = Auth.getAllRegions().then((res) => {
        return res.data;
      });
      return regions;
    },
    async getAllRegionalAdmins({ page, filter, sort }) {
      this.user_region = this.region_name;
      let response = await axios.get(`/api/admin/users/get?page=${page}`);
      response = response.data.filter(
        (item) =>
          item.role == "regional_admin" && item.region == this.region_name
      );
      this.loading = false;
      let avatarResponse = await axios.get("/api/admin/user/avatar/getAll");
      var pagination_data = [];
      let exist = this;
      response.forEach((user_item, i) => {
        exist.save = false;
        avatarResponse.data.forEach((avatar_item, j) => {
          let data = user_item;
          if (user_item.id == avatar_item.user_id) {
            exist.save = true;
            if (avatar_item.path == "") {
              data["user_avatar"] = "/assets/img/default-user-avatar.jpg";
            } else {
              data["user_avatar"] = avatar_item.path;
            }
            pagination_data.unshift(data);
          }
        });
        if (exist.save == false) {
          let data = user_item;
          data["user_avatar"] = "/assets/img/default-user-avatar.jpg";
          pagination_data.unshift(data);
        }
      });
      var return_data = [];
      if (filter) {
        pagination_data.forEach((item, index) => {
          exist.keys.forEach((key) => {
            if (item[key].includes(filter)) {
              return_data.push(item);
            }
          });
        });
        return_data = exist.removeDuplicates(return_data);
      } else {
        return_data = pagination_data;
      }
      if (sort) {
        if (sort.order == "desc") {
          if (!!sort.fieldName) {
            return_data.sort(exist.dynamicSortDesc(sort.fieldName));
          } else {
            return_data.sort(exist.dynamicSortDesc("name"));
          }
        } else if (sort.order == "asc") {
          if (!!sort.fieldName) {
            return_data.sort(exist.dynamicSortAsc(sort.fieldName));
          } else {
            return_data.sort(exist.dynamicSortAsc("name"));
          }
        }
      }
      let filteringData = return_data;
      if (exist.member_gender !== "") {
        let genderedData = [];
        filteringData.forEach((item, index) => {
          if (item["gender"] == exist.member_gender) {
            genderedData.push(item);
          }
        });
        filteringData = genderedData;
      }
      if (exist.member_verification_result !== "") {
        let verifiedData = [];
        filteringData.forEach((item, index) => {
          if (item["verification_result"] == exist.member_verification_result) {
            verifiedData.push(item);
          }
        });
        filteringData = verifiedData;
      }
      if (exist.member_health_status !== "") {
        let healthedData = [];
        filteringData.forEach((item, index) => {
          if (item["health_status"] == exist.member_health_status) {
            healthedData.push(item);
          }
        });
        filteringData = healthedData;
      }
      if (exist.member_company !== "") {
        let companiedData = [];
        filteringData.forEach((item, index) => {
          if (item["company"] == exist.member_company) {
            companiedData.push(item);
          }
        });
        filteringData = companiedData;
      }
      if (exist.member_region !== "") {
        let regionalData = [];
        filteringData.forEach((item, index) => {
          if (item["region"] == exist.member_region) {
            regionalData.push(item);
          }
        });
        filteringData = regionalData;
      }
      if (exist.member_serial != "") {
        filteringData = filteringData.filter(
          (item) => item.serial_number == exist.member_serial
        );
      }
      let total_pages = Math.ceil(filteringData.length / 5);
      filteringData = filteringData.filter(
        (item, index) => index >= (page - 1) * 5 && index < page * 5
      );
      return {
        data: filteringData,
        pagination: {
          totalPages: total_pages,
          currentPage: page,
          count: page * 5,
        },
      };
    },
    async getUsers({ page, filter, sort }) {
      try {
        var response;
        if (
          this.user_role == "admin" ||
          this.user_role == "regional_admin" ||
          this.user_role == "company_admin"
        ) {
          response = await axios.get(`/api/admin/users/get?page=${page}`);
        }
        if (response.data.length == 0) {
          this.empty_users = true;
        }
        this.loading = false;
        const avatarResponse = await axios.get("/api/admin/user/avatar/getAll");
        var pagination_data = [];
        let exist = this;
        response.data.forEach((user_item, i) => {
          if (
            user_item.id != this.user_id &&
            user_item.role != this.user_role
          ) {
            exist.save = false;
            avatarResponse.data.forEach((avatar_item, j) => {
              let data = user_item;
              if (user_item.id == avatar_item.user_id) {
                exist.save = true;
                if (avatar_item.path == "") {
                  data["user_avatar"] = "/assets/img/default-user-avatar.jpg";
                } else {
                  data["user_avatar"] = avatar_item.path;
                }
                pagination_data.unshift(data);
              }
            });
            if (exist.save == false) {
              let data = user_item;
              data["user_avatar"] = "/assets/img/default-user-avatar.jpg";
              pagination_data.unshift(data);
            }
          }
        });
        var return_data = [];
        if (filter) {
          pagination_data.forEach((item, index) => {
            exist.keys.forEach((key) => {
              if (item[key].includes(filter)) {
                return_data.push(item);
              }
            });
          });
          return_data = exist.removeDuplicates(return_data);
        } else {
          return_data = pagination_data;
        }
        if (sort) {
          if (sort.order == "desc") {
            if (!!sort.fieldName) {
              return_data.sort(exist.dynamicSortDesc(sort.fieldName));
            } else {
              return_data.sort(exist.dynamicSortDesc("name"));
            }
          } else if (sort.order == "asc") {
            if (!!sort.fieldName) {
              return_data.sort(exist.dynamicSortAsc(sort.fieldName));
            } else {
              return_data.sort(exist.dynamicSortAsc("name"));
            }
          }
        }
        let filteringData = return_data;
        if (exist.member_gender !== "") {
          let genderedData = [];
          filteringData.forEach((item, index) => {
            if (item["gender"] == exist.member_gender) {
              genderedData.push(item);
            }
          });
          filteringData = genderedData;
        }
        if (exist.member_verification_result !== "") {
          let verifiedData = [];
          filteringData.forEach((item, index) => {
            if (
              item["verification_result"] == exist.member_verification_result
            ) {
              verifiedData.push(item);
            }
          });
          filteringData = verifiedData;
        }
        if (exist.member_health_status !== "") {
          let healthedData = [];
          filteringData.forEach((item, index) => {
            if (item["health_status"] == exist.member_health_status) {
              healthedData.push(item);
            }
          });
          filteringData = healthedData;
        }
        if (exist.member_company !== "") {
          let companiedData = [];
          filteringData.forEach((item, index) => {
            if (item["company"] == exist.member_company) {
              companiedData.push(item);
            }
          });
          filteringData = companiedData;
        }
        if (exist.member_region !== "") {
          let regionalData = [];
          filteringData.forEach((item, index) => {
            if (item["region"] == exist.member_region) {
              regionalData.push(item);
            }
          });
          filteringData = regionalData;
        }
        if (exist.member_serial != "") {
          filteringData = filteringData.filter(
            (item) => item.serial_number == exist.member_serial
          );
        }
        let total_pages = Math.ceil(filteringData.length / 10);
        filteringData = filteringData.filter(
          (item, index) => index >= (page - 1) * 10 && index < page * 10
        );
        return {
          data: filteringData,
          pagination: {
            totalPages: total_pages,
            currentPage: page,
            count: page * 10,
          },
        };
      } catch (error) {
        if (error) {
          // window.toastr["error"]("There was an error", "Error");
        }
      }
    },
    deleteUser(id) {
      let self = this;
      window.notie.confirm({
        text: "您確定要刪除此用户嗎？",
        cancelCallback: function () {
          window.toastr["info"]("取消");
        },
        submitCallback: function () {
          self.deleteUserData(id);
        },
      });
    },
    async deleteUserData(id) {
      try {
        let response = await window.axios.delete("/api/admin/users/" + id);
        this.$refs.table.refresh();
        window.toastr["success"]("用户已刪除", "成功");
      } catch (error) {
        if (error) {
          window.toastr["error"]("有一個错误", "错误");
        }
      }
    },
    deleteAllUser() {
      let self = this;
      window.notie.confirm({
        text: "您確定要刪除所有成員嗎？",
        cancelCallback: function () {
          window.toastr["info"]("取消");
        },
        submitCallback: function () {
          self.deleteAllUserData();
        },
      });
    },
    async deleteAllUserData() {
      try {
        let response = await window.axios.delete("api/admin/users/all");
        window.toastr["success"]("已刪除所有用户", "成功");
      } catch (error) {
        window.toastr["error"]("有一個错误", "错误");
      }
    },
    removeDuplicates(arr) {
      return arr.filter((item, index) => arr.indexOf(item) === index);
    },
    dynamicSortDesc(property) {
      var sortOrder = 1;
      if (property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
      }
      return function (a, b) {
        /* next line works with strings and numbers,
         * and you may want to customize it to your needs
         */
        var result =
          a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
        return result * sortOrder;
      };
    },
    dynamicSortAsc(property) {
      var sortOrder = 1;
      if (property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
      }
      return function (a, b) {
        /* next line works with strings and numbers,
         * and you may want to customize it to your needs
         */
        var result =
          a[property] < b[property] ? 1 : a[property] > b[property] ? -1 : 0;
        return result * sortOrder;
      };
    },
    changeMemberProperty(type, e) {
      if (type == "region") {
        this.getCompaniesWithRegionName(e);
      }
      this.$refs.table.refresh();
    },
    setRegions(lang) {
      let exist = this;
      exist.regions = [{ value: "", text: "选择地区" }];
      exist.availableRegions.forEach((region) => {
        exist.regions.push({
          value: region.name,
          text: region.name,
        });
      });
    },
    setCh() {
      this.memberGenders = [
        { value: "", text: "选择性別" },
        { value: "male", text: "男" },
        { value: "female", text: "女" },
      ];
      this.verificationResults = [
        { value: "", text: "选择验证结果" },
        { value: "nonactivated", text: "没有激活" },
        { value: "processing", text: "加工" },
        { value: "activated", text: "已激活" },
      ];
      this.healthStatues = [
        { value: "", text: "选择健康状况" },
        { value: "risk", text: "高风险" },
        { value: "mid_risk", text: "中风险" },
        { value: "low_risk", text: "绿码" },
        { value: "unkown", text: "未知" },
      ];
      this.companies = [{ value: "", text: "选择公司" }];
      this.serial_placeholder = "输入序列号";
      this.setRegions("ch");
      this.tooltipText = "尚未驗證";
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
#all-users {
  transition: ease 0.3s all;
}
.role_practitioner {
  padding: 35px 15px 0px 105px;
  min-height: calc(100% - 90px);
}
.user-profile-avatar {
  width: 40px;
  height: 40px;
  margin: 0px auto;
}
.user-profile-avatar img {
  width: 100%;
  border-radius: 10px;
  height: 100%;
}
.member-add-first-last-name {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}
.member-add-first-last-name .form-group {
  width: 48%;
  margin-top: 20px;
}
.form-group {
  width: 100%;
  margin-top: 20px;
}
.name-form {
  margin: 0px;
}
.margin-top-0 {
  margin-top: 0px !important;
}
.role-form {
  margin-top: 20px;
}
.new-member-btns {
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
}
.margin_bottom_10 {
  margin-bottom: 10px;
}
.user-name div {
  display: flex;
  align-items: center;
  justify-content: center;
}
.user-name div span {
  margin-right: 10px;
}
.user-name i {
  color: rgb(255 177 0);
  font-size: 15px;
  cursor: pointer;
}
#serial-input_query {
  max-width: 15% !important;
  margin-top: 10px;
}
.delete_color {
  color: rgb(215 35 35) !important;
}
.empty-users {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 25px;
  font-weight: 500;
  color: #8e98db;
  margin-bottom: 20px;
}
.breadcrumb {
  align-items: center;
  justify-content: center;
}
.page-header {
  text-align: center;
}
.display_none {
  display: none;
}
.display_block {
  display: block;
}
.custom-control-label {
  opacity: 1;
  cursor: pointer;
}
.custom-control-label::after {
  left: 0px !important;
}
.safe_health {
  padding: 5px 10px;
  background-color: rgb(50 251 0);
  border-radius: 15px;
  color: white;
}
</style>

<style>
.modal-title {
  color: #5c5959;
}
.modal-header,
.modal-footer {
  background-color: #ffde00 !important;
}
.modal-footer {
  display: none !important;
}
.close {
  color: #5c5959 !important;
}
.member-form .row {
  width: 100%;
  margin: 0px !important;
}
.member-form .form-group {
  margin-bottom: 0px !important;
}
.btn-theme {
  color: #212529;
  background-color: #ffde00;
  border-color: #ffde00;
  -o-box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.15),
    0 1px 1px rgba(0, 0, 0, 0.075);
  -ms-box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.15),
    0 1px 1px rgba(0, 0, 0, 0.075);
  -webkit-box-shadow: inset 0 1px 0 rgb(255 255 255 / 15%),
    0 1px 1px rgb(0 0 0 / 8%);
  box-shadow: inset 0 1px 0 rgb(255 255 255 / 15%), 0 1px 1px rgb(0 0 0 / 8%);
}
.member-submit-margin {
  margin-top: 20px;
}
.query-group {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  margin: 15px 0px;
}
.query-group select {
  max-width: 15%;
  margin: 10px 0px 0px;
}
.table-component__table__head tr th {
  text-align: center !important;
}
.table-component__table__body tr td {
  text-align: center !important;
}
.auth_spinner {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  position: absolute !important;
  top: 80%;
  left: 50%;
}
.auth_spinner .v-fade {
  height: 15px !important;
  width: 5px !important;
  background-color: #4454c3 !important;
}
.custom-file-input ~ .custom-file-label[data-browse]::after {
  visibility: hidden !important;
}
</style>