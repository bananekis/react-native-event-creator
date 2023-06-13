import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import React, { useLayoutEffect, useState } from "react";
import {
	Text,
	Modal,
	TextInput,
	View,
	TouchableOpacity,
	GestureResponderEvent,
	DatePickerIOS,
} from "react-native";
import { observer } from "mobx-react-lite";
import { useEventStore } from "../../state/customHooks";
import { useTailwind } from "tailwind-rn/dist";
import { IEvent } from "../../types";
import { currentErrorEvent } from "../../state";

const EventModal = () => {
	const eventStore = useEventStore();
	const tw = useTailwind();
	const [errorClassName, setErrorClassName] =
		useState<IEvent>(currentErrorEvent);

	const eventModalVisible = eventStore.visibleEventModal;

	const newEvent: IEvent = {
		id: uuidv4(),
		name: eventStore.currentEvent.name,
		date: eventStore.currentEvent.date,
	};

	const checkDisAllowedInputs = (e: GestureResponderEvent): boolean => {
		let createEvent: boolean = true;

		const disAllowedInputs = Object.entries(newEvent)
			.filter(([_, value]) => value === "")
			.map(([key]) => key);

		if (disAllowedInputs.length > 0) {
			e.preventDefault();
			disAllowedInputs.forEach((key) => {
				setErrorClassName((p) => ({
					...p,
					[key]: "border border-red-500",
				}));
			});

			createEvent = false;
		}

		return createEvent;
	};

	const updateInputs = () => {
		const allowedInputs = Object.entries(newEvent)
			.filter(([_, value]) => value.length > 0)
			.map(([key]) => key);

		allowedInputs.forEach((key) => {
			setErrorClassName((p) => ({ ...p, [key]: "" }));
		});
	};

	const setCurrentEventStateToDefault = () => {
		eventStore.setCurrentEventName("");
		eventStore.setCurrentEventDate(new Date());
	};

	const handleCreateEvent = (e: GestureResponderEvent) => {
		const createEvent = checkDisAllowedInputs(e);

		if (createEvent) {
			eventStore.addEvent(newEvent);

			// Clear input fields or perform any other necessary actions
			setCurrentEventStateToDefault();
			eventStore.setVisibleEventModal(false);
		}
	};

	useLayoutEffect(() => {
		updateInputs();
	}, [newEvent.name, newEvent.date]);

	return (
		<Modal
			visible={eventModalVisible}
			animationType="slide"
			transparent={true}
			onRequestClose={() => eventStore.setVisibleEventModal(false)}
		>
			<View
				style={tw(
					`flex-1 justify-center items-center bg-opacity-75 bg-gray-500`
				)}
			>
				<View style={tw(`bg-white p-4 rounded-md w-80`)}>
					<Text style={tw(`text-lg font-bold mb-4`)}>
						Create Event
					</Text>
					<TextInput
						style={tw(
							`border border-gray-300 rounded-md px-3 py-2 mb-4 ${errorClassName.name}`
						)}
						placeholder="Event Name"
						value={eventStore.currentEvent.name}
						onChangeText={(e) => eventStore.setCurrentEventName(e)}
					/>

					<DatePickerIOS
						date={eventStore.currentEvent.date}
						onDateChange={(date) =>
							eventStore.setCurrentEventDate(date)
						}
						initialDate={null}
						mode="datetime"
						pickerStyle="inline"
						style={tw("text-cyan-500")}
					/>

					<TouchableOpacity
						style={tw(`bg-blue-500 py-2 rounded-md`)}
						onPress={handleCreateEvent}
					>
						<Text
							style={tw("text-white text-center font-semibold")}
						>
							Create
						</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={tw(
							`border border-gray-300 py-2 rounded-md mt-2`
						)}
						onPress={() => eventStore.setVisibleEventModal(false)}
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
			</View>
		</Modal>
	);
};

export default observer(EventModal);
