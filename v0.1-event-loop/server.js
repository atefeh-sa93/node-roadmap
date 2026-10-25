const http = require('http');

http.createServer((req, res) => {
  if (req.url === '/slow') {
    //Busy for 5 seconds before sending the response
    // const start = Date.now();
    // while (Date.now() - start < 5000) {}   // ۵ ثانیه موتور رو مشغول نگه دار
    // return res.end('slow done\n');



    //Waiting 5 seconds before sending the response
    setTimeout(() => {
      res.end('slow done\n');
    }, 5000);
    return;
  }
  res.end('fast\n');
}).listen(3000, () => console.log('listening on 3000'));