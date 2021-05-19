const express = require('express');
var redis = require('ioredis');
var client = redis.createClient(6379, 'redis'); //creates a new client

const app = express();

client.on('connect', function() {
  console.log('connected');
});

app.get('/', (req, res) => {
  client.multi()
  .set("foo", "bar") //[0]
  .get("foo")        //[1]
  .exec()
  .then(result => {
    let val = result[1][1];
      res.json({
          message: val
      });
  });
});

app.listen(8000, () => {
    console.log('server is listening on port 8000');
});
