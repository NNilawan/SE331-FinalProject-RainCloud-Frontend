<template>
  <form class="review-form" @submit="onSubmit">
    <q-card-section class="text-left textbox">
      <q-input
        for="question"
        id="question"
        v-model="question"
        class="text-h5"
        standout="bg-deep-orange-4 text-white"
        label=" Doctor would like to comment that:"
        filled
        autogrow
      />
      <br />
      <div class="row">
        <q-space />
        <q-btn
          type="submit"
          value="Submit"
          outline
          rounded
          color="deep-orange"
          label="Submit"
          @click="flashMessage"
        />
      </div>
    </q-card-section>
  </form>
</template> 

<script>
export default {
  inject: ["GStore"],
  data() {
    return {
      question: "",
    };
  },
  methods: {
    onSubmit() {
      if (this.question === "") {
        alert("Recommend is incomplete. Please fill out comment field");
        return;
      }

      let doctorRecommmend = {
        question: this.question,
      };
      this.$emit("review-submitted", doctorRecommmend);
      this.question = "";
    },
    flashMessage() {
      if (this.question != "") {
        this.GStore.flashMessage = "You comment already";
        setTimeout(() => {
          this.GStore.flashMessage = "";
        }, 5000);
      }
    },
  },
};
</script>

<style>
.textbox {
  border-radius: 10px !important;
  width: 100%;
  max-width: 600px;
  border: 1px solid #ff7423;
  margin: auto;
}
</style>

