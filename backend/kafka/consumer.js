const { Kafka } = require("kafkajs");
const { insertAnalyticsEvent } = require("../repository/urlRepository");

const kafka = new Kafka({
    clientId: "analytics-consumer",
    brokers: ["localhost:9092"]
});

const consumer = kafka.consumer({ groupId: 'analytics-group' })

const startConsumer = async() =>{
    await consumer.connect()
    
    await consumer.subscribe({
        topic: 'analytics-events', 
        fromBeginning: false 
    })

    console.log("consumer connected to kafka")

    await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
        const event = JSON.parse(message.value.toString());
        await insertAnalyticsEvent(event.shortCode, event.timestamp);

        console.log("Analytics event consumed", event)
    },
    })
}

module.exports = {
    startConsumer
}   