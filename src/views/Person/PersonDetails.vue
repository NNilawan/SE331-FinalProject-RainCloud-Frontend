<template>
  <div class="q-pa-md row items-start q-gutter-md flex flex-center">
    <q-card class="my-card">
      <q-card-section horizontal>
        <q-img :src="person.picture">
          <div class="text-h4 absolute-bottom text-right">
            NAME: {{ person.firstname }} {{ person.lastname }}
          </div>
        </q-img>
      </q-card-section>
      <q-card-section class="text-left">
        <!-- <div class="text-h6">
          <span class="title">STATUS:</span> {{ vaccine }}
        </div> -->
        <div class="text-h6">
          <span class="title">NAME:</span>
          {{ person.firstname + " " + person.lastname }}
        </div>
        <div class="text-h6">
          <span class="title">AGE:</span> {{ age }} years
        </div>
        <!-- <div class="text-h6">
          <span class="title">CONGENITAL DISEAS:</span>
          {{ person.congenital_disease }}
        </div> -->
        <!-- <div class="text-h6">
          <span class="title">TEMPERATURE:</span> {{ person.temperature }} °C
        </div> -->
        <div class="text-h6">
          <span class="title">HOMETOWN:</span> {{ person.hometown }}
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
export default {
  props: ["person"],
  computed: {
    vaccine: function () {
      var dose2 = this.person.status_does2;
      if (dose2 === true) {
        return "Already get second dose";
      } else {
        return "Waiting for second dose";
      }
    },
    age: function () {
      var today = new Date();
      var year = this.person.birthDate.substring(0, 4);
      var month = this.person.birthDate.substring(5, 7);
      var day = this.person.birthDate.substring(8, 10);
      var dt1 = new Date(year,month,day);
      var diff = (today.getTime() - dt1.getTime()) / 1000;
      diff /= 60 * 60 * 24;
      return Math.abs(Math.floor(diff / 365.25));
    },
  },
};
</script>



<style>
.menu {
  margin-top: -50px;
}
.my-card {
  max-width: 600px !important;
  width: 100%;
  max-width: 350px;
}
.title {
  font-weight: bold;
}
</style>

