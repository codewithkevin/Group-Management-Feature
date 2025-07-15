import { useEffect } from 'react';
import {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withSequence,
    withSpring,
    withTiming,
} from 'react-native-reanimated';

interface IntroAnimationConfig {
    duration?: number;
    delay?: number;
    springConfig?: {
        damping?: number;
        stiffness?: number;
        mass?: number;
    };
}

export const useIntroAnimation = (config: IntroAnimationConfig = {}) => {
    const {
        duration = 800,
        delay = 0,
        springConfig = {
            damping: 20,
            stiffness: 100,
            mass: 1,
        },
    } = config;

    const opacity = useSharedValue(0);
    const translateY = useSharedValue(50);
    const scale = useSharedValue(0.9);
    const rotate = useSharedValue(-5);


    const itemOpacity = useSharedValue(0);
    const itemTranslateY = useSharedValue(30);
    const itemScale = useSharedValue(0.8);


    const segmentOpacity = useSharedValue(0);
    const segmentTranslateX = useSharedValue(-50);

    const listOpacity = useSharedValue(0);
    const listTranslateY = useSharedValue(20);

    useEffect(() => {
        opacity.value = withDelay(
            delay,
            withTiming(1, {
                duration: duration * 0.6,
                easing: Easing.out(Easing.exp),
            })
        );

        translateY.value = withDelay(delay, withSpring(0, springConfig));

        scale.value = withDelay(
            delay + 100,
            withSequence(
                withSpring(1.05, { ...springConfig, duration: 400 }),
                withSpring(1, springConfig)
            )
        );

        rotate.value = withDelay(delay + 50, withSpring(0, springConfig));

        itemOpacity.value = withDelay(
            delay + 600,
            withTiming(1, { duration: 500 })
        );
        itemTranslateY.value = withDelay(
            delay + 600,
            withSpring(0, springConfig)
        );
        itemScale.value = withDelay(delay + 600, withSpring(1, springConfig));

        segmentOpacity.value = withDelay(
            delay + 300,
            withTiming(1, { duration: 600 })
        );
        segmentTranslateX.value = withDelay(
            delay + 300,
            withSpring(0, springConfig)
        );

        listOpacity.value = withDelay(
            delay + 500,
            withTiming(1, { duration: 700 })
        );
        listTranslateY.value = withDelay(
            delay + 500,
            withSpring(0, springConfig)
        );
    }, []);

    const headerStyle = useAnimatedStyle(() => ({
        opacity: opacity.value,
        transform: [
            { translateY: translateY.value },
            { scale: scale.value },
            { rotateZ: `${rotate.value}deg` },
        ],
    }));

    const itemStyle = useAnimatedStyle(() => ({
        opacity: itemOpacity.value,
        transform: [
            { translateY: itemTranslateY.value },
            { scale: itemScale.value },
        ],
    }));

    const segmentStyle = useAnimatedStyle(() => ({
        opacity: segmentOpacity.value,
        transform: [{ translateX: segmentTranslateX.value }],
    }));

    const listStyle = useAnimatedStyle(() => ({
        opacity: listOpacity.value,
        transform: [{ translateY: listTranslateY.value }],
    }));

    return {
        headerStyle,
        segmentStyle,
        listStyle,
        itemStyle,
    };
};