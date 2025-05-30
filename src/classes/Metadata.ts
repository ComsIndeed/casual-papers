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

    updateTimestamp(): void {
        this.updatedAt = new Date();
    }

    setUpdatedAt(date: Date): void {
        this.updatedAt = date;
    }

    /**
     * Converts the Metadata instance to a plain JavaScript object
     * suitable for JSON serialization or storage in a Map-like structure.
     * Dates are converted to ISO 8601 strings.
     */
    toMap(): Record<string, any> {
        return {
            createdAt: this.createdAt.toISOString(), // Convert Date to ISO string
            updatedAt: this.updatedAt.toISOString(), // Convert Date to ISO string
            author: this.author,
            tags: [...this.tags] // Create a shallow copy to prevent external modification
        };
    }

    /**
     * Creates a Metadata instance from a plain JavaScript object (e.g., from a database or API response).
     * Expects createdAt and updatedAt to be ISO 8601 strings.
     */
    static fromMap(map: Record<string, any>): Metadata {
        // Basic validation for required fields
        if (typeof map.author !== 'string' || !Array.isArray(map.tags)) {
            throw new Error("Invalid data for Metadata.fromMap: 'author' must be string, 'tags' must be array.");
        }

        const metadata = new Metadata(map.author, map.tags);
        // Reconstruct Date objects from string representations
        if (typeof map.createdAt === 'string') {
            metadata.createdAt = new Date(map.createdAt);
        } else if (map.createdAt instanceof Date) {
            metadata.createdAt = map.createdAt; // Handle cases where it might already be a Date object
        }

        if (typeof map.updatedAt === 'string') {
            metadata.updatedAt = new Date(map.updatedAt);
        } else if (map.updatedAt instanceof Date) {
            metadata.updatedAt = map.updatedAt; // Handle cases where it might already be a Date object
        }
        
        return metadata;
    }

    /**
     * Converts the Metadata instance to a JSON string.
     */
    toJSON(): string {
        return JSON.stringify(this.toMap());
    }

    /**
     * Creates a Metadata instance from a JSON string.
     */
    static fromJSON(json: string): Metadata {
        const data = JSON.parse(json);
        return Metadata.fromMap(data); // Delegate to fromMap for consistent object reconstruction
    }
}