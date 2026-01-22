import React from "react";
import { Box, Pressable, ScrollView, Text, VStack } from "@/components/ui";

type Volume = {
  id: string;
  volumeNumber: number;
  title: string;
};

type VolumeListProps = {
  volumes: Volume[];
  currentVolumeId: string;
  onVolumeChange: (volumeId: string) => void;
};

const VolumeList = ({
  volumes,
  currentVolumeId,
  onVolumeChange,
}: VolumeListProps) => {
  return (
    <ScrollView className="flex-1">
      <VStack className="p-4 gap-2">
        {volumes.map((volume) => {
          const isActive = volume.id === currentVolumeId;
          return (
            <Pressable
              key={volume.id}
              onPress={() => onVolumeChange(volume.id)}
              className={`p-3 rounded-lg ${
                isActive
                  ? "bg-primary-100 dark:bg-primary-900 border border-primary-500 dark:border-primary-600"
                  : "bg-background-50 dark:bg-background-900 border border-outline-200 dark:border-outline-800"
              }`}
            >
              <Text
                className={`text-sm ${
                  isActive
                    ? "text-primary-700 dark:text-primary-300 font-semibold"
                    : "text-typography-700 dark:text-typography-300"
                }`}
              >
                第 {volume.volumeNumber} 卷
              </Text>
              <Text
                className={`text-xs mt-1 ${
                  isActive
                    ? "text-primary-600 dark:text-primary-400"
                    : "text-typography-500 dark:text-typography-400"
                }`}
              >
                {volume.title}
              </Text>
            </Pressable>
          );
        })}
      </VStack>
    </ScrollView>
  );
};

export default VolumeList;

