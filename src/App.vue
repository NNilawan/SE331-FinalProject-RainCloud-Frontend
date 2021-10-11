<template>
  <div class="q-pa-md">
     <q-layout view="lHh Lpr lff">
      <q-header elevated id="sidebar">
        <q-toolbar>
          <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
        </q-toolbar>
      </q-header>

      <q-drawer
        id="sidebar"
        v-model="drawer"
        show-if-above
        :width="200"
        :breakpoint="500"
      >
        <q-scroll-area
          style="
            height: calc(100% - 150px);
            margin-top: 150px;
            border-right: 1px solid #ddd;
          "
        >
          <q-list padding>
            <router-link :to="{ name: 'PersonList' }">
              <q-item clickable v-ripple>
                <q-item-section avatar>
                  <q-icon name="home" />
                </q-item-section>

                <q-item-section>HOME</q-item-section>
              </q-item>
            </router-link>

            <router-link :to="{ name: 'About' }">
              <q-item clickable v-ripple>
                <q-item-section avatar>
                  <q-icon name="groups" />
                </q-item-section>

                <q-item-section>ABOUT US</q-item-section>
              </q-item>
            </router-link>
          </q-list>
        </q-scroll-area>

        <q-img
          class="absolute-top"
          src="./assets/background-sidebar.jpg"
          style="height: 150px"
        >
        </q-img>
      </q-drawer>

      <q-page-container>
        <router-view />
      </q-page-container>
    </q-layout>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    return {
      drawer: ref(false),
    };
  },
};
</script>

<style>
#sidebar {
  background-color:#67b39f  ;
  font-size: 23px;
}
#sidebar a {
  font-weight: bold;
  color: white;
  text-decoration: none;
}

#sidebar a.router-link-exact-active {
  color: #2c6975;
}
.menu-list .q-item {
  border-radius: 0 32px 32px 0;
}
</style>