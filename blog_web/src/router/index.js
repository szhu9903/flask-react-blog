import { lazy, Suspense } from 'react'
import LayoutBlog from '../layouts/layout'
const Home = lazy(() => import('../pages/Home'))
const Blog = lazy(() => import('../pages/Blog'))
const BlogDetail = lazy(() => import('../pages/BlogDetail'))
const OauthCallback = lazy(() => import('../pages/OauthCallback'))

const lazyLoad = (children) => {
  return  (<Suspense fallback={<></>}>
            {children}
          </Suspense>)
}


const router = [
  {
    path: "/",
    element: <LayoutBlog />,
    children: [
      { index: true, element: lazyLoad(<Home />) },
      { path: "blog", element: lazyLoad(<Blog />) },
      { path: "blog/detail/:id", element: lazyLoad(<BlogDetail />) },
    ]
  },
  // { path: "/login", element: <AboutPage /> }
  { path: "/oauth", element: lazyLoad(<OauthCallback />) },
]

export default router

