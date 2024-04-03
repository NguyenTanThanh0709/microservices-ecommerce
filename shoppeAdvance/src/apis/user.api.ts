import { User } from 'src/types/user.type'
import { SuccessResponse } from 'src/types/utils.type'
import http from 'src/utils/http'

interface BodyUpdateProfile extends Omit<User, '_id' | 'roles' | 'email'> {
  password?: string
  newPassword?: string
}

interface paramIduser {
  iduser: number;
}

const userApi = {
  getProfile(iduser: number) {
    const params: paramIduser = { iduser: iduser };
    return http.get<SuccessResponse<User>>('api/v1/users/get-id',{ 
      params,
    });
  },
}

export default userApi
