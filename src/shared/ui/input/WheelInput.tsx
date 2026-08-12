//created by claude.ai

import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import {
  Animated,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Text,
  View,
  ViewStyle,
} from 'react-native';

// Animated.FlatList's built-in typings can't carry a generic <T> through
// Animated.createAnimatedComponent, which is what causes the
// "Type 'T[]' is not assignable to WithAnimatedObject<ArrayLike<T>>" error.
// Casting to a plain generic class component sidesteps the broken typing
// while keeping the actual runtime behavior (still Animated.FlatList).
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList) as unknown as new <
  T
>() => FlatList<T>;

/**
 * Generic wheel-picker (iOS-style scrolling number/text selector).
 *
 * Pure JS/Animated implementation — no native modules, works in Expo Go,
 * looks identical on iOS and Android.
 *
 * NOTE on NativeWind: className only affects static layout (View wrappers,
 * paddings, widths). The moving parts (opacity/scale/color of each row) are
 * runtime interpolations tied to scroll position, so they're driven by
 * `style`, not `className` — NativeWind can't animate at runtime. Use the
 * color/size props below to theme the text instead of className.
 */

export type WheelPickerProps<T> = {
  data: T[];
  value: T;
  onChange: (value: T, index: number) => void;

  /** Height of a single row in px. Controls the scroll snap distance. */
  itemHeight?: number;
  /** How many rows are visible at once (odd number looks best). */
  visibleItems?: number;
  /**
   * Width of the numbers column — this is what the unit label sits
   * directly next to. If omitted, it's computed automatically from the
   * longest label in `data` so the column hugs its content. Pass a number
   * to override (e.g. to force two side-by-side pickers to line up on a
   * specific width).
   */
  width?: number | `${number}%`;

  labelExtractor?: (item: T) => string;
  keyExtractor?: (item: T, index: number) => string;

  /**
   * Optional static suffix rendered next to the picker, e.g. "cm", "kg".
   * It does NOT scroll or animate with the list — it's a fixed label beside
   * it, same as a real device picker. Attaching it to a specific scrolling
   * row instead (an earlier version of this component did that) means
   * re-running color/opacity/scale interpolation for that label on every
   * scroll frame just like the number itself, and it visibly lags/flickers
   * between rows while dragging since "centered" only updates once the
   * commited value changes. Keeping it static avoids both problems.
   */
  unit?: string;

  selectedColor?: string;
  unselectedColor?: string;
  selectedFontSize?: number;
  unselectedFontSize?: number;
  fontWeight?: '400' | '500' | '600' | '700' | '800';

  /** className for the OUTER wrapper only (layout, background, etc). */
  className?: string;
  style?: ViewStyle;
};

function WheelPickerInner<T>({
  data,
  value,
  onChange,
  itemHeight = 44,
  visibleItems = 5,
  width,
  labelExtractor = (item: T) => String(item),
  keyExtractor,
  unit,
  selectedColor = '#ffffff',
  unselectedColor = '#6b6b6b',
  selectedFontSize = 28,
  unselectedFontSize = 20,
  fontWeight = '700',
  className,
  style,
}: WheelPickerProps<T>) {
  const listRef = useRef<FlatList<T>>(null);
  const scrollY = useRef(new Animated.Value(0)).current;
  const isProgrammaticScroll = useRef(false);

  const containerHeight = itemHeight * visibleItems;
  const sidePadding = (containerHeight - itemHeight) / 2;

  // If no explicit width was passed, size the column to hug its own
  // content: longest label in `data` × a rough per-character width at
  // selectedFontSize (tabular-nums digits run about 0.62× the font size),
  // plus a little breathing room. This is an estimate, not a text
  // measurement, but it keeps the column from being noticeably wider than
  // its text — which is what was causing the number/unit to look
  // disconnected with random gaps between them.
  const autoWidth = useMemo(() => {
    const maxChars = data.reduce(
      (max, item) => Math.max(max, labelExtractor(item).length),
      1
    );
    return Math.ceil(maxChars * selectedFontSize * 0.62) + 8;
  }, [data, labelExtractor, selectedFontSize]);

  const columnWidth = width ?? autoWidth;

  const currentIndex = useMemo(() => {
    const i = data.indexOf(value);
    return i === -1 ? 0 : i;
  }, [data, value]);

  // Keep internal scroll position in sync when `value` changes externally
  // (e.g. a reset button, or two pickers controlling each other).
  useEffect(() => {
    isProgrammaticScroll.current = true;
    listRef.current?.scrollToOffset({
      offset: currentIndex * itemHeight,
      animated: true,
    });
    scrollY.setValue(currentIndex * itemHeight);
  }, [currentIndex]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    { useNativeDriver: false } // color interpolation needs the JS driver
  );

  const handleMomentumEnd = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      if (isProgrammaticScroll.current) {
        isProgrammaticScroll.current = false;
        return;
      }
      const rawIndex = Math.round(e.nativeEvent.contentOffset.y / itemHeight);
      const index = Math.min(Math.max(rawIndex, 0), data.length - 1);
      if (index !== currentIndex) onChange(data[index], index);
    },
    [data, itemHeight, currentIndex, onChange]
  );

  const renderItem = useCallback(
    ({ item, index }: { item: T; index: number }) => {
      const inputRange = [
        (index - 2) * itemHeight,
        (index - 1) * itemHeight,
        index * itemHeight,
        (index + 1) * itemHeight,
        (index + 2) * itemHeight,
      ];

      const opacity = scrollY.interpolate({
        inputRange,
        outputRange: [0.25, 0.55, 1, 0.55, 0.25],
        extrapolate: 'clamp',
      });
      const scale = scrollY.interpolate({
        inputRange,
        outputRange: [0.75, 0.88, 1, 0.88, 0.75],
        extrapolate: 'clamp',
      });
      const color = scrollY.interpolate({
        inputRange,
        outputRange: [
          unselectedColor,
          unselectedColor,
          selectedColor,
          unselectedColor,
          unselectedColor,
        ],
        extrapolate: 'clamp',
      });
      const fontSize = scrollY.interpolate({
        inputRange,
        outputRange: [
          unselectedFontSize,
          unselectedFontSize,
          selectedFontSize,
          unselectedFontSize,
          unselectedFontSize,
        ],
        extrapolate: 'clamp',
      });

      return (
        <View
          style={{ height: itemHeight, alignItems: 'center', justifyContent: 'center' }}
        >
          <Animated.Text
            style={{
              color,
              fontSize,
              fontWeight,
              opacity,
              transform: [{ scale }],
              // Tabular figures keep every digit the same width, so the
              // static unit label next to the list doesn't jitter
              // horizontally as the centered number changes digit count.
              fontVariant: ['tabular-nums'],
            }}
          >
            {labelExtractor(item)}
          </Animated.Text>
        </View>
      );
    },
    [
      itemHeight,
      scrollY,
      selectedColor,
      unselectedColor,
      selectedFontSize,
      unselectedFontSize,
      fontWeight,
      labelExtractor,
    ]
  );

  return (
    <View
      className={className}
      style={[
        {
          height: containerHeight,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          // Center the widget within its parent by default, regardless of
          // the parent's own alignItems — otherwise it hugs its own content
          // width and sits wherever the parent's default alignment puts it
          // (often the left edge). Override via style/className if you
          // want it to stretch full-width instead, e.g. alignSelf: 'stretch'.
          alignSelf: 'center',
        },
        style,
      ]}
    >
      <View style={{ width: columnWidth, height: containerHeight, overflow: 'hidden' }}>
        <AnimatedFlatList
          ref={listRef}
          data={data}
          keyExtractor={keyExtractor ?? ((item, i) => `${labelExtractor(item)}-${i}`)}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          snapToInterval={itemHeight}
          decelerationRate="fast"
          bounces={false}
          contentContainerStyle={{ paddingVertical: sidePadding }}
          getItemLayout={(_, index) => ({
            length: itemHeight,
            offset: itemHeight * index,
            index,
          })}
          initialScrollIndex={currentIndex}
          onScroll={handleScroll}
          onMomentumScrollEnd={handleMomentumEnd}
          scrollEventThrottle={16}
          style={{ height: containerHeight }}
        />
      </View>
      {unit ? (
        // Static — not tied to scroll position or the animated driver at
        // all, so it can't flicker/lag and costs nothing per frame.
        <Text
          style={{
            marginLeft: 4,
            fontSize: 14,
            fontWeight: '600',
            color: selectedColor,
          }}
        >
          {unit}
        </Text>
      ) : null}
    </View>
  );
}

// Cast to preserve generics through React.memo (memo erases them otherwise).
export const WheelPicker = React.memo(WheelPickerInner) as typeof WheelPickerInner;