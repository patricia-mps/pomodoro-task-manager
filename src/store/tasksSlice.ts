import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import Task from '../interfaces/task';

interface InitialState {
  tasks: Task[];
  loading: boolean;
  isUnsuccessful: boolean;
  message: string;
}

//As I didn't have time to implement the login, I pass the user id as default
export const getTasksList = createAsyncThunk('list', async (userId: number = 1) => {
  const response = await axios.get(`${process.env.REACT_APP_API_URL}/posts?userId=${userId}`);
  return response.data;
});

const initialState: InitialState = {
  tasks: [],
  loading: true,
  isUnsuccessful: false,
  message: '',
};

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTaskStatus: (
      state,
      action: PayloadAction<{
        id: number | undefined;
        status: 'started' | 'stopped' | 'completed';
      }>
    ) => {
      const index = state.tasks.findIndex(item => item.id === action.payload.id);
      if (index !== -1) state.tasks[index].status = action.payload.status;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getTasksList.pending, (state, action: any) => {
        state.loading = true;
      })
      .addCase(getTasksList.fulfilled, (state, action: PayloadAction<Task[]>) => {
        state.loading = false;
        state.isUnsuccessful = false;
        state.tasks = action.payload;
      })
      .addCase(getTasksList.rejected, (state, action: any) => {
        const {
          error: { code },
        } = action;

        state.loading = false;
        state.isUnsuccessful = true;

        if (code === 'ERR_BAD_REQUEST') state.message = 'Something went wrong!';
      });
  },
});

export const { addTaskStatus } = tasksSlice.actions;

export default tasksSlice.reducer;
