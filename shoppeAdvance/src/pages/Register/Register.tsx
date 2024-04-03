import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import authApi from 'src/apis/auth.api'
import Input from 'src/components/Input'
import omit from 'lodash/omit'
import { IAuthSchema, AuthSchema } from 'src/utils/rules'
import { isAxiosUnprocessableEntityError } from 'src/utils/utils'
import { SuccessResponse } from 'src/types/utils.type'
import { useContext } from 'react'
import { AppContext } from 'src/contexts/app.context'
import Button from 'src/components/Button'

type City = {
  Id: string;
  Name: string;
  Districts: District[];
}

type District = {
  Id: string;
  Name: string;
  Wards: Ward[];
}

type Ward = {
  Id: string;
  Name: string;
}

type FormData = Pick<IAuthSchema, 'email' | 'phoneNumber' | 'password' | 'confirm_password' | 'role' | 'term_of_use'>

export const registerSchema = AuthSchema.pick(['email','phoneNumber',  'password', 'confirm_password', 'term_of_use', 'role'])
export default function Register() {
  const {
    handleSubmit,
    register,
    setError,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(registerSchema)
  })
  const { setIsAuthenticated, setProfile } = useContext(AppContext)
  const navigate = useNavigate()

  // registerMutations
  const registerAccountMutation = useMutation({
    mutationFn: (body: Omit<IAuthSchema, 'confirm_password'>) => {
      return authApi.registerAccount(body)
    }
  })
  // handle submit
  const onSubmit = handleSubmit((data) => {
    console.log('errors', errors)
    const body = omit(data, ['confirm_password', 'term_of_use'])
    const address = `${specificAddress}-${selectedWard}-${selectedDistrict}-${selectedCity}`;
    const formDataWithAddress = { ...body, address };
    registerAccountMutation.mutate(formDataWithAddress, {
      onSuccess: (data) => {
        console.log('dataRegister Mutation', data)
        setIsAuthenticated(true)
        setProfile(data.data)
        navigate('/')
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntityError<SuccessResponse<Omit<IAuthSchema, 'confirm_password'>>>(error)) {
          const formError = error.response?.data?.data
 console.log('formError', formError)
          if (formError) {
            Object.keys(formError).forEach((key) => {
              setError(
                key as keyof Omit<FormData, 'confirm_password' | 'term_of_use'>,
                {
                  type: 'Server',
                  message: formError[key as keyof Omit<FormData, 'confirm_password' | 'term_of_use'>]
                },
                { shouldFocus: true }
              )
            })
          }
        } else {
          console.log('error', error)
        }
      }
    })
  })

  const [cities, setCities] = useState<City[]>([]);
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [districts, setDistricts] = useState<District[]>([]);
  const [selectedDistrict, setSelectedDistrict] = useState<string>('');
  const [wards, setWards] = useState<Ward[]>([]);
  const [selectedWard, setSelectedWard] = useState<string>('');
  const [specificAddress, setSpecificAddress] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<City[]>('https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json');
        setCities(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const cityId = e.target.value;
    setSelectedCity(cityId);
    const selectedCityData = cities.find(city => city.Id === cityId);
    if (selectedCityData) {
      setDistricts(selectedCityData.Districts);
      setSelectedDistrict('');
      setWards([]);
      setSelectedWard('');
    }
  };

  const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const districtId = e.target.value;
    setSelectedDistrict(districtId);
    const selectedDistrictData = districts.find(district => district.Id === districtId);
    if (selectedDistrictData) {
      setWards(selectedDistrictData.Wards);
      setSelectedWard('');
    }
  };

  const handleWardChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedWard(e.target.value);
  };


  return (
    <div className='h-[900px] bg-orange'>
      <div className='container bg-shopee bg-contain bg-center bg-no-repeat'>
        <div className='grid grid-cols-1 py-12 lg:h-[470px] lg:grid-cols-5 lg:pr-10'>
          <div className='md:col-span-2 md:col-start-4 md:mx-8'>
            <form className='rounded bg-white p-10 shadow-sm' onSubmit={onSubmit} noValidate>
              <div className='text-2xl'>Register</div>
              <Input
                className='mt-6'
                type='email'
                placeholder='Email'
                name='email'
                register={register}
                errorMessage={errors.email?.message}
              />
              <Input
  className='my-2'
  type='tel' // Sử dụng type 'tel' cho input số điện thoại
  placeholder='Số điện thoại'
  name='phoneNumber' // Tên của trường số điện thoại
  register={register}
  autoComplete='on'
  errorMessage={errors.phoneNumber?.message} // Hiển thị thông báo lỗi nếu có
/>

<div className="flex flex-col items-center space-y-4">
  <select 
    value={selectedCity} 
    onChange={handleCityChange} 
    className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
  >
    <option value="">Chọn tỉnh thành</option>
    {cities.map(city => (
      <option key={city.Id} value={city.Id}>{city.Name}</option>
    ))}
  </select>
  <select 
    value={selectedDistrict} 
    onChange={handleDistrictChange} 
    className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
  >
    <option value="">Chọn quận huyện</option>
    {districts.map(district => (
      <option key={district.Id} value={district.Id}>{district.Name}</option>
    ))}
  </select>
  <select 
    value={selectedWard} 
    onChange={handleWardChange} 
    className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
  >
    <option value="">Chọn phường xã</option>
    {wards.map(ward => (
      <option key={ward.Id} value={ward.Id}>{ward.Name}</option>
    ))}
  </select>
  <input 
    type="text" 
    placeholder="Nhập địa chỉ cụ thể" 
    value={specificAddress} 
    onChange={(e) => setSpecificAddress(e.target.value)} 
    className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
  />
</div>



              <Input
                className='mt-2'
                type='text'
                placeholder='password'
                name='password'
                register={register}
                autoComplete='on'
                errorMessage={errors.password?.message}
              />
              <Input
                className='my-2'
                type='password'
                placeholder='confirm_password'
                name='confirm_password'
                register={register}
                autoComplete='on'
                errorMessage={errors.confirm_password?.message}
              />
              <div>
                <Input
                  classNameInput='inline-block mr-2'
                  className='my-2'
                  type='checkbox'
                  placeholder='Đồng ý với điều khoản'
                  name='term_of_use'
                  register={register}
                  autoComplete='on'
                  errorMessage={errors.term_of_use?.message}
                />
              </div>

              <Button
                isLoading={registerAccountMutation.isLoading}
                disabled={registerAccountMutation.isLoading}
                className='flex w-full justify-center bg-red-500 py-4 px-2 text-sm uppercase text-white hover:bg-red-600'
              >
                Đăng ký
              </Button>
              <div className='mt-8 flex items-center justify-center gap-1 text-center'>
                <span className='text-gray-400'>Do you have an account?</span>
                <Link to='/login' className='text-red-400'>
                  Login
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
