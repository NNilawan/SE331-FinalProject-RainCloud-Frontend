<template>
  <div class="parent clearfix">
    <div class="bg-illustration"></div>

    <div class="login q-pa-lg">
      <div class="container">
        <div class="login-form">
          <div class="text-h2">Register</div>
          <Form @submit="handleRegister" :validation-schema="schema">
            <div class="row">
              <div class="col-md-6 col-sm-12 col-12">
                <Field
                  @submit="handleLogin"
                  name="firstname"
                  v-slot="{ errorMessage, value, field }"
                >
                  <q-input
                    label="Firstname"
                    color="orange"
                    :model-value="value"
                    v-bind="field"
                    :error-message="errorMessage"
                    :error="!!errorMessage"
                    @keydown.space.prevent
                    v-on:keypress="isAlphabet($event)"
                  />
                </Field>
              </div>
              <div class="col-md-6 col-sm-12 col-12">
                <Field name="lastname" v-slot="{ errorMessage, value, field }">
                  <q-input
                    label="Lastname"
                    color="orange"
                    :model-value="value"
                    v-bind="field"
                    :error-message="errorMessage"
                    :error="!!errorMessage"
                    @keydown.space.prevent
                    v-on:keypress="isAlphabet($event)"
                  />
                </Field>
              </div>
            </div>
            <Field name="username" v-slot="{ errorMessage, value, field }">
              <q-input
                label="Username"
                color="orange"
                :model-value="value"
                v-bind="field"
                :error-message="errorMessage"
                :error="!!errorMessage"
                @keydown.space.prevent
                v-on:keypress="isAlphabetOrNumber($event)"
              />
            </Field>
            <Field name="password" v-slot="{ errorMessage, value, field }">
              <q-input
                label="Password"
                color="orange"
                :type="isPwd ? 'password' : 'text'"
                :model-value="value"
                v-bind="field"
                :error-message="errorMessage"
                :error="!!errorMessage"
                @keydown.space.prevent
                v-on:keypress="isAlphabetOrNumber($event)"
              >
                <template v-slot:append>
                  <q-icon
                    :name="isPwd ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="isPwd = !isPwd"
                  />
                </template>
              </q-input>
            </Field>
            <div class="row">
              <div class="col-md-6 col-sm-12 col-12">
                <Field name="birthDate" v-slot="{ errorMessage, value, field }">
                  <q-input
                    :model-value="value"
                    v-bind="field"
                    v-model="birthDate"
                    mask="####-##-##"
                    :error-message="errorMessage"
                    :error="!!errorMessage"
                    @keydown.space.prevent
                    label="Date of birth"
                    color="orange"
                  >
                    <template v-slot:append>
                      <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy
                          ref="qDateProxy"
                          transition-show="scale"
                          transition-hide="scale"
                        >
                          <q-date minimal v-model="birthDate" color="orange">
                            <div class="row items-center justify-end">
                              <q-btn
                                v-close-popup
                                label="Close"
                                color="primary"
                                flat
                              />
                            </div>
                          </q-date>
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                </Field>
              </div>
              <div class="col-md-6 col-sm-12 col-12" style="margin-bottom: 5%">
                <Field name="hometown" v-slot="{ errorMessage, value, field }">
                  <q-input
                    label="Hometown"
                    color="orange"
                    :model-value="value"
                    v-bind="field"
                    :error-message="errorMessage"
                    :error="!!errorMessage"
                  />
                </Field>
              </div>
            </div>
            <UploadImages @changed="handleImages" :max="1" name="picture"/>

            <div>
              <q-btn class="btn-auth" push size="20px" type="submit">
                <span>Register</span>
              </q-btn>
            </div>

            <div class="div-auth">
              Already have an account?
              <span class="span-auth">
                <router-link :to="{ name: 'Login' }"> Login </router-link>
              </span>
            </div>
            <div class="alert-message" v-if="message">
              {{ message }}
            </div>
          </Form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Form, Field } from "vee-validate";
import * as yup from "yup";
import UploadImages from "vue-upload-drop-images";
import AuthService from "@/services/AuthService.js";
import { ref } from "vue";

export default {
  name: "Register",
  components: {
    Field,
    Form,
    UploadImages,
  },
  setup() {
    return {
      isPwd: ref(true),
      birthDate: ref(""),
    };
  },

  inject: ["GStore"],
  data() {
    const schema = yup.object().shape({
      firstname: yup
        .string()
        .required("Firstname is required!")
        .max(50, "Must be maximum 50 characters!"),
      lastname: yup
        .string()
        .required("Lastname is required!")
        .max(50, "Must be maximum 50 characters!"),
      username: yup
        .string()
        .required("Username is required!")
        .min(3, "Must be at least 3 characters!")
        .max(20, "Must be maximum 20 characters!"),
      password: yup
        .string()
        .required("Password is required!")
        .min(6, "Must be at least 6 characters!")
        .max(40, "Must be maximum 40 characters!"),
      birthDate: yup.string().required("Date of birth is required!"),
      hometown: yup
        .string()
        .required("Hometown is required!")
        .max(50, "Must be maximum 50 characters!"),
      picture: yup
        .string(),
    });

    return {
      successful: false,
      loading: false,
      message: "",
      schema,
      files: [],
      picture: "",
    };
  },
  mounted() {
    if (this.GStore.currentUser) {
      this.$router.push("/");
    }
  },
  methods: {
    // eslint-disable-next-line
    handleRegister(user) {
      this.message = "";
      Promise.all(
        this.files.map((file) => {
          return AuthService.uploadFile(file);
        })
      ).then((response) => {
        user.picture = response.map((r) => r.data);
        user.picture = user.picture[0]
        console.log(user)
        AuthService.register(user)
          .then((response) => {
            console.log(response);
            this.$router.push({ name: "Login" });
          })
          .catch(() => {
            this.message = "Could not register";
            setTimeout(() => {
              this.message = "";
            }, 1500);
          });
      });
    },
    handleImages(files) {
      this.files = files;
    },
    isAlphabetOrNumber(e) {
      let char = String.fromCharCode(e.keyCode);
      if (/^[A-Za-z0-9_-]+$/.test(char)) return true;
      else e.preventDefault();
    },
    isAlphabet(e) {
      let char = String.fromCharCode(e.keyCode);
      if (/^[A-Za-z]+$/.test(char)) return true;
      else e.preventDefault();
    },
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-transition: 0.3s;
  -o-transition: 0.3s;
  transition: 0.3s;
}

img {
  border: none;
}

*:focus {
  outline: none;
}

.clearfix::after {
  content: "";
  display: table;
  clear: both;
}

.bg-illustration {
  position: relative;
  height: 100vh;
  width: 1194px;
  background: url("https://image.freepik.com/free-photo/doctor-preparing-covid-19-vaccine_23-2148920202.jpg")
    no-repeat center center scroll;
  background-size: cover;
  float: left;
  -webkit-animation: bgslide 2.3s forwards;
  animation: bgslide 2.3s forwards;
}
.bg-illustration img {
  width: 248px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  height: auto;
  margin: 19px 0 0 25px;
}

@-webkit-keyframes bgslide {
  from {
    left: -100%;
    width: 0;
    opacity: 0;
  }
  to {
    left: 0;
    width: 1194px;
    opacity: 1;
  }
}

@keyframes bgslide {
  from {
    left: -100%;
    width: 0;
    opacity: 0;
  }
  to {
    left: 0;
    width: 1194px;
    opacity: 1;
  }
}

.login {
  max-height: 100vh;
  overflow-y: auto;
  float: left;
  margin: 0 auto;
  width: calc(100% - 1194px);
  text-align: center;
  margin-top: -70px;
}
.login .container {
  width: 505px;
  margin: 0 auto;
  position: relative;
}
.login .container h1 {
  margin-top: 100px;
  font-size: 35px;
  font-weight: bolder;
}
.login .container .login-form {
  margin-top: 112px;
}
.login .container .login-form form {
  display: -ms-grid;
  display: grid;
}
.login .container .login-form form input {
  font-size: 16px;
  font-weight: normal;
  background: rgba(57, 57, 57, 0.07);
  margin: 12.5px 0;
  height: 68px;
  border: none;
  padding: 0 30px;
  border-radius: 10px;
}
.login .container .login-form form button[type="submit"] {
  background-color: #ff7423;
  border: none;
  margin-top: 20px;
  margin-bottom: 20px;
  width: 100%;
  height: 58px;
  text-transform: uppercase;
  color: white;
  border-radius: 10px;
  position: relative;
  z-index: 2;
  font-weight: bold;
  font-size: 20px;
}

.login .container .login-form form button[type="submit"]::after {
  content: "";
  position: absolute;
  z-index: -1;
  border-radius: 10px;
  opacity: 0;
  top: 0;
  left: 0;
  -webkit-transition: 0.3s ease-in-out;
  -o-transition: 0.3s ease-in-out;
  transition: 0.3s ease-in-out;
  right: 0;
  bottom: 0;
  background: -webkit-gradient(
    linear,
    left bottom,
    left top,
    from(#09203f),
    to(#537895)
  );
  background: -webkit-linear-gradient(bottom, #09203f 0%, #537895 100%);
  background: -o-linear-gradient(bottom, #09203f 0%, #537895 100%);
  background: linear-gradient(to top, #09203f 0%, #537895 100%);
}

@media only screen and (min-width: 1024px) and (max-width: 1680px) {
  .bg-illustration {
    width: 60%;
    -webkit-animation: none;
    animation: none;
  }

  .login {
    width: 40%;
  }
}
/* Display 12", iPad PRO Portrait, iPad landscape */
@media only screen and (max-width: 1024px) {
  body {
    overflow-x: hidden;
  }

  @-webkit-keyframes slideIn {
    from {
      left: -100%;
      opacity: 0;
    }
    to {
      left: 0;
      opacity: 1;
    }
  }

  @keyframes slideIn {
    from {
      left: -100%;
      opacity: 0;
    }
    to {
      left: 0;
      opacity: 1;
    }
  }
  .bg-illustration {
    float: none;
    background: url("https://image.freepik.com/free-photo/doctor-preparing-covid-19-vaccine_23-2148920202.jpg")
      center center;
    background-size: cover;
    -webkit-animation: slideIn 0.8s ease-in-out forwards;
    animation: slideIn 0.8s ease-in-out forwards;
    width: 100%;
    height: 190px;
    text-align: center;
  }
  .bg-illustration img {
    width: 100px;
    height: auto;
    margin: 20px auto !important;
    text-align: center;
  }

  .login {
    float: none;
    margin: 0 auto;
    width: 100%;
  }
  .login .container {
    -webkit-animation: slideIn 0.8s ease-in-out forwards;
    animation: slideIn 0.8s ease-in-out forwards;
    width: 85%;
    float: none;
  }
  .login .container h1 {
    font-size: 25px;
    margin-top: 40px;
  }
  .login .container .login-form {
    margin-top: 90px;
  }
  .login .container .login-form form input {
    height: 45px;
  }
  .login .container .login-form form button[type="submit"] {
    height: 45px;
    margin-top: 100px;
  }
}

.q-input {
  padding: 10px;
  font-size: 22px;
}
.text-h2 {
  color: #ff7423;
}
.alert-message {
  color: red;
  font-size: 20px;
  margin-top: 2%;
}
.div-auth {
  font-size: 18px;
  color: #696868;
}
.span-auth a {
  color: #ff7423;
  font-weight: bold;
  font-size: 20px;
}
</style>