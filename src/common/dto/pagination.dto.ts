import { IsInt, IsOptional, IsPositive, IsString, Max, Min, MinLength } from "class-validator";

export class PaginatioDto {
    // Entero, Positivo, Minimo 1
    @IsOptional()
    @IsInt()
    @IsPositive()
    @Min(1)
    @Max(100)
    limit?: number;

    @IsOptional()
    @IsInt()
    @Min(0)
    @Max(100)
    @IsPositive()
    offset?: number;
}
