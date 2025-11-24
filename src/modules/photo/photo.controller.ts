import { Controller, Get, Query } from '@nestjs/common'
import { PhotoService } from './photo.service'
import { PhotoListDTO } from './photo.dto'
import { SuccessResponse } from '@app/decorators/success-response.decorator'

@Controller('photos')
export class PhotoController {
  constructor(private readonly photoService: PhotoService) {}

  @Get('list')
  @SuccessResponse('Get all ok')
  findAll(@Query() filter: PhotoListDTO) {
    return this.photoService.findAll()
  }
}
