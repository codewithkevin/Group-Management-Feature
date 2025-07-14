import { mockSusuGroups } from '@/__mockData/susuGroups.mock';
import { mockUser } from '@/__mockData/user.mock';
import { ISusuGroups } from '@/types/susuGroups.types';
import { IUser } from '@/types/user.types';
import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

interface SuSuStore {
    user: IUser | null;
    allSusuGroups: ISusuGroups[];
    userSusuGroups: ISusuGroups[];
    publicSusuGroups: ISusuGroups[];
    isInitialized: boolean;

    initializeData: () => void;
    joinSusuGroup: (groupId: number, userId: number) => void;
    leaveSusuGroup: (groupId: number, userId: number) => void;
}

export const useSusuStore = create<SuSuStore>()(
    subscribeWithSelector((set, get) => ({
        user: mockUser,
        allSusuGroups: mockSusuGroups,
        userSusuGroups: [],
        publicSusuGroups: [],
        isInitialized: false,

        initializeData: () => {
            const { isInitialized, user, allSusuGroups } = get();

            if (!isInitialized && user) {
                const userGroups = allSusuGroups.filter(group =>
                    group.members.includes(user.id.toString())
                );

                const publicGroups = allSusuGroups.filter(group =>
                    !group.members.includes(user.id.toString())
                );

                set({
                    userSusuGroups: userGroups,
                    publicSusuGroups: publicGroups,
                    isInitialized: true,
                });
            }
        },

        joinSusuGroup: (groupId: number, userId: number) => {
            const { allSusuGroups } = get();
            const updatedGroups = allSusuGroups.map(group => {
                if (group.id === groupId && !group.members.includes(userId.toString())) {
                    return {
                        ...group,
                        members: [...group.members, userId.toString()],
                        updated_at: new Date().toISOString()
                    };
                }
                return group;
            });

            set({ allSusuGroups: updatedGroups });
        },

        leaveSusuGroup: (groupId: number, userId: number) => {
            const { allSusuGroups } = get();
            const updatedGroups = allSusuGroups.map(group => {
                if (group.id === groupId) {
                    return {
                        ...group,
                        members: group.members.filter(id => id !== userId.toString()),
                        updated_at: new Date().toISOString()
                    };
                }
                return group;
            });

            set({ allSusuGroups: updatedGroups });
        },
    }))
);

// Auto-update observer
useSusuStore.subscribe(
    (state) => state.allSusuGroups,
    (allSusuGroups) => {
        const { user } = useSusuStore.getState();
        if (user) {
            const userGroups = allSusuGroups.filter(group =>
                group.members.includes(user.id.toString())
            );

            const publicGroups = allSusuGroups.filter(group =>
                !group.members.includes(user.id.toString())
            );

            useSusuStore.setState({
                userSusuGroups: userGroups,
                publicSusuGroups: publicGroups,
            });
        }
    }
);