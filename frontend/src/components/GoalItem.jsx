import { useDispatch } from 'react-redux'
import { deleteGoal, toggleAchieved } from '../features/goals/goalSlice'

function GoalItem({goal}) {
    const dispatch = useDispatch()

    const onToggleAchieved = () => {
      dispatch(toggleAchieved(goal._id))
    }

    return (
      <div className={`goal ${goal.completed ? 'achieved' : ''}`}>
        <div>
          {new Date(goal.createdAt).toLocaleString('en-US')}
        </div>
        <h2>{goal.text}</h2>
  
        <div>
          <label>
          Achieved{' '}
            <input
              type="checkbox"
              checked={goal.completed}
              onChange={onToggleAchieved}
            />
            
          </label>
        </div>
  
        <button onClick={() => dispatch(deleteGoal(goal._id))} className="close">
          X
        </button>
      </div>
    )
  }

export default GoalItem
