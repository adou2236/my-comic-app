import {
  HStack,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text,
  VStack
} from "@/components/ui";


type ProgressControlProps = {
  currentPage: number;
  totalPage: number;
  onPageChange: (page: number) => void;
};

const ProgressControl = ({
  currentPage,
  totalPage,
  onPageChange,
}: ProgressControlProps) => {
  return (
    <VStack className="gap-2">
      <HStack className="justify-between items-center">
        <Text className="text-xs mb-2">阅读进度</Text>
        <Text className="text-xs ">
          {currentPage + 1} / {totalPage}
        </Text>
      </HStack>
      <Slider
        value={currentPage}
        minValue={0}
        maxValue={totalPage - 1}
        size="md"
        orientation="horizontal"
        isDisabled={false}
        isReversed={false}
        onChange={onPageChange}
      >
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb />
      </Slider>
      
    </VStack>
  )
}

export default ProgressControl;
