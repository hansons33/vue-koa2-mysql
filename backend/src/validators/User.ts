import { Length } from "class-validator";
import {IsSameValue} from './CustomValidationDecorators'

class UserBody {
    @Length(1,20, {
        message: '用户名不能为空或者大于20个字符'
    })
    username: string;
    @Length(1,32, {
        message: '密码不能为空或者大于32个字符'
    })
    password: string;
}
export class RegisterBody extends UserBody{
    @IsSameValue('password', {
        message: '两次输入密码不一致'
    })
    rePassword: string;
}

export class LoginBody extends UserBody{}