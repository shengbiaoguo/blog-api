import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { Article } from '@app/modules/article/article.entity'

@Entity('tags')
export class Tag {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true, length: 50 })
  name: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  // 关系：文章 (Many-to-Many)
  // 反向引用 Article 实体中的 tags 属性
  @ManyToMany(() => Article, (article) => article.tags)
  articles: Article[]
}
