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
      <h3 class="page-title">区域管理</h3>
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <a href="#">系统管理</a>
        </li>
        <li class="breadcrumb-item active">区域管理</li>
      </ol>
    </div>

    <div class="new_region">
      <b-button @click="showModal" class="btn btn-warning btn-rounded"
        ><div class="verification-icon">
          <i class="fas fa-city"></i>
        </div>
        <span>添加新区域</span></b-button
      >
    </div>

    <b-modal
      centered
      hide-footer
      title="添加新区域"
      ref="add-new-region-modal"
      no-close-on-backdrop
    >
      <div class="edit-personal-profile">
        <b-form @submit.stop.prevent="addNewRegion">
          <div class="region-name-edit">
            <b-form-group
              id="new-region-name-input"
              label="地区名称"
              label-for="new-region-name-input"
            >
              <b-form-input
                id="new-region-name-input"
                name="new-region-name-input"
                v-model="newRegionName"
                v-validate="{ required: true, min: 3 }"
                :state="validateState('new-region-name-input')"
                aria-describedby="new-region-name-input-live-feedback"
                data-vv-as="地区名称"
              ></b-form-input>

              <b-form-invalid-feedback
                id="new-region-name-input-live-feedback"
                >{{
                  veeErrors.first("new-region-name-input")
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
            <h6>所有地区</h6>
          </div>
          <div class="card-body">
            <table-component
              :data="getAllRegions"
              table-class="table"
              ref="region_table"
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
              <table-column label="地区名称" header-class="name_th">
                <template slot-scope="row">
                  <div class="region_name text_center">
                    <span>{{ row.region_name }}</span>
                  </div>
                </template>
              </table-column>
              <table-column label="区域公司" header-class="company_th">
                <template slot-scope="row">
                  <div class="regional_companies text_center">
                    <span v-if="row.companies == null">还没有公司</span>
                    <span v-else>{{ row.companies }}</span>
                  </div>
                </template>
              </table-column>
              <table-column
                label="行动"
                :sortable="false"
                :filterable="false"
                header-class="action_th"
              >
                <template slot-scope="row">
                  <div class="actions text_center">
                    <router-link :to="'/admin/regions/' + row.region_id">
                      <a class="btn btn-default btn-sm">
                        <i class="icon-fa icon-fa-edit" />
                        編輯
                      </a>
                    </router-link>
                    <a
                      class="btn btn-default btn-sm delete_color"
                      data-delete
                      data-confirmation="notie"
                      @click="deleteRegion(row.region_id)"
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
      {{ newRegionName }} 创建成功！
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
  props: ["toggle"],
  data() {
    return {
      user_role: "",
      newRegionName: "",
      loadingPage: false,
      keys: ["region_name", "companies"],
      loading: true,
    };
  },
  created() {
    this.user_role = Ls.get("Role");
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
    TableComponent,
    TableColumn,
    FadeLoader,
  },
  methods: {
    async getAllRegions({ page, filter, sort }) {
      const response = await axios.get("/api/admin/region/get/all");
      this.loading = false;
      let all_regions = response.data;
      all_regions = all_regions.map((item, index) => {
        return {
          id: index + 1,
          region_id: item.id,
          region_name: item.name,
          companies: !item.companies
            ? item.companies
            : item.companies.split(" / ").slice(1, 5).toString() + " ... ",
        };
      });
      let total_pages = Math.ceil(all_regions.length / 5);
      let return_data = [];
      let exist = this;
      if (filter) {
        all_regions.forEach((item, index) => {
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
        return_data = all_regions;
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
    deleteRegion(id) {
      let self = this;
      window.notie.confirm({
        text: "您确定要删除此区域吗？",
        cancelCallback: function () {
          window.toastr["info"]("取消");
        },
        submitCallback: function () {
          self.deleteRegionData(id);
        },
      });
    },
    showModal() {
      this.$refs["add-new-region-modal"].show();
    },
    hideModal() {
      this.$refs["add-new-region-modal"].hide();
    },
    async deleteRegionData(id) {
      try {
        let response = await window.axios.delete("/api/regions/" + id);
        this.$refs.region_table.refresh();
        window.toastr["success"]("地区已删除", "成功");
      } catch (error) {
        if (error) {
          window.toastr["error"]("有一個错误", "错误");
        }
      }
    },
    addNewRegion() {
      this.$validator.validateAll().then(async (result) => {
        if (!result) {
          return;
        }
        this.loadingPage = true;
        let regionInfo = {
          region_name: this.newRegionName,
        };
        let response = await axios.post("/api/region-exist", {
          region_name: regionInfo.region_name,
        });
        if (response.data == false) {
          toastr["error"]("区域名称已存在。 输入另一个区域名称。");
          this.loadingPage = false;
        } else {
          Auth.addNewRegionToDB(regionInfo).then((res) => {
            this.loadingPage = false;
            this.$refs.success_modal_region.open();
            this.$emit("addNewRegion", {
              role: this.user_role,
            });
            this.hideModal();
            this.$refs.region_table.refresh();
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
.region-name-edit #new-region-name-input {
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