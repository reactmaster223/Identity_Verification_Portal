<template>
  <div
    id="dashboardPage"
    :class="
      user_role == 'practitioner' || toggle == true
        ? 'role_practitioner'
        : 'main-content'
    "
  >
    <div class="row">
      <div class="col-sm-12">
        <div class="card">
          <div class="card-body basic_welcome">
            <span>Hello, </span>
            <span style="margin-right: 10px">{{ name }}</span>
            <p>欢迎来到养老协会从业人员身份验证管理平台</p>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12 col-lg-6 col-xl-3">
        <a class="dashbox" href="#">
          <!-- <i class="icon-fa icon-fa-envelope text-primary" /> -->
          <i class="fa fa-users text-primary" aria-hidden="true"></i>
          <span class="title"> {{ number_regions }} </span>
          <span class="desc"> 区域数量 </span>
        </a>
      </div>
      <div class="col-md-12 col-lg-6 col-xl-3">
        <a class="dashbox" href="#">
          <div class="system_admin">
            <div>
              <img src="/assets/img/admin.png" alt="System Admin" />
            </div>
            <span class="title"> {{ system_admin }} </span>
          </div>
          <span class="desc"> 系统管理员 </span>
        </a>
      </div>
      <div class="col-md-12 col-lg-6 col-xl-3">
        <a class="dashbox" href="#">
          <!-- <i class="icon-fa icon-fa-shopping-cart text-danger" /> -->
          <div class="system_admin">
            <div>
              <img src="/assets/img/sub_admin.png" alt="System Admin" />
            </div>
            <span class="title"> {{ regional_admin }} </span>
          </div>
          <span class="desc"> 区域管理员 </span>
        </a>
      </div>
      <div class="col-md-12 col-lg-6 col-xl-3">
        <a class="dashbox" href="#">
          <i class="fa fa-user text-info" aria-hidden="true"></i>
          <span class="title"> {{ practitioners }} </span>
          <span class="desc"> 从业者 </span>
        </a>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-12 col-xl-12 mt-2">
        <div class="card">
          <div class="card-header">
            <h6 class="regional-admins">
              <div>
                <img src="/assets/img/sub_admin.png" alt="System Admin" />
              </div>
              区域信息
            </h6>
          </div>
          <div class="card-body">
            <table-component
              :data="getAllRegions"
              table-class="table"
              ref="regionsInfo"
              sort-by="region_name"
              sort-order="asc"
            >
              <table-column label="区域名称" header-class="name_th">
                <template slot-scope="row">
                  <div class="region_admin_full-name">
                    <span style="margin-right: 10px">{{
                      row.region_name
                    }}</span>
                  </div>
                </template>
              </table-column>
              <table-column label="管理员数量" header-class="gender_th">
                <template slot-scope="row">
                  <div class="region_admin_gender">
                    <span>{{ row.region_admin_number }}</span>
                  </div>
                </template>
              </table-column>
              <table-column
                label="区域企业数量"
                header-class="management_area_th"
              >
                <template slot-scope="row">
                  <div class="region_admin_management_area">
                    <span>{{ row.region_company_number }}</span>
                  </div>
                </template>
              </table-column>
              <table-column
                label="区域从业人员数量"
                header-class="management_area_th"
              >
                <template slot-scope="row">
                  <div class="region_admin_management_area">
                    <span>{{ row.region_practitioner_number }}</span>
                  </div>
                </template>
              </table-column>
              <table-column
                label="详情"
                :sortable="false"
                :filterable="false"
                header-class="action_th"
              >
                <template slot-scope="row">
                  <div class="actions">
                    <a
                      :href="'/admin/region/detail/' + row.region_name"
                      class="btn btn-default btn-xs"
                      >详情</a
                    >
                  </div>
                </template>
              </table-column>
            </table-component>
          </div>
        </div>
      </div>
      <div class="col-lg-12 col-xl-12 mt-2">
        <div class="card">
          <div class="card-header">
            <h6 class="system-admins">
              <div><img src="/assets/img/admin.png" alt="System Admin" /></div>
              系统管理员
            </h6>
          </div>
          <div class="card-body">
            <table-component
              :data="getAllAdmins"
              table-class="table"
              ref="admins"
              sort-by="name"
              sort-order="asc"
            >
              <table-column label="全名" header-class="name_th">
                <template slot-scope="row">
                  <div class="admin_full-name">
                    <span style="margin-right: 10px">{{ row.name }}</span>
                  </div>
                </template>
              </table-column>
              <table-column label="性別" header-class="gender_th">
                <template slot-scope="row">
                  <div class="admin_gender">
                    <span v-if="row.gender == 'male'">男</span>
                    <span v-if="row.gender == 'female'">女</span>
                  </div>
                </template>
              </table-column>
              <table-column
                label="个人信息"
                :sortable="false"
                :filterable="false"
                header-class="action_th"
              >
                <template slot-scope="row">
                  <div class="actions">
                    <a
                      :href="'/admin/users/profile/' + row.id"
                      class="btn btn-default btn-xs"
                      >详情</a
                    >
                  </div>
                </template>
              </table-column>
            </table-component>
          </div>
        </div>
      </div>
      <div class="col-lg-12 col-xl-12 mt-2">
        <div class="card">
          <div class="card-header">
            <h6 class="regional-admins">
              <div>
                <img src="/assets/img/sub_admin.png" alt="System Admin" />
              </div>
              区域管理员
            </h6>
          </div>
          <div class="card-body">
            <table-component
              :data="getAllRegionAdmins"
              table-class="table"
              ref="regionalAdmins"
              sort-by="name"
              sort-order="asc"
            >
              <table-column label="全名" header-class="name_th">
                <template slot-scope="row">
                  <div class="region_admin_full-name">
                    <span style="margin-right: 10px">{{ row.name }}</span>
                  </div>
                </template>
              </table-column>
              <table-column label="性別" header-class="gender_th">
                <template slot-scope="row">
                  <div class="region_admin_gender">
                    <span v-if="row.gender == 'male'">男</span>
                    <span v-if="row.gender == 'female'">女</span>
                  </div>
                </template>
              </table-column>
              <table-column label="管理区域" header-class="management_area_th">
                <template slot-scope="row">
                  <div class="region_admin_management_area">
                    <span>{{ row.region }}</span>
                  </div>
                </template>
              </table-column>
              <table-column
                label="个人信息"
                :sortable="false"
                :filterable="false"
                header-class="action_th"
              >
                <template slot-scope="row">
                  <div class="actions">
                    <a
                      :href="'/admin/users/profile/' + row.id"
                      class="btn btn-default btn-xs"
                      >详情</a
                    >
                  </div>
                </template>
              </table-column>
            </table-component>
          </div>
        </div>
      </div>
      <div class="col-lg-12 col-xl-12 mt-2">
        <div class="card">
          <div class="card-header">
            <h6 class="practitioners">
              <i
                class="fa fa-user"
                aria-hidden="true"
                style="color: #333333"
              ></i>
              从业者
            </h6>
          </div>
          <div class="card-body">
            <table-component
              :data="getAllPractitioners"
              table-class="table"
              ref="practitioners"
              sort-by="name"
              sort-order="asc"
            >
              <table-column label="全名" header-class="name_th">
                <template slot-scope="row">
                  <div class="practitioner_full-name">
                    <span style="margin-right: 10px">{{ row.name }}</span>
                  </div>
                </template>
              </table-column>
              <table-column label="性別" header-class="gender_th">
                <template slot-scope="row">
                  <div class="practitioner_gender">
                    <span v-if="row.gender == 'male'">男</span>
                    <span v-if="row.gender == 'female'">女</span>
                  </div>
                </template>
              </table-column>
              <table-column
                label="个人信息"
                :sortable="false"
                :filterable="false"
                header-class="action_th"
              >
                <template slot-scope="row">
                  <div class="actions">
                    <a
                      :href="'/admin/users/profile/' + row.id"
                      class="btn btn-default btn-xs"
                      >详情</a
                    >
                  </div>
                </template>
              </table-column>
            </table-component>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/babel">
import { TableComponent, TableColumn } from "vue-table-component";
import Ls from "./../../../services/ls.js";
export default {
  props: ["toggle"],
  components: {
    TableComponent,
    TableColumn,
  },
  data() {
    return {
      header: "header",
      user_role: "",
      system_admin: 0,
      regional_admin: 0,
      number_regions: 0,
      practitioners: 0,
      allAdmins: [],
      allRegionalAdmins: [],
      allPractitioners: [],
      name: "",
      keys1: ["name", "gender"],
      keys2: ["name", "gender", "region"],
      regionInfo_keys: [
        "region_name",
        "region_admin_number",
        "region_company_number",
        "region_practitioner_number",
      ],
    };
  },
  async created() {
    this.name = Ls.get("Name");
    this.user_role = Ls.get("Role");
    const response = await axios.get("/api/get/allAdminUsers");
    let all_users = response.data;
    all_users.forEach((user, index) => {
      if (user.role == "admin") {
        this.allAdmins.push(user);
      } else if (user.role == "regional_admin") {
        this.allRegionalAdmins.push(user);
      } else if (user.role == "practitioner") {
        this.allPractitioners.push(user);
      }
    });
    this.system_admin = this.allAdmins.length;
    this.regional_admin = this.allRegionalAdmins.length;
    this.practitioners = this.allPractitioners.length;
  },
  methods: {
    async getAllRegions({ page, filter, sort }) {
      const response_regions = await axios.get("/api/admin/region/get/all");
      const response_all_users = await axios.get("/api/get/allAdminUsers");
      this.number_regions = response_regions.data.length;
      let regionInfos = [];
      regionInfos = response_regions.data.map((region) => {
        let response_regionAdmins = response_all_users.data.filter(
          (user) => user.role == "regional_admin" && user.region == region.name
        );
        let response_regionPractitioners = response_all_users.data.filter(
          (user) => user.role == "practitioner" && user.region == region.name
        );
        if (region.companies) {
          return {
            region_name: region.name,
            region_admin_number: response_regionAdmins.length,
            region_company_number: region.companies.split(" / ").length,
            region_practitioner_number: response_regionPractitioners.length,
          };
        } else {
          return {
            region_name: region.name,
            region_admin_number: response_regionAdmins.length,
            region_company_number: 0,
            region_practitioner_number: response_regionPractitioners.length,
          };
        }
      });
      let total_pages = Math.ceil(regionInfos.length / 5);
      let exist = this;
      let return_data = [];
      if (filter) {
        regionInfos.forEach((item, index) => {
          exist.regionInfo_keys.forEach((key) => {
            if (item[key].toString() != "") {
              if (item[key].toString().includes(filter)) {
                return_data.push(item);
              }
            }
          });
        });
        return_data = exist.removeDuplicates(return_data);
      } else {
        return_data = regionInfos;
      }
      return_data = return_data.filter(
        (item, index) => index >= (page - 1) * 5 && index < page * 5
      );
      return {
        data: return_data,
        pagination: {
          totalPages: total_pages,
          currentPage: page,
          count: page * 5,
        },
      };
    },
    async getAllAdmins({ page, filter, sort }) {
      const response = await axios.get("/api/get/allAdminUsers");
      let all_users = response.data;
      let all_admin_users = all_users.filter((item) => item.role == "admin");
      let total_pages = Math.ceil(all_users.length / 5);
      let exist = this;
      let return_data = [];
      if (filter) {
        all_admin_users.forEach((item, index) => {
          exist.keys1.forEach((key) => {
            if (item[key]) {
              if (item[key].includes(filter)) {
                return_data.push(item);
              }
            }
          });
        });
        return_data = exist.removeDuplicates(return_data);
      } else {
        return_data = all_admin_users;
      }
      return_data = return_data.filter(
        (item, index) => index >= (page - 1) * 5 && index < page * 5
      );
      return {
        data: return_data,
        pagination: {
          totalPages: total_pages,
          currentPage: page,
          count: page * 5,
        },
      };
    },
    async getAllRegionAdmins({ page, filter, sort }) {
      const response = await axios.get("/api/get/allAdminUsers");
      let all_users = response.data;
      let all_region_admins = all_users.filter(
        (item) => item.role == "regional_admin"
      );
      let total_pages = Math.ceil(all_region_admins.length / 5);
      let exist = this;
      let return_data = [];
      if (filter) {
        all_region_admins.forEach((item, index) => {
          exist.keys2.forEach((key) => {
            if (item[key]) {
              if (item[key].includes(filter)) {
                return_data.push(item);
              }
            }
          });
        });
        return_data = exist.removeDuplicates(return_data);
      } else {
        return_data = all_region_admins;
      }
      return_data = return_data.filter(
        (item, index) => index >= (page - 1) * 5 && index < page * 5
      );
      return {
        data: return_data,
        pagination: {
          totalPages: total_pages,
          currentPage: page,
          count: page * 5,
        },
      };
    },
    async getAllPractitioners({ page, filter, sort }) {
      const response = await axios.get("/api/get/allAdminUsers");
      let all_users = response.data;
      let all_practitioners = all_users.filter(
        (item) => item.role == "practitioner"
      );
      let total_pages = Math.ceil(all_practitioners.length / 5);
      let exist = this;
      let return_data = [];
      if (filter) {
        all_practitioners.forEach((item, index) => {
          exist.keys1.forEach((key) => {
            if (item[key]) {
              if (item[key].includes(filter)) {
                return_data.push(item);
              }
            }
          });
        });
        return_data = exist.removeDuplicates(return_data);
      } else {
        return_data = all_practitioners;
      }
      return_data = return_data.filter(
        (item, index) => index >= (page - 1) * 5 && index < page * 5
      );
      return {
        data: return_data,
        pagination: {
          totalPages: total_pages,
          currentPage: page,
          count: page * 5,
        },
      };
    },
    removeDuplicates(arr) {
      return arr.filter((item, index) => arr.indexOf(item) === index);
    },
  },
};
</script>
<style scoped>
#dashboardPage {
  transition: ease 0.3s all;
  margin-top: 20px;
}
.role_practitioner {
  padding: 35px 30px 0px 105px;
  min-height: calc(100% - 90px);
}
.system_admin {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 37px;
}
.system_admin img {
  max-width: 100%;
}
.system_admin div {
  width: 35px;
}
.dashbox i {
  font-size: 30px;
  left: 40px;
  position: absolute;
  top: 45px;
}
.system-admins,
.regional-admins,
.practitioners {
  display: flex;
  align-items: center;
  justify-content: center;
}
.system-admins div,
.regional-admins div {
  width: 23px;
  height: 23px;
  margin-right: 10px;
}
.system-admins div img,
.regional-admins div img {
  max-width: 100%;
  position: relative;
  top: 1px;
}
.card-body {
  /* height: 300px; */
  overflow: scroll;
}
.basic_welcome span {
  font-size: 30px;
  font-weight: 500;
  font-family: emoji;
}
.basic_welcome p {
  margin-top: 20px;
  color: rgb(161 147 147);
}
</style>

<style>
.name_th,
.gender_th,
.management_area_th,
.action_th {
  text-align: center !important;
}
.table-component__table__head tr th {
  text-align: center !important;
}
.table-component__table__body tr td {
  text-align: center !important;
}
</style>
