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

        <div v-if="!GStore.currentUser" class="col-md-6 col-sm-12 col-12"></div>

        <div v-if="GStore.currentUser" class="col-md-6 col-sm-12 col-12">
          <div class="row" v-if="isUser">
            <router-link
              :to="{
                name: 'PersonDetails',
                params: { id: this.GStore.currentUser.id },
              }"
            >
              <q-toolbar clickable v-ripple>
                <q-item-section avatar>
                  <q-icon name="person" />
                </q-item-section>
                <q-item-label>PERSON DETAILS</q-item-label>
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
          </div>

          <div class="row" v-if="isDoctor">
            <router-link :to="{ name: 'PersonList' }">
              <q-toolbar clickable v-ripple>
                <q-item-section avatar>
                  <q-icon name="list_alt" />
                </q-item-section>
                <q-item-label>PATIENT LIST</q-item-label>
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
          </div>

          <div class="row" v-if="isAdmin">
            <router-link :to="{ name: 'AdminList' }">
              <q-toolbar clickable v-ripple>
                <q-item-section avatar>
                  <q-icon name="manage_accounts" />
                </q-item-section>
                <q-item-label>USER LIST</q-item-label>
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
          </div>
        </div>

        <!--After login-->
        <div class="col-md-3 col-sm-12 col-12">
          <q-toolbar class="justify-end" v-if="GStore.currentUser">
            <q-btn-dropdown color="deep-orange-7" rounded no-caps>
              <template v-slot:label>
                <div class="row items-center no-wrap">
                  <q-icon left name="account_circle" />
                  <div class="text-center" style="font-size: 20px">
                    {{ GStore.currentUser.firstname }}
                  </div>
                </div>
              </template>

              <q-list>
                <a @click="logout">
                  <q-item clickable v-close-popup>
                    <q-item-section avatar>
                      <q-avatar
                        icon="logout"
                        color="negative"
                        text-color="white"
                      />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label style="font-size: 18px"
                        >Logout</q-item-label
                      >
                    </q-item-section>
                  </q-item>
                </a>
              </q-list>
            </q-btn-dropdown>
          </q-toolbar>
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
import AuthService from "./services/AuthService.js";

export default {
  inject: ["GStore"], // <----
  computed: {
    currentUser() {
      return localStorage.getItem("user");
    },
    isAdmin() {
      return AuthService.hasRoles("ROLE_ADMIN");
    },
    isDoctor() {
      return AuthService.hasRoles("ROLE_DOCTOR");
    },
    isUser() {
      return AuthService.hasRoles("ROLE_USER");
    },
  },
  methods: {
    logout() {
      AuthService.logout();
      this.$router.push("/login"); //fix from .go to .push for redirect to login page
    },
  },
  mounted() {
    if (!this.GStore.currentUser) {
      this.$router.push("/login");
    } else if (this.isAdmin) {
      this.$router.push({ name: "AdminList" });
    } else if (this.isUser) {
      this.$router.push({
        name: "PersonDetails",
        params: { id: this.GStore.currentUser.id },
      });
    }
  },
};
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