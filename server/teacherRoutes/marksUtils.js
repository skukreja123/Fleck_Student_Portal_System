
const uuid = require('uuid');
const getcourse = (cor, teacher_num, res) => {

    const sql = `
    SELECT c.c_name, c.c_id
    FROM course c
    JOIN enrolled_teacher t ON t.c_id = c.c_id
    WHERE t.teacher_id IN (SELECT teacher_id FROM teacher WHERE teacher_num LIKE '%${teacher_num}%')
    `;

    cor.query(sql, (err, result) => {
      if (err) {
        console.log(err);
        res.json({ success: false, message: 'Error fetching courses' })
        }
        console.log(result);
        res.json(result);
    });
}

const getstudent = (cor, c_id,teacher_num, res) => {
    
        const sql = `
        Select s.s_id, s.roll_num, s.sname
        From student s
        Join enrolled e ON e.s_id = s.s_id
        Join enrolled_teacher t ON t.c_id = e.c_id
        Where t.c_id = '${c_id}' AND e.section = t.section AND t.teacher_id IN (SELECT teacher_id FROM teacher WHERE teacher_num LIKE '%${teacher_num}%')
        `;

        cor.query(sql, (err, result) => {
          if (err) {
            console.log(err);
            res.json({ success: false, message: 'Error fetching students' });
          } else {
            console.log("result", result);
            res.json(result);
          }
        });
       
    }


    const addMarks = (cor, c_id, mid_1, mid_2, assignment, quiz, final, studentId, res) => {
      const marks_id = uuid.v4();
      const s_id = studentId;
  
      const sql = `
          INSERT INTO marks (marks_id, c_id, mid_1, mid_2, assignment, quiz, final, s_id)
          VALUES ('${marks_id}', '${c_id}', '${mid_1}', '${mid_2}', '${assignment}', '${quiz}', '${final}', '${s_id}')
          ON DUPLICATE KEY UPDATE
          mid_1 = '${mid_1}', mid_2 = '${mid_2}', assignment = '${assignment}', quiz = '${quiz}', final = '${final}'
      `;
  
      cor.query(sql, (err, result) => {
          if (err) {
              console.log(err);
              res.json({ success: false, message: 'Error adding/updating marks' });
          } else {
              console.log(result);
              res.json({ success: true, message: 'Marks added/updated successfully' });
          }
      });
  };
  
  
  




module.exports = {
    getcourse,
    getstudent,
    addMarks
};


