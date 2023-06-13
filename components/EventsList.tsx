import { useQuery } from "@apollo/client";
import { observer } from "mobx-react-lite";
import React from "react";
import { SafeAreaView, ScrollView, Text, View } from "react-native";
import { useTailwind } from "tailwind-rn/dist";
import EventDetail from "../screens/EventDetail";
import { GET_CHARACTERS } from "../services/apolloClient";
import { useEventStore } from "../state/customHooks";
import { ICharacters, IEvent } from "../types";
import ParticipantAddModal from "./modals/ParticipantAddModal";
import ParticipantListModal from "./modals/ParticipantListModal";
import AddEventUI from "./UI/AddEventUI";

type Props = {};

const EventsList = (props: Props) => {
	const { loading, error, data } = useQuery<ICharacters>(GET_CHARACTERS);
	const eventStore = useEventStore();
	const tw = useTailwind();
	const currentDate = new Date();

	// sort,, hide
	const filteredEvents = eventStore.events
		.filter((event) => event.date >= currentDate)
		.sort((a, b) => a.date.getDate() - b.date.getDate());

	return (
		<SafeAreaView>
			<View style={tw("flex flex-row justify-between")}>
				<Text style={tw("text-lg font-bold mb-2 mx-2")}>Events</Text>
				<AddEventUI />
			</View>
			<ScrollView>
				{filteredEvents.map(
					({ name, date, id }: IEvent, index: number) => (
						<EventDetail
							name={name}
							date={date}
							key={index}
							id={id}
							error={error}
							loading={loading}
						/>
					)
				)}
				{eventStore.participantList.length > 0 && (
					<ParticipantListModal />
				)}
				{data && <ParticipantAddModal characters={data} />}
			</ScrollView>
		</SafeAreaView>
	);
};

export default observer(EventsList);
