import { ObjectId } from "mongodb";

export default class Book {
    constructor(public isbn: string,
        public title: string,
        public subtitle: string,
        public author: string,
        public published: string,
        public publisher: string,
        public pages: number,
        public description: string,
        public website: string,
        public id?: ObjectId) { }
}