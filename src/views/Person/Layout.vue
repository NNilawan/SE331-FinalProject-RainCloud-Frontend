<template>
  <div v-if="GStore.person">
    <div class="q-pa-md title">
      <h2 class="text-h1">{{ title }}</h2>
      <div class="q-pa-md nav flex flex-center">
        <q-item id="nav-btn" class="q-gutter-md">
          <!-- <span > -->
          <router-link
            v-if="isDoctor || isUser"
            :to="{ name: 'PersonDetails', params: { id: GStore.person.id } }"
          >
            <q-item clickable v-ripple id="nav-content">
              <q-section>
                <span class="material-icons-outlined"> account_circle </span>
                Person Details
              </q-section>
            </q-item>
          </router-link>
          <!-- </span> -->
          <router-link
            :to="{ name: 'VaccineDetails', params: { id: GStore.person.id } }"
          >
            <q-item clickable v-ripple id="nav-content">
              <q-section>
                <q-icon name="vaccines" />
                Vaccine Details
              </q-section>
            </q-item>
          </router-link>

          <router-link
            :to="{ name: 'DoctorDetails', params: { id: GStore.person.id } }"
          >
            <q-item clickable v-ripple id="nav-content">
              <q-section>
                <span class="material-icons-outlined"> reviews </span>
                Doctor Recommendation
              </q-section>
            </q-item>
          </router-link>
        </q-item>
      </div>
      <router-view :person="GStore.person" />
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import AuthService from "../../services/AuthService.js";
export default {
  inject: ["GStore"],
  props: {
    person: {
      type: Object,
      required: true,
    },
  },
  computed: {
    title() {
      let title_name = "";
      if (this.$route.name == "PersonDetails") {
        title_name = "PERSON DETAILS";
      }
      if (this.$route.name == "VaccineDetails") {
        title_name = "VACCINE DETAILS";
      }
      if (this.$route.name == "DoctorDetails") {
        title_name = "DOCTOR RECOMMENDATION";
      }
      return title_name;
    },
    isAdmin() {
      return AuthService.hasRoles("ROLE_ADMIN");
    },
    isDoctor() {
      return AuthService.hasRoles("ROLE_DOCTOR");
    },
    isUser() {
      return AuthService.hasRoles("ROLE_USER");
    },
  },
  setup() {
    return {
      model: ref("one"),
      secondModel: ref("one"),
    };
  },
};
</script>

<style>
.title {
  text-align: center;
}

.nav {
  margin-top: -80px;
}

#nav-btn {
  background-color: transparent;
  font-size: 23px;
}

#nav-btn a {
  font-weight: bold;
  color: #1565c0;
  text-decoration: none;
}

#nav-btn a.router-link-exact-active {
  color: #ffffff;
  background-color: #1565c0;
  border-radius: 35px;
}

#nav-content {
  border: 2px solid #1565c0;
  border-radius: 35px;
}

.block {
  font-size: 20px;
}
</style>
