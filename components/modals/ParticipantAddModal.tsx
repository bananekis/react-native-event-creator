import { Icon } from "@rneui/themed";
import { observer } from "mobx-react-lite";
import React from "react";
import {
	Modal,
	SafeAreaView,
	ScrollView,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import { useTailwind } from "tailwind-rn/dist";
import { colors } from "../../config";
import { useEventStore } from "../../state/customHooks";
import { IPerson } from "../../types";
import { IParticipantAddModal } from "../../types/participant";

const ParticipantAddModal = ({ characters }: IParticipantAddModal) => {
	const eventStore = useEventStore();
	const tw = useTailwind();

	const visible = eventStore.visibleParticipantAddModal;

	const charactersyQuery = characters?.allPeople.people.filter((person) =>
		person.name.toLowerCase().includes(eventStore.searchQuery.toLowerCase())
	);

	return (
		<Modal
			visible={visible}
			animationType="slide"
			transparent={true}
			onRequestClose={() =>
				eventStore.setVisibleParticipantAddModal(false)
			}
		>
			<SafeAreaView
				style={tw(`flex-1 items-center bg-opacity-75 bg-gray-500`)}
			>
				<View style={tw(`bg-white p-4 rounded-md w-80 h-[90%]`)}>
					<TextInput
						placeholder="Search by name..."
						style={tw("p-4")}
						value={eventStore.searchQuery}
						onChangeText={(e) => eventStore.setSearchQuery(e)}
					/>
					{charactersyQuery && (
						<ScrollView>
							{charactersyQuery.map(
								({ name, id: personID }: IPerson) => (
									<View
										key={personID}
										style={tw(
											"flex flex-row justify-between mx-4"
										)}
									>
										<Text style={tw("text-lg mb-2")}>
											{name}
										</Text>
										<Icon
											name="add-circle"
											onPress={() => {
												eventStore.setParticipantList({
													name,
													id: eventStore.currentEventId,
												});
												eventStore.setVisibleParticipantAddModal(
													false
												);
											}}
											color={colors.black}
										/>
									</View>
								)
							)}
						</ScrollView>
					)}
					<TouchableOpacity
						style={tw(
							`border border-gray-300 py-2 rounded-md mt-2`
						)}
						onPress={() =>
							eventStore.setVisibleParticipantAddModal(false)
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

export default observer(ParticipantAddModal);
