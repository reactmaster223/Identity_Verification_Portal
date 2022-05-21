<template>
  <div class="card">
    <div class="card-body position_relative">
      <div class="download">
        <span
          @click="downloadInfo"
          v-tooltip="{
            content: tooltip_text,
            placement: position + '-center',
            delay: {
              show: 200,
              hide: 300,
            },
            classes: ['info'],
          }"
          ><i class="fa fa-download" aria-hidden="true"></i
        ></span>
      </div>
      <div id="myQRCode" ref="printMe">
        <h1>朝阳区养老服务工作证</h1>
        <div class="qr-container">
          <div class="user-avatar">
            <div class="img-container"><img :src="src_sub" /></div>
          </div>
          <div class="user-qr">
            <vue-qr
              :text="qr_text_sub"
              :size="qr_size_test"
              :margin="qr_margin"
              backgroundColor="white"
              :logoMargin="logo_margin"
              :logoCornerRadius="logo_radius"
              :dotScale="dot_scale"
              :correctLevel="correct_level"
              :colorDark="color_dark"
              :colorLight="color_light"
            ></vue-qr>
          </div>
        </div>
        <p class="user_name">
          <span>{{ name_sub }}</span>
        </p>
        <div class="user_info">
          <div>
            <span class="title">身份证号 :</span>
            <div style="text-align: center">
              <p class="serial_number">{{ user_id_number_sub }}</p>
            </div>
          </div>
          <div>
            <span class="title">工作单位 :</span>
            <div style="text-align: center">
              <p class="company_name">{{ user_company_sub }}</p>
            </div>
          </div>
          <div v-if="user_validity_period_sub != '...'">
            <span class="title">失效日期 :</span>
            <div style="text-align: center">
              <p class="validity_period">
                {{ user_validity_period_sub.split("-")[0] }}年{{
                  user_validity_period_sub.split("-")[1]
                }}月{{ user_validity_period_sub.split("-")[2] }}日
              </p>
            </div>
          </div>
          <div class="expired_date" v-if="screenAge != '...'">
            <span class="title">截图时效 :</span>
            <div style="text-align: center">
              <p class="validity_period">
                {{ screenAge.split("-")[0] }}年{{ screenAge.split("-")[1] }}月{{
                  screenAge.split("-")[2]
                }}日
              </p>
            </div>
          </div>
        </div>
        <div class="bottom">
          <div>信息来源：朝阳区养老服务行业协会</div>
          <div style="text-align: right">公安部安信工作证</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueQr from "vue-qr";
var _global =
  typeof window === "object" && window.window === window
    ? window
    : typeof self === "object" && self.self === self
    ? self
    : typeof global === "object" && global.global === global
    ? global
    : this;

export default {
  props: [
    "src",
    "qr_text",
    "name",
    "user_id_number",
    "user_company",
    "user_validity_period",
    "uniqueName",
    "user_screenAge",
  ],
  data() {
    return {
      src_sub: "",
      qr_text_sub: "",
      name_sub: "",
      user_id_number_sub: "",
      user_company_sub: "",
      user_validity_period_sub: "",
      logo_margin: 5,
      logo_radius: 5,
      dot_scale: 1,
      correct_level: 3,
      color_dark: "rgb(93 116 151)",
      color_light: "white",
      output: null,
      tooltip_text: "下载身份信息识别卡",
      position: "top",
      qr_size_test: 190,
      qr_margin: 8,
      month_end_date: [
        { month: 1, end: 31 },
        { month: 2, end: 28 },
        { month: 3, end: 31 },
        { month: 4, end: 30 },
        { month: 5, end: 31 },
        { month: 6, end: 31 },
        { month: 7, end: 31 },
        { month: 8, end: 31 },
        { month: 9, end: 30 },
        { month: 10, end: 31 },
        { month: 11, end: 30 },
        { month: 12, end: 31 },
      ],
      screenAge: "...",
    };
  },
  watch: {
    src: function (newVal, oldVal) {
      this.src_sub = newVal;
    },
    qr_text: function (newVal, oldval) {
      this.qr_text_sub = newVal;
    },
    name: function (newVal, oldVal) {
      this.name_sub = newVal;
    },
    user_id_number: function (newVal, oldVal) {
      let start = newVal.substring(0, 6);
      let last = newVal.slice(-2);
      this.user_id_number_sub = start + "**" + last;
    },
    user_company: function (newVal, oldVal) {
      this.user_company_sub = newVal;
    },
    user_validity_period: function (newVal, oldVal) {
      this.user_validity_period_sub = newVal;
    },
    user_screenAge: function (newVal, oldVal) {
      this.screenAge = newVal;
    },
  },
  components: {
    VueQr,
  },
  created() {
    this.src_sub = this.src;
    this.qr_text_sub = this.qr_text;
    this.name_sub = this.name;
    let start = this.user_id_number.substring(0, 6);
    let last = this.user_id_number.slice(-2);
    this.user_id_number_sub = start + "**" + last;
    this.user_company_sub = this.user_company;
    this.user_validity_period_sub = this.user_validity_period;
    this.screenAge = this.user_screenAge;
  },
  methods: {
    async downloadInfo() {
      const el = this.$refs.printMe;
      const options = {
        type: "dataURL",
      };
      this.output = await this.$html2canvas(el, options);
      fetch(this.output)
        .then((res) => res.blob())
        .then((blob) =>
          this.saveAs(blob, "Identity_Card_" + this.name_sub + ".jpg")
        );
      this.setSreenAge();
    },
    setSreenAge() {
      var today = new Date();
      var date =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate();
      let month = parseInt(date.split("-")[1]);
      let day = parseInt(date.split("-")[2]);
      let endDay = this.month_end_date.filter((item) => item.month == month);
      endDay = endDay[0].end;
      if (endDay - day < 10) {
        let space = endDay - day;
        month += 1;
        day = 10 - space;
      } else {
        day = day + 10;
      }
      let screenAge =
        today.getFullYear() + "-" + month.toString() + "-" + day.toString();
      let exist = this;
      axios
        .post("/api/admin/user/setScreenAge", {
          user_name: exist.uniqueName,
          screenAge: screenAge,
        })
        .then((res) => {
          if (res.data) {
            exist.screenAge = screenAge;
          }
        });
    },
    saveAs(blob, name, opts) {
      var URL = _global.URL || _global.webkitURL;
      var a = document.createElement("a");
      name = name || blob.name || "download";

      a.download = name;
      a.rel = "noopener"; // tabnabbing

      // TODO: detect chrome extensions & packaged apps
      // a.target = '_blank'

      if (typeof blob === "string") {
        const exist = this;
        // Support regular links
        a.href = blob;
        if (a.origin !== location.origin) {
          exist.corsEnabled(a.href)
            ? exist.download(blob, name, opts)
            : exist.click(a, (a.target = "_blank"));
        } else {
          exist.click(a);
        }
      } else {
        const exist = this;
        // Support blobs
        a.href = URL.createObjectURL(blob);
        setTimeout(function () {
          URL.revokeObjectURL(a.href);
        }, 4e4); // 40s
        setTimeout(function () {
          exist.click(a);
        }, 0);
      }
    },
    corsEnabled(url) {
      var xhr = new XMLHttpRequest();
      // use sync to avoid popup blocker
      xhr.open("HEAD", url, false);
      xhr.send();
      return xhr.status >= 200 && xhr.status <= 299;
    },
    download(url, name, opts) {
      var xhr = new XMLHttpRequest();
      xhr.open("GET", url);
      xhr.responseType = "blob";
      xhr.onload = function () {
        saveAs(xhr.response, name, opts);
      };
      xhr.onerror = function () {
        console.error("could not download file");
      };
      xhr.send();
    },
    click(node) {
      try {
        node.dispatchEvent(new MouseEvent("click"));
      } catch (e) {
        var evt = document.createEvent("MouseEvents");
        evt.initMouseEvent(
          "click",
          true,
          true,
          window,
          0,
          0,
          0,
          80,
          20,
          false,
          false,
          false,
          false,
          0,
          null
        );
        node.dispatchEvent(evt);
      }
    },
  },
};
</script>

<style scoped>
.card {
  font-family: 华文细黑;
}
.position_relative {
  position: relative;
}
.position_relative .download {
  position: absolute;
  right: 35px;
  top: 10px;
}
.download i {
  font-size: 20px;
  color: rgb(121 207 140);
  cursor: pointer;
}
.download i:hover {
  color: rgb(135 235 72);
}
#myQRCode {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  border: 1px solid black;
  padding-top: 15px;
  max-width: 470px;
  margin: 0px auto;
  border-radius: 70px;
  height: 738px;
  padding: 30px;
  background-color: rgb(247 248 249);
}
#myQRCode h1 {
  margin-bottom: 10px;
  margin-top: 20px;
  font-weight: 500;
}
.qr-container {
  max-width: 90%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  margin-top: 50px;
}
.qr-container .user-avatar,
.qr-container .user-qr {
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.user_name {
  margin-top: 30px;
  font-size: 30px;
  font-weight: 600;
  margin-bottom: 30px;
}
.user_info {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  max-width: 100%;
}
.user_info div {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
}
.user_info div p {
  margin: 0px !important;
  font-size: 22px;
  font-weight: 500;
}
.user_info .title {
  font-size: 25px;
  font-weight: 500;
  margin-right: 30px;
  text-align: center;
}
.bottom {
  max-width: 100%;
  font-size: 20px;
  margin-top: 35px;
  margin-bottom: 15px;
}
@media only screen and (max-width: 870px) {
  .position_relative .download {
    right: 10px;
  }
}
@media only screen and (max-width: 803px) {
  #myQRCode h1 {
    font-size: 39px !important;
  }
}
@media only screen and (max-width: 793px) {
  #myQRCode h1 {
    font-size: 36px !important;
  }
}
@media only screen and (max-width: 600px) {
  #myQRCode h1 {
    font-size: 35px !important;
  }
}
@media only screen and (max-width: 550px) {
  #myQRCode {
    height: 685px;
  }
  .user_info .title {
    font-size: 20px !important;
  }
  .user_info .company_name {
    font-size: 20px !important;
  }
}
@media only screen and (max-width: 500px) {
  #myQRCode {
    height: 680px;
  }
}
@media only screen and (max-width: 490px) {
  #myQRCode {
    height: 675px;
  }
  #myQRCode h1 {
    font-size: 27px !important;
  }
}
@media only screen and (max-width: 470px) {
  .user_info .company_name {
    font-size: 19px !important;
  }
  .bottom {
    font-size: 15px !important;
  }
}
@media only screen and (max-width: 450px) {
  #myQRCode {
    height: 653px;
  }
  #myQRCode h1 {
    font-size: 20px !important;
  }
  .user_info .company_name {
    font-size: 18px !important;
  }
  .bottom {
    font-size: 13px !important;
  }
}
@media only screen and (max-width: 440px) {
  .user_info .company_name {
    font-size: 17px !important;
  }
  #myQRCode {
    height: 648px;
  }
}
@media only screen and (max-width: 430px) {
  .user_info .title {
    font-size: 18px !important;
  }
  .user_info .serial_number {
    font-size: 18px !important;
  }
  .user_info .company_name {
    font-size: 17px !important;
  }
  .user_info .validity_period {
    font-size: 18px !important;
  }
  #myQRCode {
    height: 623px;
  }
}
@media only screen and (max-width: 421px) {
  .user_info .title {
    font-size: 15px !important;
  }
  .user_info .serial_number {
    font-size: 15px !important;
  }
  .user_info .company_name {
    font-size: 15px !important;
  }
  .user_info .validity_period {
    font-size: 15px !important;
  }
  #myQRCode {
    height: 595px;
  }
}
@media only screen and (max-width: 410px) {
  #myQRCode h1 {
    font-size: 23px !important;
  }
}
@media only screen and (max-width: 390px) {
  #myQRCode h1 {
    font-size: 20px !important;
  }
  .user_name {
    font-size: 22px;
  }
  .user_info .title {
    font-size: 14px !important;
  }
  .user_info .serial_number {
    font-size: 14px !important;
  }
  .user_info .company_name {
    font-size: 14px !important;
  }
  .user_info .validity_period {
    font-size: 14px !important;
  }
  #myQRCode {
    height: 540px;
  }
}
@media only screen and (max-width: 372px) {
  .user_info .title {
    font-size: 11px !important;
  }
  .user_info .serial_number {
    font-size: 11px !important;
  }
  .user_info .company_name {
    font-size: 11px !important;
  }
  .user_info .validity_period {
    font-size: 11px !important;
  }
  #myQRCode {
    height: 525px;
  }
}
@media only screen and (max-width: 347px) {
  .bottom {
    font-size: 12px !important;
  }
}
@media only screen and (max-width: 340px) {
  #myQRCode h1 {
    font-size: 18px !important;
  }
}
@media only screen and (max-width: 330px) {
  #myQRCode h1 {
    font-size: 18px !important;
  }
  .qr-container {
    margin-top: 30px;
  }
  .user_name {
    font-size: 20px;
  }
  .user_info .title {
    font-size: 10px !important;
  }
  .user_info .serial_number {
    font-size: 10px !important;
  }
  .user_info .company_name {
    font-size: 8px !important;
  }
  .user_info .validity_period {
    font-size: 10px !important;
  }
  #myQRCode {
    height: 460px;
  }
  .bottom {
    font-size: 11px !important;
  }
}
@media only screen and (max-width: 320px) {
  #myQRCode h1 {
    font-size: 16px !important;
  }
  .bottom {
    font-size: 10px !important;
  }
}
@media only screen and (max-width: 300px) {
  #myQRCode h1 {
    font-size: 15px !important;
  }
  .qr-container {
    margin-top: 15px;
  }
  .user_name {
    font-size: 13px;
    margin-top: 20px;
    margin-bottom: 20px;
  }
  .user_info .title {
    font-size: 9px !important;
  }
  .user_info .serial_number {
    font-size: 9px !important;
  }
  .user_info .company_name {
    font-size: 7px !important;
  }
  .user_info .validity_period {
    font-size: 9px !important;
  }
  #myQRCode {
    height: 380px;
    padding: 15px;
  }
}
@media only screen and (max-width: 270px) {
  #myQRCode h1 {
    font-size: 13px !important;
  }
  .bottom {
    font-size: 8px !important;
  }
}
.img-container {
  width: 190px;
  height: 100%;
}
.img-container img {
  width: 100%;
  height: 100%;
}
.expired_date {
  color: red;
}
</style>