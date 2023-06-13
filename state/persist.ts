import AsyncStorage from "@react-native-async-storage/async-storage";
import { reaction } from "mobx";
import { IEventStore } from "../types";

const STORAGE_KEY = "mobx_state";

export const persistState = (store: IEventStore, key = STORAGE_KEY) => {
	AsyncStorage.getItem(key)
		.then((jsonState) => {
			if (jsonState) {
				const state = JSON.parse(jsonState);
				Object.assign(store, state);
			}
		})
		.catch((error) => {
			console.error("Error loading MobX state:", error);
		});

	reaction(
		() => store,
		(storeState) => {
			AsyncStorage.setItem(key, JSON.stringify(storeState)).catch(
				(error) => {
					console.error("Error saving MobX state:", error);
				}
			);
		},
		{ delay: 1000 } // Delay to avoid frequent writes during rapid state changes
	);
};
