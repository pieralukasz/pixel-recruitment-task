import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
// import Window from '../components/Window.vue'
import AddNew from '../components/NewPatient.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: true},
    children: [
      {
        path: 'add-new',
        name: 'AddNew',
        component: AddNew
      }
    ]

  },
  {
    path: '/login',
    name: 'login',
    component: Login
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {

  const loggedIn = localStorage.getItem('doctor')

  if(to.matched.some(record => record.meta.requiresAuth) && !loggedIn) next('/login')

  next()
  
})

export default router
