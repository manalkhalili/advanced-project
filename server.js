const http=require('http');
const app=require('./index');
const port=5002;
const server=http.createServer(app);
server.listen(port); 