import { FC, useEffect, useRef, useState } from 'react';
import ProgressBar from '@ramonak/react-progress-bar';
import useCountdown from '../../utils/hooks/useCountdown';
import useDispatch from '../../utils/hooks/useDispatch';
import useSelector from '../../utils/hooks/useSelector';
import { getTasksList, addTaskStatus } from '../../store/tasksSlice';
import Task from '../../components/task';
import TaskInterface from '../../interfaces/task';
import Button from '../../components/button';
import Modal from '../../components/modal';
import style from './Homepage.module.scss';

const Homepage: FC = (): JSX.Element => {
  const dispatch = useDispatch();

  const firstRun = useRef<boolean>(true);

  const tasks = useSelector(state => state.tasks.tasks);
  const { minute, second, counter, start, pause, reset } = useCountdown(2);
  const {
    isActive: isActiveBreak,
    minute: minuteBreak,
    second: secondBreak,
    start: startBreakTime,
    reset: resetBreakTime,
  } = useCountdown(600);
  const {
    isActive: isActiveBigBreak,
    minute: minuteBigBreak,
    second: secondBigBreak,
    start: startBigBreakTime,
    reset: resetBigBreakTime,
  } = useCountdown(1200);

  const [selectedTask, setSelectedTask] = useState<TaskInterface | undefined>();
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [totalTasks, setTotalTasks] = useState<number>(0);
  const [totalCompletedTasks, setTotalCompletedTasks] = useState<number>(0);
  const [progressPercentage, setProgressPercentage] = useState<number>(0);
  const [showCongratsMessage, setShowCongratsMessage] = useState<boolean>(false);

  useEffect(() => {
    if (tasks.length === 0) dispatch(getTasksList());
    else {
      setTotalTasks(tasks.length);
      setTotalCompletedTasks(tasks.filter(task => task.status === 'completed').length);
    }
  }, [dispatch, tasks]);

  useEffect(() => {
    setProgressPercentage(Math.round((totalCompletedTasks / totalTasks) * 100 || 0));
  }, [totalTasks, totalCompletedTasks]);

  useEffect(() => {
    if (!firstRun.current && totalCompletedTasks >= 1) {
      if (totalCompletedTasks % 4 === 0) startBigBreakTime();
      else startBreakTime();
    }
    if (!firstRun.current && totalTasks === totalCompletedTasks) setShowCongratsMessage(true);
    firstRun.current = false;
  }, [totalTasks, totalCompletedTasks]);

  useEffect(() => {
    if (counter === 0) handleCompleteTask();
  }, [counter]);

  const handleCompleteTask = (): void => {
    reset();
    dispatch(addTaskStatus({ id: selectedTask?.id, status: 'completed' }));
    setSelectedTask(undefined);
  };

  const handleClickStartTask = (task: TaskInterface): void => {
    setIsPaused(false);
    setSelectedTask({ ...task, status: 'started' });
    start();
    resetBreakTime();
    resetBigBreakTime();
  };

  const handleClickStopTask = (): void => {
    setShowModal(true);
    pause();
  };

  const handleStopTask = (answer: boolean): void => {
    setShowModal(false);
    if (answer) {
      reset();
      dispatch(addTaskStatus({ id: selectedTask?.id, status: 'stopped' }));
      setSelectedTask(undefined);
    } else start();
  };

  return (
    <section className={style.component} data-testid="homepage">
      <div className={style.component__summary}>
        <ProgressBar completed={progressPercentage} />
        <div className={style.component__sumlist}>
          <div>
            <p> {totalTasks} </p>
            <span>Tasks to be completed</span>
          </div>
          <div>
            <p>{totalCompletedTasks}</p>
            <span>Completed</span>
          </div>
        </div>
      </div>

      {selectedTask && (
        <div className={`${style.component__counter} ${isPaused && style.paused}`}>
          <div>
            {minute}:{second}
          </div>
          <div>
            <Button color="danger" text="stop" onClick={handleClickStopTask} />
            <Button color="success" text="Complete" onClick={handleCompleteTask} />
          </div>
        </div>
      )}

      {(isActiveBreak || isActiveBigBreak) && (
        <div className={style.component__counter}>
          <div>
            {isActiveBreak && `${minuteBreak}:${secondBreak}`}
            {isActiveBigBreak && `${minuteBigBreak}:${secondBigBreak}`}
          </div>
        </div>
      )}

      {showCongratsMessage && <h1>&#9996; &#9996;</h1>}
      {totalCompletedTasks === 0 && <p>Start today</p>}

      <div className={style.component__tasksList}>
        {selectedTask ? (
          <Task
            key={selectedTask.id}
            title={selectedTask.title}
            description={selectedTask.body}
            status={selectedTask.status || undefined}
            onClickStart={() => handleClickStartTask(selectedTask)}
          />
        ) : tasks.length > 0 ? (
          tasks.map((task: TaskInterface) => (
            <Task
              key={task.id}
              title={task.title}
              description={task.body}
              status={task.status || undefined}
              onClickStart={() => handleClickStartTask(task)}
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
      {showModal && (
        <Modal
          title="Are you sure you want to stop the task?"
          footer={
            <>
              <Button text="no" color="info" onClick={() => handleStopTask(false)} />
              <Button text="yes" color="success" onClick={() => handleStopTask(true)} />
            </>
          }
        />
      )}
    </section>
  );
};

export default Homepage;
