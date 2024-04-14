import axios, { AxiosError, AxiosInstance, HttpStatusCode, InternalAxiosRequestConfig } from 'axios'
import { toast } from 'react-toastify'
import { URL_LOGIN, URL_LOGOUT, URL_REFRESH_TOKEN, URL_REGISTER } from 'src/apis/auth.api'
import { AuthResponse, RefreshTokenRespone } from 'src/types/auth.type'
import { ErrorResponse } from 'src/types/utils.type'
import {User} from 'src/types/user.type'
import {
  clearLS,
  getAccessTokenFromLS,
  getRefreshTokenFromLS,
  setAccessTokenToLS,
  setRefreshTokenToLS,
  getProfileFromLS,
  setProfileToLS,
  setIdToLS,
  getIdFromLS,
  getEmailFromLS,
  getPhoneFromLS,
  setEmailToLS,
  setPhoneToLS,
} from './auth'
import { isAxiosExpiredTokenError, isAxiosUnauthorizedError } from './utils'
export class Http {
  instance: AxiosInstance
  private accessToken: string
  private refreshToken: string

  private email: string
  private phone: string
  private id: string

  private user : User
  private refreshTokenRequest: Promise<any> | null = null
  constructor() {
    // why do we need to use this.accessToken = getAccessTokenFromLS() here?
    // because when getdata from localstorage(hard drive) ALWAYS SLOWER than get accessToken from (Ram)
    this.accessToken = getAccessTokenFromLS()
    this.refreshToken = getRefreshTokenFromLS()
    this.email = getEmailFromLS()
    this.phone = getPhoneFromLS()
    this.id = getIdFromLS()
    this.user = getProfileFromLS()
    this.instance = axios.create({
      baseURL: 'http://localhost:8222/', //https://api-ecom.duthanhduoc.com/
      headers: {
        'Content-Type': 'application/json'
        // 'expire-access-token': 10,
        // 'expire-refresh-token': 25
      }
    })
    // Add a request interceptor
    console.log('this.accessToken', this.accessToken)
    this.instance.interceptors.request.use(
      (config) => {
        if (this.accessToken && config.headers) {
          config.headers.authorization = "Bearer " +  this.accessToken
          return config
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )
    // Add a response interceptor
    this.instance.interceptors.response.use(
      (response) => {
        const { url } = response.config

        if (url?.includes(URL_LOGIN) || url?.includes(URL_REGISTER)) {
          console.log('response', response)
          const dataResponse = response.data as AuthResponse
          console.log('dataResponse', dataResponse)
          this.accessToken = dataResponse.access_token
          this.refreshToken = dataResponse.refresh_token
          this.email = dataResponse.email
          this.phone = dataResponse.phone
          this.id = dataResponse.id
          setAccessTokenToLS(this.accessToken)
          setRefreshTokenToLS(this.refreshToken)
          setIdToLS(this.id)
          setEmailToLS(this.email)
          setPhoneToLS(this.phone)

          this.user = {
            id: this.id,
            role: dataResponse.role, // Bạn có thể định nghĩa role ở đây nếu có thông tin từ dataResponse
            email: this.email,
            phone: this.phone,
            address: dataResponse.address
          }
          setProfileToLS(this.user)

        } else if (url?.includes(URL_LOGOUT)) {
          console.log('did logout')
          this.accessToken = ''
          this.refreshToken = ''
          this.id = ''
          this.email = ''
          this.phone = ''
          clearLS()
        }
        return response
      },
      (error: AxiosError) => {
        // Chỉ toast lỗi không phải 422 và 401
        if (
          ![HttpStatusCode.UnprocessableEntity, HttpStatusCode.Unauthorized].includes(error.response?.status as number)
        ) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const data: any | undefined = error.response?.data
          const message = data?.message || error.message
          toast.error(message)
        }

        // Lỗi Unauthorized (401) có rất nhiều trường hợp
        // - Token không đúng
        // - Không truyền token
        // - Token hết hạn*

        // Nếu là lỗi 401
        if (isAxiosUnauthorizedError<ErrorResponse<{ name: string; message: string }>>(error)) {
          const config = error.response?.config as InternalAxiosRequestConfig | undefined
          const url = config?.url || ''
          // Trường hợp Token hết hạn và request đó không phải là của request refresh token
          // thì chúng ta mới tiến hành gọi refresh token
          if (isAxiosExpiredTokenError(error) && url !== URL_REFRESH_TOKEN) {
            // Hạn chế gọi 2 lần handleRefreshToken
            this.refreshTokenRequest = this.refreshTokenRequest
              ? this.refreshTokenRequest
              : this.handleRefreshToken().finally(() => {
                  //  Giữ refreshTokenRequest trong 10s cho những request tiếp theo nếu có 401 thì dùng
                  setTimeout(() => {
                    this.refreshTokenRequest = null
                  }, 10000)
                })
            return this.refreshTokenRequest.then((access_token) => {
              // Nghĩa là chúng ta tiếp tục gọi lại request cũ vừa bị lỗi
              return this.instance({ ...config, headers: { ...config?.headers, authorization: access_token } })
            })
          }

          // Còn những trường hợp như token không đúng
          // không truyền token,
          // token hết hạn nhưng gọi refresh token bị fail
          // thì tiến hành xóa local storage và toast message

          clearLS()
          this.accessToken = ''
          this.refreshToken = ''
          toast.error(error.response?.data.data?.message || error.response?.data.message)
          // window.location.reload()
        }
        return Promise.reject(error)
      }
    )
  }
  private handleRefreshToken = async () => {
    return this.instance
      .post<RefreshTokenRespone>(URL_REFRESH_TOKEN, {
        refresh_token: this.refreshToken
      })
      .then((response) => {
        const access_token = response.data.data.access_token
        setAccessTokenToLS(access_token)
        this.accessToken = access_token
        return access_token
      })
      .catch((error) => {
        clearLS()
        this.accessToken = ''
        this.refreshToken = ''
        throw error
      })
  }
}

const http = new Http().instance
export default http
