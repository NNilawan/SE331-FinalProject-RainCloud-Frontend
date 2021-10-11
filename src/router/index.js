import { createRouter, createWebHistory } from "vue-router";
import PersonList from '../views/PersonList.vue'
import Layout from '../views/Person/Layout.vue'
import PersonDetails from '../views/Person/PersonDetails.vue'
import VaccineDetails from '../views/Person/VaccineDetails.vue'
import DoctorDetails from '../views/Person/DoctorDetails.vue'
import NProgress from 'nprogress'
import NotFound from '@/views/NotFound.vue'
import NetWorkError from '@/views/NetworkError.vue'
import PersonService from '@/services/PersonService.js'
import GStore from '@/store'

const routes = [{
  path: '/',
  name: 'PersonList',
  component: PersonList,
  props: (route) => ({ page: parseInt(route.query.page) || 1 })
},
{
  path: "/about",
  name: "About",
  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  component: () =>
    import( /* webpackChunkName: "about" */ "../views/About.vue"),
},
{
  path: "/datas/:id",
  name: "Layout",
  props: true,
  component: Layout,
  beforeEnter: (to) => {
    return PersonService.getPerson(to.params.id)
      .then((response) => {
        GStore.event = response.data // <--- Store the event
      })
      .catch((error) => {
        if (error.response && error.response.status == 404) {
          return {
            name: '404Resource',
            params: { resource: 'person' }
          }
        } else {
          return { name: 'NetworkError' }
        }
      })
  },
  children: [
    {
      path: '',
      name: "PersonDetails",
      component: PersonDetails,
    },
    {
      path: '/datas/:id/vaccine-details',
      name: 'VaccineDetails',
      props: true,
      component: VaccineDetails
    },
    {
      path: '/datas/:id/doctor-recommendation',
      name: 'DoctorDetails',
      props: true,
      component: DoctorDetails
    }
  ]
},
{
  path: '/404/:resource',
  name: '404Resource',
  component: NotFound,
  props: true
},
{
  path: '/:catchAll(.*)',
  name: 'NotFound',
  component: NotFound
},
{
  path: '/network-error',
  name: 'NetworkError',
  component: NetWorkError
}

];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})
router.beforeEach(() => {
  NProgress.start()
})

router.afterEach(() => {
  NProgress.done()
});

export default router;
