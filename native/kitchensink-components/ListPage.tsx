import { AnimatePresence, Motion } from "@legendapp/motion";
import { useRouter } from "expo-router";
import { Heart } from "lucide-react-native";
import React from "react";
import { ScrollView } from "react-native";
import {
  Box,
  Grid,
  GridItem,
  HStack,
  Icon,
  Image,
  Pressable,
  Skeleton,
  SkeletonText,
  Text,
  VStack
} from "../components/ui";

const ListPage = ({
  items,
  loading = false,
}: {
  items: any[];
  loading?: boolean;
}) => {
  return (
    <ScrollView style={{ display: "flex" }}>
      <Grid className="px-5 py-4 gap-4"  _extra={{ className: "grid-cols-2 md:grid-cols-3 lg:grid-cols-4" }}>
        {loading
          ? Array.from({ length: 10 }).map((_, index: number) => {
              return (<GridItem key={`skeleton-${index}`} _extra={{ className: "col-span-1" }}>
                <ListItemSkeleton index={index} />
              </GridItem>
              );
            })
          : items.map((item: any, index: any) => {
              return <GridItem key={`item-${index}`} _extra={{ className: "col-span-1" }}>
              <ListItem item={item} index={index} />
            </GridItem>
            })}
      </Grid>
    </ScrollView>
  );
};

const ListItemSkeleton = ({ index }: { index: number }) => {
  return (
    <Box
      key={`skeleton-${index}`}
      className={`flex-1 lg:my-0 mr-0 relative ${
        index === 0 ? "lg:ml-0" : "lg:ml-2"
      }`}
    >
      <Box className="w-full">
        <Box className="overflow-hidden rounded-md aspect-[3/4] ">
          <Skeleton className="w-full " />
        </Box>
      </Box>

      <Skeleton className="absolute top-3 right-4 h-6 w-6 rounded-full" />

      <HStack className="justify-between py-2 items-start">
        <VStack space="sm" className="flex-1">
          <SkeletonText _lines={1} className="h-6 w-3/4" />
          <SkeletonText _lines={1} className="h-5 w-full" />
        </VStack>
        <HStack className="items-center flex-start">
          <Skeleton className="h-4 w-4 rounded" />
          <Skeleton className="h-4 w-8 ml-1" />
        </HStack>
      </HStack>
    </Box>
  );
};

const ListItem = ({ item, index }: { item: any; index: number }) => {
  const [likes, setLikes]: any = React.useState([]);
  const router = useRouter();

  return (
    <Box
      key={index}
    >
      <Pressable
        className="w-full flex-1"
        onPress={() => {
          router.navigate(`/comic/1`);
        }}
      >
        {(props: any) => {
          return (
            <>
              <Box className="overflow-hidden rounded-md">
                <Image
                  source={item.src}
                  size="full"
                  className={`w-full aspect-[3/4] ${
                    props.hovered
                      ? "scale-[1.04] opacity-90"
                      : "scale-100 opacity-100"
                  }`}
                  alt="Explore"
                />
              </Box>
            </>
          );
        }}
      </Pressable>

      <Pressable
        onPress={() => {
          if (likes.includes(item.title)) {
            const newLikes = likes.filter((like: any) => like !== item.title);
            setLikes(newLikes);
            return;
          } else {
            setLikes([...likes, item.title]);
          }
        }}
        className="absolute top-3 right-4 h-6 w-6 justify-center items-center"
      >
        <AnimatePresence>
          <Motion.View
            key={likes.includes(item.title) ? "liked" : "unliked"}
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
              size="lg"
              className={`${
                likes.includes(item.title)
                  ? "fill-red-500 stroke-red-500"
                  : "fill-gray-500 stroke-white"
              }`}
            />
          </Motion.View>
        </AnimatePresence>
      </Pressable>

      <HStack className="justify-between py-2 items-start">
        <VStack space="sm" className="flex-1">
          <Text isTruncated={true} className="font-semibold text-typography-900">
            {item.title}
          </Text>
          <Text size="sm" isTruncated={true} numberOfLines={1} className="text-typography-500">
            {item.location}
            {item.location}
          </Text>
        </VStack>
      </HStack>
    </Box>
  );
};

export default ListPage;
