interface Task {
  userId?: number;
  id?: number;
  title?: string;
  body?: string;
  status?: 'started' | 'stopped' | 'completed';
}

export default Task;
