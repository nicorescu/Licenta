import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import {
  SelectedTripResult,
  TripActions,
  TripPrivacy,
  TripState,
} from '@hkworkspace/hiking-ui/trip-planning/data-access';
import { SessionToken } from '@hkworkspace/shared/app-authentication/data-access';

@Component({
  selector: 'hk-trip-actions',
  templateUrl: './trip-actions.component.html',
  styleUrls: ['./trip-actions.component.scss'],
})
export class TripActionsComponent implements OnInit {
  @Input()
  selectedTripResult: SelectedTripResult;
  @Input()
  sessionToken: SessionToken;
  tripState = TripState;

  @Output()
  actionClicked = new EventEmitter();

  faArrowLeft = faArrowLeft;
  tripPrivacy = TripPrivacy;
  constructor() {}

  ngOnInit(): void {}

  askForApproval() {
    this.actionClicked.emit(TripActions.AskForApproval);
  }

  joinTrip() {
    this.actionClicked.emit(TripActions.JoinTrip);
  }

  pickAnotherTrip() {
    this.actionClicked.emit(TripActions.PickAnotherTrip);
  }

  cancelTrip() {
    this.actionClicked.emit(TripActions.CancelTrip);
  }

  quitTrip() {
    this.actionClicked.emit(TripActions.QuitTrip);
  }

  cancelRequest() {
    this.actionClicked.emit(TripActions.CancelRequest);
  }

  public get isOrganizer() {
    return (
      !!this.selectedTripResult &&
      this.selectedTripResult.organizer.id === this.sessionToken?.loggedInId
    );
  }

  public get isFriend() {
    return (
      this.selectedTripResult.organizer.friends.indexOf(
        this.sessionToken.loggedInId
      ) >= 0
    );
  }

  public get isFriendRequested() {
    return (
      this.selectedTripResult.organizer.friendRequests.indexOf(
        this.sessionToken.loggedInId
      ) >= 0
    );
  }

  public get isParticipant() {
    return (
      this.selectedTripResult.trip.participantsIds.indexOf(
        this.sessionToken.loggedInId
      ) >= 0
    );
  }

  public get isParticipationRequested() {
    return (
      this.selectedTripResult.trip.requests.indexOf(
        this.sessionToken.loggedInId
      ) >= 0
    );
  }

  public get isPlanningOrProgress() {
    return (
      this.selectedTripResult.trip.state === this.tripState.Planning ||
      this.selectedTripResult.trip.state === this.tripState.InProgress
    );
  }
}
