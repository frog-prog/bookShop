import express from "express";
import Book from './Models/Book'
import Address from './Models/Address'
import Genre from './Models/Genre'
import PubHouse from './Models/PubHouse'
import Author from "./Models/Author";

export const ModelsArray=new Map<string,Book|Address|Genre|PubHouse|Author>([
    ["book",new Book()],
    ["address",new Address()],
    ["genre",new Genre()],
    ["pubHouse",new PubHouse()],
    ["author",new Author()],
])

export const app = express();
