import { GraphQLClient, gql } from "graphql-request";

const API_URL = "http://localhost:8080/query";

export const client = new GraphQLClient(API_URL);

export const GET_BOOKS = gql`
    query {
        books {
            id
            title
            author
            price
            image
        }
    }
`;

export const CREATE_BOOK = gql`
    mutation ($input: NewBook!) {
        createBook(input: $input) {
            id
            title
            author
            price
            image
        }
    }
`;