import Ls from './ls'

export default {
  async checkOnlineUsers() {
    try {
      let response = await axios.get("/api/auth/checkOnlineUsers");
      return response;
    } catch (error) {
      console.log("Error => ", error.message);
    }
  },
  async login(loginData) {
    try {
      let response = await axios.post('/api/auth/login', loginData)
      Ls.set('auth.token', response.data.token.token)
      Ls.set('user_id', response.data.user_data[0].id)
      Ls.set('Name', response.data.user_data[0].name)
      Ls.set('User Name', response.data.user_data[0].username)
      Ls.set('Role', response.data.user_data[0].role)
      Ls.set('Region Name', response.data.user_data[0].region);
      Ls.set('Gender', response.data.user_data[0].gender);
      Ls.set('Company Name', response.data.user_data[0].company);
      Ls.set('User Region ID', response.data.user_region_id);
      toastr['success']("登录！", "成功")
      return response.data.token.token
    } catch (error) {
      if (error.response.status === 401) {
        toastr['error']("无效证件", "错误")
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message)
      }
    }
  },

  async addNewMemberRegister(registerData) {
    try {
      let response = await axios.post('/api/auth/new/register', registerData)
      return response.data
    } catch (error) {
      toastr['error']('Error Occurred in registered!', 'Error')
    }
  },

  async keepRemarkInformation(id, keepInfo) {
    try {
      let response = await axios.post(`/api/admin/user/keep/${id}`, keepInfo);
      return response;
    } catch (error) {
      console.log("Error => ", error);
    }
  },

  async addNewRegionToDB(info) {
    try {
      let response = await axios.post('/api/admin/region/add/new', info);
      return response;
    } catch (error) {
      console.log("Error => ", error);
    }
  },

  async addNewCompanyToDB(info) {
    try {
      let response = await axios.post('/api/admin/region/company/add/new', info);
      return response;
    } catch (error) {
      console.log("Error => ", error);
    }
  },

  async getAllRegions() {
    try {
      let response = await axios.get('/api/admin/region/get/all');
      return response;
    } catch (error) {
      console.log("error => ", error);
    }
  },

  async setOffline(user_id) {
    try {
      let response = await axios.get(`/api/auth/setOffline/${user_id}`);
      return response;
    } catch (error) {
      console.log("Error => ", error.message);
    }
  },

  async logout() {
    try {
      await axios.get('/api/auth/logout')

      Ls.remove('user_id')
      Ls.remove('auth.token')
      Ls.remove('Name')
      Ls.remove('User Name')
      Ls.remove('Role')
      Ls.remove('Gender')
      Ls.remove('user_avatar')
      Ls.remove('Registered_User')
      Ls.remove('Region Name')
      Ls.remove("User Region ID")
      Ls.remove('Company Name')
      Ls.remove("Login Time")
      Ls.remove("Login Date")
      Ls.remove("username")
      Ls.remove("email_verification_status")
      toastr['success']('登出！', '成功')
    } catch (error) {
      console.log('Error', error.message)
    }
  },

  async check() {
    let response = await axios.get('/api/auth/check')

    return !!response.data.authenticated
  }
}
