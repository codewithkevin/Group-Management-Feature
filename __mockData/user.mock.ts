import { IUser } from "@/types/user.types";

export const mockUser: IUser = {
    id: 1,
    name: "Humble",
    profilePicture: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGVyc29ufGVufDB8fDB8fHww",
    susuGroups: []
};

const mockUsers: Omit<IUser, "susuGroups">[] = [
    { id: 2, name: "Bob Smith", profilePicture: "https://via.placeholder.com/40" },
    { id: 3, name: "Carol Davis", profilePicture: "https://via.placeholder.com/40" },
    { id: 4, name: "David Wilson", profilePicture: "https://via.placeholder.com/40" },
    { id: 5, name: "Eva Brown", profilePicture: "https://via.placeholder.com/40" },
    { id: 6, name: "Frank Miller", profilePicture: "https://via.placeholder.com/40" },
    { id: 7, name: "Grace Taylor", profilePicture: "https://via.placeholder.com/40" },
    { id: 8, name: "Henry Anderson", profilePicture: "https://via.placeholder.com/40" },
    { id: 9, name: "Ivy Thomas", profilePicture: "https://via.placeholder.com/40" },
    { id: 10, name: "Jack Jackson", profilePicture: "https://via.placeholder.com/40" },
    { id: 11, name: "Kelly White", profilePicture: "https://via.placeholder.com/40" },
    { id: 12, name: "Liam Harris", profilePicture: "https://via.placeholder.com/40" },
    { id: 13, name: "Maya Martin", profilePicture: "https://via.placeholder.com/40" },
    { id: 14, name: "Noah Garcia", profilePicture: "https://via.placeholder.com/40" },
    { id: 15, name: "Olivia Rodriguez", profilePicture: "https://via.placeholder.com/40" },
    { id: 16, name: "Paul Lewis", profilePicture: "https://via.placeholder.com/40" },
    { id: 17, name: "Quinn Lee", profilePicture: "https://via.placeholder.com/40" },
    { id: 18, name: "Rachel Walker", profilePicture: "https://via.placeholder.com/40" },
    { id: 19, name: "Sam Hall", profilePicture: "https://via.placeholder.com/40" },
    { id: 20, name: "Tina Allen", profilePicture: "https://via.placeholder.com/40" },
];

export const getRandomMembers = (count: number): Omit<IUser, "susuGroups">[] => {
    const shuffled = [...mockUsers].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
};

export const getRandomMembersWithUser = (count: number, includeCurrentUser: boolean = false): any[] => {
    const randomMembers = getRandomMembers(includeCurrentUser ? count - 1 : count);

    if (includeCurrentUser) {
        const currentUserMember = {
            id: mockUser.id,
            name: mockUser.name,
            profilePicture: mockUser.profilePicture
        };
        return [currentUserMember, ...randomMembers];
    }

    return randomMembers;
};