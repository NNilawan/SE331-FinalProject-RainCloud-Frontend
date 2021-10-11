<template>
  <div id="flashMessage" v-if="GStore.flashMessage">
    {{ GStore.flashMessage }}
  </div>
  <div class="detail">
    <q-card-section class="q-pa-sm">
      <DoctorComment v-if="reviewsList.length" :reviews="reviewsList" />
    </q-card-section>
    <q-card-section class="q-pa-sm">
      <DoctorForm @review-submitted="addReview" />
    </q-card-section>
  </div>
</template> 

<script>
import DoctorForm from "@/components/DoctorForm.vue";
import DoctorComment from "@/components/DoctorComment.vue";

export default {
  props: ["id"],
  inject: ["GStore"],
  components: {
    DoctorForm,
    DoctorComment,
  },
  data() {
    return {
      name: "",
      question: "",
      reviews: [],
    };
  },
  computed: {
    reviewsList: function () {
      var list = [];
      if (this.GStore.comment[this.id] != null) {
        list = this.GStore.comment[this.id];
        return list;
      }
      return list;
    },
  },
  methods: {
    addReview(review) {
      if (this.GStore.comment[this.id] == null) {
        this.reviews.push(review);
        this.GStore.comment[this.id] = this.reviews;
      } else {
        this.GStore.comment[this.id].push(review);
        // this.reviews = this.GStore.comment[this.id];
      }
    },
  },
};
</script>

<style>
@keyframes greenfade {
  from {
    background: #45cf4c;
  }
  to {
    background: transparent;
  }
}

#flashMessage {
  animation-name: greenfade;
  animation-duration: 7s;
}
</style>
