import { IsNotEmpty, IsString } from "class-validator";

export class UserDTO {

    @IsNotEmpty({ message: 'ユーザー名は必須です。' })
    @IsString()
    username: string;
    
    @IsNotEmpty({ message: 'パスワードは必須です。' })
    @IsString()
    password: string;
}