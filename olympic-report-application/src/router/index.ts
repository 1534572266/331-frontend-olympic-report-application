import { createRouter, createWebHistory } from 'vue-router'
import CountryListView from '@/views/CountryListView.vue'
import AboutView from '@/views/AboutView.vue'
import CountryDetailView from '@/views/country/DetailView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import NetworkErrorView from '@/views/NetworkErrorView.vue'
import nProgress from 'nprogress'
import CountryService from '@/services/CountryService'
import { useCountryStore } from '@/stores/country'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'country-list-view',
      component: CountryListView,
      props: route => ({ page: parseInt(route.query.page?.toString() || '1'), size: parseInt(route.query.size?.toString() || '5') }),
    },
    {
      path: '/country/:id',
      name: 'country-detail-view',
      component: CountryDetailView,
      props: true,
      beforeEnter: to => {
        const id = parseInt(to.params.id as string)
        const countryStore = useCountryStore()
        return CountryService.getCountry(id)
          .then(response => {
            countryStore.setCurrentCountry(response.data.country)
          })
          .catch(error => {
            if (error.response && error.response.status === 404) {
              return { name: 'not-found' }
            } else {
              return { name: 'network-error-view' }
            }
          })
      },
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
    },
    {
      path: '/404/:resource',
      name: 'not-found-resource',
      component: NotFoundView,
      props: true,
    },
    {
      path: '/network-error',
      name: 'network-error-view',
      component: NetworkErrorView,
    },
    {
      path: '/:catchAll(.*)',
      name: 'not-found',
      component: NotFoundView,
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
})

router.beforeEach(() => {
  nProgress.start()
})

router.afterEach(() => {
  nProgress.done()
})

export default router
