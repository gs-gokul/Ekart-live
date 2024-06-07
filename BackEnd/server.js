const app = require('./app')
const path = require('path');
const connectDatabase = require('./config/database');
const { log } = require('console');



connectDatabase(); 

const server = app.listen(process.env.PORT,()=>{
  console.log('my Server listening on port:  '+process.env.PORT+' in '+process.env.NODE_ENV )
});

process.on('unhandledRejection',(err)=>{
  console.log('Error:'+err.message);
  console.log('shutting down the server due to unhandled rejection error');
  server.close(()=>{
    process.exit(1);
  })
})
console.log()

process.on('uncaughtException',(err)=>{
  console.log('Error:' + err.message);
  console.log('shutting down the server due to uncaught Exception error');
  server.close(()=>{
    process.exit(1);
  })
})

//console.log(a);

