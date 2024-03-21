const { Kafka } = require('kafkajs');

// Create a Kafka instance
const kafka = new Kafka({
  brokers: ['localhost:29092'], // Kafka bootstrap servers
  clientId: 'my-nodejs-app', // Client ID
});

// Create a Kafka producer
const producer = kafka.producer();

// Create a Kafka consumer
const consumer = kafka.consumer({ groupId: 'communication-groupId' }); // Consumer group ID

// Connect to Kafka
const run = async () => {
  // Connect the producer
  await producer.connect();
  console.log('Producer connected to Kafka');

  // Connect the consumer
  await consumer.connect();
  console.log('Consumer connected to Kafka');

  // Subscribe to a topic
  await consumer.subscribe({ topic: 'my-topic' });

  // Start consuming messages
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        value: message.value.toString(), // Message value
      });
    },
  });
};

// Run the application
run().catch(console.error);
