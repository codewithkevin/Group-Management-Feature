import { Extrapolate, interpolate, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';

export const useStickyScroll = (stickyPoint: number = 100) => {
    const scrollY = useSharedValue(0);

    const scrollHandler = useAnimatedScrollHandler((event) => {
        scrollY.value = event.contentOffset.y;
    });

    const stickyStyle = useAnimatedStyle(() => {
        const translateY = interpolate(
            scrollY.value,
            [0, stickyPoint],
            [0, -stickyPoint],
            Extrapolate.CLAMP
        );

        return {
            transform: [{ translateY }],
        };
    });

    return {
        scrollHandler,
        stickyStyle,
    };
};