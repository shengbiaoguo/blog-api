import { IsString, IsDefined, IsNotEmpty } from 'class-validator'

export class PhotoListDTO {
  @IsString({ message: 'page must be string type' })
  @IsNotEmpty({ message: 'page?' })
  @IsDefined()
  page: string
}
