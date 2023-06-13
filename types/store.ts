import { ApolloError } from "@apollo/client";
import { IParticipant } from "./participant";

export interface IEvent {
	id: string;
	name: string;
	date: Date;
	loading?: boolean;
	error?: ApolloError | undefined;
}

export interface IEventStore {
	currentEvent: IEvent;
	events: IEvent[];
	currentEventId: string;
	searchQuery: string;
	participantList: IParticipant[];
	visibleEventModal: boolean;
	visibleParticipantAddModal: boolean;
	visibleParticipantListModal: boolean;
	addEvent: (event: IEvent) => void;
	setCurrentEventName: (eventType: string) => void;
	setCurrentEventDate: (eventType: Date) => void;
	setVisibleEventModal: (eventType: boolean) => void;
	setVisibleParticipantAddModal: (eventType: boolean) => void;
	setVisibleParticipantListModal: (eventType: boolean) => void;
	setParticipantList: (eventType: IParticipant) => void;
	setCurrentEventId: (eventType: string) => void;
	setSearchQuery: (eventType: string) => void;
}
