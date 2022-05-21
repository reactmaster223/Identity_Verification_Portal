<template>
  <div id="practitioners-verification" :class="myClass">
    <div class="page-header">
      <h3 class="page-title">从业者验证</h3>
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <a href="#">员工管理</a>
        </li>
        <li class="breadcrumb-item active">从业者验证</li>
      </ol>
    </div>
    <div class="member_verification">
      <b-button variant="success" @click="listenBatchImport">批量导入</b-button>
    </div>
    <b-modal
      centered
      hide-footer
      size="lg"
      title="批量导入"
      ref="import-batch"
      no-close-on-backdrop
    >
      <div class="import-batch">
        <div>
          <p>1、请按照模版的要求准备导入数据</p>
          <p>
            2、文件名后缀名必须为：<span>xls，xlsx或者xlsm（即Excel格式）</span>
          </p>
          <p>3、请选择需要导入的Excel文件</p>
        </div>
      </div>
      <div class="input-excel">
        <b-form-input
          placeholder="输入批处理文件"
          v-model="batch_file_name"
          disabled
        ></b-form-input>
        <div>
          <b-button variant="warning" @click="importBatch">
            <span v-if="loadingVerification == false">导入</span>
            <plus-loader :loading="loadingVerification"></plus-loader>
          </b-button>
          <b-form-file
            id="batch-input"
            name="batch-input"
            placeholder="输入批处理文件"
            drop-placeholder="输入批处理文件"
            v-model="batch_file"
            @change="onChangeBatchFile"
          ></b-form-file>
        </div>
      </div>
    </b-modal>
    <div class="row">
      <div class="col-sm-12">
        <div class="card">
          <div class="card-header">
            <h6>选择从业人员进行验证</h6>
          </div>
          <div class="card-body">
            <div style="overflow: auto">
              <table class="table table-striped table-hover">
                <thead>
                  <tr>
                    <th scope="col">
                      <div class="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          class="custom-control-input"
                          id="allCheck"
                          @click="checkAll"
                        />
                        <label class="custom-control-label" for="allCheck"
                          >1</label
                        >
                      </div>
                    </th>
                    <th scope="col">No</th>
                    <th scope="col">姓名</th>
                    <th scope="col">手机号</th>
                    <th scope="col">身份证</th>
                    <th scope="col">部门</th>
                    <th scope="col">工号</th>
                    <th scope="col">证件有效期至</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in items" :key="item.No">
                    <td>
                      <div class="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          class="custom-control-input"
                          :id="item.No"
                          @input="listenInput(item.No)"
                        />
                        <label class="custom-control-label" :for="item.No"
                          >1</label
                        >
                      </div>
                    </td>
                    <td>{{ item.No }}</td>
                    <td>{{ item.姓名 }}</td>
                    <td>{{ item.手机号 }}</td>
                    <td>{{ item.身份证 }}</td>
                    <td>{{ item.部门 }}</td>
                    <td>{{ item.工号 }}</td>
                    <td>{{ item.证件有效期至 }}</td>
                    <td v-if="item.verification_status == 'success'">
                      <span
                        v-tooltip="{
                          content: item.verification_text,
                          placement: position + '-center',
                          delay: {
                            show: 200,
                            hide: 300,
                          },
                          classes: ['info'],
                        }"
                        ><div class="success_png">
                          <img
                            src="/assets/verification/success.png"
                            alt="Success Verification"
                          /></div
                      ></span>
                    </td>
                    <td v-if="item.verification_status == 'failed'">
                      <span
                        v-tooltip="{
                          content: item.verification_text,
                          placement: position + '-center',
                          delay: {
                            show: 200,
                            hide: 300,
                          },
                          classes: ['info'],
                        }"
                        ><div class="failed_png">
                          <img
                            src="/assets/verification/failed.png"
                            alt="Failed Verification"
                          /></div
                      ></span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="export_batch">
              <vue-excel-xlsx
                :data="itemsForVerification"
                :columns="columns"
                :file-name="fileName"
                :file-type="'xlsx'"
                :sheet-name="sheetName"
                class="export-excel-batch"
              >
                <b-button
                  variant="warning"
                  :disabled="!practitionersForVerificaiton.length"
                  @click="carryBatchExport"
                  >确认</b-button
                >
              </vue-excel-xlsx>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import PlusLoader from "vue-spinner/src/ClipLoader.vue";
import Ls from "./../../../services/ls.js";
export default {
  props: ["toggle"],
  components: {
    PlusLoader,
  },
  data() {
    return {
      current_user_role: "",
      user_region: "",
      user_company: "",
      items: [],
      itemsForVerification: [],
      practitionersForVerificaiton: [],
      columns: [
        { label: "姓名", field: "姓名" },
        { label: "手机号", field: "手机号" },
        { label: "身份证", field: "身份证" },
        { label: "证件有效期至（默认永久）", field: "证件有效期至" },
        { label: "部门", field: "部门" },
        { label: "工号", field: "工号" },
      ],
      fileName: "template",
      sheetName: "证件模板",
      batch_file_name: null,
      loadingVerification: false,
      batch_file: null,
      position: "top",
    };
  },
  created() {
    this.current_user_role = Ls.get("Role");
    this.user_region = Ls.get("Region Name");
    this.user_company = Ls.get("Company Name");
    this.listenBatchExport();
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
  methods: {
    checkAll() {
      if (document.getElementById("allCheck").checked == true) {
        this.items.forEach((item) => {
          document.getElementById(item.No).checked = true;
        });
        this.practitionersForVerificaiton = this.items.map((item) => item.No);
      } else {
        this.items.forEach((item) => {
          document.getElementById(item.No).checked = false;
        });
        this.practitionersForVerificaiton = [];
      }
    },
    async listenBatchExport() {
      this.items = [];
      this.itemsForVerification = [];
      var unverifiedPractitioners;
      if (this.current_user_role == "admin") {
        let response = await axios.get("/api/admin/practitioners/unverified");
        unverifiedPractitioners = response.data;
      } else if (this.current_user_role == "regional_admin") {
        let response = await axios.get(
          `/api/admin/practitioners/region/unverified/${this.user_region}`
        );
        unverifiedPractitioners = response.data;
      } else if (this.current_user_role == "company_admin") {
        let response = await axios.get(
          `/api/admin/practitioners/company/unverified/${this.user_company}`
        );
        unverifiedPractitioners = response.data;
      }

      unverifiedPractitioners.forEach((item, index) => {
        this.items.push({
          No: index + 1,
          username: item.username,
          姓名: item.name.substring(0, 6),
          手机号: item.company_phone_number,
          身份证: item.id_number,
          部门: item.company.substring(0, 18),
          工号: item.serial_number,
          证件有效期至: item.validity_period,
          verification_status: "",
          verification_text: "",
        });
      });
    },
    listenInput(id) {
      if (document.getElementById(id).checked == true) {
        if (this.practitionersForVerificaiton.indexOf(id) < 0) {
          this.practitionersForVerificaiton.push(id);
        }
      } else if (document.getElementById(id).checked == false) {
        let index = this.practitionersForVerificaiton.indexOf(id);
        if (index >= 0) {
          this.practitionersForVerificaiton.splice(index, 1);
        }
      }
    },
    carryBatchExport() {
      this.practitionersForVerificaiton.forEach((id) => {
        this.items.forEach((item) => {
          if (item.No == id) {
            this.itemsForVerification.push({
              姓名: item.姓名,
              手机号: item.手机号,
              身份证: item.身份证,
              部门: item.部门,
              工号: parseInt(item.工号),
              证件有效期至: item.证件有效期至,
            });
          }
        });
      });
      setTimeout(() => {
        this.itemsForVerification = [];
      }, 1500);
    },
    listenBatchImport() {
      this.$refs["import-batch"].show();
    },
    async onChangeBatchFile(e) {
      try {
        this.loadingVerification = true;
        let file = e.target.files[0];
        this.batch_file_name = file.name;
        const config = {
          headers: {
            "content-type": "multipart/form-data",
          },
        };
        let formData = new FormData();
        formData.append("batch_file", file);
        let response = await axios.post(
          "/api/admin/practitioners/provideBatchFile",
          formData,
          config
        );
        // if (response.data == "Successfully Saved !") {
        window.toastr["info"]("验证过程开始...");
        try {
          let response = await axios.get("/api/admin/verification/authenicate");
          if (response.statusText == "OK") {
            try {
              let response = await axios.get(
                "/api/admin/verification/getJSONFromExcel"
              );
              if (response.data.status == "Success") {
                let original = response.data.original_rows[0];
                let verification = response.data.rows[0];
                let healths = response.data.healths[0];
                original.shift();
                verification.shift();
                healths.shift();
                let exist = this;
                if (original.length == verification.length) {
                  verification.forEach((v, index) => {
                    exist.items.forEach(async (item) => {
                      if (item.姓名 == v[0] && item.身份证 == v[2]) {
                        item.verification_status = "failed";
                        item.verification_text = v[6];
                        await axios.post(
                          "/api/admin/verification/updateVerificationStatus",
                          {
                            username: item.username,
                            verification_result: "nonactivated",
                            verification_text: item.verification_text,
                          }
                        );
                        await axios.post(
                          "/api/admin/verification/updateHealthStatus",
                          {
                            username: item.username,
                            health_status: healths[index][3],
                            uploaded_time: healths[index][4],
                          }
                        );
                      }
                    });
                  });
                } else if (verification.length == 0 && original.length != 0) {
                  original.forEach((org) => {
                    exist.items.forEach(async (item) => {
                      if (item.姓名 == org[0] && item.身份证 == org[2]) {
                        item.verification_status = "success";
                        item.verification_text = "已验证";
                        await axios.post(
                          "/api/admin/verification/updateVerificationStatus",
                          {
                            username: item.username,
                            verification_result: "activated",
                            verification_text: item.verification_text,
                          }
                        );
                        await axios.post(
                          "/api/admin/verification/updateHealthStatus",
                          {
                            username: item.username,
                            health_status: "绿码",
                            uploaded_time: healths[0][4],
                          }
                        );
                      }
                    });
                  });
                } else if (
                  verification.length != original.length &&
                  verification.length != 0 &&
                  original.length != 0
                ) {
                  let verified_members = [];
                  let unverified_members = [];
                  original.forEach((org) => {
                    let search_index = verification.findIndex(
                      (vrf) => vrf[0] == org[0] && vrf[2] == org[2]
                    );
                    if (search_index == -1) {
                      verified_members.push(org);
                    } else {
                      unverified_members.push(verification[search_index]);
                    }
                  });
                  verified_members.forEach((vrf) => {
                    exist.items.forEach(async (item) => {
                      if (item.姓名 == vrf[0] && item.身份证 == vrf[2]) {
                        item.verification_status = "success";
                        item.verification_text = "已验证";
                        await axios.post(
                          "/api/admin/verification/updateVerificationStatus",
                          {
                            username: item.username,
                            verification_result: "activated",
                            verification_text: item.verification_text,
                          }
                        );
                        await axios.post(
                          "/api/admin/verification/updateHealthStatus",
                          {
                            username: item.username,
                            health_status: "绿码",
                            uploaded_time: healths[0][4],
                          }
                        );
                      }
                    });
                  });
                  unverified_members.forEach((uvrf) => {
                    exist.items.forEach(async (item) => {
                      if (item.姓名 == uvrf[0] && item.身份证 == uvrf[2]) {
                        item.verification_status = "failed";
                        item.verification_text = uvrf[6];
                        await axios.post(
                          "/api/admin/verification/updateVerificationStatus",
                          {
                            username: item.username,
                            verification_result: "nonactivated",
                            verification_text: item.verification_text,
                          }
                        );
                        await axios.post(
                          "/api/admin/verification/updateHealthStatus",
                          {
                            username: item.username,
                            health_status: healths[0][3],
                            uploaded_time: healths[0][4],
                          }
                        );
                      }
                    });
                  });
                }
                window.toastr["success"]("验证成功完成。", "成功");
                exist.$refs["import-batch"].hide();
                exist.batch_file_name = null;
                exist.loadingVerification = false;
                exist.practitionersForVerificaiton = [];

                setTimeout(() => {
                  exist.items.forEach((item) => {
                    if (document.getElementById(item.No).checked == true) {
                      document.getElementById(item.No).checked = false;
                    }
                  });

                  exist.items = exist.items.filter(
                    (item) => item.verification_status != "success"
                  );
                }, 10000);
              }
            } catch (e) {
              this.loadingVerification = false;
              window.toastr["error"](
                "有一些错误。 请检查批处理文件的扩展名并刷新页面，然后重试。",
                "错误"
              );
            }
          }
        } catch (e) {
          this.loadingVerification = false;
          window.toastr["error"](
            "有一些错误。 请检查批处理文件的扩展名并刷新页面，然后重试。",
            "错误"
          );
        }
      } catch (e) {
        this.loadingVerification = false;
        window.toastr["error"](
          "有一些错误。 请检查批处理文件的扩展名并刷新页面，然后重试。",
          "错误"
        );
      }
    },
    importBatch() {
      document.getElementById("batch-input").click();
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
.custom-control-input {
  display: none;
}
.custom-control-label {
  opacity: 1;
  cursor: pointer;
}
.custom-checkbox .custom-control-label::before {
  left: 0px !important;
}
.custom-control-label::after {
  left: 0px !important;
}
.export_batch {
  text-align: right;
}
.member_verification {
  text-align: right;
  margin-bottom: 20px;
}
.input-excel {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0px 30px 30px;
}
.import-batch {
  padding: 40px 30px 20px;
}
.import-batch span {
  color: red;
}
.breadcrumb {
  align-items: center;
  justify-content: center;
}
.success_png,
.failed_png {
  width: 30px;
  height: 30px;
  margin: 0px auto;
}
.success_png img,
.failed_png img {
  max-width: 100%;
}
</style>

<style>
.modal-header,
.modal-footer {
  background-color: #ffde00 !important;
}
.export-excel-batch {
  border: 0px !important;
  background-color: transparent !important;
}
.input-excel .form-control {
  width: 300px;
  margin-right: 20px;
}
#batch-input__BV_file_outer_ {
  position: absolute;
  bottom: 0px;
  right: 0px;
  opacity: 0;
  width: 10px;
}
</style>