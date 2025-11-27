import _throttle from 'lodash/throttle'
import { createClient, RedisClientOptions } from '@redis/client'
import { Injectable } from '@nestjs/common'
import { createLogger } from '@app/utils/logger'
import { isDevEnv } from '@app/constants/env.constant'
import { createRedisStore, RedisStore } from './redis.store'
import { ConfigService } from '@nestjs/config'

const logger = createLogger({ scope: 'RedisService', time: isDevEnv })

// https://github.com/redis/node-redis/blob/master/docs/FAQ.md#redisclienttype
export type RedisClientType = ReturnType<typeof createClient>

@Injectable()
export class RedisService {
  private redisStore!: RedisStore
  private redisClient!: RedisClientType

  constructor(private configService: ConfigService) {
    this.redisClient = createClient(this.getOptions())
    this.redisStore = createRedisStore(this.redisClient, {
      defaultTTL: this.configService.get<number>('CACHE_TTL'),
      namespace: this.configService.get<string>('CACHE_NAMESPACE')
    })
    // https://github.com/redis/node-redis#events
    this.redisClient.on('connect', () => logger.log('connecting...'))
    this.redisClient.on('reconnecting', () => logger.log('reconnecting...'))
    this.redisClient.on('ready', () => logger.success('readied (connected).'))
    this.redisClient.on('end', () => logger.info('client end!'))
    this.redisClient.on('error', (error) => logger.failure(`client error!`, error.message))
    // connect
    this.redisClient.connect()
  }

  private sendAlarmMail = _throttle((error: string) => {
    logger.error(`Redis Error: ${error}`)
  }, 1000 * 30)

  // https://github.com/redis/node-redis/blob/master/docs/client-configuration.md#reconnect-strategy
  private retryStrategy(retries: number): number | Error {
    const errorMessage = `retryStrategy! retries: ${retries}`
    logger.error(errorMessage)
    this.sendAlarmMail(errorMessage)
    if (retries > 6) {
      return new Error('Redis maximum retries!')
    }
    return Math.min(retries * 1000, 3000)
  }

  // https://github.com/redis/node-redis/blob/master/docs/client-configuration.md
  private getOptions(): RedisClientOptions {
    const redisOptions: RedisClientOptions = {
      socket: {
        host: this.configService.get<string>('CACHE_HOST'),
        port: this.configService.get<number>('CACHE_PORT'),
        reconnectStrategy: this.retryStrategy.bind(this)
      }
    }
    const username = this.configService.get<string>('CACHE_USERNAME')
    const password = this.configService.get<string>('CACHE_PASSWORD')
    if (username) {
      redisOptions.username = username
    }
    if (password) {
      redisOptions.password = password
    }

    return redisOptions
  }

  public get client(): RedisClientType {
    return this.redisClient
  }

  public get store(): RedisStore {
    return this.redisStore
  }
}
