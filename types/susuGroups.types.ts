import { IUser } from './user.types';
export enum SuSuTypeEnum {
    Private = "private",
    Public = "public",
}

type Members = Omit<IUser, "susuGroups">;

export interface ISusuGroups {
    id: number;
    name: string;
    members: Members[];
    susuType: SuSuTypeEnum;
    description: string;
    created_at: string;
    updated_at: string;
}

