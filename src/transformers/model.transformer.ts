import { DB_CONNECTION_TOKEN, DB_MODEL_TOKEN_SUFFIX } from '@app/constants/database.constant'
import { Inject, Provider } from '@nestjs/common'
import { DataSource } from 'typeorm'

export interface TypeEntityClass {
  new (...args: any[])
}

export function getEntityToken(modelName: string): string {
  return modelName + DB_MODEL_TOKEN_SUFFIX
}

// Get Provider by Class
export function getProviderByTypeEntityClass(typeEntityClass: TypeEntityClass): Provider {
  return {
    provide: getEntityToken(typeEntityClass.name),
    useFactory: (dataSource: DataSource) => dataSource.getRepository(typeEntityClass),
    inject: [DB_CONNECTION_TOKEN]
  }
}

// Model injecter
export function InjectModel(model: TypeEntityClass) {
  return Inject(getEntityToken(model.name))
}
