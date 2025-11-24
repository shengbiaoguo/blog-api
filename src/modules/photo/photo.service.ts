import { BadRequestException, Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { Photo } from './photo.entity'
import { InjectRepository } from '@nestjs/typeorm'

@Injectable()
export class PhotoService {
  constructor(
    @InjectRepository(Photo)
    private photoRepository: Repository<Photo>
  ) {}

  async findAll(): Promise<Photo[]> {
    // throw new BadRequestException('Password incorrect')
    return this.photoRepository.find()
  }
}
