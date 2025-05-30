import { Metadata } from "./Metadata";
import { v4 as uuidv4 } from "uuid";

export class Content {
    id: string;
    imageUrl: string | null;
    head: string;
    body: string;
    metadata: Metadata;

    constructor(id: string | undefined, head: string, body: string, author: string, tags: string[] = [], imageUrl: string | null = null) {
        this.id = id ?? uuidv4(); // Generate a new UUID for each instance
        this.head = head;
        this.body = body;
        this.metadata = new Metadata(author, tags);
        this.imageUrl = imageUrl || null;
    }

    toMap(): Record<string, any> {
        return {
            id: this.id,
            head: this.head,
            body: this.body,
            metadata: this.metadata.toMap(),
            imageUrl: this.imageUrl
        };
    }

    static fromMap(map: Record<string, any>): Content {
        const newContent = new Content(
            map.id || uuidv4(), 
            map.head || '',
            map.body || '',
            map.metadata?.author || '',
            map.metadata?.tags || [],
            map.imageUrl || null
        )
        return newContent;
    }

    toJson(): string {
        return JSON.stringify(this.toMap());
    }

    static fromJson(json: string): Content {
        const map = JSON.parse(json);
        return this.fromMap(map);
    }

}


