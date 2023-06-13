export interface ICharacters {
	allPeople: IAllPeople;
}

export interface IAllPeople {
	people: IPerson[];
}

export interface IPerson {
	id: string;
	name: string;
}
