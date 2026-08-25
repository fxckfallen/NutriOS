import React, { useCallback, useMemo } from 'react';
import { View, ViewStyle } from 'react-native';
import { WheelPicker } from './WheelPicker';

export type WeightPickerProps = {
  value: number;
  onChange: (value: number) => void;
  minKg?: number;
  maxKg?: number;
  itemHeight?: number;
  visibleItems?: number;
  kgColumnWidth?: number;
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
      style={[
        {
          width: '100%', // Занимает всю ширину
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center', // Идеально центрирует обе колонки вместе
        },
        style,
      ]}
    >
      <View style={{ width: 'auto' }}>
        <WheelPicker
          data={kgs}
          value={kgPart}
          onChange={handleKgChange}
          itemHeight={itemHeight}
          visibleItems={visibleItems}
          width={kgColumnWidth}
          style={{ width: 'auto' }}
        />
      </View>
      <View style={{ width: 'auto', marginLeft: columnGap }}>
        <WheelPicker
          data={tenths}
          value={tenthPart}
          onChange={handleTenthChange}
          itemHeight={itemHeight}
          visibleItems={visibleItems}
          width={tenthColumnWidth}
          labelExtractor={(d) => `.${d}`}
          unit={unit}
          style={{ width: 'auto' }}
        />
      </View>
    </View>
  );
}

export default WeightPicker;