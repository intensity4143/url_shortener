const {Kafka} = require("kafkajs");

const kafka = new Kafka({
  clientId: 'url-shortner',
  brokers: ['localhost:9092'],
})

const producer = kafka.producer();

const connectProducer = async() => {
    await producer.connect();
    console.log("connected to kafka");
}

module.exports = {
    producer,
    connectProducer,
};