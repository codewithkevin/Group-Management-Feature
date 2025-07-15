import "@testing-library/jest-native/extend-expect";
import "react-native-gesture-handler/jestSetup";

jest.mock("expo-router", () => ({
  router: {
    navigate: jest.fn(),
    back: jest.fn(),
    push: jest.fn(),
    replace: jest.fn(),
  },
  useLocalSearchParams: jest.fn(() => ({})),
  useRouter: jest.fn(() => ({
    navigate: jest.fn(),
    back: jest.fn(),
    push: jest.fn(),
    replace: jest.fn(),
  })),
  Slot: ({ children }: { children: React.ReactNode }) => children,
  Stack: {
    Screen: () => null,
  },
  Tabs: {
    Screen: () => null,
  },
}));

jest.mock("expo-blur", () => ({
  BlurView: "BlurView",
}));

jest.mock("expo-linear-gradient", () => ({
  LinearGradient: "LinearGradient",
}));

jest.mock("react-native-safe-area-context", () => ({
  useSafeAreaInsets: jest.fn(() => ({ top: 0, bottom: 0, left: 0, right: 0 })),
  SafeAreaProvider: ({ children }: { children: React.ReactNode }) => children,
}));

jest.mock("react-native-reanimated", () => {
  const Reanimated = require("react-native-reanimated/mock");
  Reanimated.default.call = () => {};
  return Reanimated;
});

jest.mock("react-native-responsive-screen", () => ({
  widthPercentageToDP: jest.fn((percentage: number) => percentage),
  heightPercentageToDP: jest.fn((percentage: number) => percentage),
}));

jest.mock("zustand", () => ({
  create: (fn: any) => () =>
    fn(
      () => {},
      () => ({})
    ),
}));

global.mockNavigation = {
  navigate: jest.fn(),
  goBack: jest.fn(),
  reset: jest.fn(),
  setParams: jest.fn(),
  dispatch: jest.fn(),
  setOptions: jest.fn(),
  isFocused: jest.fn(() => true),
  addListener: jest.fn(() => jest.fn()),
  removeListener: jest.fn(),
};

jest.mock("react-native/Libraries/Animated/NativeAnimatedHelper");
