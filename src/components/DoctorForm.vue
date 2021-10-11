<template>
  <form class="review-form" @submit.prevent="onSubmit">
    <q-card-section class="text-left textbox">
      <q-input
        for="name"
        id="name"
        v-model="name"
        class="text-h5"
        standout="bg-teal text-white"
        label="Doctor Name:"
      />
      <br />

      <q-input
        for="question"
        id="question"
        v-model="question"
        class="text-h5"
        standout="bg-teal text-white"
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
          color="teal-7"
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
      name: "",
      question: "",
      time: "",
    };
  },
  methods: {
    onSubmit() {
      if (this.name === "" || this.question === "") {
        alert("Recommend is incomplete. Please fill out every field");
        return;
      }
      var today = new Date();
      var time = today.toLocaleTimeString();
      let doctorRecommmend = {
        name: this.name,
        question: this.question,
        time: time,
      };
      this.$emit("review-submitted", doctorRecommmend);
      this.name = "";
      this.question = "";
    },
    flashMessage() {
      if (this.name != "" && this.question != "") {
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
  border: 1px solid #68b2a0;
  margin: auto;
}
</style>

