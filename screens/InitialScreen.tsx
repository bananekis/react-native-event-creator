import React from "react";
import { Text, View } from "react-native";
import { useTailwind } from "tailwind-rn/dist";
import { observer } from "mobx-react-lite";
import AddEventUI from "../components/UI/AddEventUI";
import { colors } from "../config";

const InitialScreen = () => {
	const tw = useTailwind();

	return (
		<View style={tw(`flex items-center justify-center h-full`)}>
			<View style={tw(`items-center`)}>
				<Text
					style={tw(`text-black text-center font-semibold text-2xl`)}
				>
					Create Events
				</Text>
				<AddEventUI color={colors.white} />
			</View>
		</View>
	);
};

export default observer(InitialScreen);
