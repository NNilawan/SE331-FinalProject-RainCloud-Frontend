<template>
  <div>
    <q-card-section
      class="textbox"
      v-for="(review, index) in reviews"
      :key="index"
    >
      <div class="text-h6">
        <b>Doctor Name:</b>
        {{ review.commentBy.firstname + ' ' + review.commentBy.lastname}} <br>
        <b> Date:</b> {{ review.date }} | 
        <b> Time:</b> {{ review.time }}
      </div>
      <div class="text-h5 text-weight-bolde">
        <p class="o">{{ review.comment }}</p>
      </div>
    </q-card-section>
  </div>
</template>

<script>
export default {
  inject: ["GStore"],
  props: {
    reviews: {
      type: Array,
      required: true,
    },
  },
};
</script>
<style scoped>
.textbox {
  border-radius: 10px !important;
  width: 100%;
  max-width: 600px;
  /* border: 5px solid #68b2a0; */
  border: 3px solid white;
  text-align: left;
  margin: auto;
  padding: 20px 20px;
  /* background-color: #e0e0e0; */
  background-color:#bae0d6;
}
.o {
  /* overflow: auto; */
  word-wrap: break-word
}
</style>
