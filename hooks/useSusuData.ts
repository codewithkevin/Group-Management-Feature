import { useSusuStore } from '@/store/susuStore';
import { useEffect } from 'react';

export const useSuSuData = () => {
    const {
        user,
        userSusuGroups,
        publicSusuGroups,
        allSusuGroups,
        initializeData,
        forceReloadData,
        clearStorage,
        getUserSusuGroups,
        getPublicSusuGroups,
        joinSusuGroup,
        leaveSusuGroup,
    } = useSusuStore();

    useEffect(() => {
        initializeData();
    }, []);

    const refreshUserGroups = () => {
        if (user) {
            getUserSusuGroups(user.id);
        }
    };

    const refreshPublicGroups = () => {
        getPublicSusuGroups();
    };

    const handleJoinGroup = (groupId: number) => {
        if (user) {
            joinSusuGroup(groupId, user.id);
        }
    };

    const handleLeaveGroup = (groupId: number) => {
        if (user) {
            leaveSusuGroup(groupId, user.id);
        }
    };

    // Force reload with new mock data
    const forceReload = () => {
        forceReloadData();
    };

    // Clear storage and reload
    const resetData = async () => {
        await clearStorage();
    };

    return {
        user,
        userSusuGroups,
        publicSusuGroups,
        allSusuGroups,
        refreshUserGroups,
        refreshPublicGroups,
        handleJoinGroup,
        handleLeaveGroup,
        forceReload,
        resetData,
    };
};