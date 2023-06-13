import { observable, action } from "mobx";
import { IEvent, IEventStore } from "../types";
import { IParticipant } from "../types/participant";

const currentEvent: IEvent = {
	id: "",
	name: "",
	date: new Date(),
};

export const currentErrorEvent: IEvent = {
	id: "",
	name: "",
	date: new Date(),
};

export const createEventStore = (): IEventStore => {
	const eventStore: IEventStore = observable({
		currentEvent: currentEvent,
		events: [],
		participantList: [],
		currentEventId: "",
		searchQuery: "",
		visibleEventModal: false,
		visibleParticipantAddModal: false,
		visibleParticipantListModal: false,
		addEvent: action((event: IEvent) => {
			eventStore.events.push(event);
		}),
		setCurrentEventName: action((eventType: string) => {
			eventStore.currentEvent.name = eventType;
		}),
		setCurrentEventDate: action((eventType: Date) => {
			eventStore.currentEvent.date = eventType;
		}),
		setVisibleEventModal: action((eventType: boolean) => {
			eventStore.visibleEventModal = eventType;
		}),
		setVisibleParticipantAddModal: action((eventType: boolean) => {
			eventStore.visibleParticipantAddModal = eventType;
		}),
		setVisibleParticipantListModal: action((eventType: boolean) => {
			eventStore.visibleParticipantListModal = eventType;
		}),
		setParticipantList: action((eventType: IParticipant) => {
			eventStore.participantList.push(eventType);
		}),
		setCurrentEventId: action((eventType: string) => {
			eventStore.currentEventId = eventType;
		}),
		setSearchQuery: action((eventType: string) => {
			eventStore.searchQuery = eventType;
		}),
	});

	return eventStore;
};
