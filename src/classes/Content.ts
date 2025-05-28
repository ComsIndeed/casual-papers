import { Metadata } from "./Metadata";
import { v4 as uuidv4 } from "uuid";

export class Content {
    id: string = uuidv4();
    imageUrl: string | null;
    head: string;
    body: string;
    metadata: Metadata;

    constructor(head: string, body: string, author: string, tags: string[] = [], imageUrl: string | null = null) {
        this.head = head;
        this.body = body;
        this.metadata = new Metadata(author, tags);
        this.imageUrl = imageUrl || null;
    }

    
}


