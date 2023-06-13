import { Icon } from "@rneui/themed";
import { observer } from "mobx-react-lite";
import React from "react";
import { View } from "react-native";
import { useTailwind } from "tailwind-rn/dist";
import { colors } from "../../config";
import { useEventStore } from "../../state/customHooks";
import { IAddEventUI } from "../../types";
import EventModal from "../modals/EventModal";

const AddEventUI = ({ color }: IAddEventUI) => {
	const eventStore = useEventStore();
	const tw = useTailwind();

	return (
		<View style={tw("mx-2")}>
			<EventModal />
			<Icon
				name="add-circle"
				onPress={() => eventStore.setVisibleEventModal(true)}
				color={color ?? colors.black}
			/>
		</View>
	);
};

export default observer(AddEventUI);
