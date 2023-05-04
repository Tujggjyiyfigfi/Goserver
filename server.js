const http = require('http')

const fs = require('fs')

const port = 8080

var entries = []

const server = http.createServer((req, res) => {

  switch(req.method){

    case 'GET':

      //serve the resource

      res.setHeader('Content-Type', 'text/html')

      res.write("<table><tr><th>Timestamp</th><th>Action</th><th>Data</th></tr>")

      for(i in entries){

        res.write(entries[entries.length-i-1])

      }

      res.write("</table>")

      res.end()

      break;

    case 'POST':

      //add entry

      req.on('data', data => {

        entry = data.toString().split('|')

        const new_entry = `<tr><td>${entry[0]}</td><td>${entry[1]}</td><td>${entry[2]}</td></tr>`

        entries.push(new_entry)

        if(entries.length > 10000){

          entries.shift()

        }

      })

      req.on('end', () => {

        res.end('POST\n')

      })

      break;

    default:

      //do nothing

  }

})

server.listen(port, () => {

  console.log(`Server running at http://localhost:${port}/`);

})
