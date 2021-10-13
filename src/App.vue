<template>
  <!--   <div id="flashMessage" v-if="GStore.flashMessage">
    {{ GStore.flashMessage }}
  </div> -->

  <q-layout view="lHh lpr lFf">
    <q-header reveal elevated class="rounded-borders" id="sidebar">
      <div class="row">
        <div class="col-md-3 col-sm-12 col-12">
          <q-toolbar class="justify-start" style="margin-left: 3%">
            <q-icon
              name="vaccines"
              style="
                margin-top: 2%;
                margin-bottom: 2%;
                margin-right: 1%;
                font-size: 27px;
              "
            />
            <b>Vaccination</b>
          </q-toolbar>
        </div>

        <div class="col-md-6 col-sm-12 col-12">
          <div class="row">
            <router-link :to="{ name: 'PersonList' }">
              <q-toolbar clickable v-ripple>
                <q-item-section avatar>
                  <q-icon name="home" />
                </q-item-section>
                <q-item-label>HOME</q-item-label>
              </q-toolbar>
            </router-link>

            <router-link :to="{ name: 'About' }">
              <q-toolbar clickable v-ripple>
                <q-item-section avatar>
                  <q-icon name="groups" />
                </q-item-section>
                <q-item-label>ABOUT US</q-item-label>
              </q-toolbar>
            </router-link>

            <!-- <span v-if="isAdmin">
                <router-link :to="{ name: 'AddEvent' }">
                  <q-toolbar clickable v-ripple>
                    <q-item-section avatar>
                      <q-icon name="add_circle" />
                    </q-item-section>

                    <q-item-label>NEW EVENT</q-item-label>
                  </q-toolbar>
                </router-link>
              </span> -->
          </div>
        </div>

        <div class="col-md-3 col-sm-12 col-12">
          <!--Before login-->
          <!-- <q-toolbar class="justify-end" v-if="!GStore.currentUser"> -->
          <q-toolbar class="justify-end">
            <router-link to="/register">
              <q-item>Sign up</q-item>
            </router-link>
            <router-link to="/login">
              <q-item>Login</q-item>
            </router-link>
          </q-toolbar>

          <!--After login-->
          <!--             
              <q-toolbar class="justify-end" v-if="GStore.currentUser">
              <q-btn-dropdown color="deep-orange-7" rounded no-caps @click="onMainClick">
                <template v-slot:label>
                  <div class="row items-center no-wrap">
                    <q-icon left name="person_outline" />
                    <div class="text-center" style="font-size: 20px">
                       {{ GStore.currentUser.name }}
                    </div>
                  </div>
                </template>

                <q-list>
                  <q-item clickable v-close-popup @click="onItemClick">
                    <q-item-section avatar>
                      <q-avatar
                        icon="person"
                        color="deep-orange"
                        text-color="white"
                      />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label style="font-size: 18px">Profile</q-item-label>
                    </q-item-section>
                  </q-item>
                  <a @click="logout">
                    <q-item clickable v-close-popup @click="onItemClick">
                      <q-item-section avatar>
                        <q-avatar
                          icon="logout"
                          color="negative"
                          text-color="white"
                        />
                      </q-item-section>
                      <q-item-section>
                        <q-item-label style="font-size: 18px">Logout</q-item-label>
                      </q-item-section>
                    </q-item>
                  </a>
                </q-list>
              </q-btn-dropdown>
            </q-toolbar>
            -->
        </div>
      </div>
    </q-header>

    <q-page-container>
      <router-view />

      <!-- button back on top -->
      <q-page-scroller
        position="bottom-right"
        :scroll-offset="150"
        :offset="[18, 18]"
      >
        <q-btn fab icon="keyboard_arrow_up" color="deep-orange" />
      </q-page-scroller>
    </q-page-container>
  </q-layout>
</template>

<script>
/* import AuthService from './services/AuthService.js' 

  export default {
  inject: ["GStore"], // <----
  computed: {
    currentUser() {
      return localStorage.getItem("user");
    },
    isAdmin() {
      return AuthService.hasRoles("ROLE_ADMIN");
    },
  },
  methods: {
    logout() {
      AuthService.logout();
      this.$router.push("/login"); //fix from .go -> .push for redirect to login page
    },
  },
}; */
</script>

<style>
@keyframes yellowfade {
  from {
    background: yellow;
  }
  to {
    background: transparent;
  }
}

#flashMessage {
  animation-name: yellowfade;
  animation-duration: 3s;
}
#sidebar {
  background-color: #ff7423;
  font-size: 23px;
  margin-top: 0.4px;
}
#sidebar a {
  font-weight: bold;
  color: white;
  text-decoration: none;
}

#sidebar a.router-link-exact-active {
  color: #ce3a05;
  border-bottom: 3px solid #ce3a05;
}

@media screen and (max-width: 1023px) {
  div .col-12 .q-toolbar {
    justify-content: center !important;
    margin: 0px !important;
  }
}
</style>