import { ThemedText } from "@/components/ThemedText";
import { ISusuGroups } from "@/types/susuGroups.types";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Image, TouchableOpacity, View } from "react-native";

interface PublicSuSuCardProps {
  data: ISusuGroups;
}
export default function PublicSuSuCard(data: PublicSuSuCardProps) {
  return (
    <TouchableOpacity className="border border-[#C5BEE2] bg-[#F3F0F9] p-5 rounded-xl flex-row items-center justify-between">
      <View className="flex-row items-center gap-4">
        <View className="bg-white p-2 rounded-full">
          <MaterialIcons name="savings" size={30} color="#C5BEE2" />
        </View>

        <View>
          <ThemedText type="defaultSemiBold">
            {data?.data.description}
          </ThemedText>
          <ThemedText type="default">12 members left</ThemedText>
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
      </View>

      <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
    </TouchableOpacity>
  );
}
