import Movie from './components/comment.vue';
import Home from './components/Project.vue';
import VueRouter from 'vue-router'


export const routes = [
  { path: '', name: 'home', component: Home },
  {
    path: '/movie/:movieId', name: 'overview', component: Movie,  
  },
  // { path: '*', redirect: '/404' }
]
export default new VueRouter({ mode: 'history', routes })
