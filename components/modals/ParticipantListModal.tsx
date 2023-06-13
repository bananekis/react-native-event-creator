import { observer } from "mobx-react-lite";
import React from "react";
import {
	Modal,
	SafeAreaView,
	ScrollView,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { useTailwind } from "tailwind-rn/dist";
import { useEventStore } from "../../state/customHooks";
import { IParticipant } from "../../types/participant";

const ParticipantListModal = () => {
	const eventStore = useEventStore();
	const tw = useTailwind();

	const visible = eventStore.visibleParticipantListModal;

	// filter duplicit names && show appropriate result based on ID
	const participants: IParticipant[] = eventStore.participantList
		.filter(
			(participant: IParticipant) =>
				participant.id === eventStore.currentEventId
		)
		.reduce((acc: IParticipant[], participant: IParticipant) => {
			if (!acc.find((p) => p.name === participant.name)) {
				acc.push(participant);
			}
			return acc;
		}, []);

	return (
		<Modal
			visible={visible}
			animationType="slide"
			transparent={true}
			onRequestClose={() =>
				eventStore.setVisibleParticipantListModal(false)
			}
		>
			<SafeAreaView
				style={tw(
					`flex-1 justify-center items-center bg-opacity-75 bg-gray-500`
				)}
			>
				<View style={tw(`bg-white p-4 rounded-md w-80 h-[80%]`)}>
					<ScrollView>
						<Text style={tw("text-lg font-bold mb-2")}>
							List of participants:
						</Text>
						{participants.map(({ name }: IParticipant) => (
							<Text style={tw("text-lg mb-2")} key={name}>
								{name}
							</Text>
						))}
					</ScrollView>
					<TouchableOpacity
						style={tw(
							`border border-gray-300 py-2 rounded-md mt-2`
						)}
						onPress={() =>
							eventStore.setVisibleParticipantListModal(false)
						}
					>
						<Text
							style={tw(
								"text-gray-700 text-center font-semibold"
							)}
						>
							Cancel
						</Text>
					</TouchableOpacity>
				</View>
			</SafeAreaView>
		</Modal>
	);
};

export default observer(ParticipantListModal);
