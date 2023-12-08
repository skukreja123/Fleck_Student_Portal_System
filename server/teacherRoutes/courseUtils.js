

const addcourse = (cor, teacher_id,c_id, res, callback) => {
        const selectQuery = "SELECT * FROM enrolled_teacher";

        cor.query(selectQuery, (err, results) => {
            if (err) {
                console.error('Database query error:', err);
                return callback({ success: false, message: 'Error querying the database' });
            }

        const en_id = results.length + 2;

        const insertQuery = "INSERT INTO enrolled_teacher (en_id,teacher_id,c_id,section) VALUES (?,?, ?,?)";

        const section = 'D';
        const values = [en_id,teacher_id,c_id,section];


        cor.query(insertQuery, values, (dbErr, result) => {
            if (dbErr) {
                console.error('Database query error:', dbErr);
                return callback({ success: false, message: 'Error querying the database' });
            }
            return callback(result);
        });
    });
    }


const getcourse = (cor, res, callback) => {
    const selectQuery = "SELECT * FROM course";

    cor.query(selectQuery, (err, results) => {
        if (err) {
            console.error('Database query error:', err);
            return callback({ success: false, message: 'Error querying the database' });
        }
        res.json(results);
    });
}

module.exports = {
    addcourse,
    getcourse,
};
