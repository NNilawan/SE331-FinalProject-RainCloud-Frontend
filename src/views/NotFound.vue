<template>
  <div class="notfound">
    <h1 class="title">Oops!</h1>
    <h2>The <span class="resource"> {{ resource }} </span> you're looking for is not here.</h2>
    <router-link :to="{ name: 'PersonList' }" class="text-h4">Back to the home page</router-link>
  </div>
</template>
<script>
export default {
  props: {
    resource: {
      type: String,
      required: true,
      default: 'page'
    }
  }
}
</script>

<style scoped>
.title {
  color: #68b2a0;
  text-align: left;
   font-size: 150px;
}
.resource {
  color: #68b2a0;
  font-size: 100px;
}
.notfound {
  text-align: left;
  margin-left: 100px;
}
</style>
