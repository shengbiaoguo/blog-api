import { Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { Photo } from './photo.entity'
import { InjectModel } from '@app/transformers/model.transformer'

@Injectable()
export class PhotoService {
  constructor(
    @InjectModel(Photo)
    private photoRepository: Repository<Photo>
  ) {}

  async findAll(): Promise<Photo[]> {
    return this.photoRepository.find()
  }
}
