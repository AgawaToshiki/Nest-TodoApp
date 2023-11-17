import { IsNotEmpty, IsString } from "class-validator";

export class TaskDTO {

    @IsNotEmpty({ message: 'タイトルは必須です。' })
    @IsString()
    title: string;
    
    @IsNotEmpty({ message: '期限は必須です。' })
    @IsString()
    deadline: string;
}