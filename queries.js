const { Client } = require('pg');

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'demodb',
  password: '123',
  port: 5432,
});

//check if the connection is made or not
client.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
})

const getUsers = (request, response) => {
  
  client.query('select * from stude_data' , (error, results) => {
    if (!error) {
      response.status(200).json(results.rows);
    }

    if(error)
    {
      response.send('Error' + error);
      console.log('Error' + error);
    }
    
  })
}

const getUserById = (request, response) => {
  const id = parseInt(request.params.id)

  client.query('select * from stude_data where roll_no = $1', [id], (error, results) => {
    if (error) {
      response.send(error);
    }
    response.status(200).json(results.rows)
  })
}

const createUser = (request, response) => {
  const name = request.params.name;
  const age = request.params.age;
  const class_num = request.params.class_num;

  client.query('INSERT INTO stude_data (name, age , class) VALUES ($1, $2 , $3) RETURNING *', [name, age , class_num], (error, results) => {
    if (error)
    {
      throw error
    }

    console.log(results.rows);
    response.status(200).json(results.rows)
    
  });
}

const updateUser = (request, response) => {
  const user = request.body;

  const name = user.name;
  const age = user.age;
  const class_num = user.class_num;
  const roll_no = user.roll_no;

  client.query(
    'update stude_data set name = $1, age = $2 , class = $3 where roll_no = $4',
    [request.params.name , request.params.age , request.params.class_num , request.params.roll_no],
    (error, results) => {
      if (error) {
        throw error;
      }

      console.log('query parameters ' + request.params.name , request.params.age , request.params.class_num , request.params.roll_no);
      response.status(200).json(request.params.name , request.params.age , request.params.class_num , request.params.roll_no);
    }
  )
}

const deleteUser = (request, response) => {
  const id = parseInt(request.params.id)

  client.query('delete from stude_data where roll_no = $1', [id], (error, results) => {
    if (!error) {
      response.status(200).send(`Student deleted with ROLL NUMBER : ${id}`);
    }

    throw error;
    
  })
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
}