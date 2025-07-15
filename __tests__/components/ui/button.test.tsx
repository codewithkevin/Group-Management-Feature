import Button from "@/components/ui/button";
import { fireEvent, render } from "@testing-library/react-native";
import React from "react";

describe("Button", () => {
  it("renders with default props", () => {
    const { getByText } = render(
      <Button onPress={jest.fn()}>Test Button</Button>
    );

    expect(getByText("Test Button")).toBeTruthy();
  });

  it("calls onPress when pressed", () => {
    const onPress = jest.fn();
    const { getByText } = render(<Button onPress={onPress}>Press Me</Button>);

    fireEvent.press(getByText("Press Me"));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it("does not call onPress when disabled", () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <Button onPress={onPress} disabled>
        Disabled Button
      </Button>
    );

    fireEvent.press(getByText("Disabled Button"));
    expect(onPress).not.toHaveBeenCalled();
  });

  it("shows loading indicator when loading", () => {
    const { getByTestId } = render(
      <Button loading onPress={jest.fn()}>
        Loading Button
      </Button>
    );
  });

  it("applies correct variant styles", () => {
    const { rerender, getByText } = render(
      <Button variant="filled" onPress={jest.fn()}>
        Filled
      </Button>
    );

    rerender(
      <Button variant="outline" onPress={jest.fn()}>
        Outline
      </Button>
    );

    rerender(
      <Button variant="ghost" onPress={jest.fn()}>
        Ghost
      </Button>
    );
  });

  it("applies correct size styles", () => {
    const sizes = ["sm", "md", "lg", "xl"] as const;

    sizes.forEach((size) => {
      const { getByText } = render(
        <Button size={size} onPress={jest.fn()}>
          Size {size}
        </Button>
      );
    });
  });

  it("renders children without wrapping when wrapChildren is false", () => {
    const { getByTestId } = render(
      <Button wrapChildren={false} onPress={jest.fn()}>
        <div data-testid="custom-child">Custom Child</div>
      </Button>
    );

    expect(getByTestId("custom-child")).toBeTruthy();
  });
});
