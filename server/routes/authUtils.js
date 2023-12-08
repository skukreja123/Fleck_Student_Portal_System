const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // Make sure to import jwt
const { use } = require('./courses');
const uuid = require('uuid');

const login = (cor, roll_num, password, callback) => {
  console.log(roll_num);
  const sql = "SELECT * FROM student WHERE roll_num LIKE '%"+roll_num+"%'"
  cor.query(sql,[roll_num],async(err, results)=>{
    if (err) {
      console.error('Database query error:', err);
      return callback({ success: false, message: 'Error querying the database' });
    }

    console.log(results);
    
    if (results.length > 0) {
      const user = results[0];

      // Use bcrypt to compare password

        if (password === user.password) {
          const token = jwt.sign(
            { id: user.s_id },
            process.env.JWT_SECRET || '1234'
          );

          return callback({
            success: true,
            message: 'Authentication successful!',
            token,
            id: user.s_id,
            roll_num: user.roll_num,
          });
        }
      return callback({ success: false, message: 'Incorrect password' });
    }
    return callback({ success: false, message: 'User not found' });
  });
};


const register = (cor, sname, email, phone_no, cnic, batch, Degree, roll_num, password, gender, callback) => {
  const selectQuery = "SELECT * FROM student";

  cor.query(selectQuery, async (err, results) => {
    if (err) {
      console.error('Database query error:', err);
      return callback({ success: false, message: 'Error querying the database' });
    }

    const s_id = results.length + 1;
    console.log(s_id);

    const fee_id = 1;
    const e_id = 1;

    const insertQuery = `
      INSERT INTO student (s_id, sname, email, phone_no, cnic, batch, Degree, roll_num, password, fee_id, e_id, gender)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [s_id, sname, email, phone_no, cnic, batch, Degree, roll_num, password, fee_id, e_id, gender];

    cor.query(insertQuery, values, (dbErr) => {
      if (dbErr) {
        console.error('Database query error:', dbErr);
        return callback({
          success: false,
          message: 'Error inserting student into the database',
        });
      }

      callback({
        success: true,
        message: 'Student inserted successfully!',
      });
    });
  });
};





const forget = (cor, roll_num, cnic ,password, callback) => {
  console.log(roll_num, cnic , password);
  const query = `UPDATE student SET password = '${password}'  WHERE roll_num = '${roll_num}' AND cnic = '${cnic}'`;


  cor.query(query, [password, roll_num, cnic], (dbErr) => {
    if (dbErr) {
      console.error('Database query error:', dbErr);
      callback({
        success: false,
        message: 'Error updating student into the database',
      });
    } else {
      callback({
        success: true,
        message: 'Student updated successfully!',
        
      });
    }
  }
  );
}

module.exports = { login, register , forget};
