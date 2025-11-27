import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { User } from '@app/modules/user/user.entity'
import { Article } from '@app/modules/article/article.entity'

@Entity('comments')
export class Comment {
  @PrimaryGeneratedColumn()
  id: number

  @Column('text')
  content: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  // 关系 1: 评论作者 (Many-to-One)
  @ManyToOne(() => User, (user) => user.comments)
  author: User

  // 关系 2: 所属文章 (Many-to-One)
  @ManyToOne(() => Article, (article) => article.comments)
  article: Article
}
