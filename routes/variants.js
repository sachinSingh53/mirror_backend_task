const express = require('express');
const router = express.Router({mergeParams:true});
const variantController = require('../controllers/variant');


router.post('/',variantController.create);

router.put('/:varId',variantController.update);

router.delete('/:varId',variantController.delete);


module.exports = router;