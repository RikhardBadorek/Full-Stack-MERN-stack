import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import GoalForm from '../components/GoalForm'
import Spinner from '../components/Spinner'
import { getGoals, reset } from '../features/goals/goalSlice'
import GoalItem from '../components/GoalItem'


function Dashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {user} = useSelector((state) => state.auth)
  const {goals, isLoading, isError, message} = useSelector((state) => state.goals)

  useEffect(() => {
    if(isError) {
      console.log(message)
    }

    if(!user) {
      navigate('/login')
    }

    dispatch(getGoals())

    return () => {
      dispatch(reset())
    }
  }, [user, navigate, isError, message, dispatch])

  const goalsAchieved = goals.filter(goal => goal.completed)
  const goalsNotAchieved = goals.filter(goal => !goal.completed)

  if(isLoading) {
    return <Spinner/>
  }

  return (
    <>
      <section className='heading'>
        <h1>Welcome {user && user.name}</h1>
        <p>Goals Dashboard</p>
      </section>

      <GoalForm/>

      <section className='content'>
        <h2>Goals</h2>
        {goals.length > 0 ? (
          <div className="goals">
            {goalsNotAchieved.map(goal => (
              <GoalItem key={goal._id} goal={goal} />
            ))}
          </div>
        ) : (<h3>You dont have unachieved goals</h3>)}

      <h2>Goals Achieved</h2>
        {goals.length > 0 ? (
          <div className="goals">
            {goalsAchieved.map(goal => (
              <GoalItem key={goal._id} goal={goal} />
            ))}
          </div>
        ) : (<h3>You dont have achieved goals</h3>)}
      </section>
    </>
  )
}

export default Dashboard
