var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'JobStore' });
});

/*TEST*/
router.get('/download', function (req, res) {
    var data = req.query.data;
    res.attachment('data.csv');
    res.setHeader('Content-Type', 'text/csv');
    res.end(data);
});
module.exports = router;
