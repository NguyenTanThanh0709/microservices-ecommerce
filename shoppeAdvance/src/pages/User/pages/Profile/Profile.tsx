import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Fragment, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { Controller, FormProvider, useForm, useFormContext } from 'react-hook-form'
import Input from 'src/components/Input'

import InputNumber from 'src/components/InputNumber'
import { AppContext } from 'src/contexts/app.context'

import axios, { AxiosResponse } from 'axios';

import userApi from 'src/apis/user.api'
import InputFile from 'src/components/InputFile'
import { UserSchema, userSchema } from 'src/utils/rules'
import { getAvatarUrl, isAxiosUnprocessableEntityError } from 'src/utils/utils'
import DateSelect from '../../components/DateSelect'
import {updateuser} from 'src/constants/contant'

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


function Info() {
  const {
    register,
    control,
    formState: { errors }
  } = useFormContext<FormData>()

  
  

  return (
    <Fragment>
      <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
        <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>Số điện thoại</div>
        <div className='sm:w-[80%] sm:pl-5'>
          <Controller
            control={control}
            name='phoneNumber'
            render={({ field }) => (
              <InputNumber
                classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
                placeholder='Số điện thoại'
                errorMessage={errors.phoneNumber?.message}
                {...field}
                onChange={field.onChange}
              />
            )}
          />
        </div>
      </div>
      
    </Fragment>
  )
}

type FormData = Pick<UserSchema, 'name' | 'address' | 'phoneNumber' | 'date_of_birth' | 'avatar'>

// note: because type of date_of_birth is Date, so we need to convert it to string
type FormDataError = Omit<FormData, 'date_of_birth'> & {
  date_of_birth?: string
}
const profileSchema = userSchema.pick(['name', 'address',  'date_of_birth', 'avatar'])

// Flow 1:
// Nhấn upload: upload lên server luôn => server trả về url ảnh
// Nhấn submit thì gửi url ảnh cộng với data lên server

// Flow 2:
// Nhấn upload: không upload lên server
// Nhấn submit thì tiến hành upload lên server, nếu upload thành công thì tiến hành gọi api updateProfile

export default function Profile() {
  const { setProfile } = useContext(AppContext)
  const [file, setFile] = useState<File>()

  const previewImage = useMemo(() => {
    return file ? URL.createObjectURL(file) : ''
  }, [file])

  const id = localStorage.getItem('id');
  const userId = id !== null ? parseInt(id) : 0;
  const { data: profileData, refetch } = useQuery({
    queryFn:  () =>  userApi.getProfile(userId)
  })
  const profile = profileData?.data.data
  const methods = useForm<FormData>({
    defaultValues: {
      phoneNumber: '',
      address: '',
    },
    resolver: yupResolver(profileSchema)
  })
  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
    setError
  } = methods

  const avatar = watch('avatar')

  useEffect(() => {
    if (profile) {
      setValue('phoneNumber', profile.phone)
      setValue('address', profile.address)
    }
  }, [profile, setValue])

  // const onSubmit = handleSubmit(async (data) => {
  //   try {
  //     let avatarName = avatar
  //     if (file) {
  //       const form = new FormData()
  //       form.append('image', file)
  //       const uploadRes = await uploadAvatarMutaion.mutateAsync(form)
  //       avatarName = uploadRes.data.data
  //       setValue('avatar', avatarName)
  //     }
  //     const res = await updateProfileMutation.mutateAsync({
  //       ...data
  //     })
  //     setProfile(res.data.data)
  //     setProfileToLS(res.data.data)
  //     refetch()
  //     toast.success(res.data.message)
  //   } catch (error) {
  //     console.log(error)
  //     if (isAxiosUnprocessableEntityError<ErrorResponse<FormDataError>>(error)) {
  //       const formError = error.response?.data.data
  //       if (formError) {
  //         Object.keys(formError).forEach((key) => {
  //           setError(key as keyof FormData, { message: formError[key as keyof FormData], type: 'Server' })
  //         })
  //       }
  //     }
  //   }
  // })

  const handleChangeFile = (file?: File | undefined) => {
    setFile(file)
  }

  const [cities, setCities] = useState<City[]>([]);
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [districts, setDistricts] = useState<District[]>([]);
  const [selectedDistrict, setSelectedDistrict] = useState<string>('');
  const [wards, setWards] = useState<Ward[]>([]);
  const [selectedWard, setSelectedWard] = useState<string>('');
  const [specificAddress, setSpecificAddress] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get<City[]>('https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json');
      setCities(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

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


  const submitupdate =  () => {
    const phoneNumber = watch('phoneNumber');
    console.log(phoneNumber)
    const city = cities.find(city => city.Id == selectedCity);
    const district = districts.find(city => city.Id == selectedDistrict);
    const ward = wards.find(city => city.Id == selectedWard);


    const formattedAddress = [specificAddress, city?.Name, district?.Name, ward?.Name].filter(Boolean).join('-');
    console.log(formattedAddress);

  updateUser({
    phoneNumber:phoneNumber,
    address: formattedAddress
  });
    
  };

  const updateUser = async ( infoUpdate: updateuser): Promise<string> => {
    try {
      const token = localStorage.getItem('accessToken');
    const userId = localStorage.getItem('id');
    if (!token || !userId) {
      throw new Error('Access token or user ID not found in localStorage');
    }
      if (!token) {
        throw new Error('Access token not found');
      }
  
      const response: AxiosResponse<string> = await axios.patch(
        `http://localhost:8222/api/v1/users/update-user/${userId}`,
        infoUpdate,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
  
      if (response.status === 200) {
        alert("Update thành công")  
        return response.data; // Success message from the server
      } else {
        throw new Error('Failed to update user');
      }
    } catch (error) {
      console.error('Error updating user:', error);
      
      throw new Error('Failed to update user');
    }
  };
  
  
  return (
    <div className='rounded-sm bg-white px-2 pb-10 shadow md:px-7 md:pb-20'>
      <div className='border-b border-b-gray-200 py-6'>
        <h1 className='text-lg font-medium capitalize text-gray-900'>Hồ Sơ Của Tôi</h1>
        <div className='mt-1 text-sm text-gray-700'>Quản lý thông tin hồ sơ để bảo mật tài khoản</div>
      </div>
      <FormProvider {...methods}>
      {/* onSubmit={onSubmit} */}
        <div className='mt-8 flex flex-col-reverse md:flex-row md:items-start' > 
          <div className='mt-6 flex-grow md:mt-0 md:pr-12'>
            <div className='flex flex-col flex-wrap sm:flex-row'>
              <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>Email</div>
              <div className='sm:w-[80%] sm:pl-5'>
                <div className='pt-3 text-gray-700'>{profile?.email}</div>
              </div>
            </div>
            <Info />
            <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
              <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>Địa chỉ</div>
              <div className='sm:w-[80%] sm:pl-5'>
                <Input
                  classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
                  register={register}
                  name='address'
                  disabled={true}
                  placeholder='Địa chỉ'
                  errorMessage={errors.address?.message}
                />
              </div>
            </div>
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
            <Controller
              control={control}
              name='date_of_birth'
              render={({ field }) => (
                <DateSelect
                  errorMessage={errors.date_of_birth?.message}
                  value={field.value}
                  onChange={(date) => field.onChange(date)}
                />
              )}
            />
            <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
              <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right' />
              <div className='sm:w-[80%] sm:pl-5'>
                <button
                  onClick={submitupdate}
                  className='flex h-9 items-center  rounded-sm bg-orange px-5 text-center text-sm text-white hover:bg-orange/80'                >
                  Lưu
                </button>
              </div>
            </div>
          </div>
          <div className='flex justify-center md:w-72 md:border-l md:border-l-gray-200'>
            <div className='flex flex-col items-center'>
              <div className='my-5 h-24 w-24'>
                <img
                  src={file ? previewImage : getAvatarUrl(avatar)}
                  alt='avatar'
                  className='h-full w-full rounded-full object-cover'
                />
              </div>
              <InputFile onChange={handleChangeFile} />

              <div className='mt-3 text-gray-400'>
                <div>Dụng lượng file tối đa 1 MB</div>
                <div>Định dạng:.JPEG, .PNG</div>
              </div>
            </div>
          </div>
        </div>
      </FormProvider>
    </div>
  )
}
