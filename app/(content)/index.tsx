import { SegmentedControl } from "@/components/SegmentedControl";
import { ThemedText } from "@/components/ThemedText";
import Button from "@/components/ui/button";
import SusuCard from "@/components/ui/cards/susuCard";
import { useIntroAnimation } from "@/hooks/animations/useIntroAnimation";
import { useSuSuData } from "@/hooks/useSusuData";
import { ISusuGroups } from "@/types/susuGroups.types";
import { MaterialIcons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { router } from "expo-router";
import React, { useCallback, useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function SuSuGroupList() {
  const insets = useSafeAreaInsets();
  const [selectedSegment, setSelectedSegment] = useState(0);
  const { userSusuGroups, publicSusuGroups } = useSuSuData();

  const { headerStyle, segmentStyle, listStyle, itemStyle } = useIntroAnimation(
    {
      duration: 500,
      delay: 100,
    }
  );

  const scrollY = useSharedValue(0);
  const STICKY_POINT = wp(23);

  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  const stickyHeaderStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      scrollY.value,
      [0, STICKY_POINT],
      [0, -STICKY_POINT],
      Extrapolate.CLAMP
    );

    return {
      transform: [{ translateY }],
    };
  });

  const headerContentStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollY.value,
      [0, STICKY_POINT * 0.8, STICKY_POINT],
      [1, 0.3, 0],
      Extrapolate.CLAMP
    );

    const scale = interpolate(
      scrollY.value,
      [0, STICKY_POINT],
      [1, 0.95],
      Extrapolate.CLAMP
    );

    return {
      opacity,
      transform: [{ scale }],
    };
  });

  const blurIntensity = useAnimatedStyle(() => {
    const intensity = interpolate(
      scrollY.value,
      [0, STICKY_POINT * 0.5, STICKY_POINT],
      [0, 50, 80],
      Extrapolate.CLAMP
    );

    return {
      opacity: intensity / 80,
    };
  });

  const handleSegmentChange = useCallback((index: number) => {
    setSelectedSegment(index);
  }, []);

  const currentData = useMemo(() => {
    switch (selectedSegment) {
      case 0:
        return [...userSusuGroups, ...publicSusuGroups];
      case 1:
        return userSusuGroups;
      case 2:
        return publicSusuGroups;
      default:
        return userSusuGroups;
    }
  }, [selectedSegment, userSusuGroups, publicSusuGroups]);

  const renderGroupItem = useCallback(
    ({ item }: { item: ISusuGroups }) => (
      <Animated.View style={itemStyle}>
        <SusuCard data={item} width={wp(92)} />
      </Animated.View>
    ),
    [itemStyle]
  );

  const ListHeaderComponent = () => <View style={{ height: wp(20) }} />;

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Animated.View style={[styles.fixedHeader, stickyHeaderStyle]}>
        <Animated.View style={[styles.blurContainer, blurIntensity]}>
          <BlurView intensity={80} tint="light" style={styles.blur} />
        </Animated.View>

        <Animated.View
          style={[styles.headerContent, headerContentStyle, headerStyle]}
        >
          <Button onPress={() => router.back()} variant="ghost">
            <MaterialIcons name="arrow-back" size={24} color="black" />
          </Button>

          <ThemedText type="subtitle">All My Susu Groups</ThemedText>
          <ThemedText style={styles.subtitle} type="defaultSemiBold">
            These are groups you are contributing to
          </ThemedText>
        </Animated.View>

        <Animated.View style={[styles.segmentContainer, segmentStyle]}>
          <SegmentedControl
            segments={["All groups", "Private", "Public"]}
            selectedIndex={selectedSegment}
            onSegmentChange={handleSegmentChange}
            style={styles.segmentedControl}
            animationConfig={{ damping: 20, stiffness: 200, mass: 0.8 }}
          />
        </Animated.View>
      </Animated.View>

      <Animated.FlatList
        data={currentData}
        renderItem={renderGroupItem}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        showsVerticalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        contentContainerStyle={styles.listContainer}
        ListHeaderComponent={ListHeaderComponent}
        ItemSeparatorComponent={() => <View style={{ height: wp(3) }} />}
        style={listStyle}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  fixedHeader: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    paddingTop: wp(8),
  },
  blurContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  blur: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  headerContent: {
    padding: wp(3),
    alignItems: "flex-start",
    gap: wp(2),
    zIndex: 1,
  },
  subtitle: {
    color: "gray",
  },
  segmentContainer: {
    paddingHorizontal: wp(3),
    paddingBottom: wp(3),
    zIndex: 1,
  },
  segmentedControl: {
    width: "100%",
    backgroundColor: "#ECEDEE",
  },
  listContainer: {
    paddingTop: wp(25),
    paddingBottom: wp(20),
    alignItems: "center",
  },
});
