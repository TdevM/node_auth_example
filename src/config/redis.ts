import { isEmpty } from 'lodash'
import redis, { ClientOpts } from 'redis'

require('dotenv').config()

const { REDIS_HOST, REDIS_PORT, REDIS_PASSWORD } = process.env

const optionConfigs: ClientOpts = {
  host: REDIS_HOST,
  port: Number(REDIS_PORT),
}

if (!isEmpty(REDIS_PASSWORD)) {
  optionConfigs.password = REDIS_PASSWORD
}

const client = redis.createClient(optionConfigs)

client.on('connect', function () {
  console.log('Redis client connected')
})

client.on('error', function (err) {
  console.log(`Something went wrong ${err}`)
})

class Redis {
  public static set(key: string, data: any[]) {
    // 24 hours default
    client.setex(key, 86400, JSON.stringify(data))
  }

  public static setWithExpiry(key: string, expiry: number, data: any) {
    client.setex(key, expiry, JSON.stringify(data))
  }

  public static get(key: string) {
    return new Promise((resolve, reject) => {
      return client.get(key, (error, value) => {
        if (error) {
          reject(error)
        }
        resolve(value)
      })
    })
  }

  public static del(key: string) {
    client.del(key)
  }
}

export default Redis
