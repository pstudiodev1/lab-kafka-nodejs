const kafka = require("kafka-node");
const client = new kafka.KafkaClient({ kafkaHost: "kafka:9092" });
const producer = new kafka.Producer(client);

producer.on("ready", () => {
  console.log("Connection is ready");
  let cnt = 1;
  setInterval(() => {
    producer.send(
      [
        {
          topic: "topic",
          messages: "message " + cnt++
        }
      ],
      function (error, result) {
        console.log("Sending payload to Kafka");
        if (error) {
          console.log("Sending payload failed: ", error);
        } else {
          console.log("Sending payload result:", result);
        }
      }
    );
  }, 1000);
});
