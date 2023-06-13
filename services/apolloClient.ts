import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { BASE_URL } from "../config";

// Setup client
export const client = new ApolloClient({
	cache: new InMemoryCache(),
	uri: BASE_URL,
});

export const GET_CHARACTERS = gql`
	query Query {
		allPeople {
			people {
				id
				name
			}
		}
	}
`;
