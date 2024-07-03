import { AsyncThunk, UnknownAction } from '@reduxjs/toolkit';

type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>;

export type PendingAction = ReturnType<GenericAsyncThunk['pending']>;
export type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>;
export type FulfilleddAction = ReturnType<GenericAsyncThunk['fulfilled']>;

const hasPrefix = (action: UnknownAction, prefix: string): boolean =>
  action.type.startsWith(prefix);

const isPending = (action: PendingAction): boolean =>
  action.type.endsWith('/pending');

const isFulfilled = (action: FulfilleddAction): boolean =>
  action.type.endsWith('/fulfilled');

const isRejected = (action: RejectedAction): boolean =>
  action.type.endsWith('/rejected');

export const isActionPending = (prefix: string) => (action: PendingAction) =>
  hasPrefix(action, prefix) && isPending(action);

export const isActionRejected = (prefix: string) => (action: RejectedAction) =>
  hasPrefix(action, prefix) && isRejected(action);

export const isActionFulfilled =
  (prefix: string) => (action: FulfilleddAction) =>
    hasPrefix(action, prefix) && isFulfilled(action);
