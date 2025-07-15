import { useSusuStore } from '@/store/susuStore';
import { useEffect } from 'react';

export const useSuSuData = () => {
    const {
        user,
        userSusuGroups,
        publicSusuGroups,
        allSusuGroups,
        initializeData,
        joinSusuGroup,
        leaveSusuGroup,
    } = useSusuStore();

    useEffect(() => {
        initializeData();
    }, []);


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



    return {
        user,
        userSusuGroups,
        publicSusuGroups,
        allSusuGroups,
        handleJoinGroup,
        handleLeaveGroup,
    };
};