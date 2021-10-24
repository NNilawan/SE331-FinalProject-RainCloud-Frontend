<template>
  <div class="q-pa-md">
    <div class="row table">
      <div class="col-1">No.</div>
      <div class="col-1">Name</div>
      <div class="col-1">Surname</div>
      <div class="col-1">Age</div>
      <div class="col-2">Hometown</div>
      <div class="col-1">Vaccine Does1</div>
      <div class="col-1">Vaccine Does1</div>
      <div class="col-1">Doctor</div>
      <div class="col-1">Edit</div>
    </div>
    <div class="row table" v-for="data in user_vaacine" :key="data.id" :data="data" >
      <div class="col-1">1</div>
      <div class="col-1">{{ data.patient.firstname}}</div>
      <div class="col-1">{{ data.patient.lastname}}</div>
      <div class="col-1">{{ calculateAge }}</div>
      <div class="col-2">{{ data.patient.hometown}}</div>
      <div class="col-1">{{ data.vaccine.name}}</div>
      <div class="col-1">{{ data.vaccine.name}}</div>
      <div class="col-1">{{ data.name}}</div>
      <div class="col-1"> <q-btn color="orange" label="Edit" /></div>
    </div>
  </div>
</template>
<script>
import AdminService from "@/services/AdminService.js";
import AuthService from "@/services/AuthService.js";
export default {
  name: "AdminList",

  data() {
    return {
      user_vaacine: null,
      totalPersons: 0, // <--- Added this to store totalPersons
    };
  },

  // eslint-disable-next-line no-unused-vars
      created() {
    AdminService.getPersonInAdmin()
      .then((response) => {
        this.user_vaacine = response.data
      })
      .catch((error) => {
        console.log(error)
      })
  },
  computed: {
    currentUser() {
      return localStorage.getItem("user");
    },
    isDoctor() {
      return AuthService.hasRoles("ROLE_DOCTOR");
    },
    calculateAge: function() {
          // let currentDate = new Date();
          // let date = this.user_vaacine.birthdate;
          // let birthDate = new Date(date);
          // let difference = currentDate - birthDate;
          // let age = Math.floor(difference/31557600000);
          // return age
         
          let currentDate = new Date();
          let birthDate = new Date(this.user_vaacine.birthdate);
          let difference = currentDate - birthDate;
          let age = Math.floor(difference/31557600000);
          return age
        
        },
  },
  
};
</script>

<style>
.table {
  padding: 10px 15px;
  background: rgba(102, 0, 255, 0.15);
  border: 1px solid rgba(2, 1, 2, 0.2);
  margin-top: 1rem;
  text-align: center;
}
</style>