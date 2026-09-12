require("dotenv").config();

const { startConsumer } = require("./kafka/consumer");

startConsumer().catch((err) => {
    console.log("consumer failed", err)
    process.exit(1);
});

