import { RequestState } from './request-state.model';

export interface FriendRequest {
  userId: string;
  requestState: RequestState;
  seen: boolean;
}
