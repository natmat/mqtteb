const mqtt = require('mqtt')
const fs = require('fs')

const host = 'mqtt://broker.hivemq.com'
const port = '1883'
const clientId = `mqtt_${Math.random().toString(16).slice(3)}`

// connect options
const OPTIONS = {
  clientId,
  clean: true,
  connectTimeout: 4000,
  username: 'nm',
  password: 'public',
  reconnectPeriod: 1000,
}

// default is mqtt, unencrypted tcp connection
let connectUrl = `${host}:${port}`

const topic = '/eb'

const client = mqtt.connect(connectUrl, OPTIONS)

client.on('connect', () => {
  console.log(`Connected`)
  client.subscribe([topic], () => {
    console.log(`Subscribe to topic: '${topic}'`)
  })

  client.publish(topic, 'nodejs mqtt test', { qos: 0, retain: false }, (error) => {
    if (error) {
      console.error(error)
    }
  })
})

client.on('reconnect', (error) => {
  console.log(`Reconnecting:`, error)
})

client.on('error', (error) => {
  console.log(`Cannot connect(:`, error)
})

client.on('message', (topic, payload) => {
  console.log('Received Message:', topic, payload.toString())
})
