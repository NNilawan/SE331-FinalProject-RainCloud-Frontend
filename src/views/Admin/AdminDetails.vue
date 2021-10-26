<template>
  <div v-if="user">
    <div class="q-pa-md">
      <h2 class="title">USER DETAILS</h2>
      <div class="row">
        <div class="col-5">
          <div class="q-pa-md row items-start q-gutter-md col-4">
            <q-card class="admin-card">
              <img id="people-img" v-bind:src="user.picture" />
              <q-card-section>
                <div class="text-h5">Name: {{ user.firstname }}</div>
                <div class="text-h5">Lastname: {{ user.lastname }}</div>
                <div class="text-h5">Birthday: {{ user.birthDate }}</div>
                <div class="text-h5">Age: {{ calculateAge }} Years old</div>
                <div class="text-h5">Home town: {{ user.hometown }}</div>
              </q-card-section>
            </q-card>
          </div>
        </div>

        <!-- Vaccine name -->
        <div class="col-6">
          <form @submit.prevent="saveVaccine">
            <div class="row data">
              <div class="col-2 name">Vaccine name:</div>
              <div class="col-5">
                <select v-model="user_vaccine.vaccine.id" class="select">
                  <option
                    v-for="option in GStore.vaccine"
                    :value="option.id"
                    :key="option.id"
                    :selected="option.id === user_vaccine.vaccine.id"
                  >
                    {{ option.name }}
                  </option>
                </select>
              </div>
              <div class="col-1 name">Does:</div>
              <div class="col-4">
                <select v-model="user_vaccine.dose" class="select">
                  <option
                    v-for="option in 2"
                    :value="option"
                    :key="option"
                    :selected="option === user_vaccine.dose"
                  >
                    {{ option }}
                  </option>
                </select>
              </div>
            </div>

            <div class="row data">
              <div class="col-1 name">Date:</div>
              <div class="col-5">
                <q-input
                  class="q-input"
                  rounded
                  outlined
                  standout="bg-orange text-white"
                  mask="####-##-##"
                  v-model="user_vaccine.date"
                  label="YYYY-MM-DD"
                >
                </q-input>
              </div>
              <div class="col-1 name">Time:</div>
              <div class="col-5">
                <q-input
                  rounded
                  outlined
                  standout="bg-orange text-white"
                  v-model="user_vaccine.time"
                  label="HH-mm-ss"
                  mask="##:##:##"
                />
              </div>
            </div>

            <div class="row data">
              <div class="col-3 name">Place or Hospital:</div>
              <div class="col-9">
                <q-input
                  rounded
                  outlined
                  standout="bg-orange text-white"
                  v-model="user_vaccine.place"
                  label="Place"
                />
              </div>
            </div>
            <div class="row data">
              <div class="col-2 name">Doctor name:</div>
              <div class="col-10">
                <select v-model="user_vaccine.doctor.id" class="select">
                  <option
                    v-for="option in GStore.doctor"
                    :value="option.id"
                    :key="option.id"
                    :selected="option.id === user_vaccine.doctor.id"
                  >
                    {{ option.firstname }} {{ option.lastname }}
                  </option>
                </select>
              </div>
            </div>
            <div class="row data">
              <div class="col-1">
                <q-btn
                  class="btn-auth"
                  color="orange"
                  push
                  size="20px"
                  type="submit"
                >
                  <span>Save</span>
                </q-btn>
              </div>
              <div class="col-1">
                <router-link
                  style="text-decoration: none"
                  :to="{ name: 'AdminList' }"
                >
                  <q-btn
                    class="btn-auth"
                    color="orange"
                    push
                    size="20px"
                    type="submit"
                  >
                    <span>Back</span>
                  </q-btn>
                </router-link>
              </div>
              <div class="col-1">
                <router-link
                  style="text-decoration: none"
                  :to="{ name: 'VaccineDetails', params: { id: user.id } }"
                >
                  <q-btn
                    class="btn-auth"
                    color="orange"
                    push
                    size="20px"
                    type="submit"
                  >
                    <span>Detail</span>
                  </q-btn>
                </router-link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AdminService from "@/services/AdminService.js";
import DoctorService from "@/services/DoctorService.js";
import VaccineService from "@/services/VaccineService.js";
import GStore from "@/store";
import { ref } from "vue";
export default {
  inject: ["GStore"],
  name: "AdminDetails",
  props: ["id"],
  data() {
    return {
      user_vaccine: {
        date: null,
        time: null,
        dose: null,
        place: "",
        patient: { id: "", name: "" },
        doctor: { id: "", name: "" },
        vaccine: { id: "", name: "" },
      },

      user: null,
    };
  },
  created() {
    AdminService.getUserDetails(this.id)
      .then((response) => {
        this.user = response.data;
      })
      .catch((error) => {
        console.log(error);
      });

    DoctorService.getDoctorlist()
      .then((response) => {
        GStore.doctor = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    saveVaccine() {
      VaccineService.saveVaccine(this.user.id, this.user_vaccine)
        .then((response) => {
          console.log(response);
          this.$router.push({
            name: "AdminList",
            // params: { id: response.patient.id },
          });
        })
        .catch(() => {
          this.$router.push("NetworkError");
        });
    },
  },
  computed: {
    calculateAge: function () {
      let currentDate = new Date();
      let birthDate = new Date(String(this.user.birthDate));
      let difference = currentDate - birthDate;
      let age = Math.floor(difference / 31557600000);
      return age;
    },
  },
  setup() {
    return {
      datetime: ref(""),
      timeWithSeconds: ref("10:56:00"),
      num: [1, 2],
    };
  },
};
</script>

<style>
.admin-card {
  width: 100%;
  max-width: 100%;
  border-radius: 10px !important;
  color: #ff7423 !important;
  border-color: #ff7423 !important;
  /* text-align: center; */
}
#people-img {
  width: 100%;
  max-width: 100%;
}
.select {
  font-size: 20px;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 10px;
  border-radius: 20px;
  background: #ffbc9c57;
  border: 1px solid rgb(255, 81, 0);
  width: 100%;
}
.data {
  margin-top: 2rem;
}
.name {
  font-size: 25px;
  color: #ff7423;
  padding-left: 20px;
  padding-top: 10px;
}
</style>

