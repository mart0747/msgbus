#!/usr/bin/env node

var amqp = require('amqplib/callback_api');

amqp.connect('amqp:localhost', function(err, conn) {
    if(err != null) {
        console.log(err);
        process.exit(1);
    }
    
    conn.createChannel(function(err, ch) {
        if(err != null ) {
            console.log(err);
            process.exit(1);
        }
        
        var q = 'hello';
        var msg = 'hello world';
        
        ch.assertQueue(q, {durable:false});        
        ch.sendToQueue(q, new Buffer(msg));
        console.log(" [x] Send %s", msg);
            
    });
    
    setTimeout(function() {conn.close(); process.exit(0); }, 500);
});

