import { mockSusuGroups } from '@/__mockData/susuGroups.mock';
import { mockUser } from '@/__mockData/user.mock';
import { useSusuStore } from '@/store/susuStore';
import { SuSuTypeEnum } from '@/types/susuGroups.types';

const createTestStore = () => {
    const store = useSusuStore.getState();
    useSusuStore.setState({
        user: mockUser,
        allSusuGroups: [...mockSusuGroups],
        userSusuGroups: [],
        publicSusuGroups: [],
        isInitialized: false,
    });
    return store;
};

describe('SusuStore', () => {
    beforeEach(() => {
        createTestStore();
    });

    describe('initializeData', () => {
        it('should initialize user groups and public groups correctly', () => {
            const store = useSusuStore.getState();

            store.initializeData();

            const state = useSusuStore.getState();

            expect(state.isInitialized).toBe(true);
            expect(state.userSusuGroups.length).toBeGreaterThan(0);
            expect(state.publicSusuGroups.length).toBeGreaterThan(0);

            state.userSusuGroups.forEach(group => {
                expect(group.members.some(member => member.id === mockUser.id)).toBe(true);
            });

            // Verifypublic groups don't contain the current user and are public
            state.publicSusuGroups.forEach(group => {
                expect(group.members.some(member => member.id === mockUser.id)).toBe(false);
                expect(group.susuType).toBe(SuSuTypeEnum.Public);
            });
        });

        it('should not reinitialize if already initialized', () => {
            const store = useSusuStore.getState();

            store.initializeData();
            const firstState = useSusuStore.getState();

            store.initializeData();
            const secondState = useSusuStore.getState();

            expect(firstState).toEqual(secondState);
        });
    });

    describe('joinSusuGroup', () => {
        beforeEach(() => {
            useSusuStore.getState().initializeData();
        });

        it('should add user to a group they are not already in', () => {
            const store = useSusuStore.getState();
            const publicGroup = store.publicSusuGroups[0];
            const initialMemberCount = publicGroup.members.length;

            store.joinSusuGroup(publicGroup.id, mockUser.id);

            const updatedState = useSusuStore.getState();
            const updatedGroup = updatedState.allSusuGroups.find(g => g.id === publicGroup.id);

            expect(updatedGroup?.members.length).toBe(initialMemberCount + 1);
            expect(updatedGroup?.members.some(member => member.id === mockUser.id)).toBe(true);
            expect(updatedGroup?.updated_at).not.toBe(publicGroup.updated_at);
        });

        it('should not add user if they are already in the group', () => {
            const store = useSusuStore.getState();
            const userGroup = store.userSusuGroups[0];
            const initialMemberCount = userGroup.members.length;

            store.joinSusuGroup(userGroup.id, mockUser.id);

            const updatedState = useSusuStore.getState();
            const updatedGroup = updatedState.allSusuGroups.find(g => g.id === userGroup.id);

            expect(updatedGroup?.members.length).toBe(initialMemberCount);
        });

        it('should not add user if user is null', () => {
            useSusuStore.setState({ user: null });
            const store = useSusuStore.getState();
            const publicGroup = store.allSusuGroups[0];
            const initialMemberCount = publicGroup.members.length;

            store.joinSusuGroup(publicGroup.id, 999);

            const updatedState = useSusuStore.getState();
            const updatedGroup = updatedState.allSusuGroups.find(g => g.id === publicGroup.id);

            expect(updatedGroup?.members.length).toBe(initialMemberCount);
        });
    });

    describe('leaveSusuGroup', () => {
        beforeEach(() => {
            useSusuStore.getState().initializeData();
        });

        it('should remove user from a group', () => {
            const store = useSusuStore.getState();
            const userGroup = store.userSusuGroups[0];
            const initialMemberCount = userGroup.members.length;

            store.leaveSusuGroup(userGroup.id, mockUser.id);

            const updatedState = useSusuStore.getState();
            const updatedGroup = updatedState.allSusuGroups.find(g => g.id === userGroup.id);

            expect(updatedGroup?.members.length).toBe(initialMemberCount - 1);
            expect(updatedGroup?.members.some(member => member.id === mockUser.id)).toBe(false);
            expect(updatedGroup?.updated_at).not.toBe(userGroup.updated_at);
        });

        it('should handle leaving a group user is not in', () => {
            const store = useSusuStore.getState();
            const publicGroup = store.publicSusuGroups[0];
            const initialMemberCount = publicGroup.members.length;

            store.leaveSusuGroup(publicGroup.id, mockUser.id);

            const updatedState = useSusuStore.getState();
            const updatedGroup = updatedState.allSusuGroups.find(g => g.id === publicGroup.id);

            expect(updatedGroup?.members.length).toBe(initialMemberCount);
        });
    });

    describe('updateGroupType', () => {
        it('should update group type correctly', () => {
            const store = useSusuStore.getState();
            const group = store.allSusuGroups[0];
            const newType = group.susuType === SuSuTypeEnum.Private
                ? SuSuTypeEnum.Public
                : SuSuTypeEnum.Private;

            store.updateGroupType(group.id, newType);

            const updatedState = useSusuStore.getState();
            const updatedGroup = updatedState.allSusuGroups.find(g => g.id === group.id);

            expect(updatedGroup?.susuType).toBe(newType);
            expect(updatedGroup?.updated_at).not.toBe(group.updated_at);
        });
    });

    describe('store subscription', () => {
        it('should update user and public groups when allSusuGroups changes', () => {
            const store = useSusuStore.getState();
            store.initializeData();

            const initialUserGroupsCount = useSusuStore.getState().userSusuGroups.length;

            const publicGroup = store.publicSusuGroups[0];
            store.joinSusuGroup(publicGroup.id, mockUser.id);

            const finalState = useSusuStore.getState();
            expect(finalState.userSusuGroups.length).toBe(initialUserGroupsCount + 1);
            expect(finalState.publicSusuGroups.some(g => g.id === publicGroup.id)).toBe(false);
        });
    });
});