import { ISusuGroups, SuSuTypeEnum } from "@/types/susuGroups.types";
import { getRandomMembersWithUser } from "./user.mock";

export const mockSusuGroups: ISusuGroups[] = [
    {
        id: 1,
        name: "Family Savings Circle",
        members: getRandomMembersWithUser(5, true), susuType: SuSuTypeEnum.Private,
        description: "20gh daily for 1k cashout",
        created_at: "2024-01-15T10:00:00Z",
        updated_at: "2024-07-10T14:30:00Z"
    },
    {
        id: 2,
        name: "Friends Investment Club",
        members: getRandomMembersWithUser(5, false), susuType: SuSuTypeEnum.Public,
        description: "20gh daily for 1k cashout",
        created_at: "2024-02-01T09:00:00Z",
        updated_at: "2024-07-12T11:15:00Z"
    },
    {
        id: 3,
        name: "Neighborhood Support Group",
        members: getRandomMembersWithUser(5, true), susuType: SuSuTypeEnum.Private,
        description: "20gh daily for 1k cashout",
        created_at: "2024-02-20T16:45:00Z",
        updated_at: "2024-07-08T13:20:00Z"
    },
    {
        id: 4,
        name: "Business Startup Fund",
        members: getRandomMembersWithUser(5, true), susuType: SuSuTypeEnum.Public,
        description: "20gh daily for 1k cashout",
        created_at: "2024-03-05T12:30:00Z",
        updated_at: "2024-07-14T10:45:00Z"
    },
    {
        id: 5,
        name: "Education Savings Group",
        members: getRandomMembersWithUser(5, false), susuType: SuSuTypeEnum.Private,
        description: "20gh daily for 1k cashout",
        created_at: "2024-03-18T14:00:00Z",
        updated_at: "2024-07-11T16:00:00Z"
    },
    {
        id: 6,
        name: "Travel Enthusiasts Circle",
        members: getRandomMembersWithUser(5, false), susuType: SuSuTypeEnum.Public,
        description: "20gh daily for 1k cashout",
        created_at: "2024-04-02T11:20:00Z",
        updated_at: "2024-07-13T09:30:00Z"
    },
    {
        id: 7,
        name: "Health & Wellness Fund",
        members: getRandomMembersWithUser(5, true), susuType: SuSuTypeEnum.Private,
        description: "20gh daily for 1k cashout",
        created_at: "2024-04-15T15:30:00Z",
        updated_at: "2024-07-09T17:45:00Z"
    },
    {
        id: 8,
        name: "Tech Gadgets Group",
        members: getRandomMembersWithUser(5, false), susuType: SuSuTypeEnum.Public,
        description: "20gh daily for 1k cashout",
        created_at: "2024-05-01T08:15:00Z",
        updated_at: "2024-07-12T12:00:00Z"
    },
    {
        id: 9,
        name: "Home Improvement Circle",
        members: getRandomMembersWithUser(5, false),
        susuType: SuSuTypeEnum.Public,
        description: "20gh daily for 1k cashout",
        created_at: "2024-05-20T13:45:00Z",
        updated_at: "2024-07-10T15:20:00Z"
    },
    {
        id: 10,
        name: "Young Professionals Network",
        members: getRandomMembersWithUser(5, false),
        susuType: SuSuTypeEnum.Public,
        description: "20gh daily for 1k cashout",
        created_at: "2024-06-03T10:30:00Z",
        updated_at: "2024-07-14T11:10:00Z"
    },
    {
        id: 11,
        name: "Sports & Recreation Group",
        members: getRandomMembersWithUser(5, true),
        susuType: SuSuTypeEnum.Private,
        description: "20gh daily for 1k cashout",
        created_at: "2024-06-15T16:00:00Z",
        updated_at: "2024-07-11T14:25:00Z"
    },
    {
        id: 12,
        name: "Art & Culture Circle",
        members: getRandomMembersWithUser(5, false),
        susuType: SuSuTypeEnum.Public,
        description: "20gh daily for 1k cashout",
        created_at: "2024-06-28T09:45:00Z",
        updated_at: "2024-07-13T16:15:00Z"
    },
    {
        id: 13,
        name: "Senior Citizens Support",
        members: getRandomMembersWithUser(5, false),
        susuType: SuSuTypeEnum.Private,
        description: "20gh daily for 1k cashout",
        created_at: "2024-07-01T14:20:00Z",
        updated_at: "2024-07-14T08:50:00Z"
    },
    {
        id: 14,
        name: "Environmental Action Fund",
        members: getRandomMembersWithUser(5, false),
        susuType: SuSuTypeEnum.Public,
        description: "20gh daily for 1k cashout",
        created_at: "2024-07-08T11:00:00Z",
        updated_at: "2024-07-14T13:40:00Z"
    },
    {
        id: 15,
        name: "Wedding & Events Circle",
        members: getRandomMembersWithUser(5, true),
        susuType: SuSuTypeEnum.Private,
        description: "20gh daily for 1k cashout",
        created_at: "2024-07-12T17:30:00Z",
        updated_at: "2024-07-14T15:05:00Z"
    }
];
