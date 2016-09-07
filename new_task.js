#!/usr/bin/env node

var amqp = require('amqplib/callback_api');

amqp.connect('amqp:localhost', function (err, conn) {
    if (err != null) {
        console.log(err);
        process.exit(1);
    }

    conn.createChannel(function (err, ch) {
        if (err != null) {
            console.log(err);
            process.exit(1);
        }

        var q = 'task_queue';
        var msg = process.argv.slice(2).join(' ') || 'hello world';

        ch.assertQueue(q, {
            durable: true
        }); //durable: true - queue survices broker restarts
        ch.sendToQueue(q, new Buffer(msg), {
            persistant: true
        });
        console.log(" [x] Send %s", msg);

    });

    setTimeout(function () {
        conn.close();
        process.exit(0);
    }, 500);
});