import { getProviderByTypeEntityClass } from '@app/transformers/model.transformer'
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Photo {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ length: 500 })
  name: string

  @Column('text')
  description: string

  @Column()
  filename: string

  @Column('int')
  views: number

  @Column()
  isPublished: boolean
}

export const PhotoProvider = getProviderByTypeEntityClass(Photo)
