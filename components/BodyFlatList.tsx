import { forwardRef } from "react";
import { FlatList, FlatListProps, StyleSheet } from "react-native";

export const BodyFlatList = forwardRef<any, FlatListProps<any>>(
  (props, ref) => {
    const { contentContainerStyle, ...restProps } = props;

    const mergedContentContainerStyle = StyleSheet.compose(
      {
        paddingVertical: 16,
      },
      contentContainerStyle
    );

    return (
      <FlatList
        automaticallyAdjustsScrollIndicatorInsets
        contentInsetAdjustmentBehavior="automatic"
        contentInset={{ bottom: 0 }}
        scrollIndicatorInsets={{ bottom: 0 }}
        {...restProps}
        ref={ref}
        contentContainerStyle={mergedContentContainerStyle}
      />
    );
  }
);
