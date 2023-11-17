import { IsNotEmpty, IsString } from "class-validator";

export class SignInDTO {

  @IsNotEmpty({ message: '名前は必須です。' })
  @IsString()
  username: string;
  
  @IsNotEmpty({ message: 'パスワードは必須です。' })
  @IsString()
  password: string;
}