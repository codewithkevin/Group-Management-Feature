import { NavigationContainer } from "@react-navigation/native";
import { render, RenderOptions } from "@testing-library/react-native";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

const MockThemeProvider = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <MockThemeProvider>{children}</MockThemeProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: AllTheProviders, ...options });

export const createMockUser = (overrides = {}) => ({
  id: 1,
  name: "Test User",
  profilePicture: "https://example.com/pic.jpg",
  susuGroups: [],
  ...overrides,
});

export const createMockSusuGroup = (overrides = {}) => ({
  id: 1,
  name: "Test Group",
  members: [
    { id: 1, name: "User 1", profilePicture: "pic1.jpg" },
    { id: 2, name: "User 2", profilePicture: "pic2.jpg" },
  ],
  susuType: "private" as const,
  description: "20gh daily for 1k cashout",
  created_at: "2024-01-15T10:00:00Z",
  updated_at: "2024-07-10T14:30:00Z",
  ...overrides,
});

export const createMockSusuGroups = (
  count: number,
  type?: "private" | "public"
) =>
  Array.from({ length: count }, (_, i) =>
    createMockSusuGroup({
      id: i + 1,
      name: `Group ${i + 1}`,
      susuType: type || (i % 2 === 0 ? "private" : "public"),
      description: `${20 + i}gh daily for ${1000 + i * 100} cashout`,
    })
  );

export const createMockStore = (initialState = {}) => {
  const defaultState = {
    user: createMockUser(),
    allSusuGroups: createMockSusuGroups(5),
    userSusuGroups: [],
    publicSusuGroups: [],
    isInitialized: false,
    initializeData: jest.fn(),
    joinSusuGroup: jest.fn(),
    leaveSusuGroup: jest.fn(),
    updateGroupType: jest.fn(),
  };

  return {
    ...defaultState,
    ...initialState,
  };
};

export const mockReanimatedValues = () => ({
  opacity: { value: 1 },
  translateY: { value: 0 },
  scale: { value: 1 },
  rotate: { value: 0 },
});

export const mockNavigation = {
  navigate: jest.fn(),
  goBack: jest.fn(),
  reset: jest.fn(),
  setParams: jest.fn(),
  dispatch: jest.fn(),
  setOptions: jest.fn(),
  isFocused: jest.fn(() => true),
  addListener: jest.fn(() => jest.fn()),
  removeListener: jest.fn(),
  canGoBack: jest.fn(() => true),
  getId: jest.fn(() => "test-id"),
  getParent: jest.fn(),
  getState: jest.fn(() => ({})),
};

export const waitForNextTick = () =>
  new Promise((resolve) => setImmediate(resolve));

export const flushPromises = () =>
  new Promise((resolve) => setImmediate(resolve));

export const measureRenderTime = (renderFn: () => void) => {
  const start = performance.now();
  renderFn();
  const end = performance.now();
  return end - start;
};

export const checkAccessibilityProps = (element: any) => {
  const issues = [];

  if (!element.props.accessible && !element.props.accessibilityRole) {
    issues.push("Missing accessibility props");
  }

  if (element.props.accessibilityRole === "button" && !element.props.onPress) {
    issues.push("Button without onPress handler");
  }

  if (element.props.disabled && !element.props.accessibilityState?.disabled) {
    issues.push("Disabled state not reflected in accessibility");
  }

  return issues;
};

export * from "@testing-library/react-native";
export { customRender as render };
