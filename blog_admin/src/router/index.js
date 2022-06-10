import { lazy, Suspense } from 'react'
import { Navigate } from 'react-router-dom'
import LayoutAdmin from '../layouts/layout'

const Login = lazy(() => import('../pages/Login'))
const Home = lazy(() => import('../pages/Home'))
const Blog = lazy(() => import('../pages/Blog'))
const BlogType = lazy(() => import('../pages/BlogType'))
const BlogTag = lazy(() => import('../pages/BlogTag'))

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
      { index: true, element:  <Navigate to="/home" /> },
      { path: "home", element: lazyLoad(<Home />) },
      { path: "blog", element: lazyLoad(<Blog />) },
      { path: "blogtype", element: lazyLoad(<BlogType />)},
      { path: "blogtag", element: lazyLoad(<BlogTag />)},
      // { path: "blog/detail/:id", element: lazyLoad(<BlogDetail />) },
    ]
  },
  { path: "*", element: <Navigate to="/login" /> }
]

export default router

