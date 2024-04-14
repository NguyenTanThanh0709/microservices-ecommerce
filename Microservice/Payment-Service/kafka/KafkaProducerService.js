const { Kafka } = require('kafkajs');

class KafkaProducerService {
  constructor() {
    this.kafka = new Kafka({
        brokers: ['localhost:29092'], // Kafka bootstrap servers
        clientId: 'my-nodejs-app', // Client ID
    });
    this.producer = this.kafka.producer();
  }

  async connectProducer() {
    try {
      await this.producer.connect();
      console.log('Producer connected to Kafka');
    } catch (error) {
      console.error('Error connecting producer to Kafka:', error);
    }
  }

  async sendMessage(topic, message) {
    try {
      await this.producer.send({
        topic: topic,
        messages: [
          { value: message },
        ],
      });
      console.log('Message sent successfully to Kafka');
    } catch (error) {
      console.error('Error sending message to Kafka:', error);
    }
  }
}

module.exports = KafkaProducerService;
