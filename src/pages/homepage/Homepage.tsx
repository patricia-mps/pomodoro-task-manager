import { FC, useEffect } from 'react';
import useDispatch from '../../utils/hooks/useDispatch';
import useSelector from '../../utils/hooks/useSelector';
import { addTaskStatus, getTasksList } from '../../store/tasksSlice';
import Task from '../../components/task';
import TaskInterface from '../../interfaces/task';

import style from './Homepage.module.scss';

const Homepage: FC = (): JSX.Element => {
  const dispatch = useDispatch();

  const tasks = useSelector(state => state.tasks.tasks);

  useEffect(() => {
    if (tasks.length === 0) dispatch(getTasksList());
  }, [dispatch, tasks]);

  return (
    <section className={style.component} data-testid="homepage">
      <div className={style.component__summary}>
        <h2>Summary</h2>
        <div className={style.component__sumlist}>
          <div>
            <p>0</p>
            <span>Tasks to be completed</span>
          </div>
          <div>
            <p>0</p>
            <span>Completed</span>
          </div>
        </div>
      </div>
      <div className={style.component__tasksList}>
        {tasks.length > 0 ? (
          tasks.map((task: TaskInterface) => (
            <Task
              title={task.title}
              description={task.body}
              status={task.status || undefined}
              onClickStart={() => {}}
            />
          ))
        ) : (
          <div>
            <p>
              <i>"You have no tasks at the moment!"</i>
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Homepage;
