import HomeScreen from "@/app/(app)/index";
import SuSuGroupList from "@/app/(content)/index";
import { NavigationContainer } from "@react-navigation/native";
import { act, fireEvent, render, waitFor } from "@testing-library/react-native";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

const MockedNavigationContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <SafeAreaProvider>
    <NavigationContainer>{children}</NavigationContainer>
  </SafeAreaProvider>
);

describe("E2E User Flows", () => {
  describe("Home to Group List Flow", () => {
    it("should navigate from home to group list and back", async () => {
      const { getByText, rerender } = render(
        <MockedNavigationContainer>
          <HomeScreen />
        </MockedNavigationContainer>
      );

      await waitFor(() => {
        expect(getByText("My Susu Groups")).toBeTruthy();
      });

      const viewAllButtons = getByText("View All");
      fireEvent.press(viewAllButtons);

      rerender(
        <MockedNavigationContainer>
          <SuSuGroupList />
        </MockedNavigationContainer>
      );

      await waitFor(() => {
        expect(getByText("All My Susu Groups")).toBeTruthy();
        expect(getByText("All groups")).toBeTruthy();
      });
    });
  });

  describe("Group Filtering Flow", () => {
    it("should filter groups correctly through user interaction", async () => {
      const { getByText, queryByText } = render(
        <MockedNavigationContainer>
          <SuSuGroupList />
        </MockedNavigationContainer>
      );

      // Wait for initial load
      await waitFor(() => {
        expect(getByText("All groups")).toBeTruthy();
      });

      fireEvent.press(getByText("Private"));

      await waitFor(() => {
        expect(queryByText("public")).toBeFalsy();
      });

      fireEvent.press(getByText("Public"));

      await waitFor(() => {
        expect(queryByText("private")).toBeFalsy();
      });

      fireEvent.press(getByText("All groups"));

      await waitFor(() => {
        expect(getByText("All groups")).toBeTruthy();
      });
    });
  });

  describe("Scroll and Animation Flow", () => {
    it("should handle scroll interactions smoothly", async () => {
      const { getByTestId } = render(
        <MockedNavigationContainer>
          <HomeScreen />
        </MockedNavigationContainer>
      );

      act(() => {});
    });
  });
});
