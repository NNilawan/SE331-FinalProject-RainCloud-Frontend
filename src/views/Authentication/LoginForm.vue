<template>
  <div class="parent clearfix">
    <div class="bg-illustration"></div>

    <div class="login q-pa-lg">
      <div class="container">
        <div class="login-form">
          <div class="text-h2">Login</div>
          <Form @submit="handleLogin" :validation-schema="schema">
            <Field
              @submit="handleLogin"
              name="username"
              v-slot="{ errorMessage, value, field }"
            >
              <q-input
                label="Username"
                color="orange"
                v-model="username"
                :model-value="value"
                v-bind="field"
                :error-message="errorMessage"
                :error="!!errorMessage"
                @keydown.space.prevent
              />
            </Field>
            <Field name="password" v-slot="{ errorMessage, value, field }">
              <q-input
                label="Password"
                color="orange"
                v-model="password"
                :type="isPwd ? 'password' : 'text'"
                :model-value="value"
                v-bind="field"
                :error-message="errorMessage"
                :error="!!errorMessage"
                @keydown.space.prevent
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

            <div>
              <q-btn class="btn-auth" push size="20px" type="submit">
                <span>Login</span>
              </q-btn>
            </div>

            <div class="div-auth">
              Don't have an account?
              <span class="span-auth">
                <router-link :to="{ name: 'Register' }"> Register </router-link>
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
import { Field, Form } from "vee-validate";
import * as yup from "yup";
import AuthService from "@/services/AuthService.js";
import { ref } from "vue";

export default {
  name: "Login",
  components: {
    Field,
    Form,
  },
  setup() {
    return {
      username: ref(""),
      password: ref(""),
      isPwd: ref(true),
    };
  },
  data() {
    const schema = yup.object().shape({
      username: yup.string().required("Username is required!"),
      password: yup.string().required("Password is required!"),
    });
    return {
      loading: false,
      message: "",
      schema,
    };
  },
  methods: {
    handleLogin(user) {
      AuthService.login(user)
        .then(() => {
          this.$router.push({ name: "About" });
          /* if (this.Vaccination.isUser && this.Vaccination.currentUser) {
            this.$router.push({ name: "PeopleDetails" });
          } else if (
            this.Vaccination.isDoctor &&
            this.Vaccination.currentUser
          ) {
            this.$router.push({ name: "PersonList" });
          } else if (this.Vaccination.isAdmin && this.Vaccination.currentUser) {
            this.$router.push({ name: "AdminConsole" });
          } */
        })
        .catch(() => {
          this.message = "Could not login";
          setTimeout(() => {
            this.message = "";
          }, 1500);
        });
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
  background: url("https://image.freepik.com/free-photo/doctor-vaccinating-patient-clinic_23-2148920132.jpg")
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
  margin-top: 50px;
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
    background: url("https://image.freepik.com/free-photo/doctor-vaccinating-patient-clinic_23-2148920132.jpg")
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