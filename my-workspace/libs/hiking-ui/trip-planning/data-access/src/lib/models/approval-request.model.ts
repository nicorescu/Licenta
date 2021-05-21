import { RequestState } from './request-state.model';

export interface ApprovalRequest {
  userId: string;
  tripId: string;
  state: RequestState;
  seen: boolean;
}
