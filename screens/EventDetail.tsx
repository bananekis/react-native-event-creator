import { observer } from "mobx-react-lite";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useTailwind } from "tailwind-rn/dist";
import { IEvent } from "../types";
import moment from "moment";
import { useEventStore } from "../state/customHooks";

const EventDetail = ({ name, date, id, error, loading }: IEvent) => {
	const tw = useTailwind();
	const eventStore = useEventStore();

	const extractedTime = moment(date).format("HH:mm:ss");
	const extractedDate = moment(date).format("D.MM.YYYY");

	return (
		<View style={tw("bg-white rounded-lg shadow-md p-4 mx-5 mb-5")}>
			<Text style={tw("text-lg font-bold mb-2")}>Event name: {name}</Text>
			<Text style={tw("text-sm mb-2")}>Date: {extractedDate}</Text>
			<Text style={tw("text-sm mb-4")}>Time: {extractedTime}</Text>
			{(!error || !loading) && (
				<View style={tw("flex flex-row justify-between w-full")}>
					<TouchableOpacity
						style={tw("bg-cyan-500 rounded-md py-2 px-4")}
						onPress={() => {
							eventStore.setVisibleParticipantAddModal(true);
							eventStore.setCurrentEventId(id);
						}}
					>
						<Text style={tw("text-white font-semibold")}>
							Add participant
						</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={tw("bg-cyan-500 rounded-md py-2 px-4")}
						onPress={() => {
							eventStore.setCurrentEventId(id);
							eventStore.setVisibleParticipantListModal(true);
						}}
					>
						<Text style={tw("text-white font-semibold")}>
							List of participants
						</Text>
					</TouchableOpacity>
				</View>
			)}
		</View>
	);
};

export default observer(EventDetail);
