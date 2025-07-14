import { BodyFlatList } from "@/components/BodyFlatList";
import { ThemedText } from "@/components/ThemedText";
import Button from "@/components/ui/button";
import SusuCard from "@/components/ui/cards/susuCard";
import { useSuSuData } from "@/hooks/useSusuData";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import React, { useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import PublicSuSuCard from "../../components/ui/cards/publicSusuCard";

const { width } = Dimensions.get("window");

interface Section {
  id: string;
  type: "horizontal" | "vertical" | "banner";
  data?: any[];
  title?: string;
}

const BannerSection = () => {
  return (
    <LinearGradient
      colors={["#8B7ED8", "#0B9F89"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.bannerContainer}
    >
      <View style={styles.content}>
        <Text className="text-white font-bold text-lg">
          Try our all new AI tool - AiSus
        </Text>
      </View>
    </LinearGradient>
  );
};

const PersonalSuSuGroupSection = ({ section }: { section: Section }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const renderHorizontalItem = ({ item }: { item: any }) => (
    <SusuCard data={item} />
  );

  const totalPages = Math.ceil((section.data?.length || 0) / 4);
  const paginatedData = section.data?.slice(
    currentPage * 3,
    (currentPage + 1) * 3
  );

  const handleScroll = (event: any) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const pageWidth = event.nativeEvent.layoutMeasurement.width;
    const page = Math.round(offsetX / pageWidth);
    setCurrentPage(page);
  };

  const goToPage = (pageIndex: number) => {
    setCurrentPage(pageIndex);
    flatListRef.current?.scrollToIndex({ index: 0, animated: true });
  };

  const renderDots = () => {
    if (totalPages <= 1) return null;

    return (
      <View style={styles.dotsContainer}>
        {Array.from({ length: totalPages }).map((_, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.dot,
              {
                backgroundColor: currentPage === index ? "#0B9F89" : "#E0E0E0",
              },
            ]}
            onPress={() => goToPage(index)}
          />
        ))}
      </View>
    );
  };

  return (
    <View className="gap-1">
      <View className="flex-row items-center justify-between px-4">
        <ThemedText className="px-2" type="defaultSemiBold">
          My Susu Groups
        </ThemedText>

        <Button variant="ghost">
          <ThemedText type="link">View All</ThemedText>
        </Button>
      </View>

      <FlatList
        ref={flatListRef}
        data={paginatedData}
        renderItem={renderHorizontalItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        removeClippedSubviews={true}
        maxToRenderPerBatch={5}
        windowSize={5}
        ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
        className="px-4"
        onScroll={handleScroll}
        scrollEventThrottle={16}
      />

      {renderDots()}
    </View>
  );
};

const PublicSuSuGroupSection = ({ section }: { section: Section }) => {
  const renderPublicSuSuGroup = ({ item }: { item: any }) => (
    <PublicSuSuCard data={item} />
  );

  return (
    <View className="gap-1">
      <View className="flex-row items-center justify-between px-4">
        <ThemedText className="px-2" type="defaultSemiBold">
          Public Susu Groups
        </ThemedText>

        <Button variant="ghost">
          <ThemedText type="link">View All</ThemedText>
        </Button>
      </View>

      <FlatList
        data={section.data}
        renderItem={renderPublicSuSuGroup}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        removeClippedSubviews={true}
        maxToRenderPerBatch={5}
        windowSize={5}
        ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
        className="px-4 gap-y-5"
        scrollEventThrottle={16}
      />
    </View>
  );
};

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollY = useRef(new Animated.Value(0)).current;
  const headerOpacity = useRef(new Animated.Value(0)).current;
  const { userSusuGroups, publicSusuGroups, user } = useSuSuData();

  const sectionsData: Section[] = [
    {
      id: "banner",
      type: "banner",
    },
    {
      id: "personal",
      type: "horizontal",
      title: "My Susu Groups",
      data: userSusuGroups,
    },
    {
      id: "public",
      type: "vertical",
      title: "Public Susu Groups",
      data: publicSusuGroups,
    },
  ];

  const renderSection = ({ item }: { item: Section }) => {
    const getSectionContent = () => {
      switch (item.type) {
        case "banner":
          return <BannerSection />;
        case "horizontal":
          return <PersonalSuSuGroupSection section={item} />;
        case "vertical":
          return <PublicSuSuGroupSection section={item} />;
        default:
          return null;
      }
    };

    const shouldAddSpacing =
      item.type === "horizontal" || item.type === "vertical";

    return (
      <View style={shouldAddSpacing ? { marginBottom: 50 } : undefined}>
        {getSectionContent()}
      </View>
    );
  };

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    {
      useNativeDriver: false,
      listener: (event: any) => {
        const offsetY = event.nativeEvent.contentOffset.y;

        if (offsetY && !isScrolling) {
          setIsScrolling(true);
          Animated.timing(headerOpacity, {
            toValue: 1,
            duration: 200,
            useNativeDriver: false,
          }).start();
        } else if (!offsetY && isScrolling) {
          setIsScrolling(false);
          Animated.timing(headerOpacity, {
            toValue: 0,
            duration: 200,
            useNativeDriver: false,
          }).start();
        }
      },
    }
  );

  return (
    <View style={styles.container}>
      <BodyFlatList
        data={sectionsData}
        renderItem={renderSection}
        keyExtractor={(item, index) => index.toString() + item.id}
        removeClippedSubviews
        maxToRenderPerBatch={2}
        windowSize={3}
        initialNumToRender={2}
        contentContainerStyle={{
          paddingVertical: 16,
          paddingTop: insets.top,
        }}
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      />

      <View
        style={[
          styles.stickyHeader,
          {
            paddingTop: insets.top + 10,
            height: insets.top + 70,
          },
        ]}
      >
        <Animated.View
          style={[styles.blurBackground, { opacity: headerOpacity }]}
        >
          <BlurView
            intensity={80}
            tint="light"
            style={StyleSheet.absoluteFillObject}
          />
          <LinearGradient
            colors={["rgba(255,255,255,0.3)", "rgba(255,255,255,0.1)"]}
            style={StyleSheet.absoluteFillObject}
          />
        </Animated.View>

        <View style={styles.headerContent}>
          <View className="flex-row gap-2">
            <Image
              source={{
                uri: user?.profilePicture,
              }}
              style={{
                width: 50,
                height: 50,
                borderRadius: 99,
                borderWidth: 2,
                borderColor: isScrolling
                  ? "rgba(255,255,255,0.3)"
                  : "transparent",
              }}
            />
            <View>
              <ThemedText type="defaultSemiBold">Hi</ThemedText>
              <ThemedText type="defaultSemiBold">{user?.name}</ThemedText>
            </View>
          </View>

          <TouchableOpacity style={styles.notificationContainer}>
            <Ionicons
              name="notifications-outline"
              size={27}
              color="black"
              style={{
                opacity: isScrolling ? 0.8 : 1,
              }}
            />
            <View style={styles.notificationIndicator} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bannerContainer: {
    width: width - 32,
    height: 60,
    borderRadius: 16,
    marginHorizontal: 16,
    marginVertical: 20,
  },
  content: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  stickyHeader: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
  },
  blurBackground: {
    ...StyleSheet.absoluteFillObject,
    borderBottomWidth: 0.5,
    borderBottomColor: "rgba(0,0,0,0.1)",
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingBottom: 10,
  },
  notificationContainer: {
    backgroundColor: "rgba(255,255,255,0.2)",
    padding: 8,
    borderRadius: 12,
    backdropFilter: "blur(10px)",
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 12,
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  notificationIndicator: {
    position: "absolute",
    top: 11,
    right: 12,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#31a683",
  },
});
