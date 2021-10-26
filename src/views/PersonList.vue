<template>
  <div class="q-pa-md">
    <div class="home">
      <h1 class="title">PATIENT LIST</h1>
      <h2 class="subtitle">THE PATIENT LIST IN RESPONSIBILITY</h2>
      <q-item class="serach-section">
        <q-icon name="search" class="search-icon text-h4" />
        <BaseInput
          v-model="keyword"
          type="text"
          placeholder="Search patient"
          @input="updateKeyword"
          class="search-box"
        />
      </q-item>
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
        <q-btn unelevated rounded color="orange" label="Prev Page" />
      </router-link>

      <router-link
        class="pagination"
        :to="{ name: 'PersonList', query: { page: page + 1 } }"
        rel="next"
        v-if="hasNextPage"
      >
        <q-btn unelevated rounded color="orange" label="Next Page" />
      </router-link>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Personcard from "@/components/Personcard.vue";
import DoctorService from "@/services/DoctorService.js";
import BaseInput from "@/components/BaseInput.vue";

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
    BaseInput,
  },
  data() {
    return {
      datas: null,
      totalPersons: 0, // <--- Added this to store totalPersons
      keyword: null,
    };
  },
  methods: {
    updateKeyword() {
      var queryFunction;
      if (this.keyword === "") {
        queryFunction = DoctorService.getPersons(4, 1);
      } else {
        queryFunction = DoctorService.getPersonsByKeyword(this.keyword, 4, 1);
      }

      queryFunction
        .then((response) => {
          this.datas = response.data;
          console.log(this.datas);
          this.totalPersons = response.headers["x-total-count"];
          console.log(this.totalPersons);
        })
        .catch(() => {
          return { name: "NetworkError" };
        });
    },
  },

  // eslint-disable-next-line no-unused-vars
  beforeRouteEnter(routeTo, routeFrom, next) {
    DoctorService.getPersons(4, parseInt(routeTo.query.page) || 1)
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
    DoctorService.getPersons(4, parseInt(routeTo.query.page) || 1)
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
      let totalPages = Math.ceil(this.totalPersons / 4); // 2 is events per page

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
  color: #ff7423;
}
.block {
  font-size: 22px;
}
.row {
  justify-content: center;
}

.search-box {
  font-size: bolder;
  width: 400px;
  height: 40px;
  padding: 1%;
  border: none;
  font-size: 20px;
  border-radius: 22px;
  border: 2px solid #ff7423;
}

.search-icon {
  color: #ff7423;
}

.serach-section {
  margin: -30px 0 20px 0;
}
</style>