import { lazy, Suspense } from 'react'
import LayoutAdmin from '../layouts/layout'

const Home = lazy(() => import('../pages/Home'))
const Blog = lazy(() => import('../pages/Blog'))

const lazyLoad = (children) => {
  return  (<Suspense fallback={<></>}>
            {children}
          </Suspense>)
}


const router = [
  {
    path: "/",
    element: <LayoutAdmin />,
    children: [
      { index: true, element: lazyLoad(<Home />) },
      { path: "blog", element: lazyLoad(<Blog />) },
      // { path: "blog/detail/:id", element: lazyLoad(<BlogDetail />) },
    ]
  },
  // { path: "/login", element: <AboutPage /> }
]

export default router

