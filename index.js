const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const db = require('./queries');
const { response } = require('express');

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
  response.json('Hello user Welcome to the home page');
});

// app.get('/users', (request, response) => {
//   response.json( 'getusers query' );
// });

app.get('/show/students' , db.getUsers);//working
app.get('/show/student/with/roll_no/:id', db.getUserById);//working
app.post('/new/student/:name/:age/:class_num', db.createUser);//working
app.put('/update/student/:name/:age/:class_num/:roll_no', db.updateUser);//working
app.delete('/delete/student/:id', db.deleteUser);//working

app.listen(3000, () => {
  console.log('App running on port 3000.');
});