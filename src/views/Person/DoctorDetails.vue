<template>
  <div id="flashMessage" v-if="GStore.flashMessage">
    {{ GStore.flashMessage }}
  </div>
  <div class="detail">
    <q-card-section class="q-pa-sm">
      <DoctorComment v-if="reviewsList.length" :reviews="reviewsList" />
    </q-card-section>
    <span v-if="isDoctor">
      <span v-if="isSameDoctorId">
        <q-card-section class="q-pa-sm">
          <DoctorForm @review-submitted="addReview" />
        </q-card-section>
      </span>
    </span>
  </div>
</template> 

<script>
import DoctorForm from "@/components/DoctorForm.vue";
import DoctorComment from "@/components/DoctorComment.vue";
import CommentService from "@/services/CommentService.js";
import AuthService from "../../services/AuthService.js";
export default {
  props: ["id", "person"],
  inject: ["GStore"],
  components: {
    DoctorForm,
    DoctorComment,
  },
  data() {
    return {
      // name: "",
      // question: "",
      reviews: [],
    };
  },
  computed: {
    reviewsList: function () {
      var list = [];
      if (this.person.gotComment[0] != null) {
        list = this.person.gotComment;
        return list;
      }
      return list;
    },
    isDoctor() {
      return AuthService.hasRoles("ROLE_DOCTOR");
    },
    isSameDoctorId() {
      if (this.GStore.currentUser.id == this.id) {
        return false;
      }
      return true;
    },
  },
  methods: {
    addReview(review) {
      console.log(review);
      // console.log(this.GStore.currentUser.id)
      CommentService.saveComment(review, this.id)
        .then((response) => {
          console.log(response);
          this.$router.push("/datas/" + this.id + "/doctor-recommendation");
        })
        .catch(() => {
          this.$router.push("NetworkError");
        });
      // if (this.GStore.comment[this.id] == null) {
      //   this.reviews.push(review);
      //   this.GStore.comment[this.id] = this.reviews;
      // } else {
      //   this.GStore.comment[this.id].push(review);
      //   // this.reviews = this.GStore.comment[this.id];
      // }
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
