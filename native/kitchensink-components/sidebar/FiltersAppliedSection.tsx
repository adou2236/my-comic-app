import React, { useContext } from "react";
import {
  Badge,
  BadgeText,
  Box,
  Button,
  HStack,
  Icon,
  Pressable,
  Text,
  CloseIcon,
  Input,
  InputField,
  InputIcon,
  InputSlot,
  SearchIcon,
  ButtonText,
} from "../../components/ui";
import { ThemeContext } from "@/app/_layout";

const FiltersAppliedSection = () => {
  const { colorMode } = useContext(ThemeContext);
  const filters = ["Private room", "Wifi", "Air conditioning"];
  const [appliedFilters, setAppliedFilters]: any = React.useState(filters);

  return (
    <>
      <Box className="w-full">
        <Input variant="rounded" size="sm" className="w-full h-10">
          <InputField placeholder="Anywhere • Any week • Add guests" />
          <InputSlot className="bg-primary-500 rounded-full h-6 w-6 m-1.5">
            <InputIcon
              as={SearchIcon}
              color={colorMode === "light" ? "#FEFEFF" : "#171717"}
            />
          </InputSlot>
        </Input>
      </Box>
      {/* <Box className="border rounded-md p-4 border-outline-100">
      <HStack className="justify-between items-center">
        <Text size="sm" className="font-medium">
          Filters applied
        </Text>
        <Button
          variant="link"
          size="xs"
          onPress={() => {
            setAppliedFilters([]);
          }}
          className={`${appliedFilters.length === 0 ? "hidden" : "flex"} p-0`}
        >
          <ButtonText>Clear all</ButtonText>
        </Button>
      </HStack>

      <HStack space="sm" className='flex-wrap'>
        {appliedFilters?.map((item: any) => (
          <Badge
            action="muted"
            key={item}
            className="rounded-full px-2.5 py-2 mt-3 items-center">
            <BadgeText className="normal-case text-typography-900">
              {item}
            </BadgeText>
            <Pressable
              className="ml-2 rounded-full"
              onPress={() => {
                const newFilters = appliedFilters.filter((item1: any) => {
                  return item1 !== item;
                });
                setAppliedFilters(newFilters);
              }}
            >
              <Icon
                as={CloseIcon}
                size="sm"
                color={colorMode==='light' ? '#747474' : '#D5D4D4'}
              />
            </Pressable>
          </Badge>
        ))}
      </HStack>
    </Box> */}
    </>
  );
};
export default FiltersAppliedSection;
