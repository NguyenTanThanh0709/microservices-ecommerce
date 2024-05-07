const path = {
  home: '/',
  user: '/user',
  profile: '/user/profile',
  changePassword: '/user/password',
  historyPurchase: '/user/purchase',
  login: '/login',
  register: '/register',
  logout: '/logout',
  productDetail: ':nameId',
  cart: '/cart',
  Payment:'/payment',
  PaymentResult :'/payment-result',





  adminhome:'/admin-home/:status',
  pageShop:'/admin-shop',
  pageFormPromotion:'/admin-promiton/:promotionId',
  pageListPromotion:'/admin-list-promotion',
  RegisterShop : '/admin-shop-register'
} as const

export default path
