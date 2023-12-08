import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './teacheradd.css'; // Import your CSS file

const Teacheradd = () => {
  const [formData, setFormData] = useState({
    tname: '',
    email: '',
    phone_no: '',
    cnic: '',
    gender: '',
    qualification: '',
    teacher_num: '',
    password: '',
    c_id: '',
  });

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Fetch the list of courses from your API
    const fetchCourses = async () => {
      try {
        const response = await axios.post('http://localhost:1200/api/teachercourse/getcourse');
        console.log("response",response.data);
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCourseChange = (e) => {
    setFormData({
      ...formData,
        c_id: e.target.value,
    });

  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      
      const response = await axios.post('http://localhost:1200/api/teacher/register', formData);

      // Get the newly created teacher's ID from the response
      console.log(response.data);
        const teacher_id = response.data;

      console.log(teacher_id);

      // Add the teacher to the course
      await axios.post('http://localhost:1200/api/teachercourse/addcourse', {
        teacher_id,
        c_id: formData.c_id,
      });
      // Clear the form fields after successful submission
      setFormData({
        tname: '',
        email: '',
        phone_no: '',
        cnic: '',
        gender: '',
        qualification: '',
        teacher_num: '',
        password: '',
      });

      // Redirect or show a success message if needed
    } catch (error) {
      console.error('Error adding teacher:', error);
      // Handle error: show an error message to the user
    }
  };

  return (
    <div className="student-add-container">
      <h1>Add Teacher</h1>
      <form onSubmit={handleSubmit} className="student-add-form">
        <label>
          Name:
          <input type="text" name="tname" value={formData.tname} onChange={handleChange} />
        </label>
        <br />
        <label>
          Email:
          <input type="text" name="Email" value={formData.Email} onChange={handleChange} />
        </label>
        <br />
        <label>
          Phone Number:
          <input type="text" name="phone_no" value={formData.phone_no} onChange={handleChange} />
        </label>
        <br />
        <label>
          CNIC:
          <input type="text" name="cnic" value={formData.cnic} onChange={handleChange} />
        </label>
        <br />
        <label>
            Gender:
            <input type='text' name='Gender' value={formData.Gender} onChange={handleChange} />
        </label>
        <br />
        <label>
          qualification:
          <input type="text" name="qualification" value={formData.qualification} onChange={handleChange} />
        </label>
        <br />
        <label>
          Teacher Number:
          <input type="text" name="teacher_num" value={formData.teacher_num} onChange={handleChange} />
        </label>
        <br />

        <label>
          Password:
          <input type="text" name="password" value={formData.password} onChange={handleChange} />
        </label>
        <br />
        <label>
          Courses:
            <select name= "c_id" value={formData.c_id} onChange={handleCourseChange}>
                {courses.map((course) => (
                    <option key={course.c_id} value={course.c_id}>
                    {course.c_name}
                    </option>
                ))}

            </select>
        </label>
        <br />
        <button type="submit">Add Student</button>
      </form>
    </div>
  );
};

export default Teacheradd;
