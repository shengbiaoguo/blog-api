import { IsNotEmpty, IsString, Length } from 'class-validator'

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 50)
  readonly username: string

  @IsNotEmpty()
  @IsString()
  readonly password: string
}
