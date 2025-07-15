import { mockSusuGroups } from '@/__mockData/susuGroups.mock';
import { mockUser } from '@/__mockData/user.mock';
import { ISusuGroups, SuSuTypeEnum } from '@/types/susuGroups.types';
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
    updateGroupType: (groupId: number, newType: SuSuTypeEnum) => void;
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
                    group.members.some(member => member.id === user.id)
                );

                const publicGroups = allSusuGroups.filter(group =>
                    group.susuType === SuSuTypeEnum.Public &&
                    !group.members.some(member => member.id === user.id)
                );

                set({
                    userSusuGroups: userGroups,
                    publicSusuGroups: publicGroups,
                    isInitialized: true,
                });
            }
        },

        joinSusuGroup: (groupId: number, userId: number) => {
            const { allSusuGroups, user } = get();

            if (!user || user.id !== userId) return;

            const updatedGroups = allSusuGroups.map(group => {
                if (group.id === groupId && !group.members.some(member => member.id === userId)) {
                    const newMember = {
                        id: user.id,
                        name: user.name,
                        profilePicture: user.profilePicture
                    };

                    return {
                        ...group,
                        members: [...group.members, newMember],
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
                        members: group.members.filter(member => member.id !== userId),
                        updated_at: new Date().toISOString()
                    };
                }
                return group;
            });

            set({ allSusuGroups: updatedGroups });
        },

        updateGroupType: (groupId: number, newType: SuSuTypeEnum) => {
            const { allSusuGroups } = get();

            const updatedGroups = allSusuGroups.map(group => {
                if (group.id === groupId) {
                    return {
                        ...group,
                        susuType: newType,
                        updated_at: new Date().toISOString()
                    };
                }
                return group;
            });

            set({ allSusuGroups: updatedGroups });
        },
    }))
);

useSusuStore.subscribe(
    (state) => state.allSusuGroups,
    (allSusuGroups) => {
        const { user } = useSusuStore.getState();
        if (user) {
            const userGroups = allSusuGroups.filter(group =>
                group.members.some(member => member.id === user.id)
            );

            const publicGroups = allSusuGroups.filter(group =>
                group.susuType === SuSuTypeEnum.Public &&
                !group.members.some(member => member.id === user.id)
            );

            useSusuStore.setState({
                userSusuGroups: userGroups,
                publicSusuGroups: publicGroups,
            });
        }
    }
);

export const useSuSuData = () => {
    const store = useSusuStore();

    if (!store.isInitialized) {
        store.initializeData();
    }

    return {
        user: store.user,
        userSusuGroups: store.userSusuGroups,
        publicSusuGroups: store.publicSusuGroups,
        allSusuGroups: store.allSusuGroups,
        joinSusuGroup: store.joinSusuGroup,
        leaveSusuGroup: store.leaveSusuGroup,
        updateGroupType: store.updateGroupType,
    };
};