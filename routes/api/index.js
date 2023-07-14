// Basic index file to define location and name of user and thought routes.
const router = require('express').Router();
const thoughtRoutes = require('./thoughtRoutes.js');
const userRoutes = require('./userRoutes.js');

router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);


module.exports = router;