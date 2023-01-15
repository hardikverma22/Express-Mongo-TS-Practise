import express, { Request, Response, Router } from 'express';
import * as mongodb from "mongodb";
import { collections } from '../db';
import { ObjectId } from "mongodb"



export const router: Router = express.Router();


router.get("/", async (req: Request, res: Response) => {
    try {
        const books = (await collections.find({}).toArray());
        res.status(200).send(books);
    } catch (error: any) {
        res.status(500).send(error?.message);
    }
});

type ReqDictionary = {}
type ReqBody = { foo1?: string }
type ReqQuery = { page?: number }
type ResBody = { foo3?: string }

type SomeHandlerRequest = Request<ReqDictionary, ResBody, ReqBody, ReqQuery>


// Paginated books
router.get("/paginatedBooks", async (req: SomeHandlerRequest, res: Response) => {

    const pageNo = req.query.page;

    const final = pageNo ? pageNo * 2 : 0;

    console.log(pageNo);

    try {
        const books = (await collections.find({}).sort({ title: 1 }).skip(final).limit(2).toArray());
        res.status(200).send(books);
    } catch (error: any) {
        res.status(500).send(error?.message);
    }
});

router.get("/books/:id", async (req: Request, res: Response) => {

    let id = req.params.id;

    if (mongodb.ObjectId.isValid(id)) {

        try {
            const books = (await collections.find({ _id: new ObjectId(id) }).toArray());
            res.status(200).send(books);
        } catch (error: any) {
            res.status(500).send(error?.message);
        }
    }
    else {
        res.status(500).json({ error: "not a valid doc id" });
    }
});


router.post("/books", (req: Request, res: Response) => {
    let book = req.body

    console.log({ book: book });
    try {
        collections.insertOne(book)
            .then(result => {
                res.status(200).json(result);
            })

    } catch (error: any) {
        console.log(error);
        res.status(500).json({ err1: "could not create a document", err: error });
    }
})


router.patch("/books/:id", (req: Request, res: Response) => {
    let updates = req.body;
    if (ObjectId.isValid(req.params.id)) {

        try {
            collections.updateOne({ _id: new ObjectId(req.params.id) }, { $set: updates })
                .then(result => {
                    res.status(201).json(result)
                });

        } catch (error: any) {
            console.log(error);
            res.status(500).json({ err1: "could not update a document", err: error });
        }
    }
    else {
        res.status(500).json({ error: "Invalid ID" });

    }
})


router.delete("/books/:id", (req: Request, res: Response) => {
    if (ObjectId.isValid(req.params.id)) {

        try {
            collections.deleteOne({ _id: new ObjectId(req.params.id) })
                .then(result => {
                    res.status(200).json(result)
                });

        } catch (error: any) {
            console.log(error);
            res.status(500).json({ err1: "could not update a document", err: error });
        }

    }
    else {
        res.status(500).json({ error: "Invalid ID" });
    }
})