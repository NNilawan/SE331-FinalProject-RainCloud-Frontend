<template>
  <div class="q-pa-md row items-start q-gutter-md col-4">
    <router-link
      class="event-link"
      :to="{ name: 'PersonDetails', params: { id: data.id } }"
    >
      <q-card class="my-card">
        <img id="people-img" v-bind:src="data.picture" />

        <q-card-section>
          <div class="text-h4">Name: {{ data.firstname }} {{ data.lastname }}</div>
          <div class="text-h5">
            <q-icon name="vaccines" /> Status: {{ vaccine }}
          </div>
        </q-card-section>
      </q-card>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "Personcard",
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  computed: {
    vaccine: function () {
      // var dose2 = this.data.status_does2;
      if (this.data.gotVaccine.length > 1 ) {
        return "Already get second dose";
      } else {
        return "Get only the first dose";
      }
    },
  },
};
</script>

<style>
.my-card {
  width: 100%;
  max-width: 250px;
  border-radius: 10px !important;
  color: #FF7423 !important;
  border-color: #FF7423 !important;
  text-align: center;
}

#people-img {
  width: 100%;
  max-width: 400px;
}

.event-link {
  text-decoration: none;
}
</style>