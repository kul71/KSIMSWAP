import Kafka from "node-rdkafka"
import * as confconfig from "../confluent-properties.json"

function createConfigMap(config: any) {
  if (config.hasOwnProperty('security.protocol')) {
    return {
      'bootstrap.servers': config['bootstrap.servers'],
      'sasl.username': config['sasl.username'],
      'sasl.password': config['sasl.password'],
      'security.protocol': config['security.protocol'],
      'sasl.mechanisms': config['sasl.mechanisms'],
      'dr_msg_cb': true
    }
  } else {
    return {
      'bootstrap.servers': config['bootstrap.servers'],
      'dr_msg_cb': true
    }
  }
}


function createProducer(onDeliveryReport: any): Promise<Kafka.Producer> {

  const confconfig1 = createConfigMap(confconfig);
  console.log(confconfig1);

  const producer = new Kafka.Producer(confconfig1)

  return new Promise((resolve, reject) => {
    producer
      .on('ready', () => resolve(producer))
      .on('delivery-report', onDeliveryReport)
      .on('event.error', (err) => {
        console.warn('event.error', err);
        reject(err);
      });
    producer.connect();
  });
}

export default async function produceExample() {

  let topic = "SIMSWAP";

  let users = ["eabara", "jsmith", "sgarcia", "jbernard", "htanaka", "awalther"];
  let items = ["book", "alarm clock", "t-shirts", "gift card", "batteries"];

  const producer = await createProducer((err: string, report: any) => {
    if (err) {
      console.warn('Error producing', err)
    } else {
      const { topic, key, value } = report;
      let k = key.toString().padEnd(10, ' ')
      console.log(`Produced event to topic ${topic}: key = ${k} value = ${value}`)
    }
  });

  let numEvents = 10
  let idx = Math.floor(Math.random() * items.length)

  //for (let idx = 0; idx < numEvents; ++idx) {

  const key = users[idx]
  const value = Buffer.from(items[idx])

  producer.produce(topic, -1, value, key)
  //}

  producer.flush(10000, () => {
    producer.disconnect()
  })
}

