import type { RegisterOptions, UseFormGetValues } from 'react-hook-form'

import * as yup from 'yup'

type Rules = {
  [key in 'email' | 'password' | 'confirm_password']?: RegisterOptions
}


function testPriceMinMax(this: yup.TestContext<yup.AnyObject>) {
  const { price_max, price_min } = this.parent as { price_min: string; price_max: string }
  if (price_min !== '' && price_max !== '') {
    return Number(price_max) >= Number(price_min)
  }
  return price_min !== '' || price_max !== ''
}
export const AuthSchema = yup.object({
  email: yup
    .string()
    .required('Email does not exist')
    .email('Email does not correct format')
    .min(5, 'Email must have at least 5 characters')
    .max(160, 'Email must have at most 160 characters'),
  password: yup
    .string()
    // .matches(
    //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
    //   'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
    // )
    .required('Password does not exist')
    .min(6, 'Password must have at least 6 characters')
    .max(20, 'Password must have at most 20 characters'),
  confirm_password: yup
    .string()
    .required('Must have confirm password')
    .min(6, 'Password must have at least 6 characters')
    .max(20, 'Password must have at most 20 characters')
    .oneOf([yup.ref('password')], 'Passwords must match'),
    phoneNumber: yup
    .string()
    .required('Must have confirm phoneNumber')
    .min(6, 'phoneNumber must have at least 6 characters')
    .max(20, 'phoneNumber must have at most 20 characters'),
  price_min: yup.string().test({
    name: 'price-not-allowed',
    message: 'Price min must be less than price max',
    test: testPriceMinMax
  }),
  price_max: yup.string().test({
    name: 'price-not-allowed',
    message: 'Price max must be greater than price min',
    test: testPriceMinMax
  }),
  term_of_use: yup.boolean().oneOf([true], 'You must accept the terms and conditions'),
  role: yup
    .string()
    .default('customer'),

})
export const schemaSearch = yup.object({
  name: yup.string().trim().required('Name does not exist')
})
// export type SchemaCommon = yup.InferType<typeof schemaCommon>
export type IAuthSchema = yup.InferType<typeof AuthSchema>
// example if want to use yup with schema fields
// export const loginSchema = schema.omit(['confirm_password'])
// export type ILoginSchema = yup.InferType<typeof loginSchema>
const handleConfirmPasswordYup = (refString: string) => {
  return yup
    .string()
    .required('Nhập lại password là bắt buộc')
    .min(6, 'Độ dài từ 6 - 160 ký tự')
    .max(160, 'Độ dài từ 6 - 160 ký tự')
    .oneOf([yup.ref(refString)], 'Nhập lại password không khớp')
}
export const userSchema = yup.object({
  name: yup.string().max(160, 'Độ dài tối đa là 160 ký tự'),
  phoneNumber: yup.string().max(20, 'Độ dài tối đa là 20 ký tự'),
  address: yup.string().max(160, 'Độ dài tối đa là 160 ký tự'),
  avatar: yup.string().max(1000, 'Độ dài tối đa là 1000 ký tự'),
  date_of_birth: yup.date().max(new Date(), 'Hãy chọn một ngày trong quá khứ'),
  password: AuthSchema.fields['password'] as yup.StringSchema<string | undefined, yup.AnyObject, undefined, ''>,
  new_password: AuthSchema.fields['password'] as yup.StringSchema<string | undefined, yup.AnyObject, undefined, ''>,
  confirm_password: handleConfirmPasswordYup('new_password')
})

export type UserSchema = yup.InferType<typeof userSchema>
export type TSchemaSearch = yup.InferType<typeof schemaSearch>
