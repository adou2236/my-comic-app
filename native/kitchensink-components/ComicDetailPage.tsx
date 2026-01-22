import { AnimatePresence, Motion } from "@legendapp/motion";
import { useRouter } from "expo-router";
import { ChevronDown, ChevronUp, Heart } from "lucide-react-native";
import React from "react";
import { ScrollView, Text } from "react-native";
import {
  Badge,
  BadgeText,
  Box,
  Grid,
  GridItem,
  HStack,
  Heading,
  Icon,
  Image,
  Pressable,
  Skeleton,
  SkeletonText,
  StarIcon,
  VStack,
} from "../components/ui";

type Volume = {
  id: string;
  volumeNumber: number;
  title: string;
  cover: any;
};

type ComicDetailPageProps = {
  comic: {
    id: string;
    title: string;
    cover: any;
    description: string;
    rating: number;
    volumes: Volume[];
    like?: boolean;
  };
  onLikeToggle?: (like: boolean) => void;
  onBack?: () => void;
};

const ComicDetailPage = ({
  comic,
  onLikeToggle,
  onBack,
}: ComicDetailPageProps) => {
  const [isLiked, setIsLiked] = React.useState(comic.like || false);
  const [isDescriptionExpanded, setIsDescriptionExpanded] =
    React.useState(true);

  const handleLikeToggle = () => {
    const newLikeState = !isLiked;
    setIsLiked(newLikeState);
    onLikeToggle?.(newLikeState);
  };

  // 判断描述是否需要折叠（超过3行）
  const shouldTruncate = comic.description.length > 100; // 粗略估算3行文字

  const router = useRouter();

  return (
    <ScrollView className="flex-1 " contentContainerStyle={{ flexGrow: 1 }}>
      <Box className="flex-1">
        {/* 收藏按钮 - 右上角 */}

        {/* 主要内容区域 - 响应式布局 */}
        <VStack className="px-4 md:px-8 py-6 md:py-8 gap-6 md:gap-8">
          {/* 头部区域：移动端横向排列，桌面端保持现有布局 */}
          <Box className="flex-row gap-4 md:gap-8">
            {/* 封面区域 - 移动端较小，桌面端固定左侧 */}
            <Box className="w-32 md:w-64 lg:w-72 flex-shrink-0 md:sticky md:top-8 md:self-start">
              <Box className="overflow-hidden rounded-lg shadow-lg">
                <Image
                  source={comic.cover}
                  size="full"
                  className="w-full aspect-[3/4] flex-1"
                  alt={comic.title}
                />
              </Box>
            </Box>

            {/* 信息区域 */}
            <VStack className="flex-1 gap-4 md:gap-6">
              {/* 标题 */}
              <Heading
                size="2xl"
                className="flex gap-3 items-center text-typography-900 font-bold"
              >
                {comic.title}
                <Pressable
                  onPress={handleLikeToggle}
                  className="relative w-5 h-5"
                >
                  <AnimatePresence>
                    <Motion.View
                      key={isLiked ? "liked" : "unliked"}
                      initial={{
                        scale: 1.3,
                      }}
                      animate={{
                        scale: 1,
                      }}
                      exit={{
                        scale: 0.9,
                      }}
                      transition={{
                        type: "spring",
                        mass: 0.9,
                        damping: 9,
                        stiffness: 300,
                      }}
                      style={{
                        position: "absolute",
                      }}
                    >
                      <Icon
                        as={Heart}
                        style={{
                          position: "relative",
                        }}
                        size="xl"
                        className={`${
                          isLiked
                            ? "fill-red-500 stroke-red-500"
                            : "fill-gray-500 stroke-gray-500 dark:stroke-gray-400"
                        }`}
                      />
                    </Motion.View>
                  </AnimatePresence>
                </Pressable>
              </Heading>

              {/* 评分和收藏状态 */}
              <HStack className="items-center gap-4">
                <HStack className="items-center gap-2">
                  <Icon
                    as={StarIcon}
                    size="md"
                    className="stroke-yellow-500 fill-yellow-500"
                  />
                  <Text className="text-typography-900 font-semibold">
                    {comic.rating}
                  </Text>
                </HStack>
              </HStack>

              {/* 描述 - 支持折叠 - 桌面端显示在详情内 */}
              <VStack className="gap-2 hidden md:flex">
                <Heading
                  size="md"
                  className="text-typography-700 dark:text-typography-300"
                >
                  简介
                </Heading>
                <VStack className="gap-1">
                  <Text
                    numberOfLines={!isDescriptionExpanded ? 3 : undefined}
                    onTextLayout={(e) => {
                      const lines = e.nativeEvent.lines;
                      setIsDescriptionExpanded(lines.length > 3);
                    }}
                    className="text-typography-600 leading-6"
                  >
                    {comic.description}
                  </Text>
                  {shouldTruncate && (
                    <Pressable
                      onPress={() =>
                        setIsDescriptionExpanded(!isDescriptionExpanded)
                      }
                      className="self-start"
                    >
                      <HStack className="items-center gap-1">
                        <Text className="text-primary-500">
                          {isDescriptionExpanded ? "收起" : "展开"}
                        </Text>
                        <Icon
                          as={isDescriptionExpanded ? ChevronUp : ChevronDown}
                          size="sm"
                          className="text-primary-500"
                        />
                      </HStack>
                    </Pressable>
                  )}
                </VStack>
              </VStack>
            </VStack>
          </Box>
        </VStack>
        {/* 简介区域  */}
        <VStack className="md:hidden px-4 md:px-8 py-6 md:py-8 gap-6 md:gap-8">
          <Heading size="md" className="text-typography-700">
            简介
          </Heading>
          <VStack className="gap-1">
            <Text
              numberOfLines={!isDescriptionExpanded ? 3 : undefined}
              onTextLayout={(e) => {
                const lines = e.nativeEvent.lines;
                setIsDescriptionExpanded(lines.length > 3);
              }}
              className="text-typography-600 leading-6"
            >
              {comic.description}
            </Text>
            {shouldTruncate && (
              <Pressable
                onPress={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                className="self-start"
              >
                <HStack className="items-center gap-1">
                  <Text className="text-primary-500">
                    {isDescriptionExpanded ? "收起" : "展开"}
                  </Text>
                  <Icon
                    as={isDescriptionExpanded ? ChevronUp : ChevronDown}
                    size="sm"
                    className="text-primary-500"
                  />
                </HStack>
              </Pressable>
            )}
          </VStack>
        </VStack>

        {/* 卷集列表  */}
        <VStack className="px-4 md:px-8  gap-6 md:gap-8">
          <Heading size="md" className="text-typography-700">
            卷集 ({comic.volumes.length})
          </Heading>
          <Grid className="flex-row flex-wrap gap-2" _extra={{ className: "grid-cols-3 md:grid-cols-4 lg:grid-cols-5" }}>
            {comic.volumes.map((volume) => (
              <GridItem key={volume.id} _extra={{ className: "col-span-1" }}>
                <Pressable
                key={volume.id}
                onPress={() => {
                  router.push(`/comic/${comic.id}/${volume.id}`);
                }}
              >
                <Badge
                  action="muted"
                  variant="outline"
                  className="rounded-full border-outline-200 bg-background-50 data-[hover=true]:bg-background-100 dark:data-[hover=true]:bg-background-800 transition-colors items-center justify-center"
                >
                  <BadgeText
                    numberOfLines={1}
                    className="normal-case text-typography-900 text-sm text-center"
                  >
                    第{volume.volumeNumber}卷 {volume.title}
                  </BadgeText>
                </Badge>
              </Pressable>
              </GridItem>
              
            ))}
          </Grid>
        </VStack>
      </Box>
    </ScrollView>
  );
};

const ComicDetailPageSkeleton = () => {
  return (
    <ScrollView className="flex-1" contentContainerStyle={{ flexGrow: 1 }}>
      <Box className="flex-1">
        {/* 主要内容区域 - 响应式布局 */}
        <VStack className="px-4 md:px-8 py-6 md:py-8 gap-6 md:gap-8">
          {/* 头部区域：移动端横向排列，桌面端保持现有布局 */}
          <HStack className="gap-4 md:gap-8">
            {/* 封面区域骨架 - 移动端较小，桌面端固定左侧 */}
            <Box className="w-32 md:w-64 lg:w-72 flex-shrink-0 md:sticky md:top-8 md:self-start aspect-[3/4]">
              <Box className="overflow-hidden rounded-lg shadow-lg">
                <Skeleton className="w-full aspect-[3/4]" />
              </Box>
            </Box>

            {/* 信息区域骨架 */}
            <VStack className="w-full flex-1 gap-4 md:gap-6">
              {/* 标题和收藏按钮骨架 */}
              <HStack className="w-full items-center gap-3">
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-5 w-5 rounded-full" />
              </HStack>

              {/* 评分骨架 */}
              <HStack className="items-center gap-2">
                <Skeleton className="h-5 w-5 rounded" />
                <Skeleton className="h-6 w-12" />
              </HStack>

              {/* 描述骨架 - 桌面端显示在详情内 */}
              <VStack className="gap-2 hidden md:flex">
                <Skeleton className="h-6 w-16" />
                <VStack className="gap-2">
                  <SkeletonText _lines={1} className="h-3" />
                </VStack>
              </VStack>
            </VStack>
          </HStack>
        </VStack>

        {/* 简介区域骨架 - 移动端独立显示 */}
        <VStack className="md:hidden px-4 md:px-8 py-6 md:py-8 gap-6 md:gap-8">
          <Skeleton className="h-6 w-16" />
          <VStack className="gap-2">
            <SkeletonText _lines={3} className="h-3" />
          </VStack>
        </VStack>

        {/* 卷集列表骨架 */}
        <VStack className="px-4 md:px-8 gap-6 md:gap-8">
          <Skeleton className="h-6 w-24" />
          <Box className="flex-row flex-wrap gap-2">
            {[100, 120, 90, 110, 95, 105].map((width, index) => (
              <Skeleton
                key={index}
                className="h-8 rounded-full"
                style={{ width }}
              />
            ))}
          </Box>
        </VStack>
      </Box>
    </ScrollView>
  );
};

export default ComicDetailPage;
export { ComicDetailPageSkeleton };
