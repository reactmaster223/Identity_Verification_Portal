<template>
  <div id="all-users" :class="myClass">
    <div class="page-header" v-if="!region_id_prop">
      <h3 class="page-title">添加新公司</h3>
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <a href="/admin/region_management" v-if="user_role == 'admin'"
            >系统管理</a
          >
          <a href="#" v-if="user_role == 'regional_admin'">区域管理</a>
        </li>
        <li class="breadcrumb-item active">区域公司</li>
      </ol>
    </div>

    <div class="new_region" v-if="!region_id_prop">
      <b-button @click="showModal" class="btn btn-warning btn-rounded"
        ><div class="verification-icon">
          <i class="fa fa-industry" aria-hidden="true"></i>
        </div>
        <span>添加新的区域公司</span></b-button
      >
    </div>

    <b-modal
      v-if="!region_id_prop"
      centered
      hide-footer
      title="添加新的区域公司"
      ref="add-new-company-modal"
      no-close-on-backdrop
    >
      <div class="edit-personal-profile">
        <b-form @submit.stop.prevent="addNewCompany">
          <div class="company-name-edit">
            <b-form-group
              id="new-company-name-input"
              label="公司名"
              label-for="new-company-name-input"
            >
              <b-form-input
                id="new-company-name-input"
                name="new-company-name-input"
                v-model="newCompanyName"
                v-validate="{ required: true, min: 3 }"
                :state="validateState('new-company-name-input')"
                aria-describedby="new-company-name-input-live-feedback"
                data-vv-as="公司名"
              ></b-form-input>

              <b-form-invalid-feedback
                id="new-company-name-input-live-feedback"
                >{{
                  veeErrors.first("new-company-name-input")
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
    </b-modal>

    <div class="row">
      <div class="col-sm-12">
        <div class="card">
          <div class="card-header">
            <h6>区域公司</h6>
          </div>
          <div class="card-body">
            <table-component
              :data="getAllCompaniesWithId"
              table-class="table"
              ref="company_table"
              sort-by="id"
              sort-order="asc"
            >
              <table-column label="ID" header-class="id_th">
                <template slot-scope="row">
                  <div class="region_id text_center">
                    <span>{{ row.id }}</span>
                  </div>
                </template>
              </table-column>
              <table-column label="公司名" header-class="name_th">
                <template slot-scope="row">
                  <div class="company_name text_center">
                    <span>{{ row.name }}</span>
                  </div>
                </template>
              </table-column>
              <table-column
                label="行动"
                :sortable="false"
                :filterable="false"
                header-class="action_th"
                v-if="actionClass == 'display_block'"
              >
                <template slot-scope="row">
                  <div class="actions text_center" :class="actionClass">
                    <a
                      class="btn btn-default btn-sm delete_color"
                      data-delete
                      data-confirmation="notie"
                      @click="deleteRegionCompany(row.name)"
                    >
                      <i class="icon-fa icon-fa-trash" />
                      刪除
                    </a>
                  </div>
                </template>
              </table-column>
            </table-component>
            <fade-loader :loading="loading" class="auth_spinner"></fade-loader>
          </div>
        </div>
      </div>
    </div>
    <sweet-modal ref="success_modal_region" icon="success">
      {{ newCompanyName }} 创建成功！
    </sweet-modal>
  </div>
</template>

<script>
import { TableComponent, TableColumn } from "vue-table-component";
import ClipLoader from "vue-spinner/src/ClipLoader.vue";
import FadeLoader from "vue-spinner/src/FadeLoader.vue";
import { SweetModal, SweetModalTab } from "sweet-modal-vue";
import Ls from "./../../../services/ls.js";
import Auth from "./../../../services/auth.js";
export default {
  props: ["toggle", "region_id_prop", "region_name"],
  data() {
    return {
      region_id: "",
      user_role: "",
      newCompanyName: "",
      loadingPage: false,
      keys: ["name"],
      region_companies: [],
      loading: true,
    };
  },
  watch: {
    region_id_prop: function (newVal, oldVal) {
      if (newVal) {
        this.region_id = newVal;
      }
    },
  },
  created() {
    this.user_role = Ls.get("Role");
    this.loadingPage = false;
    if (this.region_id_prop) {
      this.region_id = this.region_id_prop;
    } else {
      this.region_id = this.$route.params.id;
    }
  },
  install(Vue, options) {
    Vue.component("SweetModal", SweetModal);
    Vue.component("SweetModalTab", SweetModalTab);
  },
  components: {
    SweetModal,
    SweetModalTab,
    ClipLoader,
    TableComponent,
    TableColumn,
    FadeLoader,
  },
  computed: {
    myClass() {
      if (!this.region_id_prop) {
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
  methods: {
    async getAllCompaniesWithId({ page, filter, sort }) {
      const response = await axios.get(
        `/api/region/companies/${this.region_id}`
      );
      this.loading = false;
      let region_companies = response.data.companies;
      let return_data = [];
      if (region_companies) {
        region_companies = region_companies.split(" / ");
        region_companies = region_companies.filter((item) => item !== "");
        this.region_companies = region_companies;
        region_companies = region_companies.map((item, index) => {
          return {
            id: index + 1,
            name: item,
          };
        });
        let total_pages = Math.ceil(region_companies.length / 5);
        let exist = this;
        if (filter) {
          region_companies.forEach((item, index) => {
            exist.keys.forEach((key) => {
              if (item[key]) {
                if (item[key].includes(filter)) {
                  return_data.push(item);
                }
              }
            });
          });
          return_data = exist.removeDuplicates(return_data);
        } else {
          return_data = region_companies;
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
      } else {
        return {
          data: return_data,
          pagination: {
            totalPages: 1,
            currentPage: page,
            count: 0,
          },
        };
      }
    },
    removeDuplicates(arr) {
      return arr.filter((item, index) => arr.indexOf(item) === index);
    },
    deleteRegionCompany(name) {
      let self = this;
      window.notie.confirm({
        text: "您确定要删除此区域吗？",
        cancelCallback: function () {
          window.toastr["info"]("取消");
        },
        submitCallback: function () {
          self.deleteRegionCompanyData(name);
        },
      });
    },
    showModal() {
      this.$refs["add-new-company-modal"].show();
    },
    hideModal() {
      this.$refs["add-new-company-modal"].hide();
    },
    async deleteRegionCompanyData(name) {
      try {
        this.region_companies = this.region_companies.filter(
          (item) => item !== name
        );
        var filteredCompanies = "";
        this.region_companies.map((item, index) => {
          if (index !== this.region_companies.length - 1) {
            filteredCompanies += item;
            filteredCompanies += " / ";
          } else {
            filteredCompanies += item;
          }
        });
        let info = {
          region_id: this.region_id,
          companies: filteredCompanies,
        };
        let response = await window.axios.post(
          "/api/admin/region/company/update",
          info
        );
        this.$refs.company_table.refresh();
        window.toastr["success"]("地区已删除", "成功");
      } catch (error) {
        if (error) {
          window.toastr["error"]("有一個错误", "错误");
        }
      }
    },
    addNewCompany() {
      this.$validator.validateAll().then((result) => {
        if (!result) {
          return;
        }
        this.loadingPage = true;
        let companyInfo = {
          region_id: this.region_id,
          company_name: this.newCompanyName,
        };
        Auth.addNewCompanyToDB(companyInfo).then((res) => {
          this.loadingPage = false;
          this.$refs.success_modal_region.open();
          this.hideModal();
          this.$refs.company_table.refresh();
        });
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
.company-name-edit #new-company-name-input {
  width: 100%;
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
.verification-icon {
  padding-left: 15px;
  padding-right: 10px;
  padding-top: 5px;
  padding-bottom: 5px;
  border-right: 1px solid;
}
.new_region {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: 15px;
}
.new_region button {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 0px !important;
  padding-top: 5px !important;
  padding-bottom: 5px !important;
}
.new_region button span {
  padding-left: 10px;
}
.delete_color {
  color: rgb(215 35 35) !important;
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
</style>

<style>
.table-component__th {
  text-align: center !important;
}
.text_center {
  text-align: center;
}
.id_th {
  width: 90px !important;
}
.name_th {
  width: 200px !important;
}
.action_th {
  width: 200px !important;
}
.modal-header,
.modal-footer {
  background-color: #ffde00 !important;
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
</style>