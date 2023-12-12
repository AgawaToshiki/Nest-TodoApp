import { IsNotEmpty, IsString, MinLength, IsAlphanumeric } from "class-validator";

export class UserDTO {

    @IsNotEmpty()
    @IsString()
    @IsAlphanumeric()
    username: string;
    
    @IsNotEmpty()
    @IsString()
    @IsAlphanumeric()
    @MinLength(8, {message: "パスワードは8文字以上が必須です。"})
    password: string;
}