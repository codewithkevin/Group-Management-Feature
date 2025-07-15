import { SegmentedControl } from "@/components/SegmentedControl";
import { fireEvent, render } from "@testing-library/react-native";
import React from "react";

describe("SegmentedControl", () => {
  const mockSegments = ["Option 1", "Option 2", "Option 3"];
  const mockOnSegmentChange = jest.fn();

  beforeEach(() => {
    mockOnSegmentChange.mockClear();
  });

  it("renders all segments", () => {
    const { getByText } = render(
      <SegmentedControl
        segments={mockSegments}
        selectedIndex={0}
        onSegmentChange={mockOnSegmentChange}
      />
    );

    mockSegments.forEach((segment) => {
      expect(getByText(segment)).toBeTruthy();
    });
  });

  it("calls onSegmentChange when segment is pressed", () => {
    const { getByText } = render(
      <SegmentedControl
        segments={mockSegments}
        selectedIndex={0}
        onSegmentChange={mockOnSegmentChange}
      />
    );

    fireEvent.press(getByText("Option 2"));
    expect(mockOnSegmentChange).toHaveBeenCalledWith(1);
  });

  it("applies accessibility props correctly", () => {
    const { getByText } = render(
      <SegmentedControl
        segments={mockSegments}
        selectedIndex={1}
        onSegmentChange={mockOnSegmentChange}
      />
    );

    const selectedSegment = getByText("Option 2");
    expect(selectedSegment.props.accessibilityRole).toBe("button");
    expect(selectedSegment.props.accessibilityState.selected).toBe(true);
  });

  it("handles custom animation config", () => {
    const customConfig = { damping: 20, stiffness: 200, mass: 0.8 };

    const { rerender } = render(
      <SegmentedControl
        segments={mockSegments}
        selectedIndex={0}
        onSegmentChange={mockOnSegmentChange}
        animationConfig={customConfig}
      />
    );

    rerender(
      <SegmentedControl
        segments={mockSegments}
        selectedIndex={1}
        onSegmentChange={mockOnSegmentChange}
        animationConfig={customConfig}
      />
    );
  });
});
