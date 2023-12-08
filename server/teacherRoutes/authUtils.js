const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // Make sure to import jwt

const login = (cor, teacher_num, password, callback) => {
  console.log(teacher_num);
  const sql = "SELECT * FROM teacher WHERE teacher_num LIKE '%"+teacher_num+"%'"
  cor.query(sql,[teacher_num],async(err, results)=>{
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
            teacher_num: user.teacher_num,
          });
        }
      return callback({ success: false, message: 'Incorrect password' });
    }
    return callback({ success: false, message: 'User not found' });
  });
};


const register = (cor, tname, Email, phone_no, cnic,qualification, teacher_num, password, Gender  ,res) => {
  const selectQuery = "SELECT * FROM teacher";

  cor.query(selectQuery, async (err, results) => {
    if (err) {
      console.error('Database query error:', err);
      res.json({ success: false, message: 'Error querying the database' });
    }

    const teacher_id = results.length + 1;
    console.log(teacher_id);

    const selectenrolled = "SELECT * FROM enrolled_teacher";

    cor.query(selectenrolled, async (err, results) => {
      if (err) {
        console.error('Database query error:', err);
        res.json({ success: false, message: 'Error querying the database' });
      }

      const en_id = results.length + 1;
      console.log(en_id);

    const insertQuery = `
      INSERT INTO teacher (teacher_id, tname, Email, phone_no, cnic, qualification, teacher_num, password, Gender,en_id)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [teacher_id, tname, Email, phone_no, cnic, qualification, teacher_num, password, Gender,en_id];

    cor.query(insertQuery, values, (dbErr,result) => {
      if (dbErr) {
        console.error('Database query error:', dbErr);
        res.json({ success: false, message: 'Error querying the database' });
      }
      res.json(teacher_id);
    });
  });
}
);
};


module.exports = { login, register };
