import { lazy, useContext } from 'react'
import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import path from 'src/constants/path'
import { AppContext } from './contexts/app.context'
import CartLayout from './layouts/CartLayout'
import MainLayout from './layouts/MainLayout'
import RegisterLayout from './layouts/RegisterLayout'
import UserLayout from './pages/User/layouts/UserLayout'
import ShopInfo from './pages/ShopInfo'
import Promotion from './pages/SellerPage/Promotion/Promotion'
import PromotionList from './pages/SellerPage/Promotion/PromotionList'
import Payment from './pages/Payment'
import PaymentResult from './pages/PaymentResult'
import Register_ from './pages/Register copy'

const Login = lazy(() => import('./pages/Login'))
const ProductList = lazy(() => import('./pages/ProductList'))
const Profile = lazy(() => import('./pages/User/pages/Profile'))
const Register = lazy(() => import('./pages/Register'))
const ProductDetail = lazy(() => import('./pages/ProductDetail'))
const Cart = lazy(() => import('./pages/Cart'))
const ChangePassword = lazy(() => import('./pages/User/pages/ChangePassword'))
const HistoryPurchase = lazy(() => import('./pages/User/pages/HistoryPurchase'))
const NotFound = lazy(() => import('./pages/NotFound'))
const Home = lazy(() => import('./pages/SellerPage/Home/Home'))


function ProtectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  return isAuthenticated ? <Outlet /> : <Navigate to='/login' />
}

function RejectedRoute() {
  const { isAuthenticated } = useContext(AppContext)

  return !isAuthenticated ? <Outlet /> : <Navigate to='/' />
}

export default function useRouteElements() {
  const routeElements = useRoutes([
    {
      path: '',
      element: <RejectedRoute />,
      children: [
        {
          path: path.login,
          element: (
            <RegisterLayout>
              <Login />
            </RegisterLayout>
          )
        },
        {
          path: path.register,
          element: (
            <RegisterLayout>
              <Register />
            </RegisterLayout>
          )
        }
      ]
    },
    {
      path: '',
      element: <ProtectedRoute />,
      children: [
        {
          path: path.cart,
          element: (
            <CartLayout>
              <Cart />
            </CartLayout>
          )
        },
        {
          path: path.Payment,
          element: (
            <CartLayout>
              <Payment />
            </CartLayout>
          )
        },
        {
          path: path.user,
          element: (
            <MainLayout>
              <UserLayout />
            </MainLayout>
          ),
          children: [
            {
              path: path.profile,
              element: <Profile />
            },
            {
              path: path.changePassword,
              element: <ChangePassword />
            },
            {
              path: path.historyPurchase,
              element: <HistoryPurchase />
            },

          ]
        }
        ,
        {
          path: path.RegisterShop,
          element: (
            <RegisterLayout>
              < Register_/>
            </RegisterLayout>
          )
        }
      ]
    },
    {
      path: path.productDetail,
      element: (
        <MainLayout>
          <ProductDetail />
        </MainLayout>
      )
    },
    {
      path: path.PaymentResult,
      element: (
        <MainLayout>
          <PaymentResult />
        </MainLayout>
      )
    },
    {
      path: '',
      index: true,
      element: (
        <MainLayout>
          <ProductList />
        </MainLayout>
      )
    },
    {
      path: '*',
      element: (
        <MainLayout>
          <NotFound />
        </MainLayout>
      ),
    },
    {
        path: path.adminhome,
        element: <Home />
    },
    {
      path: path.pageShop,
      element: (
        <MainLayout>
          <ShopInfo />
        </MainLayout>
      )
    },
    {
      path: path.pageFormPromotion,
      element: (
          <Promotion />
      )
    },
    {
      path: path.pageListPromotion,
      element: (
          <PromotionList />
      )
    },
  ])
  return routeElements
}
