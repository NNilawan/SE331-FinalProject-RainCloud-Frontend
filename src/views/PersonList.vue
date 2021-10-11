<template>
  <div class="home">
    <h1 class="title">PEOPLE LIST</h1>
    <h2 class="subtitle">THE PEOPLE LIST WHO HAVE BEEN VACCINATED</h2>
  </div>

  <div class="row">
    <Personcard v-for="data in datas" :key="data.id" :data="data" />
  </div>

  <div class="pagination q-gutter-md">
    <router-link
      class="pagination"
      :to="{ name: 'PersonList', query: { page: page - 1 } }"
      rel="prev"
      v-if="page != 1"
    >
      <q-btn unelevated rounded color="orange" label="Prev Page"
    /></router-link>

    <router-link
      class="pagination"
      :to="{ name: 'PersonList', query: { page: page + 1 } }"
      rel="next"
      v-if="hasNextPage"
      ><q-btn unelevated rounded color="orange" label="Next Page" />
    </router-link>
  </div>
</template>

<script>
// @ is an alias to /src
import Personcard from "@/components/Personcard.vue";
import PersonService from "@/services/PersonService.js";
export default {
  name: "PersonList",
  props: {
    page: {
      type: Number,
      required: true,
    },
  },
  components: {
    Personcard,
  },
  data() {
    return {
      datas: null,
      totalPersons: 0, // <--- Added this to store totalPersons
    };
  },

  // eslint-disable-next-line no-unused-vars
  beforeRouteEnter(routeTo, routeFrom, next) {
    PersonService.getPersons(6, parseInt(routeTo.query.page) || 1)
      .then((response) => {
        next((comp) => {
          comp.datas = response.data;
          comp.totalPersons = response.headers["x-total-count"];
        });
      })
      .catch(() => {
        next({ name: "NetworkError" });
      });
  },
  beforeRouteUpdate(routeTo) {
    PersonService.getPersons(6, parseInt(routeTo.query.page) || 1)
      .then((response) => {
        this.datas = response.data; // <-----
        this.totalPersons = response.headers["x-total-count"];
      })
      .catch(() => {
        return { name: "NetworkError" };
      });
  },
  computed: {
    hasNextPage() {
      // First, calculate total pages
      let totalPages = Math.ceil(this.totalPersons / 6); // 2 is events per page

      // Then check to see if the current page is less than the total pages.
      return this.page < totalPages;
    },
  },
};
</script>

<style>
.home {
  text-align: center;
}
.pagination {
  text-decoration: none;
  text-align: center;
  margin-top: 20px !important;
}
.title {
  font-weight: bold;
}
.subtitle {
  margin-top: -40px;
  font-weight: bold;
  color: #68b2a0;
}
.block {
  font-size: 22px;
}
.row {
  justify-content: center;
}
</style>