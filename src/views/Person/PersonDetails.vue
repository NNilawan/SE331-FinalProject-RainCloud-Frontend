<template>
  <div class="q-pa-md row items-start q-gutter-md flex flex-center">
    <q-card class="my-card">
      <q-card-section horizontal>
        <q-img :src="event.picture">
          <div class="text-h4 absolute-bottom text-right">
            NAME: {{ event.name }} {{ event.surname }}
          </div>
        </q-img>
      </q-card-section>
      <q-card-section class="text-left">
        <div class="text-h6">
          <span class="title">STATUS:</span> {{ vaccine }}
        </div>
        <div class="text-h6">
          <span class="title">AGE:</span> {{ event.age }} years
        </div>
        <div class="text-h6">
          <span class="title">CONGENITAL DISEAS:</span>
          {{ event.congenital_disease }}
        </div>
        <div class="text-h6">
          <span class="title">TEMPERATURE:</span> {{ event.temperature }} °C
        </div>
        <div class="text-h6">
          <span class="title">HOMETOWN:</span> {{ event.hometown }}
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
export default {
  props: ["event"],
  computed: {
    vaccine: function () {
      var dose2 = this.event.status_does2;
      if (dose2 === true) {
        return "Already get second dose";
      } else { 
        return "Waiting for second dose";
      }
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

