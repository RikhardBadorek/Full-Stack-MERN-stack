const express = require('express')
const router = express.Router()
const {getGoals ,setGoal, updateGoal, deleteGoal, toggleAchieved} = require('../controllers/goalController')

const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect, getGoals).post(protect, setGoal)

router.route('/:id').put(protect, updateGoal).delete(protect, deleteGoal)

router.route('/toggle/:id').put(protect, toggleAchieved)

module.exports = router