import { useContext } from "react";
import { EventStoreContext } from "../App";
import { IEventStore } from "../types";

export const useEventStore = (): IEventStore => {
	const store = useContext(EventStoreContext);
	if (!store) {
		throw new Error("EventStoreContext is not provided.");
	}
	return store;
};
