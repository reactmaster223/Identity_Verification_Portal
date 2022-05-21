<template>
  <div class="row">
    <div class="col-sm-12">
      <div class="card">
        <div class="card-body">
          <tabs class="tabs-default">
            <div class="row">
              <div class="col-md-3 col-sm-5">
                <div class="avatar-container">
                  <img
                    :src="user_picture_sub"
                    alt="Admin Avatar"
                    class="img-fluid"
                  />
                  <form
                    @submit="changeUserAvatar"
                    enctype="multipart/form-data"
                    v-if="current_user_role != 'practitioner'"
                  >
                    <input
                      id="user-avatar"
                      type="file"
                      accept="image/png, image/gif, image/jpeg"
                      class="form-control"
                      v-on:change="onChange"
                      style="display: none"
                    />
                    <button
                      type="submit"
                      class="btn btn-primary btn-block"
                      style="display: none"
                    ></button>
                    <button
                      @click="changeAvatarOccurr"
                      v-tooltip="{
                        content: tooltipText_sub,
                        placement: position + '-center',
                        delay: {
                          show: 200,
                          hide: 300,
                        },
                        classes: ['info'],
                      }"
                      class="user-avatar-change"
                    ></button>
                  </form>
                </div>
                <div class="personal-info"></div>
              </div>
              <div class="col-md-9 col-sm-7">
                <h2>编辑个人资料</h2>
                <div class="edit-personal-profile">
                  <b-form @submit.stop.prevent="onSubmit">
                    <div class="user-name-edit">
                      <b-form-group
                        id="name-input-group"
                        label="真实姓名"
                        label-for="name-input"
                      >
                        <b-form-input
                          id="name-input"
                          name="name-input"
                          v-model="name_sub"
                          v-validate="{ required: true, min: 2 }"
                          :state="validateState('name-input')"
                          aria-describedby="name-input-live-feedback"
                          data-vv-as="姓名"
                          @change="onUpdate('name', name_sub)"
                          :disabled="
                            current_user_role == 'practitioner' ? true : false
                          "
                        ></b-form-input>

                        <b-form-invalid-feedback
                          id="name-input-live-feedback"
                          >{{
                            veeErrors.first("name-input")
                          }}</b-form-invalid-feedback
                        >
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
                          v-model="username_sub"
                          v-validate="{ required: true, min: 3 }"
                          :state="validateState('username-input')"
                          aria-describedby="username-input-live-feedback"
                          data-vv-as="用户名"
                          @change="onUpdate('username', username_sub)"
                          :disabled="
                            current_user_role == 'practitioner' ? true : false
                          "
                        ></b-form-input>

                        <b-form-invalid-feedback
                          id="username-input-live-feedback"
                          >{{
                            veeErrors.first("username-input")
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
                          v-model="user_gender_sub"
                          v-validate="{ required: true }"
                          :state="validateState('gender-input')"
                          aria-describedby="gender-input-live-feedback"
                          data-vv-as="性别"
                          :options="genders"
                          @change="onUpdate('gender', user_gender_sub)"
                          :disabled="
                            current_user_role == 'practitioner' ? true : false
                          "
                        ></b-form-select>

                        <b-form-invalid-feedback
                          id="gender-input-live-feedback"
                          >{{
                            veeErrors.first("gender-input")
                          }}</b-form-invalid-feedback
                        >
                      </b-form-group>

                      <b-form-group
                        id="role-input-group"
                        label="角色"
                        label-for="role-input"
                        :class="
                          current_user_role == 'practitioner'
                            ? 'visibility_hidden'
                            : 'visibility_show'
                        "
                      >
                        <b-form-select
                          id="role-input"
                          name="role-input"
                          v-model="user_role_sub"
                          v-validate="{ required: true }"
                          :state="validateState('role-input')"
                          aria-describedby="role-input-live-feedback"
                          data-vv-as="角色"
                          :options="roles"
                          @change="onUpdate('role', user_role)"
                          :disabled="
                            current_user_role == 'practitioner' ? true : false
                          "
                        ></b-form-select>

                        <b-form-invalid-feedback
                          id="role-input-live-feedback"
                          >{{
                            veeErrors.first("role-input")
                          }}</b-form-invalid-feedback
                        >
                      </b-form-group>
                    </div>

                    <div class="id-serial-edit">
                      <b-form-group
                        id="id-input-group"
                        label="身份证号"
                        label-for="id-input"
                      >
                        <b-form-input
                          id="id-input"
                          name="id-input"
                          v-model="user_id_number_sub"
                          v-validate="{ required: true }"
                          :state="validateState('id-input')"
                          aria-describedby="id-input-live-feedback"
                          data-vv-as="身份证号码"
                          @change="onUpdate('id_number', user_id_number_sub)"
                          :disabled="
                            current_user_role == 'practitioner' ? true : false
                          "
                        ></b-form-input>

                        <b-form-invalid-feedback id="id-input-live-feedback">{{
                          veeErrors.first("id-input")
                        }}</b-form-invalid-feedback>
                      </b-form-group>

                      <b-form-group
                        id="serial-input-group"
                        label="序列号"
                        label-for="serial-input"
                      >
                        <b-form-input
                          id="serial-input"
                          name="serial-input"
                          v-model="user_serial_number_sub"
                          v-validate="{ required: true }"
                          :state="validateState('serial-input')"
                          aria-describedby="serial-input-live-feedback"
                          data-vv-as="序列号"
                          @change="
                            onUpdate('serial_number', user_serial_number_sub)
                          "
                          :disabled="
                            current_user_role == 'practitioner' ? true : false
                          "
                        ></b-form-input>

                        <b-form-invalid-feedback
                          id="serial-input-live-feedback"
                          >{{
                            veeErrors.first("serial-input")
                          }}</b-form-invalid-feedback
                        >
                      </b-form-group>
                    </div>

                    <div class="validiaty_period-edit">
                      <b-form-group
                        id="vp-input-group"
                        label="失效日期"
                        label-for="vp-input"
                        :class="
                          current_user_role == 'practitioner'
                            ? 'display_none'
                            : 'display_block'
                        "
                      >
                        <b-form-datepicker
                          id="vp-input"
                          name="vp-input"
                          :state="validateState('vp-input')"
                          v-validate="{ required: true }"
                          v-model="user_validity_period_sub"
                          locale="zh"
                          :start-weekday="weekday"
                          :show-decade-nav="showDecadeNav"
                          :hide-header="hideHeader"
                          aria-describedby="vp-input-live-feedback"
                          data-vv-as="有效期"
                          @input="
                            onUpdate(
                              'validity_period',
                              user_validity_period_sub
                            )
                          "
                          :disabled="
                            current_user_role == 'practitioner' ? true : false
                          "
                        ></b-form-datepicker>
                        <b-form-invalid-feedback id="vp-input-live-feedback">{{
                          veeErrors.first("vp-input")
                        }}</b-form-invalid-feedback>
                      </b-form-group>
                    </div>

                    <div
                      class="company-region-edit"
                      label-for="company-input"
                      v-if="user_role_sub != 'admin'"
                    >
                      <b-form-group id="company-input-group" label="公司">
                        <b-form-select
                          id="company-input"
                          name="company-input"
                          v-model="user_company_sub"
                          v-validate="{ required: true }"
                          :state="validateState('company-input')"
                          aria-describedby="company-input-live-feedback"
                          data-vv-as="公司"
                          :options="companies"
                          @change="onUpdate('company', user_company_sub)"
                          :disabled="
                            current_user_role == 'practitioner' ? true : false
                          "
                        ></b-form-select>

                        <b-form-invalid-feedback
                          id="company-input-live-feedback"
                          >{{
                            veeErrors.first("company-input")
                          }}</b-form-invalid-feedback
                        >
                      </b-form-group>

                      <b-form-group
                        id="region-input-group"
                        label="地区"
                        label-for="region-input"
                        :class="
                          user_role_sub != 'admin'
                            ? 'visibility_show'
                            : 'visibility_hidden'
                        "
                      >
                        <b-form-select
                          id="region-input"
                          name="region-input"
                          v-model="user_region_sub"
                          v-validate="{ required: true }"
                          :state="validateState('region-input')"
                          aria-describedby="region-input-live-feedback"
                          data-vv-as="地区"
                          :options="regions"
                          @change="onUpdate('region', user_region_sub)"
                          :disabled="
                            current_user_role == 'practitioner' ? true : false
                          "
                        ></b-form-select>

                        <b-form-invalid-feedback
                          id="region-input-live-feedback"
                          >{{
                            veeErrors.first("region-input")
                          }}</b-form-invalid-feedback
                        >
                      </b-form-group>
                    </div>

                    <div class="verification-company-phone-number-edit">
                      <b-form-group
                        id="company-phone-number-input-group"
                        label="电话号码"
                        label-for="company-phone-number-input"
                      >
                        <b-form-input
                          id="company-phone-number-input"
                          name="company-phone-number-input"
                          v-model="user_company_phone_number_sub"
                          v-validate="{ required: true, numeric: true }"
                          :state="validateState('company-phone-number-input')"
                          aria-describedby="company-phone-number-input-live-feedback"
                          data-vv-as="电话号码"
                          @change="
                            onUpdate(
                              'company_phone_number',
                              user_company_phone_number_sub
                            )
                          "
                          :disabled="
                            current_user_role == 'practitioner' ? true : false
                          "
                        ></b-form-input>

                        <b-form-invalid-feedback
                          id="company-phone-number-input-live-feedback"
                          >{{
                            veeErrors.first("company-phone-number-input")
                          }}</b-form-invalid-feedback
                        >
                      </b-form-group>
                    </div>

                    <div
                      class="personnel-remark-information"
                      v-if="current_user_role !== 'practitioner'"
                    >
                      <b-form-group
                        id="remark-input-group"
                        label="行业数据库"
                        label-for="remark-input"
                        :class="
                          user_role_sub !== 'practitioner'
                            ? 'display_none'
                            : 'display_block'
                        "
                      >
                        <b-form-file
                          id="remark-input"
                          name="remark-input"
                          placeholder="选择一个文件或把它放在这里..."
                          drop-placeholder="把文件放在这里..."
                          v-model="user_remark_info"
                          :state="validateState('remark-input')"
                          aria-describedby="remark-input-live-feedback"
                          data-vv-as="备注信息"
                          @change="onChangeRemarkInformation"
                          :disabled="
                            current_user_role == 'practitioner' ? true : false
                          "
                        ></b-form-file>

                        <div class="mt-3 remark_name">
                          <div><span>选择的文件 : </span></div>
                          <div
                            class="file_names"
                            v-if="remark_file_names.length"
                          >
                            <b-list-group>
                              <b-list-group-item
                                v-for="file_name in remark_file_names"
                                :key="file_name.id"
                                >{{ file_name.name }}
                                <div class="file-actions">
                                  <div class="download">
                                    <span
                                      @click="
                                        downloadFile(
                                          file_name.name,
                                          file_name.id
                                        )
                                      "
                                      v-tooltip="{
                                        content: tooltip_text,
                                        placement: position + '-center',
                                        delay: {
                                          show: 200,
                                          hide: 300,
                                        },
                                        classes: ['info'],
                                      }"
                                      ><i
                                        class="fa fa-download"
                                        aria-hidden="true"
                                      ></i
                                    ></span>
                                  </div>
                                  <div class="delete">
                                    <span
                                      @click="deleteFile(file_name.id)"
                                      v-tooltip="{
                                        content: tooltip_text_delete,
                                        placement: position + '-center',
                                        delay: {
                                          show: 200,
                                          hide: 300,
                                        },
                                        classes: ['info'],
                                      }"
                                      ><i
                                        class="fa fa-trash"
                                        aria-hidden="true"
                                      ></i
                                    ></span>
                                  </div>
                                </div>
                              </b-list-group-item>
                            </b-list-group>
                          </div>
                        </div>

                        <b-form-invalid-feedback
                          id="remark-input-live-feedback"
                          >{{
                            veeErrors.first("remark-input")
                          }}</b-form-invalid-feedback
                        >
                      </b-form-group>
                    </div>

                    <div class="comments-information">
                      <!-- v-if="current_user_role !== 'practitioner'" -->
                      <b-form-group
                        id="comments-positive-input-group"
                        label="好评"
                        label-for="comments-positive-input"
                      >
                        <!-- :class="
                          user_role_sub !== 'practitioner'
                            ? 'display_none'
                            : 'display_block'
                        " -->
                        <b-form-textarea
                          id="comments-positive-input"
                          name="comments-positive-input"
                          v-model="user_positive_comments"
                          placeholder="好评输入评论..."
                          rows="3"
                          max-rows="6"
                          :state="validateState('comments-positive-input')"
                          aria-describedby="comments-positive-input-live-feedback"
                          data-vv-as="评论正面"
                          @change="
                            onUpdate(
                              'positive_comments',
                              user_positive_comments
                            )
                          "
                          :disabled="
                            current_user_role == 'practitioner' ? true : false
                          "
                        ></b-form-textarea>

                        <b-form-invalid-feedback
                          id="comments-positive-input-live-feedback"
                          >{{
                            veeErrors.first("comments-positive-input")
                          }}</b-form-invalid-feedback
                        >
                      </b-form-group>
                    </div>

                    <div class="comments-information">
                      <!-- v-if="current_user_role !== 'practitioner'" -->
                      <b-form-group
                        id="comments-negative-input-group"
                        label="差评"
                        label-for="comments-negative-input"
                      >
                        <!-- :class="
                          user_role_sub !== 'practitioner'
                            ? 'display_none'
                            : 'display_block'
                        " -->
                        <b-form-textarea
                          id="comments-negative-input"
                          name="comments-negative-input"
                          v-model="user_negative_comments"
                          placeholder="投诉输入评论..."
                          rows="3"
                          max-rows="6"
                          :state="validateState('comments-negative-input')"
                          aria-describedby="comments-negative-input-live-feedback"
                          data-vv-as="负面评论"
                          :disabled="
                            current_user_role == 'practitioner' ||
                            current_user_role == 'company_admin'
                              ? true
                              : false
                          "
                        ></b-form-textarea>

                        <b-form-invalid-feedback
                          id="comments-negative-input-live-feedback"
                          >{{
                            veeErrors.first("comments-negative-input")
                          }}</b-form-invalid-feedback
                        >
                      </b-form-group>
                    </div>

                    <div class="submit-reset">
                      <b-button
                        class="user-info-submit"
                        type="submit"
                        :disabled="
                          current_user_role == 'practitioner' ? true : false
                        "
                      >
                        <span v-if="loadingPage == false">保存</span>
                        <clip-loader :loading="loadingPage"></clip-loader>
                      </b-button>
                    </div>
                  </b-form>
                </div>
                <h2 style="margin-top: 40px">更新密码</h2>
                <div class="edit-personal-password">
                  <b-form @submit.stop.prevent="changePassword">
                    <b-form-group
                      id="current-password-input-group"
                      label="当前密码"
                      label-for="current-password-input"
                    >
                      <b-form-input
                        id="current-password-input"
                        name="current-password-input"
                        v-model="user_current_password"
                        v-validate="{ required: true }"
                        :state="
                          validateStateForPasswordChange(
                            'current-password-input'
                          )
                        "
                        aria-describedby="current-password-input-live-feedback"
                        data-vv-as="当前密码"
                        type="password"
                        :disabled="
                          current_user_role == 'practitioner' ? true : false
                        "
                      ></b-form-input>

                      <b-form-invalid-feedback
                        id="current-password-input-live-feedback"
                        >{{
                          veeErrors.first("current-password-input")
                        }}</b-form-invalid-feedback
                      >
                    </b-form-group>

                    <b-form-group
                      id="new-password-input-group"
                      label="新密码"
                      label-for="new-password-input"
                    >
                      <b-form-input
                        id="new-password-input"
                        name="new-password-input"
                        v-model="user_new_password"
                        v-validate="{ required: true, min: 6 }"
                        :state="
                          validateStateForPasswordChange('new-password-input')
                        "
                        aria-describedby="new-password-input-live-feedback"
                        data-vv-as="新密码"
                        type="password"
                        :disabled="
                          current_user_role == 'practitioner' ? true : false
                        "
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
                        v-model="user_confirm_password"
                        v-validate="{ required: true }"
                        :state="
                          validateStateForPasswordChange(
                            'confirm-password-input'
                          )
                        "
                        aria-describedby="confirm-password-input-live-feedback"
                        data-vv-as="确认密码"
                        type="password"
                        :disabled="
                          current_user_role == 'practitioner' ? true : false
                        "
                      ></b-form-input>

                      <b-form-invalid-feedback
                        id="confirm-password-input-live-feedback"
                        >{{
                          veeErrors.first("confirm-password-input")
                        }}</b-form-invalid-feedback
                      >
                    </b-form-group>
                    <div class="submit-user-password-change">
                      <b-button
                        class="user-info-submit"
                        type="submit"
                        :disabled="
                          current_user_role == 'practitioner' ? true : false
                        "
                      >
                        <span v-if="loadingPagePass == false">保存</span>
                        <clip-loader :loading="loadingPagePass"></clip-loader>
                      </b-button>
                    </div>
                  </b-form>
                </div>
              </div>
            </div>
          </tabs>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Datepicker from "vuejs-datepicker";
import ClipLoader from "vue-spinner/src/ClipLoader.vue";
import Ls from "./../../../services/ls.js";
import { Tabs, Tab } from "vue-tabs-component";
import Auth from "./../../../services/auth.js";
export default {
  props: [
    "user_id",
    "user_picture",
    "name",
    "username",
    "user_gender",
    "current_user_role",
    "user_role",
    "user_id_number",
    "user_serial_number",
    "user_validity_period",
    "user_company",
    "user_region",
    "user_company_phone_number",
    "tooltipText",
    "current_user_id",
    "remarkInfo",
    "comments",
  ],
  watch: {
    user_id: function (newVal, oldVal) {
      this.user_id_sub = newVal;
    },
    tooltipText: function (newVal, oldVal) {
      this.tooltipText_sub = newVal;
    },
    user_picture: function (newVal, oldval) {
      this.user_picture_sub = newVal;
    },
    name: function (newVal, oldVal) {
      this.name_sub = newVal;
    },
    username: function (newVal, oldVal) {
      this.username_sub = newVal;
    },
    user_gender: function (newVal, oldVal) {
      this.user_gender_sub = newVal;
    },
    user_role: function (newVal, oldVal) {
      this.user_role_sub = newVal;
    },
    user_id_number: function (newVal, oldVal) {
      this.user_id_number_sub = newVal;
    },
    user_serial_number: function (newVal, oldVal) {
      this.user_serial_number_sub = newVal;
    },
    user_validity_period: function (newVal, oldVal) {
      this.user_validity_period_sub = newVal;
    },
    user_company: function (newVal, oldVal) {
      this.user_company_sub = newVal;
    },
    user_region: function (newVal, oldVal) {
      this.user_region_sub = newVal;
      this.getCompaniesWithRegionName(this.user_region_sub);
    },
    user_company_phone_number: function (newVal, oldVal) {
      this.user_company_phone_number_sub = newVal;
    },
    remarkInfo: function (newVal, oldVal) {
      if (newVal) {
        let splittedFilePaths = newVal.split(" , ");
        let exist = this;
        exist.remark_file_paths = splittedFilePaths.map((item, index) => {
          if (item != "") {
            let splits = item.split("/");
            let length = splits.length;
            exist.remark_file_names.push({
              id: index,
              name: splits[length - 1],
            });
            return {
              id: index,
              path: item,
            };
          }
        });
      }
    },
    comments: function (newVal, oldVal) {
      if (newVal != "") {
        let comments = JSON.parse(newVal);
        this.user_positive_comments = comments.positive;
        this.user_negative_comments = comments.negative;
      }
    },
  },
  data() {
    return {
      user_picture_sub: "",
      position: "bottom",
      name_sub: "",
      username_sub: "",
      user_gender_sub: "",
      user_role_sub: "",
      user_id_number_sub: "",
      user_serial_number_sub: "",
      user_validity_period_sub: "",
      user_company_sub: "",
      user_region_sub: "",
      user_company_phone_number_sub: "",
      user_remark_info: null,
      remark_file_names: [],
      remark_file_paths: [],
      user_positive_comments: null,
      user_negative_comments: null,
      tooltipText_sub: null,
      user_id_sub: "",
      current_user_id_sub: "",
      originalData: null,
      keepUserInfo: "",
      roles: [
        { value: "practitioner", text: "从业者" },
        { value: "regional_admin", text: "区域管理员" },
        { value: "admin", text: "系统总管理员" },
      ],
      regions: [],
      companies: [],
      healthStatues: [
        { value: "risk", text: "高风险" },
        { value: "mid_risk", text: "中风险" },
        { value: "low_risk", text: "绿码" },
        { value: "unkown", text: "未知" },
      ],
      genders: [
        { value: "male", text: "男" },
        { value: "female", text: "女" },
      ],
      loadingPage: false,
      loadingPagePass: false,
      user_current_password: "......",
      user_new_password: "......",
      user_confirm_password: "......",
      img: "",
      weekday: 0,
      weekdays: [
        { value: 0, text: "Sunday" },
        { value: 1, text: "Monday" },
        { value: 6, text: "Saturday" },
      ],
      showDecadeNav: false,
      hideHeader: false,
      tooltip_text: "文件下载",
      tooltip_text_delete: "删除文件",
      position: "top",
      filteredRemarkFilePaths: null,
    };
  },
  components: {
    tabs: Tabs,
    tab: Tab,
    ClipLoader,
    Datepicker,
  },
  created() {
    this.user_id_sub = this.user_id;
    this.current_user_id_sub = this.current_user_id;
    this.user_picture_sub = this.user_picture;
    this.name_sub = this.name;
    this.username_sub = this.username;
    this.user_gender_sub = this.user_gender;
    this.user_role_sub = this.user_role;
    this.user_id_number_sub = this.user_id_number;
    this.user_serial_number_sub = this.user_serial_number;
    if (this.user_validity_period != "...") {
      this.user_validity_period_sub = this.user_validity_period;
    } else {
      var today = new Date();
      var date =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate();
      this.user_validity_period_sub = date;
    }
    this.user_company_sub = this.user_company;
    this.user_region_sub = this.user_region;
    this.getCompaniesWithRegionName(this.user_region_sub);
    this.user_company_phone_number_sub = this.user_company_phone_number;
    this.tooltipText_sub = this.tooltipText;
    let exist = this;
    if (exist.remarkInfo) {
      let splittedFilePaths = exist.remarkInfo.split(" , ");
      exist.remark_file_paths = splittedFilePaths.map((item, index) => {
        if (item != "") {
          let splits = item.split("/");
          let length = splits.length;
          exist.remark_file_names.push({
            id: index,
            name: splits[length - 1],
          });
          return {
            id: index,
            path: item,
          };
        }
      });
    }
    if (exist.comments != "") {
      let comments = JSON.parse(exist.comments);
      exist.user_positive_comments = comments.positive;
      exist.user_negative_comments = comments.negative;
    }
    exist.loadingPage = false;

    exist.originalData = {
      name: exist.name_sub,
      username: exist.username_sub,
      gender: exist.user_gender_sub,
      role: exist.user_role_sub,
      id_number: exist.user_id_number_sub,
      serial_number: exist.user_serial_number_sub,
      company: exist.user_company_sub,
      region: exist.user_region_sub,
      picture: exist.user_picture_sub,
      company_phone_number: exist.user_company_phone_number_sub,
      validity_period: exist.user_validity_period_sub,
      positive_comments:
        exist.comments == "" ? "" : JSON.parse(exist.comments).positive,
    };
    exist.getAllRegions().then((res) => {
      exist.regions = res.map((region) => {
        return {
          value: region.name,
          text: region.name,
        };
      });
    });
  },
  methods: {
    getAllRegions() {
      let regions = Auth.getAllRegions().then((res) => {
        return res.data;
      });
      return regions;
    },
    onChange(e) {
      this.img = e.target.files[0];
      if (this.img !== "") {
        this.changeUserAvatar(e);
      }
    },
    setUserAvatar(path) {
      this.user_picture_sub = path;
      this.$emit("userAvatarChange", this.user_picture_sub);
    },
    changeUserAvatar(e) {
      let exist = this;
      e.preventDefault();
      const config = {
        headers: {
          "content-type": "multipart/form-data",
        },
      };
      let formData = new FormData();
      if (this.user_picture_sub != "/assets/img/default-user-avatar.jpg") {
        formData.append(
          "original_img_path",
          this.user_picture_sub.substring(1)
        );
      }
      formData.append("user_img", this.img);
      formData.append("user_id", this.user_id_sub);
      if (formData.getAll("user_img")[0] !== "") {
        axios
          .post("/api/admin/user/changeUserAvatar", formData, config)
          .then(function (res) {
            if (Array.isArray(res.data) && res.data.length !== 0) {
              Ls.set("user_avatar", res.data[0].path);
              exist.setUserAvatar(res.data[0].path);
            } else {
              Ls.set("user_avatar", res.data.path);
              exist.setUserAvatar(res.data.path);
            }
            window.toastr["success"]("用户头像已更改！", "成功");
          });
      }
      this.img = "";
    },
    changeAvatarOccurr() {
      document.getElementById("user-avatar").click();
    },
    onChangeRemarkInformation(e) {
      const file = e.target.files[0];
      const file_type = file.type;
      if (
        file_type.includes("image") ||
        file_type.includes("application") ||
        file_type.includes("text/plain")
      ) {
        this.user_remark_info = file;
        this.remark_file_name = this.user_remark_info.name;
        if (this.user_remark_info !== "") {
          e.preventDefault();
          const config = {
            headers: {
              "content-type": "multipart/form-data",
            },
          };
          let formData = new FormData();
          // if (this.remark_file_path != "") {
          //   formData.append(
          //     "remark_file_path",
          //     this.remark_file_path.substring(1)
          //   );
          // }
          formData.append("user_remark_info", this.user_remark_info);
          formData.append("username", this.username_sub);
          formData.append("user_id", this.user_id_sub);
          let exist = this;
          if (formData.getAll("user_remark_info")[0] !== "") {
            axios
              .post("/api/admin/user/setUserRemarkInfo", formData, config)
              .then(function (res) {
                if (res.data != "") {
                  let splits = res.data.split(" , ");

                  let length = splits.length;

                  let file_name_length = exist.remark_file_names.length;
                  let file_path_length = exist.remark_file_paths.length;

                  exist.remark_file_paths.push({
                    id: file_path_length,
                    path: splits[length - 1],
                  });

                  let pathSplits = splits[length - 1].split("/");
                  let pathSplitsLength = pathSplits.length;
                  exist.remark_file_names.push({
                    id: file_name_length,
                    name: pathSplits[pathSplitsLength - 1],
                  });
                }
              });
          }
        }
      } else {
        window.toastr["info"]("不允许上传文件扩展名。", "信息");
      }
    },
    onSubmit() {
      let exist = this;
      this.$validator.validateAll().then((result) => {
        if (!result) {
          return;
        }

        exist.loadingPage = true;

        let comments = {
          positive: exist.user_positive_comments,
          negative: exist.user_negative_comments,
        };

        let formData;
        if (exist.user_role_sub == "practitioner") {
          formData = {
            name: exist.name_sub,
            username: exist.username_sub,
            role: exist.user_role_sub,
            gender: exist.user_gender_sub,
            id_number: exist.user_id_number_sub,
            serial_number: exist.user_serial_number_sub,
            validity_period: exist.user_validity_period_sub,
            company: exist.user_company_sub,
            region: exist.user_region_sub,
            company_phone_number: exist.user_company_phone_number_sub,
            comments: JSON.stringify(comments),
          };
        } else {
          formData = {
            name: exist.name_sub,
            username: exist.username_sub,
            role: exist.user_role_sub,
            gender: exist.user_gender_sub,
            id_number: exist.user_id_number_sub,
            serial_number: exist.user_serial_number_sub,
            validity_period: exist.user_validity_period_sub,
            company: exist.user_company_sub,
            region: exist.user_region_sub,
            company_phone_number: exist.user_company_phone_number_sub,
          };
        }

        this.originalData.name = formData.name;
        this.originalData.username = formData.username;
        this.originalData.gender = formData.gender;
        this.originalData.role = formData.role;
        this.originalData.id_number = formData.id_number;
        this.originalData.serial_number = formData.serial_number;
        this.originalData.company = formData.company;
        this.originalData.region = formData.region;
        this.originalData.health_status = formData.health_status;
        this.originalData.company_phone_number = formData.company_phone_number;
        this.originalData.validity_period = formData.validity_period;

        axios
          .post(`/api/admin/user/edit/${exist.user_id_sub}`, formData)
          .then(function (res) {
            exist.loadingPage = false;
            let start = exist.user_id_number_sub.substring(0, 6);
            let last = exist.user_id_number_sub.slice(-2);
            let changedIdNumber = start + "**" + last;
            let qr_text = JSON.stringify({
              name: exist.name_sub,
              username: exist.username_sub,
              role: exist.user_role_sub,
              id_number: changedIdNumber,
              serial_number: exist.user_serial_number_sub,
              company: exist.user_company_sub,
              region: exist.user_region_sub,
              company_phone_number: exist.user_company_phone_number_sub,
              validity_period: exist.user_validity_period_sub,
              positive_comments: exist.user_positive_comments,
            });
            exist.$emit("produceQR", qr_text);
            if (exist.user_id_sub == exist.current_user_id_sub) {
              Ls.set("Name", res.data[0].name);
              Ls.set("username", res.data[0].username);
              Ls.set("Role", res.data[0].role);
              Ls.set("Gender", res.data[0].gender);
            }
            window.toastr["success"]("您的个人信息已被更改!", "成功");
          });
      });
      if (exist.keepUserInfo != "") {
        exist.submitKeepInfo();
      }
    },
    produceKeepInfo(type, value) {
      var today = new Date();
      var date =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate();
      var time =
        today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      let info = {
        time: date + " " + time,
        type: type,
        result: value,
      };
      let strInfo = JSON.stringify(info);
      if (this.keepUserInfo == "") {
        this.keepUserInfo = strInfo;
      } else {
        let parseArray = this.keepUserInfo.split("/");
        let keep = parseArray;
        parseArray.forEach((item, index) => {
          if (item != "") {
            let parsedItem = JSON.parse(item);
            if (parsedItem.type == type) {
              keep.splice(index, 1);
            }
          }
        });
        this.keepUserInfo = "";
        keep.forEach((item) => {
          if (this.keepUserInfo == "") {
            this.keepUserInfo = item;
          } else {
            this.keepUserInfo += "/" + item;
          }
        });
        this.keepUserInfo += "/" + strInfo;
      }
    },
    onUpdate(type, value) {
      if (value != this.originalData[`${type}`]) {
        this.produceKeepInfo(type, value);
      } else if (value == this.originalData[`${type}`]) {
        let parseArray = this.keepUserInfo.split("/");
        let keep = parseArray;
        parseArray.forEach((item, index) => {
          if (item != "") {
            let parsedItem = JSON.parse(item);
            if (parsedItem.type == type) {
              keep.splice(index, 1);
            }
          }
        });
        this.keepUserInfo = "";
        keep.forEach((item) => {
          if (this.keepUserInfo == "") {
            this.keepUserInfo = item;
          } else {
            this.keepUserInfo += "/" + item;
          }
        });
      }
      if (type == "region") {
        this.getCompaniesWithRegionName(value);
      }
    },
    submitKeepInfo() {
      Auth.keepRemarkInformation(this.user_id_sub, {
        info: this.keepUserInfo,
      }).then((res) => {
        this.keepUserInfo = "";
        this.$emit("updateKeepUserInfo", this.user_id_sub);
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
    validateStateForPasswordChange(ref) {
      if (
        this.veeFields[ref] &&
        (this.veeFields[ref].dirty || this.veeFields[ref].validated)
      ) {
        return !this.veeErrors.has(ref);
      }
      return null;
    },
    changePassword() {
      let exist = this;
      exist.loadingPagePass = true;
      this.$validator.validateAll().then((result) => {
        if (!result) {
          return;
        }
        let formData = {
          current_password: this.user_current_password,
          new_password: this.user_new_password,
          confirm_password: this.user_confirm_password,
        };

        axios
          .post(`/api/admin/user/updatePassword/${this.user_id_sub}`, formData)
          .then(function (res) {
            exist.loadingPagePass = false;
            if (res.data == 1) {
              exist.produceKeepInfo("password", formData.new_password);
              if (exist.keepUserInfo != "") {
                exist.submitKeepInfo();
              }
              window.toastr["success"]("你已經成功更改密码！", "成功");
            } else if (res.data == 3) {
              window.toastr["error"]("您当前的密码不正確", "错误");
            } else if (res.data == 2) {
              window.toastr["error"]("請再次身份验证密码", "错误");
            }
          });
      });
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
    downloadFile(name, id) {
      if (this.remark_file_paths.length) {
        if (!!this.remark_file_paths[id]) {
          this.$emit("downloadFile", name, this.remark_file_paths[id].path);
        }
      }
    },
    async deleteFile(fileId) {
      const id = this.user_id_sub;
      if (this.remark_file_paths.length) {
        let remainedFiles = this.remark_file_paths.filter(
          (item) => item.id !== fileId
        );
        var remainedFilesString = "";
        remainedFiles.forEach((item, index) => {
          if (index < remainedFiles.length - 1) {
            remainedFilesString += item.path;
            remainedFilesString += " , ";
          } else if (index == remainedFiles.length - 1) {
            remainedFilesString += item.path;
          }
        });
        if (remainedFilesString == "") {
          remainedFilesString = "...";
        }
        this.filteredRemarkFilePaths = this.remark_file_paths.filter(
          (item) => item.id == fileId
        );
        let fileInfo = {
          path: this.filteredRemarkFilePaths[0].path.substring(1),
          remainedFiles: remainedFilesString,
        };
        let response = await axios.post(
          `/api/admin/user/delete/remarkInfo/${id}`,
          fileInfo
        );
        if (response.data == 1) {
          this.remark_file_names = this.remark_file_names.filter(
            (item) => item.id != fileId
          );
          this.remark_file_paths = this.remark_file_paths.filter(
            (item) => item.id != fileId
          );
          this.user_remark_info = null;
          window.toastr["success"]("历史记录已删除！", "成功");
        }
      }
    },
  },
};
</script>

<style scoped>
.avatar-container {
  width: 100%;
  position: relative;
  height: 340px;
}
.avatar-container .user-avatar-change {
  position: absolute;
  top: 0px;
  left: 0px;
  height: 100%;
  width: 100%;
  background-color: transparent;
  border-color: transparent;
}
.avatar-container img {
  width: 100%;
  height: 100%;
}
.personal-info {
  margin-top: 30px;
  padding: 0px 5px;
}
.edit-personal-profile,
.edit-personal-password {
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
.user-gender-role-edit #role-input-group,
.id-serial-edit #id-input-group,
.id-serial-edit #serial-input-group,
.company-region-edit #region-input-group,
.company-region-edit #company-input-group {
  width: 48%;
}
.submit-reset {
  display: flex;
  align-items: center;
  justify-content: left;
  flex-direction: row;
  margin-top: 30px;
}
.user-info-submit {
  margin-right: 20px;
  background-color: #ffde00;
  border-color: #ffde00;
  color: #5c5959;
}
.display_block {
  display: block;
}
.display_none {
  display: none;
}
.visibility_show {
  visibility: visible;
}
.visibility_hidden {
  visibility: hidden;
}
.remark_name {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
}
.file-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 50px;
}
.download i {
  font-size: 20px;
  color: rgb(121 207 140);
  cursor: pointer;
}
.download i:hover {
  color: rgb(135 235 72);
}
.delete i {
  font-size: 17px;
  color: rgb(231 19 68);
  cursor: pointer;
}
.delete i:hover {
  color: rgb(253 4 62);
}
.file-actions {
  margin: 0px auto;
  margin-top: 5px;
}
.file_names {
  width: 90%;
  margin: 0px auto;
}
</style>

<style>
.v-spinner {
  display: flex;
  align-items: center;
  justify-content: center;
}
.custom-file-input ~ .custom-file-label[data-browse]::after {
  visibility: hidden !important;
}
.list-group {
  max-height: 300px;
  border-radius: 5px;
  overflow: auto;
}
.list-group::-webkit-scrollbar {
  display: none; /* Safari and Chrome */
}
.list-group-item {
  margin-top: 5px !important;
}
</style>