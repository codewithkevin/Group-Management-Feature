import React, { useEffect } from "react";
import {
  LayoutChangeEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

interface SegmentedControlProps {
  segments: string[];
  selectedIndex: number;
  onSegmentChange: (index: number) => void;
  style?: any;
  segmentStyle?: any;
  activeSegmentStyle?: any;
  textStyle?: any;
  activeTextStyle?: any;
  animationConfig?: {
    damping?: number;
    stiffness?: number;
    mass?: number;
  };
}

export const SegmentedControl: React.FC<SegmentedControlProps> = ({
  segments,
  selectedIndex,
  onSegmentChange,
  style,
  segmentStyle,
  activeSegmentStyle,
  textStyle,
  activeTextStyle,
  animationConfig = { damping: 15, stiffness: 150, mass: 1 },
}) => {
  const animatedValue = useSharedValue(selectedIndex);
  const containerWidth = useSharedValue(0);
  const segmentWidth = useSharedValue(0);

  const CONTAINER_PADDING = 12;
  const BACKGROUND_PADDING = 6;

  useEffect(() => {
    animatedValue.value = withSpring(selectedIndex, animationConfig);
  }, [selectedIndex, animationConfig]);

  const onLayout = (event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;
    containerWidth.value = width;
    segmentWidth.value = (width - CONTAINER_PADDING * 2) / segments.length;
  };

  const animatedBackgroundStyle = useAnimatedStyle(() => {
    const translateX = interpolate(
      animatedValue.value,
      [0, segments.length - 1],
      [0, segmentWidth.value * (segments.length - 1)]
    );

    return {
      transform: [{ translateX }],
      width: segmentWidth.value,
    };
  });

  const handleSegmentPress = (index: number) => {
    onSegmentChange(index);
  };

  return (
    <View style={[generousStyles.container, style]} onLayout={onLayout}>
      <Animated.View
        style={[
          generousStyles.animatedBackground,
          {
            top: BACKGROUND_PADDING,
            left: CONTAINER_PADDING,
            height: wp(15) - BACKGROUND_PADDING * 2,
          },
          activeSegmentStyle,
          animatedBackgroundStyle,
        ]}
      />

      {segments.map((segment, index) => {
        const isActive = selectedIndex === index;

        return (
          <TouchableOpacity
            key={index}
            style={[generousStyles.segment, segmentStyle]}
            onPress={() => handleSegmentPress(index)}
            activeOpacity={0.7}
            accessibilityRole="button"
            accessibilityState={{ selected: isActive }}
            accessibilityLabel={`${segment} ${isActive ? "selected" : ""}`}
          >
            <Text
              style={[
                generousStyles.segmentText,
                textStyle,
                isActive && [generousStyles.activeText, activeTextStyle],
              ]}
            >
              {segment}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const generousStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#F3F4F6",
    borderRadius: 50,
    paddingHorizontal: wp(2),
    position: "relative",
    height: wp(15),
  },
  animatedBackground: {
    position: "absolute",
    backgroundColor: "#fff",
    borderRadius: 34,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  segment: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
    paddingHorizontal: 6,
  },
  segmentText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#000",
    textAlign: "center",
  },
  activeText: {
    color: "#000",
    fontWeight: "600",
  },
});
