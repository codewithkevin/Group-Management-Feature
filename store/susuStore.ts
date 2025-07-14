import { mockSusuGroups } from '@/__mockData/susuGroups.mock';
import { mockUser } from '@/__mockData/user.mock';
import { ISusuGroups } from '@/types/susuGroups.types';
import { IUser } from '@/types/user.types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist, subscribeWithSelector } from 'zustand/middleware';

interface SuSuStore {
    user: IUser | null;
    allSusuGroups: ISusuGroups[];
    userSusuGroups: ISusuGroups[];
    publicSusuGroups: ISusuGroups[];

    initializeData: () => void;
    forceReloadData: () => void;
    getUserSusuGroups: (userId: number) => ISusuGroups[];
    getPublicSusuGroups: () => ISusuGroups[];
    joinSusuGroup: (groupId: number, userId: number) => void;
    leaveSusuGroup: (groupId: number, userId: number) => void;
    updateUser: (user: IUser) => void;
    updateDerivedData: () => void;
    clearStorage: () => Promise<void>;
}

export const useSusuStore = create<SuSuStore>()(
    subscribeWithSelector(
        persist(
            (set, get) => ({
                user: null,
                allSusuGroups: [],
                userSusuGroups: [],
                publicSusuGroups: [],

                updateDerivedData: () => {
                    const { user, allSusuGroups } = get();
                    if (user && allSusuGroups.length > 0) {
                        const userGroups = allSusuGroups.filter(group =>
                            group.members.includes(user.id.toString())
                        );

                        const publicGroups = allSusuGroups.filter(group =>
                            !group.members.includes(user.id.toString())
                        );

                        set({
                            userSusuGroups: userGroups,
                            publicSusuGroups: publicGroups,
                        });
                    }
                },

                initializeData: () => {
                    const { user, allSusuGroups } = get();

                    if (!user || allSusuGroups.length === 0) {
                        set({
                            user: mockUser,
                            allSusuGroups: mockSusuGroups,
                        });
                    }

                    setTimeout(() => get().updateDerivedData(), 0);
                },

                forceReloadData: () => {
                    set({
                        user: mockUser,
                        allSusuGroups: mockSusuGroups,
                    });

                    setTimeout(() => get().updateDerivedData(), 0);
                },

                clearStorage: async () => {
                    try {
                        await AsyncStorage.removeItem('susu-storage');
                        set({
                            user: null,
                            allSusuGroups: [],
                            userSusuGroups: [],
                            publicSusuGroups: [],
                        });
                        get().forceReloadData();
                    } catch (error) {
                        console.error('Failed to clear storage:', error);
                    }
                },

                getUserSusuGroups: (userId: number) => {
                    const { allSusuGroups } = get();
                    const userGroups = allSusuGroups.filter(group =>
                        group.members.includes(userId.toString())
                    );

                    set({ userSusuGroups: userGroups });
                    return userGroups;
                },

                getPublicSusuGroups: () => {
                    const { allSusuGroups, user } = get();
                    const publicGroups = allSusuGroups.filter(group =>
                        !group.members.includes(user?.id.toString() || '')
                    );

                    set({ publicSusuGroups: publicGroups });
                    return publicGroups;
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

                updateUser: (user: IUser) => {
                    set({ user });
                },
            }),
            {
                name: 'susu-storage',
                storage: createJSONStorage(() => AsyncStorage),
                partialize: (state) => ({
                    user: state.user,
                    allSusuGroups: state.allSusuGroups,
                }),
            }
        )
    )
);

useSusuStore.subscribe(
    (state) => ({
        user: state.user,
        allSusuGroups: state.allSusuGroups
    }),
    (current, previous) => {
        const userChanged = current.user?.id !== previous.user?.id;
        const groupsChanged = current.allSusuGroups !== previous.allSusuGroups;

        if (userChanged || groupsChanged) {
            useSusuStore.getState().updateDerivedData();
        }
    },
    {
        equalityFn: (a, b) =>
            a.user?.id === b.user?.id &&
            a.allSusuGroups.length === b.allSusuGroups.length &&
            JSON.stringify(a.allSusuGroups.map(g => ({ id: g.id, members: g.members }))) ===
            JSON.stringify(b.allSusuGroups.map(g => ({ id: g.id, members: g.members })))
    }
);
