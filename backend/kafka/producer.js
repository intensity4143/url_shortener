const {producer} = require("../config/kafka");

const sendAnalyticsEvent = async(event) =>{
    console.log("sending analytics event to kafka", event);
    
    await producer.send({
        topic: 'analytics-events',
        messages: [
            { value: JSON.stringify(event) }
        ]       
    })

    console.log("sent event to kafka...")
}

module.exports = {
    sendAnalyticsEvent
};