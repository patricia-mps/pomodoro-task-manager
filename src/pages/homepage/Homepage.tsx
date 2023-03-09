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
  const dashboardRef = useRef<HTMLDivElement>(null);

  //Get state values from store
  const tasks = useSelector(state => state.tasks.tasks);
  const isLoading = useSelector(state => state.tasks.loading);
  const isUnsuccessful = useSelector(state => state.tasks.isUnsuccessful);
  const message = useSelector(state => state.tasks.message);

  //UseCountdown hook used for pomodoro time traking
  const { minute, second, counter, start, pause, reset } = useCountdown();
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

  //State variables
  const [selectedTask, setSelectedTask] = useState<TaskInterface | undefined>();
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [showConfirmationStopModal, setShowConfirmationStopModal] = useState<boolean>(false);
  const [showConfirmationCompleteModal, setShowConfirmationCompleteModal] =
    useState<boolean>(false);
  const [showInfoModal, setShowInfoModal] = useState<boolean>(false);
  const [totalTasks, setTotalTasks] = useState<number>(0);
  const [totalCompletedTasks, setTotalCompletedTasks] = useState<number>(0);
  const [totalStoppedTasks, setTotalStoppedTasks] = useState<number>(0);
  const [progressPercentage, setProgressPercentage] = useState<number>(0);
  const [withBreak, setWithBreak] = useState<boolean>(false);
  const [dashboardMessage, setDashboardMessage] = useState<string>(
    'Start your pomodoro tasks now!'
  );

  //First render and everytime tasks store value changes
  //If tasks is empty then fetch values from API
  //Define totalTasks and totalCompletedTasks
  useEffect(() => {
    if (tasks.length === 0) {
      dispatch(getTasksList());
      if (!firstRun.current) setDashboardMessage('You have no tasks at the moment!');
    } else {
      setSelectedTask(undefined);
      setTotalTasks(tasks.length);
      setTotalCompletedTasks(tasks.filter(task => task.status === 'completed').length);
      setTotalStoppedTasks(tasks.filter(task => task.status === 'stopped').length);
    }
  }, [dispatch, tasks]);

  //Set isUnsuccessful message
  useEffect(() => {
    if (isUnsuccessful) setDashboardMessage(message);
  }, [isUnsuccessful, message]);

  //Initial render and everytime totalTasks and totalCompletedTasks state value changes
  //Responsible for updating a progress bar
  //Responsible for start break cowntdown
  useEffect(() => {
    setProgressPercentage(Math.round((totalCompletedTasks / totalTasks) * 100 || 0));

    //firstRun.current preventing initial render
    //Responsible for start break countdown
    if (!firstRun.current && totalCompletedTasks >= 1 && !selectedTask) {
      if (totalTasks === totalCompletedTasks) {
        resetBreakTime();
        resetBigBreakTime();
        setDashboardMessage('🎉 Congratulations you finished all your tasks!!! 🎊');
      }
      if (withBreak) {
        if (totalCompletedTasks % 4 === 0) startBigBreakTime();
        else startBreakTime();
      }
    }

    firstRun.current = false;
  }, [totalTasks, totalCompletedTasks, selectedTask]);

  //Responsible for complete task everytime the 25m counter ends
  useEffect(() => {
    if (counter === 0) handleConfirmCompleteTask(true);
  }, [counter]);

  //Function responsible for start a task
  const handleClickStartTask = (task: TaskInterface): void => {
    setIsPaused(false);
    setSelectedTask({ ...task, status: 'started' });
    start();
    resetBreakTime();
    resetBigBreakTime();
    setDashboardMessage('');
    if (dashboardRef.current) dashboardRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  //Function responsible for pausing a task and open confirmation complete task modal
  const handleClickCompleteTask = (): void => {
    setShowConfirmationCompleteModal(true);
    pause();
  };

  //Function responsible for complete a task
  const handleConfirmCompleteTask = (answer: boolean): void => {
    setShowConfirmationCompleteModal(false);

    if (answer) {
      reset();
      dispatch(addTaskStatus({ id: selectedTask?.id, status: 'completed' }));
      setWithBreak(true);
      setDashboardMessage('Task completed, congratulations! You can now take a break.');
    } else start();
  };

  //Function responsible for pausing a task and open confirmation stop task modal
  const handleClickStopTask = (): void => {
    setShowConfirmationStopModal(true);
    pause();
  };

  //Function responsible for stop a task
  const handleConfirmStopTask = (answer: boolean): void => {
    setShowConfirmationStopModal(false);
    if (answer) {
      reset();
      setWithBreak(false);
      dispatch(addTaskStatus({ id: selectedTask?.id, status: 'stopped' }));
      setDashboardMessage('Task stopped! You can start a new task now.');
    } else start();
  };

  return (
    <section className={style.component} data-testid="homepage" ref={dashboardRef}>
      <div className={style.component__summary}>
        <ProgressBar completed={progressPercentage} />
        <div className={style.component__sumlist}>
          <div>
            <p> {totalTasks} </p>
            <span>Tasks to be completed</span>
          </div>
          <div>
            <p>{totalStoppedTasks}</p>
            <span>Stopped</span>
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
            <Button color="success" text="Complete" onClick={handleClickCompleteTask} />
          </div>
        </div>
      )}

      {(isActiveBreak || isActiveBigBreak || isLoading) &&
        !selectedTask &&
        progressPercentage !== 100 && (
          <div className={style.component__counter}>
            <div>
              {isLoading && <span>Loading...</span>}
              {isActiveBreak && `${minuteBreak}:${secondBreak}`}
              {isActiveBigBreak && `${minuteBigBreak}:${secondBigBreak}`}
            </div>
          </div>
        )}

      {!isLoading && (
        <>
          {dashboardMessage && <p>{dashboardMessage}</p>}
          {totalCompletedTasks === 0 && !selectedTask && (
            <p>
              <Button color="info" text="Learn more" onClick={() => setShowInfoModal(true)} />
            </p>
          )}
        </>
      )}

      <div className={style.component__tasksList}>
        {selectedTask ? (
          <Task
            key={selectedTask.id}
            title={selectedTask.title}
            description={selectedTask.body}
            status={selectedTask.status || undefined}
            onClickStart={() => handleClickStartTask(selectedTask)}
          />
        ) : (
          tasks.length > 0 &&
          tasks.map((task: TaskInterface) => (
            <Task
              key={task.id}
              title={task.title}
              description={task.body}
              status={task.status || undefined}
              onClickStart={() => handleClickStartTask(task)}
            />
          ))
        )}
      </div>
      {showConfirmationStopModal && (
        <Modal
          title="Are you sure you want to stop the task?"
          footer={
            <>
              <Button text="no" color="info" onClick={() => handleConfirmStopTask(false)} />
              <Button text="yes" color="success" onClick={() => handleConfirmStopTask(true)} />
            </>
          }
        />
      )}
      {showConfirmationCompleteModal && (
        <Modal
          title="Are you sure you want to complete the task?"
          footer={
            <>
              <Button text="no" color="info" onClick={() => handleConfirmCompleteTask(false)} />
              <Button text="yes" color="success" onClick={() => handleConfirmCompleteTask(true)} />
            </>
          }
        />
      )}
      {showInfoModal && (
        <Modal
          title="Pomodoro technique"
          body={
            <div>
              <ul>
                <li>Choose a single task to focus on.</li>
                <li>Setting a 25-minute timer for a task to be done.</li>
                <li>Work on the task at hand for 25 minutes until the timer chimers.</li>
                <li>Take a short break (typically for 5-10 minutes).</li>
                <li>After four "pomodoros", take a long break (15-20 minutes)</li>
              </ul>
              <span>
                Note: As this is a demo, the changes made do not make API calls and only affects the
                current state.
              </span>
            </div>
          }
          footer={
            <>
              <Button text="close" color="success" onClick={() => setShowInfoModal(false)} />
            </>
          }
        />
      )}
    </section>
  );
};

export default Homepage;
