

import React from 'react';
const Home = () => {

    return (
        <div>
            <h1>Home</h1>

            <div className="container">
                <button className="btn btn-primary"><a href="/studentinsert">Add Student</a></button>
                <button className="btn btn-primary"><a href="/teacherinsert">Add Teacher</a></button>
                </div>
        </div>
    )

}

export default Home;