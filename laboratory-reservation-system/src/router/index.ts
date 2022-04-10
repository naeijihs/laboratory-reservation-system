import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import LCRUD from '../views/LCRUD.vue'
import TCRUD from '../views/TCRUD.vue'
import reservation from '../views/Reservation.vue'
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "LCRUD",
    component: LCRUD
  },
  {
    path: "/TCRUD",
    name: "TCRUD",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: TCRUD,
  },
  {
    props:true,
    path: "/reservation/:cid/:cstudent",
    name: "reservation",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: reservation,
    children:[
      {
        props:true,
        path:'/schedule/:labID/:cid',
        component:()=>import('../views/Schedule.vue')
      }
    ]
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
