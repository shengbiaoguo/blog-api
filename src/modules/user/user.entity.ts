import { Exclude } from 'class-transformer'
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { Article } from '@app/modules/article/article.entity'
import { Comment } from '@app/modules/comment/comment.entity'

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true, length: 50 })
  username: string

  // 使用 @Exclude 确保密码哈希不会泄露给客户端
  @Exclude()
  @Column()
  passwordHash: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  // 关系：一个用户可以有多篇文章 (One-to-Many)
  @OneToMany(() => Article, (article) => article.author)
  articles: Article[]

  // 关系：一个用户可以创建多条评论 (One-to-Many)
  @OneToMany(() => Comment, (comment) => comment.author)
  comments: Comment[]
}
