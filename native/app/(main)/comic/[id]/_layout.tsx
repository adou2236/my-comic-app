import { ThemeContext } from "@/app/_layout";

import { Box } from "@/components/ui";
import { Stack, useLocalSearchParams } from "expo-router";
import { createContext, useContext, useEffect, useState } from "react";
import { Platform } from "react-native";
// 模拟漫画数据（与 [id].tsx 保持一致）
const mockComics: Record<string, any> = {
  "1": {
    id: "1",
    title: "cas123",
    volumes: [
      {
        id: "v1",
        volumeNumber: 1,
        totalPage: 40,
        title: "冒险的开始",
      },
      {
        id: "v2",
        volumeNumber: 2,
        totalPage: 100,
        title: "巴基船长",
      },
      {
        id: "v3",
        volumeNumber: 3,
        totalPage: 100,
        title: "摩根vs路飞",
      },
      {
        id: "v4",
        volumeNumber: 4,
        totalPage: 100,
        title: "路飞和卓洛",
      },
      {
        id: "v5",
        volumeNumber: 5,
        totalPage: 100,
        title: "谁怕谁",
      },
      {
        id: "v6",
        volumeNumber: 6,
        totalPage: 100,
        title: "第一个人",
      },
      {
        id: "v7",
        volumeNumber: 7,
        totalPage: 100,
        title: "可可亚西村的魔女",
      },
      {
        id: "v8",
        volumeNumber: 8,
        totalPage: 100,
        title: "我不会死的",
      },
      {
        id: "v9",
        volumeNumber: 9,
        totalPage: 100,
        title: "我不会死的2",
      },
      {
        id: "v10",
        volumeNumber: 10,
        totalPage: 100,
        title: "我不会死的3",
      },
    ],
  },
  "2": {
    id: "2",
    title: "火影忍者",
    volumes: [
      {
        id: "v1",
        volumeNumber: 1,
        totalPage: 100,
        title: "漩涡鸣人",
      },
      {
        id: "v2",
        volumeNumber: 2,
        totalPage: 100,
        title: "最差劲的委托人",
      },
      {
        id: "v3",
        volumeNumber: 3,
        totalPage: 100,
        title: "为了梦想",
      },
    ],
  },
};

// 创建 Context
export const ComicContext = createContext<{
  comic: any;
  loading: boolean;
} | null>(null);

export const useComic = () => {
  const context = useContext(ComicContext);
  if (!context) {
    throw new Error("useComic must be used within ComicLayout");
  }
  return context;
};

export default function StackLayout() {
  const { colorMode } = useContext(ThemeContext);
  const { id } = useLocalSearchParams<{
    id: string;
  }>();
  const [comic, setComic] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      const comicData = mockComics[id || "1"];
      if (comicData) {
        setComic(comicData);
      }
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [id]);

  if (loading || !comic) {
    return (
      <Box className="flex-1 items-center justify-center">
        {/* 可以添加骨架屏 */}
      </Box>
    );
  }

  return (
    <>
      {/* web */}
      <ComicContext.Provider value={{ comic, loading }}>
        <Stack
          screenOptions={{
            headerStyle: {
              backgroundColor: colorMode === "light" ? "#FBFBFB" : "#181719",
              borderBottomColor:
                colorMode === "light"
                  ? "rgb(var(--color-outline-50))"
                  : "rgb(var(--color-outline-900))",
            },
            headerTintColor: colorMode === "light" ? "black" : "white",
            contentStyle: {
              backgroundColor: colorMode === "light" ? "#FBFBFB" : "#181719",
            },
          }}
        >
          <Stack.Screen
            name="index"
            options={{
              headerTitle: comic.title,
              headerTitleAlign: "center",
            }}
          />
          <Stack.Screen
            name="[volumId]"
            options={{
             
              headerTitle: comic.title,
              headerTitleAlign: "center",
              headerShown: Platform.OS === "web",
              
            }}
          />
        </Stack>
      </ComicContext.Provider>
    </>
  );
}
