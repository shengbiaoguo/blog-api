import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm'
import { User } from '@app/modules/user/user.entity'
import { Tag } from '@app/modules/tag/tag.entity'
import { Comment } from '@app/modules/comment/comment.entity'

@Entity('articles')
export class Article {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true, length: 255 })
  title: string

  @Column('text')
  content: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  // 关系 1: 作者 (Many-to-One)
  @ManyToOne(() => User, (user) => user.articles)
  author: User // 关联 User 实体

  // 关系 2: 标签 (Many-to-Many)
  // @JoinTable 负责创建中间关联表 (article_tags_tag)
  @ManyToMany(() => Tag, (tag) => tag.articles, { cascade: true })
  @JoinTable()
  tags: Tag[]

  // 关系 3: 评论 (One-to-Many)
  @OneToMany(() => Comment, (comment) => comment.article)
  comments: Comment[]
}
