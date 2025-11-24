import { Controller, Get, Query } from '@nestjs/common'
import { PhotoService } from './photo.service'
import { PhotoListDTO } from './photo.dto'

@Controller('photos')
export class PhotoController {
  constructor(private readonly photoService: PhotoService) {}

  @Get('list')
  findAll(@Query() filter: PhotoListDTO) {
    return this.photoService.findAll()
  }
}
