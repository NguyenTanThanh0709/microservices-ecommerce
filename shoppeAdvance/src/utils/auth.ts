import { User } from 'src/types/user.type'

export const localStorageEventTarget = new EventTarget()

export const setAccessTokenToLS = (accessToken: string) => {
  localStorage.setItem('accessToken', accessToken)
}
export const setRefreshTokenToLS = (refreshToken: string) => {
  localStorage.setItem('refreshToken', refreshToken)
}
export const setEmailToLS = (email: string) => {
  localStorage.setItem('email', email)
}
export const setPhoneToLS = (phone: string) => {
  localStorage.setItem('phone', phone)
}

export const setIdToLS = (phone: string) => {
  localStorage.setItem('id', phone)
}

export const clearLS = () => {
  localStorage.removeItem('accessToken')
  localStorage.removeItem('refreshToken')
  localStorage.removeItem('email')
  localStorage.removeItem('phone')
  localStorage.removeItem('id')
  localStorage.removeItem('profile')
  const clearLSEvent = new Event('clearLS')
  localStorageEventTarget.dispatchEvent(clearLSEvent)
}

export const getAccessTokenFromLS = () => {
  return localStorage.getItem('accessToken') || ''
}
export const getRefreshTokenFromLS = () => {
  return localStorage.getItem('refreshToken') || ''
}

export const getEmailFromLS = () => {
  return localStorage.getItem('email') || ''
}
export const getPhoneFromLS = () => {
  return localStorage.getItem('phone') || ''
}

export const getIdFromLS = () => {
  return localStorage.getItem('id') || ''
}

export const getProfileFromLS = () => {
  const result = localStorage.getItem('profile')
  // because result is json, so we need to parse it to object
  return result ? JSON.parse(result) : null
}

export const setProfileToLS = (profile: User) => {
  // because profile is object, so we need to converts a js value stringify it to json
  localStorage.setItem('profile', JSON.stringify(profile))
}
