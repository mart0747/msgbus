#!/usr/bin/env node

var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function (err, conn) {
    if (err != null) {
        console.log(err);
        process.exit(1);
    }

    conn.createChannel(function (err, ch) {
        if (err != null) {
            console.log(err);
            process.exit(1);
        }

        var q = 'hello';

        ch.assertQueue(q, {
            durable: false
        });

        console.log(" [*] waiting for messages in %s. Ctrl-C to exit", q);
        ch.consume(q, function (msg) {
            console.log(" [x]: Received %s", msg.content.toString());
        }, {
            noAck: true
        });
    });
});