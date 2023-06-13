import { TailwindProvider } from "tailwind-rn";
import utilities from "./tailwind.json";
import { ApolloProvider } from "@apollo/client";
import { client } from "./services/apolloClient";
import { createContext } from "react";
import { createEventStore } from "./state";
import { IEventStore } from "./types";
import { persistState } from "./state/persist";
import Events from "./screens/Events";

export const EventStoreContext = createContext<IEventStore | null>(null);

const eventStore: IEventStore = createEventStore();
persistState(eventStore);

export default function App() {
	return (
		//@ts-ignore Missing types
		<TailwindProvider utilities={utilities}>
			<EventStoreContext.Provider value={eventStore}>
				<ApolloProvider client={client}>
					<Events />
				</ApolloProvider>
			</EventStoreContext.Provider>
		</TailwindProvider>
	);
}
