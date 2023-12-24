const http = require('http');
const fs=require('fs');
var requests = require('requests');
const PORT = 8800;

var htmll=fs.readFileSync('home.html','utf-8')
// console.log(htmll)
function Changeval(old,chan){
    let tem=old.replace("{%cityname%}",chan.name)
     tem=tem.replace("{%country%}",chan.sys.country)
     tem=tem.replace("{%tem%}",chan.main.temp)
     tem=tem.replace("{%min%}",chan.main.temp_min)
     tem=tem.replace("{%max%}",chan.main.temp_max)
     tem=tem.replace("{%statuscode%}",chan.weather[0].main)

    return tem;
}

const server = http.createServer( (req,res) => {
  // Set appropriate headers
  requests("https://api.openweathermap.org/data/2.5/weather?q=Gujarat&appid=1b0826b9b1cd9813a96d2172f2ecb46e")
  .on('data', async (chunk)=> {
    const obj=await JSON.parse(chunk);
    const arr=await[obj];
    // console.log(obj)
    var realData = arr.map((val)=>Changeval(htmll,val)).join(" ");
    res.write(realData)
    console.log(realData)
  })
  .on('end',function (err) {    
    if (err) return console.log('connection closed due to errors', err);
    // res.end();
    console.log('end');

  });
  
  // End the response
  
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
