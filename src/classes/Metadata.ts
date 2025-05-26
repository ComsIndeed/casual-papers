export class Metadata {
    createdAt: Date;
    updatedAt: Date;
    author: string;
    tags: string[];
    constructor(author: string, tags: string[] = []) {
        this.createdAt = new Date();
        this.updatedAt = new Date();
        this.author = author;
        this.tags = tags;
    }
    updateTimestamp() {
        this.updatedAt = new Date();
    }
    static fromJSON(json: string): Metadata {
        const data = JSON.parse(json);
        const metadata = new Metadata(data.author, data.tags);
        metadata.createdAt = new Date(data.createdAt);
        metadata.updatedAt = new Date(data.updatedAt);
        return metadata;
    }
}
