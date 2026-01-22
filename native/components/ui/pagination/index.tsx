"use client";
import {
  tva,
  useStyleContext,
  withStyleContext,
  type VariantProps,
} from "@gluestack-ui/utils/nativewind-utils";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
} from "lucide-react-native";
import React, { useMemo } from "react";
import { Pressable, Text, View } from "react-native";
import { HStack } from "../hstack";
import { Icon } from "../icon";

const SCOPE = "PAGINATION";

const Root = withStyleContext(View, SCOPE);

const paginationStyle = tva({
  base: "flex-row items-center justify-center",
  variants: {
    size: {
      xs: "gap-1",
      sm: "gap-1.5",
      md: "gap-2",
      lg: "gap-2.5",
      xl: "gap-3",
    },
  },
});

const paginationItemStyle = tva({
  base: "rounded-md items-center justify-center data-[focus-visible=true]:web:outline-none data-[focus-visible=true]:web:ring-2 data-[focus-visible=true]:web:ring-indicator-info data-[disabled=true]:opacity-40 transition-colors",
  variants: {
    variant: {
      default:
        "bg-background-0 border border-outline-200  text-typography-700 data-[hover=true]:bg-background-50 ",
      active: "bg-primary-500 text-typography-0 border-primary-500",
    },
    size: {
      xs: "h-7 w-7 min-w-7",
      sm: "h-8 w-8 min-w-8",
      md: "h-9 w-9 min-w-9",
      lg: "h-10 w-10 min-w-10",
      xl: "h-11 w-11 min-w-11",
    },
  },
});

const paginationButtonStyle = tva({
  base: "rounded-md items-center justify-center data-[focus-visible=true]:web:outline-none data-[focus-visible=true]:web:ring-2 data-[focus-visible=true]:web:ring-indicator-info data-[disabled=true]:opacity-40 transition-colors bg-background-0  border border-outline-200  text-typography-700  data-[hover=true]:bg-background-50 ",
  variants: {
    size: {
      xs: "h-7 px-2",
      sm: "h-8 px-2.5",
      md: "h-9 px-3",
      lg: "h-10 px-3.5",
      xl: "h-11 px-4",
    },
  },
});

const paginationTextStyle = tva({
  base: "text-typography-600 ",
  variants: {
    size: {
      xs: "text-xs",
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
      xl: "text-xl",
    },
  },
});

type IPaginationProps = React.ComponentPropsWithoutRef<typeof View> &
  VariantProps<typeof paginationStyle> & {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    className?: string;
    showFirstLast?: boolean;
    siblingCount?: number;
  };

// 计算要显示的页码数组
const getPageNumbers = (
  currentPage: number,
  totalPages: number,
  siblingCount: number = 1
): (number | string)[] => {
  const totalNumbers = siblingCount * 2 + 5; // 当前页 + 两侧页码 + 首尾 + 省略号
  const totalBlocks = totalNumbers + 2; // 加上两个省略号

  if (totalPages <= totalBlocks) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
  const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

  const shouldShowLeftEllipsis = leftSiblingIndex > 2;
  const shouldShowRightEllipsis = rightSiblingIndex < totalPages - 1;

  if (!shouldShowLeftEllipsis && shouldShowRightEllipsis) {
    const leftItemCount = 3 + 2 * siblingCount;
    const leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1);
    return [...leftRange, "ellipsis", totalPages];
  }

  if (shouldShowLeftEllipsis && !shouldShowRightEllipsis) {
    const rightItemCount = 3 + 2 * siblingCount;
    const rightRange = Array.from(
      { length: rightItemCount },
      (_, i) => totalPages - rightItemCount + i + 1
    );
    return [1, "ellipsis", ...rightRange];
  }

  if (shouldShowLeftEllipsis && shouldShowRightEllipsis) {
    const middleRange = Array.from(
      { length: rightSiblingIndex - leftSiblingIndex + 1 },
      (_, i) => leftSiblingIndex + i
    );
    return [1, "ellipsis", ...middleRange, "ellipsis", totalPages];
  }

  return Array.from({ length: totalPages }, (_, i) => i + 1);
};

const Pagination = React.forwardRef<
  React.ComponentRef<typeof View>,
  IPaginationProps
>(
  (
    {
      className,
      currentPage,
      totalPages,
      onPageChange,
      size = "md",
      showFirstLast = false,
      siblingCount = 1,
      ...props
    },
    ref
  ) => {
    const pageNumbers = useMemo(
      () => getPageNumbers(currentPage, totalPages, siblingCount),
      [currentPage, totalPages, siblingCount]
    );

    const handlePrevPage = () => {
      if (currentPage > 1) {
        onPageChange(currentPage - 1);
      }
    };

    const handleNextPage = () => {
      if (currentPage < totalPages) {
        onPageChange(currentPage + 1);
      }
    };

    const handleFirstPage = () => {
      onPageChange(1);
    };

    const handleLastPage = () => {
      onPageChange(totalPages);
    };

    return (
      <Root
        ref={ref}
        className={paginationStyle({ size, class: className })}
        context={{ size }}
        {...props}
      >
        <HStack className="items-center gap-2">
          {/* 移动端：仅显示上一页/下一页 */}
          <HStack className="flex md:hidden items-center gap-2">
            <PaginationButton
              direction="prev"
              onPress={handlePrevPage}
              disabled={currentPage === 1}
              size={size}
            />
            <PaginationText size={size}>
              {currentPage} / {totalPages}
            </PaginationText>
            <PaginationButton
              direction="next"
              onPress={handleNextPage}
              disabled={currentPage === totalPages}
              size={size}
            />
          </HStack>

          {/* Web端：显示完整分页 */}
          <HStack className="hidden md:flex items-center gap-2">
            {showFirstLast && (
              <PaginationButton
                direction="first"
                onPress={handleFirstPage}
                disabled={currentPage === 1}
                size={size}
                aria-label="First page"
              />
            )}
            <PaginationButton
              direction="prev"
              onPress={handlePrevPage}
              disabled={currentPage === 1}
              size={size}
              aria-label="Previous page"
            />
            {pageNumbers.map((page, index) => {
              if (page === "ellipsis") {
                return (
                  <View
                    key={`ellipsis-${index}`}
                    className="px-2 items-center justify-center"
                  >
                    <Text className="text-typography-500 ">...</Text>
                  </View>
                );
              }
              return (
                <PaginationItem
                  key={page}
                  page={page as number}
                  isActive={currentPage === page}
                  onPress={() => onPageChange(page as number)}
                  size={size}
                />
              );
            })}
            <PaginationButton
              direction="next"
              onPress={handleNextPage}
              disabled={currentPage === totalPages}
              size={size}
              aria-label="Next page"
            />
            {showFirstLast && (
              <PaginationButton
                direction="last"
                onPress={handleLastPage}
                disabled={currentPage === totalPages}
                size={size}
                aria-label="Last page"
              />
            )}
          </HStack>
        </HStack>
      </Root>
    );
  }
);

Pagination.displayName = "Pagination";

type IPaginationItemProps = React.ComponentPropsWithoutRef<typeof Pressable> &
  VariantProps<typeof paginationItemStyle> & {
    page: number;
    isActive?: boolean;
    onPress: () => void;
    className?: string;
  };

const PaginationItem = React.forwardRef<
  React.ComponentRef<typeof Pressable>,
  IPaginationItemProps
>(({ className, page, isActive = false, onPress, size, ...props }, ref) => {
  const { size: parentSize } = useStyleContext(SCOPE);

  const itemSize = size || parentSize || "md";

  return (
    <Pressable
      ref={ref}
      onPress={onPress}
      disabled={isActive}
      className={paginationItemStyle({
        variant: isActive ? "active" : "default",
        size: itemSize,
        class: className,
      })}
      accessibilityRole="button"
      accessibilityState={{ selected: isActive }}
      accessibilityLabel={`Page ${page}`}
      {...props}
    >
      <Text
        className={`${
          isActive ? "text-typography-0" : "text-typography-700"
        } font-medium ${
          itemSize === "xs"
            ? "text-xs"
            : itemSize === "sm"
            ? "text-sm"
            : itemSize === "md"
            ? "text-base"
            : itemSize === "lg"
            ? "text-lg"
            : "text-xl"
        }`}
      >
        {page}
      </Text>
    </Pressable>
  );
});

PaginationItem.displayName = "PaginationItem";

type IPaginationButtonProps = React.ComponentPropsWithoutRef<typeof Pressable> &
  VariantProps<typeof paginationButtonStyle> & {
    direction: "prev" | "next" | "first" | "last";
    onPress: () => void;
    disabled?: boolean;
    className?: string;
    "aria-label"?: string;
  };

const PaginationButton = React.forwardRef<
  React.ComponentRef<typeof Pressable>,
  IPaginationButtonProps
>(
  (
    {
      className,
      direction,
      onPress,
      disabled = false,
      size,
      "aria-label": ariaLabel,
      ...props
    },
    ref
  ) => {
    const { size: parentSize } = useStyleContext(SCOPE);

    const buttonSize = size || parentSize || "md";

    const IconComponent =
      direction === "prev"
        ? ChevronLeftIcon
        : direction === "next"
        ? ChevronRightIcon
        : direction === "first"
        ? ChevronsLeftIcon
        : ChevronsRightIcon;

    return (
      <Pressable
        ref={ref}
        onPress={onPress}
        disabled={disabled}
        className={paginationButtonStyle({
          size: buttonSize,
          class: className,
        })}
        accessibilityRole="button"
        accessibilityState={{ disabled }}
        accessibilityLabel={
          ariaLabel ||
          `${
            direction === "prev"
              ? "Previous"
              : direction === "next"
              ? "Next"
              : direction === "first"
              ? "First"
              : "Last"
          } page`
        }
        {...props}
      >
        <Icon
          as={IconComponent}
          size={buttonSize}
          className="text-typography-700"
        />
      </Pressable>
    );
  }
);

PaginationButton.displayName = "PaginationButton";

type IPaginationTextProps = React.ComponentPropsWithoutRef<typeof Text> &
  VariantProps<typeof paginationTextStyle> & {
    className?: string;
    children: React.ReactNode;
  };

const PaginationText = React.forwardRef<
  React.ComponentRef<typeof Text>,
  IPaginationTextProps
>(({ className, size, children, ...props }, ref) => {
  const { size: parentSize } = useStyleContext(SCOPE);

  const textSize = size || parentSize || "md";

  return (
    <Text
      ref={ref}
      className={paginationTextStyle({
        size: textSize,
        class: className,
      })}
      {...props}
    >
      {children}
    </Text>
  );
});

PaginationText.displayName = "PaginationText";

export { Pagination, PaginationButton, PaginationItem, PaginationText };
