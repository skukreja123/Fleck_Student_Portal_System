import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './studentadd.css'; // Import your CSS file

const Studentadd = () => {
  const [formData, setFormData] = useState({
    sname: '',
    email: '',
    phone_no: '',
    cnic: '',
    batch: '',
    gender: '',
    Degree: '',
    roll_num: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make the POST request
      await axios.post('http://localhost:1200/api/auth/register', formData);

      // Clear the form fields after successful submission
      setFormData({
        sname: '',
        email: '',
        phone_no: '',
        cnic: '',
        batch: '',
        gender: '',
        Degree: '',
        roll_num: '',
        password: '',
      });

      // Redirect or show a success message if needed
    } catch (error) {
      console.error('Error adding student:', error);
      // Handle error: show an error message to the user
    }
  };

  return (
    <div className="student-add-container">
      <h1>Add Student</h1>
      <form onSubmit={handleSubmit} className="student-add-form">
        <label>
          Name:
          <input type="text" name="sname" value={formData.sname} onChange={handleChange} />
        </label>
        <br />
        <label>
          Email:
          <input type="text" name="email" value={formData.email} onChange={handleChange} />
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
          <input type='text' name='gender' value={formData.gender} onChange={handleChange} />
        </label>
        <br />
        <label>
          Batch:
          <input type="text" name="batch" value={formData.batch} onChange={handleChange} />
        </label>
        <br />

        <label>
          Degree:
          <input type="text" name="Degree" value={formData.Degree} onChange={handleChange} />
        </label>
        <br />
        <label>
          Roll Number:
          <input type="text" name="roll_num" value={formData.roll_num} onChange={handleChange} />
        </label>
        <br />

        <label>
          Password:
          <input type="text" name="password" value={formData.password} onChange={handleChange} />
        </label>
        <br />
        <button type="submit">Add Student</button>
      </form>
    </div>
  );
};

export default Studentadd;
