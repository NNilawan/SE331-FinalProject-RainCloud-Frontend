<template>
  <form class="review-form" @submit="onSubmit">
    <q-card-section class="text-left textbox">
      <!-- <q-input
        for="name"
        id="name"
        v-model="name"
        class="text-h5"
        standout="bg-deep-orange-4 text-white"
        label="Doctor Name:"
      />
      <br /> -->

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
      // name: "",
      question: "",
      // time: "",
    };
  },
  methods: {
    onSubmit() {
      // if (this.name === "" || this.question === "") {
      if (this.question === "") {
        alert("Recommend is incomplete. Please fill out comment field");
        return;
      }
      // var today = new Date();
      // var time = today.toLocaleTimeString();
      let doctorRecommmend = {
        // name: this.name,
        question: this.question,
        // time: time,
      };
      this.$emit("review-submitted", doctorRecommmend);
      // this.name = "";
      this.question = "";
    },
    flashMessage() {
      // if (this.name != "" && this.question != "") {
      if (this.question != "") {
        this.GStore.flashMessage = "You comment already";
        setTimeout(() => {
          //After 5 seconds remove it
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
  border: 1px solid #FF7423;
  margin: auto;
}
</style>

