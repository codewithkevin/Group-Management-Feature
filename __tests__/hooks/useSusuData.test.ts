import { useSuSuData } from '@/hooks/useSusuData';
import { useSusuStore } from '@/store/susuStore';
import { act, renderHook } from '@testing-library/react-hooks';

import { useIntroAnimation } from '@/hooks/animations/useIntroAnimation';

jest.mock('@/store/susuStore');

const mockStore = {
    user: { id: 1, name: 'Test User', profilePicture: 'pic.jpg', susuGroups: [] },
    userSusuGroups: [],
    publicSusuGroups: [],
    allSusuGroups: [],
    initializeData: jest.fn(),
    joinSusuGroup: jest.fn(),
    leaveSusuGroup: jest.fn(),
};

describe('useSuSuData', () => {
    beforeEach(() => {
        (useSusuStore as jest.Mock).mockReturnValue(mockStore);
        jest.clearAllMocks();
    });

    it('should initialize data on first render', () => {
        renderHook(() => useSuSuData());

        expect(mockStore.initializeData).toHaveBeenCalledTimes(1);
    });

    it('should return store data correctly', () => {
        const { result } = renderHook(() => useSuSuData());

        expect(result.current.user).toEqual(mockStore.user);
        expect(result.current.userSusuGroups).toEqual(mockStore.userSusuGroups);
        expect(result.current.publicSusuGroups).toEqual(mockStore.publicSusuGroups);
        expect(result.current.allSusuGroups).toEqual(mockStore.allSusuGroups);
    });

    it('should handle joining a group when user exists', () => {
        const { result } = renderHook(() => useSuSuData());

        act(() => {
            result.current.handleJoinGroup(1);
        });

        expect(mockStore.joinSusuGroup).toHaveBeenCalledWith(1, 1);
    });

    it('should not join group when user is null', () => {
        (useSusuStore as jest.Mock).mockReturnValue({
            ...mockStore,
            user: null,
        });

        const { result } = renderHook(() => useSuSuData());

        act(() => {
            result.current.handleJoinGroup(1);
        });

        expect(mockStore.joinSusuGroup).not.toHaveBeenCalled();
    });

    it('should handle leaving a group when user exists', () => {
        const { result } = renderHook(() => useSuSuData());

        act(() => {
            result.current.handleLeaveGroup(1);
        });

        expect(mockStore.leaveSusuGroup).toHaveBeenCalledWith(1, 1);
    });

    it('should not leave group when user is null', () => {
        (useSusuStore as jest.Mock).mockReturnValue({
            ...mockStore,
            user: null,
        });

        const { result } = renderHook(() => useSuSuData());

        act(() => {
            result.current.handleLeaveGroup(1);
        });

        expect(mockStore.leaveSusuGroup).not.toHaveBeenCalled();
    });
});

jest.mock('react-native-reanimated', () => ({
    useSharedValue: (initial: any) => ({ value: initial }),
    useAnimatedStyle: (fn: () => any) => fn(),
    withDelay: (delay: number, animation: any) => animation,
    withTiming: (toValue: any, config?: any) => toValue,
    withSpring: (toValue: any, config?: any) => toValue,
    withSequence: (...animations: any[]) => animations[animations.length - 1],
    Easing: {
        out: (fn: any) => fn,
        exp: 'exp',
    },
}));

describe('useIntroAnimation', () => {
    it('should return animation styles', () => {
        const { result } = renderHook(() => useIntroAnimation());

        expect(result.current).toHaveProperty('headerStyle');
        expect(result.current).toHaveProperty('segmentStyle');
        expect(result.current).toHaveProperty('listStyle');
        expect(result.current).toHaveProperty('itemStyle');
    });

    it('should accept custom configuration', () => {
        const config = {
            duration: 1000,
            delay: 200,
            springConfig: {
                damping: 15,
                stiffness: 120,
                mass: 1.2,
            },
        };

        const { result } = renderHook(() => useIntroAnimation(config));

        expect(result.current).toBeDefined();
    });

    it('should work with default configuration', () => {
        const { result } = renderHook(() => useIntroAnimation({}));

        expect(result.current.headerStyle).toBeDefined();
        expect(result.current.segmentStyle).toBeDefined();
        expect(result.current.listStyle).toBeDefined();
        expect(result.current.itemStyle).toBeDefined();
    });

    it('should initialize animations on mount', () => {
        const { result } = renderHook(() => useIntroAnimation());


        expect(result.current).toBeTruthy();
    });
});