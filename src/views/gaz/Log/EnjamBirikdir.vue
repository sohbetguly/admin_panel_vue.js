<template>
  <div class="container">
    <el-form ref="userName" v-model="signUpForm" @submit.prevent="handleSignup">
      <!-- First and Last Name Row -->
      <div class="row">
        <div class="col-sm-6">
          <div class="form-group">
            <label for="deviceId"> Enjam ID:</label
            ><el-input
              id="deviceId"
              v-model="signUpForm.deviceId"
              class="form-control"
              placeholder="Enjamyň ID-ni şu ýeri ýazyň"
              type="text"
            >
              <!-- Error Message -->
            </el-input>
            <p v-if="showDeviceId" class="wrongInputs">
              Enjam id boş bolmaly däl
            </p>
          </div>
        </div>

        <div class="col-sm-6">
          <div class="form-group">
            <label for="deviceUser">Enjam ulanyjysy:</label
            ><el-input
              id="deviceUser"
              v-model="signUpForm.deviceUser"
              class="form-control"
              placeholder="ulanyjy adyňyzy ýazyň"
              type="text"
              @blur="validName(signUpForm.deviceUser)"
            >
              <h2 v-if="wrongNum" class="wrongInputs">Ulanyjy ady nadogry</h2>
              <h2 v-if="showDeviceUser" class="wrongInputs">
                Enjam ulanyjysy boş bolmaly däl
              </h2>
              <!-- Error Message -->
            </el-input>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-6">
          <div class="form-group">
            <label for="deviceName"> Enjamyň ady:</label
            ><el-input
              id="deviceName"
              v-model="signUpForm.deviceName"
              class="form-control"
              placeholder="Enjamyň adyny ýazyň"
              type="text"
            >
              <div class="pre-icon os-icon os-icon-user-male-circle" />
              <!-- Error Message -->
            </el-input>
            <p v-if="showDeviceName" class="wrongInputs">
              Enjam ady boş bolmaly däl
            </p>
          </div>
        </div>

        <div class="col-sm-6">
          <div class="form-group">
            <label for="telBelgi">Telefon belgisi:</label
            ><input
              id="telBelgi"
              ref="maskNumber"
              v-model="signUpForm.phoneNum"
              maxlength="13"
              class="form-control"
              placeholder="Telefon belgiňizi ýazyň"
              type="text"
              @keydown="maskNum"
              @input="maskNum"
              @keyup="maskNum"
            />

            <!-- Error Message -->
          </div>
          <p v-if="showPhoneNum" class="wrongInputs">
            telefon belgiňiz 12 belgiden az bolmaly
          </p>
        </div>
      </div>

      <!-- Password and Confirm Password Row -->
      <div class="row">
        <div class="col-sm-6">
          <div class="form-group">
            <label for="password"> Açar sözü</label
            ><el-input
              id="password"
              v-model="signUpForm.password"
              class="form-control"
              placeholder="Açar sözni ýazyň"
              type="password"
            >
              <div class="pre-icon os-icon os-icon-fingerprint" />
              <!-- Error Message -->
            </el-input>
            <p v-if="showPassword" class="wrongInputs">
              açar sözi boş bolmaly däl
            </p>
          </div>
        </div>

        <div class="col-sm-6">
          <div class="form-group">
            <label for="repeatPassword">Açar sözüni täzeden ýazyň</label
            ><el-input
              id="repeatPassword"
              v-model="signUpForm.repeatPassword"
              class="form-control"
              placeholder="Açar sözüni täzeden ýazyň"
              type="password"
              @blur="checkPassword(signUpForm.repeatPassword)"
            >
              <!-- Error Message -->
            </el-input>
            <p v-if="wrongPassword" class="wrongInputs">
              Açar sözüňiz deň däl
            </p>
          </div>
        </div>
      </div>

      <!-- Submit Button -->
      <div class="buttons-w">
        <button class="btn btn-primary " @click="handleSignup">
          Agza bol
        </button>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      todo: [],
      wrongPassword: false,
      wrongNum: false,
      showDeviceId: false,
      showDeviceUser: false,
      showDeviceName: false,
      showPhoneNum: false,
      showPassword: false,
      isSimular: false,
      signUpForm: {
        deviceId: "",
        deviceUser: "",
        deviceName: "",
        phoneNum: "+993 6",
        password: "",
        repeatPassword: ""
      }
    };
  },
  methods: {
    handleSignup() {
      //Obj of data to send in future like a dummyDb

      if (this.signUpForm.deviceId === "") {
        this.showDeviceId = true;
        return false;
      } else {
        this.showDeviceId = false;
      }
      if (this.signUpForm.deviceUser === "") {
        this.showDeviceUser = true;
        return false;
      } else {
        this.showDeviceUser = false;
      }
      if (this.signUpForm.deviceName === "") {
        this.showDeviceName = true;
        return false;
      } else {
        this.showDeviceName = false;
      }
      if (this.$refs.maskNumber.value.length < 13) {
        this.showPhoneNum = true;
        return false;
      } else {
        this.showPhoneNum = false;
      }
      if (this.signUpForm.password === "") {
        this.showPassword = true;
        return false;
      }

      if (this.signUpForm.password !== this.signUpForm.repeatPassword) {
        this.wrongPassword = true;
        return false;
      }
      if (this.signUpForm.password !== this.signUpForm.repeatPassword) {
        this.wrongPassword = false;
        return false;
      } else {
        this.showPassword = false;
      }
      fetch(
        "https://vue-test-5f99c-default-rtdb.firebaseio.com/device_informations.json"
      )
        .then(req => req.json())
        .then(data => {
          for (const id in data) {
            if (data[id].deviceId === this.signUpForm.deviceId) {
              this.$store.dispatch("user/checkSignup", this.signUpForm);
              this.isSimular = true;
            } else {
              this.isSimular = false;
            }
          }
        });

      if (this.isSimular === false) {
        fetch(
          "https://vue-test-5f99c-default-rtdb.firebaseio.com/device_informations.json",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              deviceId: this.signUpForm.deviceId,
              deviceUser: this.signUpForm.deviceUser,
              deviceName: this.signUpForm.deviceName,
              phoneNum: this.signUpForm.phoneNum,
              password: this.signUpForm.password
            })
          }
        )
          .then(res => res.json())
          .then(req => console.log(req));
      }
    },

    // this.$store.dispatch("user/signup", this.signUpForm);

    // handleSignup() {
    //   this.loading = true
    //   this.$store.dispatch('Enjamlar/birikdir', this.userName)
    //     .then(() => {
    //       this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
    //       this.loading = false
    //     })
    //     .catch(() => {
    //       this.loading = false
    //     })
    // },
    checkPassword(name) {
      if (this.signUpForm.password !== this.signUpForm.repeatPassword) {
        this.wrongPassword = true;
      }
      if (this.signUpForm.password === this.signUpForm.repeatPassword) {
        this.wrongPassword = false;
      }
    },
    maskNum() {
      if (this.$refs.maskNumber.value.length < 6) {
        this.$refs.maskNumber.value = "+993 6";
      }
      if (
        this.$refs.maskNumber.value.length === 13 ||
        this.signUpForm.phoneNum.length > 13
      ) {
        this.showPhoneNum = false;
      }
      // this.signUpForm.phoneNum = '+993' + this.signUpForm.phoneNum
    },
    validName(name) {
      const validNamePattern = new RegExp("^[a-zA-Z]+(?:[-'\\s][a-zA-Z]+)*$");
      if (validNamePattern.test(name)) {
        this.wrongNum = false;
      } else {
        this.wrongNum = true;
      }
    }
  }
};
</script>

<style scoped>
.container {
  padding: 2rem;
}
.wrongInputs {
  color: rgb(248, 84, 84);
  font-size: 0.8rem;
}
</style>
