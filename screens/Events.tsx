import { SafeAreaView } from "react-native";
import React from "react";
import { observer } from "mobx-react-lite";
import { useEventStore } from "../state/customHooks";
import { colors } from "../config";
import EventsList from "../components/EventsList";
import InitialScreen from "./InitialScreen";

const Events = () => {
	const eventStore = useEventStore();

	return (
		<SafeAreaView style={{ backgroundColor: colors.cyan, flex: 1 }}>
			{eventStore.events.length > 0 ? <EventsList /> : <InitialScreen />}
		</SafeAreaView>
	);
};

export default observer(Events);
