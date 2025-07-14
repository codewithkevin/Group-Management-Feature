import { ISusuGroups } from "./susuGroups.types";

export interface IUser {
    id: number;
    name: string;
    susuGroups: ISusuGroups[];
}