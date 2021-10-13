<template>
  <div class="q-pa-md flex flex-center">
    <q-card class="vaccine-card">
      <q-tabs
        v-model="tab"
        class="text-grey"
        active-color="deep-orange"
        indicator-color="deep-orange"
      >
        <q-tab label="FIRST DOSE" name="one" />
        <q-tab
          label="SECOND DOSE"
          name="two"
          :disable="event.vaccine.length == 1"
        />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab" animated id="text-details">
        <q-tab-panel
          name="one"
          v-for="vaccine in event.vaccine"
          :key="vaccine.id"
        >
          <q-card-section>
            <div class="row">
              <div class="col-md-6 col-sm-12">
                <q-card-section class="text-left">
                  <p>
                    NAME: <span id="text-color">{{ vaccine.name }}</span>
                  </p>
                  <p>
                    DATE: <span id="text-color">{{ vaccine.date }}</span>
                  </p>
                  <p>
                    TIME: <span id="text-color">{{ vaccine.time }}</span>
                  </p>
                  <p>
                    PLACE: <span id="text-color">{{ vaccine.place }}</span>
                  </p>
                </q-card-section>
              </div>
              <div class="col-md-6 col-sm-12">
                <q-card-section>
                  <img :src="vaccine.images" id="vaccine-logo" />
                </q-card-section>
              </div>
            </div>
          </q-card-section>
        </q-tab-panel>

        <q-tab-panel
          name="two"
          v-for="vaccine in separateVaccine"
          :key="vaccine.id"
        >
          <q-card-section>
            <div class="row">
              <div class="col-md-6 col-sm-12">
                <q-card-section class="text-left">
                  <p>
                    NAME: <span id="text-color">{{ vaccine.name }}</span>
                  </p>
                  <p>
                    DATE: <span id="text-color">{{ vaccine.date }}</span>
                  </p>
                  <p>
                    TIME: <span id="text-color">{{ vaccine.time }}</span>
                  </p>
                  <p>
                    PLACE: <span id="text-color">{{ vaccine.place }}</span>
                  </p>
                </q-card-section>
              </div>
              <div class="col-md-6 col-sm-12">
                <q-card-section>
                  <img :src="vaccine.images" id="vaccine-logo" />
                </q-card-section>
              </div>
            </div>
          </q-card-section>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  props: ["event"],
  computed: {
    separateVaccine: function () {
      const length = this.event.vaccine.length;
      const array_slice = this.event.vaccine.slice();
      let vaccine_dose2 = null;
      for (let i = 1; i <= length; i++) {
        vaccine_dose2 = array_slice.slice(1);
      }
      return vaccine_dose2;
    },
  },
  setup() {
    return {
      tab: ref("one"),
    };
  },
};
</script>

<style>
.vaccine-card {
  border-radius: 10px !important;
  width: 100%;
  max-width: 600px;
  border: 1px solid #ff7423;
}
#text-details {
  font-size: 20px;
}
#text-color {
  color: #ff7423;
}
#vaccine-logo {
  width: 250px;
  height: auto;
  margin-top: auto;
  margin-bottom: auto;
}
.q-tab__label {
  font-size: 25px !important;
}
</style>