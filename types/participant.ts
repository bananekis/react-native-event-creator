import { ICharacters } from "./swap";

export interface IParticipant {
	name: string;
	id: string;
}
export interface IParticipantAddModal {
	characters: ICharacters | undefined;
}
