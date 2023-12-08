const getHome = async (cor, teacher_num, res) => {
    console.log('teacher_num:', teacher_num);
  
    // Query for teacher data
    const teacherQuery = `
      SELECT s.teacher_num, s.tname, s.teacher_id, s.cnic, s.email, s.qualification, s.department, s.phone_no
      FROM teacher s
      WHERE teacher_num LIKE '%${teacher_num}%'
    `;
  
    // Query for courses
    const coursesQuery = `
      SELECT c.c_name, c.c_id , t.section
      FROM course c
      JOIN enrolled_teacher t ON t.c_id = c.c_id
      WHERE t.teacher_id IN (SELECT teacher_id FROM teacher WHERE teacher_num LIKE '%${teacher_num}%')
    `;
  
    try {
      const [teacherResults, coursesResults] = await Promise.all([
        executeQuery(cor, teacherQuery),
        executeQuery(cor, coursesQuery),
      ]);
  
      if (teacherResults.length === 0) {
        return res.status(404).json({ error: 'teacher not found' });
      }
  
      console.log(teacherResults);
      console.log(coursesResults);
  
      const teacherDetails = {
        teacher_num: teacherResults[0].teacher_num,
        tname: teacherResults[0].tname,
        teacher_id: teacherResults[0].teacher_id,
        cnic: teacherResults[0].cnic,
        email: teacherResults[0].email,
        qualification: teacherResults[0].qualification,
        department: teacherResults[0].department,
        phone_no: teacherResults[0].phone_no,
        courses: coursesResults.map((result) => ({
          c_name: result.c_name,
          c_id: result.c_id,
          section: result.section,
        })),
      };
  
      console.log(teacherDetails);
  
      res.status(200).json(teacherDetails);
    } catch (error) {
      console.error('Error executing query:', error);
      res.status(500).json({ error: 'Error querying the database' });
    }
  };
  
  const executeQuery = (cor, query) => {
    return new Promise((resolve, reject) => {
      cor.query(query, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  };


const getstudent = async (cor, teacher_num,c_id, res) => {
  console.log('teacher_num:', teacher_num);


  const studentQuery = `
    SELECT s.roll_num, s.sname, s.batch, s.degree, e.section
    FROM student s
    JOIN enrolled e ON e.s_id = s.s_id
    JOIN enrolled_teacher t ON t.c_id = e.c_id
    WHERE t.teacher_id IN (SELECT teacher_id FROM teacher WHERE teacher_num LIKE '%${teacher_num}%' AND t.c_id = '${c_id}')
  `;

  try {
    const [studentResults] = await Promise.all([
      executeQuery(cor, studentQuery, [`%${teacher_num}%`]),
    ]);

    if (studentResults.length === 0) {
      return res.status(404).json({ error: 'No students found for the provided teacher_num' });
    }

    console.log(studentResults);

    const studentsDetails = studentResults.map((result) => ({
      roll_num: result.roll_num,
      sname: result.sname,
      batch: result.batch,
      degree: result.degree,
      section: result.section,
    }));

    console.log(studentsDetails);

    res.status(200).json(studentsDetails);
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'Error querying the database' });
  }
}

  
  module.exports = {
    getHome,
    getstudent
  };
  