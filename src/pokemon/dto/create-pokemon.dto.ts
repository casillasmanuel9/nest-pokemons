import { IsInt, IsPositive, IsString, Min, MinLength } from "class-validator";

export class CreatePokemonDto {
    // Entero, Positivo, Minimo 1
    @IsInt()
    @Min(1)
    @IsPositive()
    no: number;
    // String, minlength 1, 
    @IsString()
    @MinLength(1)
    name: string;
}
