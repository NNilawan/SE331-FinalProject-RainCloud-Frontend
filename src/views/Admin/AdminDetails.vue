<template>
  <div v-if="user">
    <div class="q-pa-md">
      <h2 class="title">USER DETAILS</h2>
      <div class="q-pa-md row items-start q-gutter-md col-4">
        <q-card class="card">
          {{ user.picture }}
          <!-- <img id="people-img" v-bind:src="user.picture" /> -->
          <q-card-section>
            <div class="text-h5">Name: {{ user.firstname }}</div>
            <div class="text-h5">Lastname: {{ user.lastname }}</div>
            <div class="text-h5">Birthday: {{ user.birthDate }}</div>
            <div class="text-h5">Home town: {{ user.hometown }}</div>
          </q-card-section>
        </q-card>
      </div>
      <form>
        <div class="row">
          <div class="col">Vaccine name:</div>
          <div class="col">
            <select v-model="vaccine.id">
              <option
                v-for="option in GStore.vaccine"
                :value="option.id"
                :key="option.id"
                :selected="option.id === vaccine.id"
              >
                {{ option.name }}
              </option>
            </select>
          </div>
        </div>
        <div class="row">
          <div class="col">Date:</div>
          <div class="col">
            <q-input filled v-model="date" mask="####-##-##">
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    ref="qDateProxy"
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date v-model="date" minimal>
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
          </div>
        </div>
        <div class="row">
          <div class="col">Time:</div>
          <div class="col">
            <q-input filled v-model="time" mask="time" />
          </div>
        </div>
        <div class="row">
          <div class="col">Place:</div>
          <div class="col">
            <q-input filled v-model="text" label="Place" />
          </div>
        </div>
        <div class="row">
          <div class="col">Doctor:</div>
          <div class="col">
            <div v-if="users.authorities == 'ROLE_DOCTOR'">
              {{ users.authorities }}
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import AdminService from "@/services/AdminService.js";
import { ref } from "vue";
export default {
  inject: ["GStore"],
  name: "AdminDetails",
  props: ["id"],
  data() {
    return {
      user: null,
      vaccine: { id: "", name: "" },
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

    AdminService.getPersonInAdmin()
      .then((response) => {
        this.users = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  setup() {
    return {
      date: ref(""),
    };
  },
};
</script>

<style>
.table {
  font-size: 25px;
  padding: 10px 15px;
  background: #ffa9485d;
  border: 1px solid rgba(2, 1, 2, 0.2);
  margin-top: 1rem;
  text-align: center;
}
.card {
  width: 100%;
  max-width: 250px;
  border-radius: 10px !important;
  color: #ff7423 !important;
  border-color: #ff7423 !important;
  /* text-align: center; */
}
#people-img {
  width: 100%;
  max-width: 400px;
}
</style>

