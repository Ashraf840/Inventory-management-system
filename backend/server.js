const config = require("./config.json");
// const http = require('http');
const app = require('./index');
// const server = http.createServer(app);
const port = config.SERVER_PORT

// app.post('/user/signup', (req, res) => {
//     console.log("Hit");
//     return res.send('Signup endpoint hit');
//   });


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// server.listen(process.env.port, () => console.log(`Listening to port ${port}`));