import { DB_CONNECTION_TOKEN } from '@app/constants/database.constant'
import { Photo } from '@app/modules/photo/photo.entity'
import { DataSource } from 'typeorm'

export const databaseProviders = [
  {
    provide: DB_CONNECTION_TOKEN,
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: '123456',
        database: 'nestjsapi',
        entities: [Photo],
        synchronize: true,
        logger: 'debug'
      })

      try {
        const ds = await dataSource.initialize()
        console.log(
          'Loaded entity metadata:',
          ds.entityMetadatas.map((m) => m.name)
        )
        return ds
      } catch (error) {
        console.log('err: ', error)
      }
    }
  }
]
