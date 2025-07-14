import { ThemedText } from "@/components/ThemedText";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

interface SusuCardProps {
  data: any;
}

export default function SusuCard({ data }: SusuCardProps) {
  return (
    <TouchableOpacity
      style={{
        height: 220,
        width: 230,
      }}
      className="border border-[#31a683] rounded-xl bg-[#E6F7F2] p-4 gap-4 overflow-hidden"
    >
      <MaterialIcons
        name="keyboard-arrow-left"
        size={120}
        color="#31a683"
        style={{
          position: "absolute",
          bottom: -25,
          right: -52,
          opacity: 0.09,
          rotation: 5,
          zIndex: 0,
        }}
      />

      <View className="flex-row items-center justify-between z-10">
        <View className="bg-white p-2 rounded-full">
          <MaterialIcons name="savings" size={24} color="#31a683" />
        </View>
        <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
      </View>

      <View className="w-52 z-10">
        <ThemedText type="subtitle">20gh daily for 1k cashout</ThemedText>
      </View>

      <View className="flex-row items-center justify-between z-10">
        <View>
          <ThemedText type="default">12 members</ThemedText>

          <View className="flex-row items-center mt-1">
            {Array.from({ length: 5 }).map((_, index) => (
              <Image
                key={index}
                source={{
                  uri: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGVyc29ufGVufDB8fDB8fHww",
                }}
                style={{
                  width: 35,
                  height: 35,
                  borderRadius: 99,
                  marginLeft: index === 0 ? 0 : -18,
                  borderWidth: 2,
                  borderColor: "#fff",
                  zIndex: 5 - index,
                }}
              />
            ))}
          </View>
        </View>

        <View className="bg-white p-2 rounded-xl">
          <Text className="font-medium text-md">Private</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
