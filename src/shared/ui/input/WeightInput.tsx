//created by claude.ai

import React, { useCallback, useMemo } from 'react';
import { View, ViewStyle } from 'react-native';
import { WheelPicker } from './WheelInput';

/**
 * Weight picker built from two independent WheelPicker columns:
 * whole kilograms on the left, tenths (i.e. 100g steps) on the right.
 * Each column scrolls on its own — exactly like the screenshot — and this
 * wrapper just recombines both into a single decimal `value`.
 */

export type WeightPickerProps = {
  /** Weight in kg, e.g. 84.2 */
  value: number;
  onChange: (value: number) => void;

  minKg?: number;
  maxKg?: number;

  itemHeight?: number;
  visibleItems?: number;

  /** Overrides the auto-computed column width. Usually leave unset. */
  kgColumnWidth?: number;
  /** Overrides the auto-computed column width. Usually leave unset. */
  tenthColumnWidth?: number;
  columnGap?: number;

  unit?: string;
  className?: string;
  style?: ViewStyle;
};

export function WeightPicker({
  value,
  onChange,
  minKg = 30,
  maxKg = 200,
  itemHeight = 44,
  visibleItems = 5,
  kgColumnWidth,
  tenthColumnWidth,
  columnGap = 6,
  unit = 'kg',
  className,
  style,
}: WeightPickerProps) {
  const kgs = useMemo(
    () => Array.from({ length: maxKg - minKg + 1 }, (_, i) => minKg + i),
    [minKg, maxKg]
  );
  const tenths = useMemo(() => Array.from({ length: 10 }, (_, i) => i), []);

  // Split the combined value into its two independent wheels.
  const kgPart = Math.floor(value);
  const tenthPart = Math.round((value - kgPart) * 10 + 10) % 10;

  const handleKgChange = useCallback(
    (newKg: number) => {
      onChange(Number((newKg + tenthPart / 10).toFixed(1)));
    },
    [tenthPart, onChange]
  );

  const handleTenthChange = useCallback(
    (newTenth: number) => {
      onChange(Number((kgPart + newTenth / 10).toFixed(1)));
    },
    [kgPart, onChange]
  );

  return (
    <View
      className={className}
      style={[{ flexDirection: 'row', alignItems: 'center' }, style]}
    >
      <WheelPicker
        data={kgs}
        value={kgPart}
        onChange={handleKgChange}
        itemHeight={itemHeight}
        visibleItems={visibleItems}
        width={kgColumnWidth}
      />
      <WheelPicker
        data={tenths}
        value={tenthPart}
        onChange={handleTenthChange}
        itemHeight={itemHeight}
        visibleItems={visibleItems}
        width={tenthColumnWidth}
        labelExtractor={(d) => `.${d}`}
        unit={unit}
        style={{ marginLeft: columnGap }}
      />
    </View>
  );
}