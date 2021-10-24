<template>
  <div class="q-pa-md">
    <h2 class="title">USERS LIST MANAGEMENT</h2>
    <div class="row">
      <div class="col-1 table">No.</div>
      <div class="col-2 table">Name</div>
      <div class="col-2 table">Surname</div>
      <div class="col-2 table">Role user</div>
      <div class="col-2 table">Change role to doctor</div>
      <div class="col-1 table">Edit</div>
    </div>

    <div v-for="data in user" :key="data.id" :data="data">
      <div v-if="data.authorities == 'ROLE_DOCTOR'">
        <div class="row">
          <div class="col-1 subtable">{{ data.id }}</div>
          <div class="col-2 subtable">{{ data.firstname }}</div>
          <div class="col-2 subtable">{{ data.lastname }}</div>
          <div class="col-2 subtable">
            <span v-if="data.authorities == 'ROLE_DOCTOR'">Doctor</span>
            <span v-else>User</span>
          </div>
          <div class="col-2 subtable">
            <q-btn color="orange" label="Change role" />
          </div>
          <div class="col-1 subtable">
            <q-btn color="orange" label="Edit" />
          </div>
        </div>
      </div>

      <div v-else-if="data.authorities == 'ROLE_USER'">
        <div class="row">
          <div class="col-1 subtable">{{ data.id }}</div>
          <div class="col-2 subtable">{{ data.firstname }}</div>
          <div class="col-2 subtable">{{ data.lastname }}</div>
          <div class="col-2 subtable">
            <span v-if="data.authorities == 'ROLE_DOCTOR'">Doctor</span>
            <span v-else>User</span>
          </div>
          <div class="col-2 subtable">
            <q-btn color="orange" label="Change role" />
          </div>
          <div class="col-1 subtable">
            <q-btn color="orange" label="Edit" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import AdminService from "@/services/AdminService.js";
// import AuthService from "@/services/AuthService.js";
export default {
  name: "AdminList",

  data() {
    return {
      user: null,
    };
  },

  // eslint-disable-next-line no-unused-vars
  created() {
    AdminService.getPersonInAdmin()
      .then((response) => {
        this.user = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  computed: {
    currentUser() {
      return localStorage.getItem("user");
    },
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
.subtable {
  font-size: 20px;
  padding: 10px 15px;
  /* margin-top: 1rem; */
  background: white;
  border: 1px solid rgba(2, 1, 2, 0.2);
  text-align: center;
}
.title {
  font-weight: bold;
}
.hide {
  visibility: hidden !important;
}
</style>