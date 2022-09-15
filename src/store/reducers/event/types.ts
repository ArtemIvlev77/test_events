import {IUser} from '../../../models/IUser';
import {IEvent} from '../../../models/IEvent';
import {SetAuthAction, SetErrorAction, SetIsLoadingAction} from '../auth/types';

export interface EventState {
	guests: IUser[],
	events: IEvent[],
}

export enum EventActionEnum {
	SET_GUESTS = 'SET_GUEST',
	SET_EVENTS = 'SET_EVENTS'
}

export interface SetGuestAction {
	type: EventActionEnum.SET_GUESTS,
	payload: IUser[]
}

export interface SetEventsAction {
	type: EventActionEnum.SET_EVENTS,
	payload: IEvent[],
}

export type EventAction =
	SetGuestAction |
	SetEventsAction


