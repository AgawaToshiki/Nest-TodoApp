import { IsNotEmpty, IsString } from "class-validator";

export class TaskDTO {
    @IsNotEmpty()
    @IsString()
    title: string;
    
    @IsString()
    @IsNotEmpty()
    deadline: string;
}