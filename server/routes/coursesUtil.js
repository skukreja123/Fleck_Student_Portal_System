// Require statements
const mysql = require('mysql');
const  uuid = require('uuid');                                        

const getdata = async (cor, res) => {
  const sql = 'SELECT * FROM course';
  cor.query(sql, (err, result) => {
    if (err) {
      console.error('Error fetching courses:', err);
      return res.status(500).json({ error: 'Error fetching courses' });
    }
    res.status(200).json({ courses: result });
  });
};

const registered = async (cor, roll_num, res) => {
  const query = `SELECT enrolled.*, course.c_name , course.credit_hour
  FROM enrolled
  JOIN course ON enrolled.c_id = course.c_id
  WHERE enrolled.s_id = (SELECT s_id FROM student WHERE roll_num LIKE '%${roll_num}%')`
  ;
  cor.query(query, [roll_num], (err, results) => {
    if (err) {
      console.error('Error fetching registered courses:', err);
      return res.status(500).json({ error: 'Error fetching registered courses' });
    }
    res.status(200).json({ courses: results });
  });
};

const register = async (cor, roll_num, course_id, res) => {
  try {
    // Fetch existing entries to calculate the next e_id
    const sql2 = "SELECT * FROM enrolled";
    cor.query(sql2, async (err, results) => {
      if (err) {
        console.error('Database query error:', err);
        return res.status(500).json({ error: 'Error fetching existing entries' });
      }

      // Calculate the next e_id
      const e_id = results.length + 1;
      console.log("e_id", e_id);

      const c_id = course_id;
      console.log("c_id", c_id);

      const s_id = await getStudentIdByRollNumber(cor, roll_num);
      console.log("s_id", s_id);
      const section = 'D';

      // Insert the new entry
      const sql = 'INSERT INTO enrolled (e_id, s_id, c_id, batch,section) VALUES (?, ?, ?, ?,?)';
      const values = [e_id, s_id, c_id, 21,section];

      cor.query(sql, values, (err, result) => {
        if (err) {
          console.error('Error registering for the course:', err);
          return res.status(500).json({ error: 'Error registering for the course' });
        }
        res.status(200).json({ courses: result });
      });
    });
  } catch (error) {
    console.error('Error in register function:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


// Helper function to get student ID by roll number
const getStudentIdByRollNumber = async (cor, roll_num) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT s_id FROM student WHERE roll_num LIKE '%"+roll_num+"%' ";
    cor.query(sql, [roll_num], (err, result) => {
      if (err) {
        console.error('Error getting student ID:', err);
        reject(err);
      } else {
        // Assuming there's only one student with a given roll number
        const s_id = result[0] && result[0].s_id;
        resolve(s_id);
      }
    });
  });
};



module.exports = {
  getdata,
  registered,
  register,
};
