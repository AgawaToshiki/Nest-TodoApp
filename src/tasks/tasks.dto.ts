import { IsNotEmpty, IsString } from "class-validator";

export class CreateTaskDTO {
    @IsNotEmpty()
    @IsString()
    title: string;
    
    @IsString()
    @IsNotEmpty()
    deadline: string;
}