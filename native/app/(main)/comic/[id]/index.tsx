import { Box } from "@/components/ui";
import ComicDetailPage, {
  ComicDetailPageSkeleton,
} from "@/kitchensink-components/ComicDetailPage";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";

// 模拟漫画数据
const mockComics: Record<string, any> = {
  "1": {
    id: "1",
    title: "cas123",
    cover: require("@/assets/display/image16.png"),
    description: "111",
    rating: 4.9,
    like: false,
    volumes: [
      {
        id: "v1",
        volumeNumber: 1,
        title: "冒险的开始",
        cover: require("@/assets/display/image17.png"),
      },
      {
        id: "v2",
        volumeNumber: 2,
        title: "巴基船长",
        cover: require("@/assets/display/image18.png"),
      },
      {
        id: "v3",
        volumeNumber: 3,
        title: "摩根vs路飞",
        cover: require("@/assets/display/image19.png"),
      },
      {
        id: "v4",
        volumeNumber: 4,
        title: "路飞和卓洛",
        cover: require("@/assets/display/image20.png"),
      },
      {
        id: "v5",
        volumeNumber: 5,
        title: "谁怕谁",
        cover: require("@/assets/display/image21.png"),
      },
      {
        id: "v6",
        volumeNumber: 6,
        title: "第一个人",
        cover: require("@/assets/display/image22.png"),
      },
      {
        id: "v7",
        volumeNumber: 7,
        title: "可可亚西村的魔女",
        cover: require("@/assets/display/image23.png"),
      },
      {
        id: "v8",
        volumeNumber: 8,
        title: "我不会死的",
        cover: require("@/assets/display/image24.png"),
      },
    ],
  },
  "2": {
    id: "2",
    title: "火影忍者",
    cover: require("@/assets/display/image25.png"),
    description:
      "《火影忍者》是日本漫画家岸本齐史创作的少年漫画，自1999年开始在《周刊少年Jump》上连载。故事围绕忍者世界展开，讲述了主人公漩涡鸣人为了实现成为火影的梦想，不断努力成长的故事。",
    rating: 4.8,
    like: true,
    volumes: [
      {
        id: "v1",
        volumeNumber: 1,
        title: "漩涡鸣人",
        cover: require("@/assets/display/image26.png"),
      },
      {
        id: "v2",
        volumeNumber: 2,
        title: "最差劲的委托人",
        cover: require("@/assets/display/image27.png"),
      },
      {
        id: "v3",
        volumeNumber: 3,
        title: "为了梦想",
        cover: require("@/assets/display/image28.png"),
      },
    ],
  },
};

export default function ComicDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [comic, setComic] = useState<any>(null);

  // 模拟数据获取
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      const comicData = mockComics[id || "1"];
      if (comicData) {
        setComic(comicData);
      }
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [id]);

  const handleBack = () => {
    router.back();
  };

  const handleLikeToggle = (isLiked: boolean) => {
    if (comic) {
      setComic({ ...comic, like: isLiked });
      // 这里可以添加保存到本地存储或发送到服务器的逻辑
    }
  };

  if (loading || !comic) {
    return (
      <Box className="flex-1">
        {/* 可以添加骨架屏 */}
        <ComicDetailPageSkeleton />
      </Box>
    );
  }

  return (
    <Box className="flex-1">
      <ComicDetailPage
        comic={comic}
        onLikeToggle={handleLikeToggle}
        onBack={handleBack}
      />
    </Box>
  );
}
