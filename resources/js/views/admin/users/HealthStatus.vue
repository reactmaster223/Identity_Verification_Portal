<template>
  <div id="health_status" :class="myClass">
    <div class="page-header">
      <h3 class="page-title">健康状况</h3>
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <a href="#">员工管理</a>
        </li>
        <li class="breadcrumb-item active">健康状况</li>
      </ol>
    </div>
    <div class="row">
      <div class="col-sm-12">
        <div class="card">
          <div class="card-header">
            <h6>从业人员的健康状况</h6>
          </div>
          <div class="card-body">
            <!-- Users Query Conditions Group  -->

            <div class="query-group-verification">
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
            </div>

            <!-- Users Query Conditions Group  -->

            <table-component
              :data="getUsers"
              sort-by="No."
              sort-order="desc"
              table-class="table"
              ref="table"
            >
              <table-column label="No.">
                <template slot-scope="row">
                  <div class="user-name">
                    {{ row.No }}
                  </div>
                </template>
              </table-column>
              <table-column label="用户名">
                <template slot-scope="row">
                  <div class="user-name">
                    {{ row.name }}
                  </div>
                </template>
              </table-column>
              <table-column show="id_number" label="身份证号" />
              <table-column show="validity_period" label="失效日期" />
              <table-column show="company" label="公司" />
              <table-column show="region" label="地区" />
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
              <table-column show="uploaded_time" label="上传时间" />
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
import Auth from "./../../../services/auth.js";
import Ls from "./../../../services/ls.js";
export default {
  props: ["toggle", "emittedRegionAdd"],
  data() {
    return {
      save: false,
      user_role: "",
      user_region: "",
      user_company: "",
      member_company: "",
      companies: null,
      member_health_status: "",
      healthStatues: null,
      availableRegions: [],
      member_region: "",
      regions: null,
      keys: ["username", "id_number", "company", "region", "health_status"],
      loading: true,
      empty_users: false,
    };
  },
  components: {
    TableComponent,
    TableColumn,
    FadeLoader,
  },
  created() {
    this.user_role = Ls.get("Role");
    this.user_region = Ls.get("Region Name");
    this.user_company = Ls.get("Company Name");
    this.setRegionWithLangRole(this.user_role, this.user_region);
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
      if (this.user_role == "practitioner") {
        return "practitioner_content";
      } else if (
        this.user_role == "admin" ||
        this.user_role == "company_admin" ||
        this.user_role == "regional_admin"
      ) {
        if (this.toggle == true) {
          return "role_practitioner";
        } else if (this.toggle == false) {
          return "main-content";
        }
      }
    },
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
        this.loading = false;
        var pagination_data = [];
        let exist = this;
        let index = 1;
        response.data.forEach((user_item, i) => {
          if (
            user_item.role == "practitioner" &&
            user_item.health_status != ""
          ) {
            let vals = user_item.validity_period.split("-");
            let year = vals[0];
            let month = vals[1];
            let day = vals[2];
            pagination_data.push({
              No: index,
              name: user_item.name,
              id_number: user_item.id_number,
              validity_period: year + "年" + month + "月" + day + "日",
              company: user_item.company,
              region: user_item.region,
              health_status: user_item.health_status,
              uploaded_time: user_item.uploaded_time,
            });
            index += 1;
          }
        });
        if (pagination_data.length == 0) {
          this.empty_users = true;
        }
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
              return_data.sort(exist.dynamicSortDesc("No"));
            }
          } else if (sort.order == "asc") {
            if (!!sort.fieldName) {
              return_data.sort(exist.dynamicSortAsc(sort.fieldName));
            } else {
              return_data.sort(exist.dynamicSortAsc("No"));
            }
          }
        }
        let filteringData = return_data;
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
        if (5 <= filteringData.length < 10) {
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
        } else if (filteringData.length >= 10) {
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
        }
      } catch (error) {
        if (error) {
          // window.toastr["error"]("There was an error", "Error");
        }
      }
    },
    changeMemberProperty(type, e) {
      if (type == "region") {
        if (e != "") {
          this.getCompaniesWithRegionName(e);
        } else {
          this.member_company = "";
          this.companies = [];
        }
      }
      this.$refs.table.refresh();
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
    setRegions() {
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
      this.healthStatues = [
        { value: "", text: "选择健康状况" },
        { value: "risk", text: "高风险" },
        { value: "mid_risk", text: "中风险" },
        { value: "low_risk", text: "绿码" },
        { value: "unkown", text: "未知" },
      ];
      this.companies = [{ value: "", text: "选择公司" }];
      this.setRegions();
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
  },
};
</script>

<style scoped>
.practitioner_content {
  padding: 50px 15px 0px 15px;
  min-height: calc(100% - 90px);
}
.role_practitioner {
  padding: 35px 30px 0px 105px;
  min-height: calc(100% - 90px);
}
.page-header {
  text-align: center;
}
.breadcrumb {
  align-items: center;
  justify-content: center;
}
.query-group-verification {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-wrap: wrap;
  margin: 15px 0px;
}
.query-group-verification select {
  max-width: 15%;
  margin: 10px 0px 0px;
  margin-right: 20px;
}
.safe_health {
  padding: 5px 10px;
  background-color: rgb(50 251 0);
  border-radius: 15px;
  color: white;
}
</style>

<style>
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
</style>