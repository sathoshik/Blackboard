var router = require('express').Router();

router.get('/',function(req,res){
  debugger
  res.send('Welcome to blackboard');
});


module.exports = router;