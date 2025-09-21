import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { delay } from '@core/utils/helper';

export enum GlobalDialogTypes {
  Confirmation = 'CONFIRMATION',
  Error = 'ERROR',
  Info = 'INFO',
  Loading = 'LOADING',
  Success = 'SUCCESS',
}

export type GlobalDialogType = keyof Record<GlobalDialogTypes, string>;

interface BaseGlobalDialogState {
  buttonNeutralText?: string;
  buttonPositiveText?: string;
  message?: string;
  onButtonNeutralPress?: () => void;
  onButtonPositivePress?: () => void;
  show?: boolean;
  type?: GlobalDialogType;
}

export interface GlobalDialogState extends BaseGlobalDialogState {
  queue?: BaseGlobalDialogState[];
}

const INITIAL_STATE: GlobalDialogState = {
  buttonNeutralText: undefined,
  buttonPositiveText: undefined,
  message: undefined,
  onButtonNeutralPress: undefined,
  onButtonPositivePress: undefined,
  queue: [],
  show: false,
  type: undefined,
};

export const dismissGlobalDialog = createAsyncThunk(
  'GlobalDialog/dismissGlobalDialog',
  async () => {
    await delay(250);
  }
);

export const dismissLoading = createAsyncThunk('GlobalDialog/dismissLoading', async () => {
  await delay(500);
});

const handleShowGlobalDialog = (state: GlobalDialogState, newState: GlobalDialogState) =>
  state.show && state.queue
    ? { ...state, queue: [...state.queue, newState] }
    : { ...state, ...newState };

const handleDismissGlobalDialog = (state: GlobalDialogState) => {
  if (state.queue && state.queue.length > 0) {
    const queueTemp = [...state.queue];
    const stateTemp = queueTemp.shift();

    return { ...state, ...stateTemp, queue: queueTemp };
  }

  return { ...INITIAL_STATE };
};

export const GlobalDialogSlice = createSlice({
  name: 'GlobalDialog',
  initialState: INITIAL_STATE,
  reducers: {
    resetGlobalDialog: () => ({ ...INITIAL_STATE }),
    showGlobalDialog: (
      state: GlobalDialogState,
      {
        payload: {
          buttonNeutralText,
          buttonPositiveText,
          message,
          onButtonNeutralPress,
          onButtonPositivePress,
          type,
        },
      }: PayloadAction<GlobalDialogState>
    ) =>
      handleShowGlobalDialog(state, {
        buttonNeutralText,
        buttonPositiveText,
        message,
        onButtonNeutralPress,
        onButtonPositivePress,
        show: true,
        type,
      }),
    showLoading: (state: GlobalDialogState) =>
      handleShowGlobalDialog(state, {
        show: true,
        type: GlobalDialogTypes.Loading,
      }),
  },
  extraReducers: builder => {
    builder.addCase(dismissGlobalDialog.pending, state => {
      state.show = false;
    });

    builder.addCase(dismissGlobalDialog.fulfilled, state => handleDismissGlobalDialog(state));

    builder.addCase(dismissLoading.pending, state => {
      state.show = false;
    });

    builder.addCase(dismissLoading.fulfilled, state => handleDismissGlobalDialog(state));
  },
});

export const { resetGlobalDialog, showGlobalDialog, showLoading } = GlobalDialogSlice.actions;

export default GlobalDialogSlice.reducer;
