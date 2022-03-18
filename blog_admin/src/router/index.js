import { lazy, Suspense } from 'react'
import LayoutAdmin from '../layouts/layout'

const Login = lazy(() => import('../pages/Login'))
const Home = lazy(() => import('../pages/Home'))
const Blog = lazy(() => import('../pages/Blog'))

const lazyLoad = (children) => {
  return  (<Suspense fallback={<></>}>
            {children}
          </Suspense>)
}


const router = [
  { path: "/login", element: lazyLoad(<Login />) },
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

