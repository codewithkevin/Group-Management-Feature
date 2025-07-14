

export enum VisibilityEnum {
    private = "private",
    public = "public",
}

export interface ISusuGroups {
    id: number;
    name: string;
    members: string[];
    description: string;
    created_at: string;
    updated_at: string;
}

