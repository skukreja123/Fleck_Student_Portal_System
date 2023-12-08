

const express = require('express');
const CourseUtils = require('./courseUtils');

const router = express.Router();

router.post('/addcourse', (req, res) => {
    
        const { teacher_id,c_id } = req.body;
        CourseUtils.addcourse(req.app.get('cor'), teacher_id,c_id, res, (result) => {
            res.json(result);
        });
    }
);

router.post('/getcourse', (req, res) => {
        CourseUtils.getcourse(req.app.get('cor'), res, (result) => {
            res.json(result);
        });
    }
);

module.exports = router;


