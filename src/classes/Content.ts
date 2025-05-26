import { Metadata } from "./Metadata";

export class Content {
    imageUrl: string | null;
    head: string;
    body: string;
    metadata: Metadata;

    constructor(head: string, body: string, author: string, tags: string[] = [], imageUrl: string | null = null) {
        this.head = head;
        this.body = body;
        this.metadata = new Metadata(author, tags);
        this.imageUrl = imageUrl;
    }
}


