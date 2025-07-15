import HomeScreen from "@/app/(app)/index";
import { useSuSuData } from "@/hooks/useSusuData";
import { fireEvent, render, waitFor } from "@testing-library/react-native";
import { router } from "expo-router";
import React from "react";

jest.mock("@/hooks/useSusuData");
jest.mock("expo-router");

const mockUseSuSuData = useSuSuData as jest.Mock;
const mockRouter = router as jest.Mocked<typeof router>;

const mockUserSusuGroups = [
  {
    id: 1,
    name: "Family Savings",
    description: "20gh daily for 1k cashout",
    members: [{ id: 1, name: "User", profilePicture: "pic.jpg" }],
    susuType: "private",
    created_at: "2024-01-15T10:00:00Z",
    updated_at: "2024-07-10T14:30:00Z",
  },
];

const mockPublicSusuGroups = [
  {
    id: 2,
    name: "Public Investment",
    description: "50gh daily for 2k cashout",
    members: [],
    susuType: "public",
    created_at: "2024-01-15T10:00:00Z",
    updated_at: "2024-07-10T14:30:00Z",
  },
];

const mockUser = {
  id: 1,
  name: "Test User",
  profilePicture: "https://example.com/pic.jpg",
  susuGroups: [],
};

describe("HomeScreen Integration", () => {
  beforeEach(() => {
    mockUseSuSuData.mockReturnValue({
      user: mockUser,
      userSusuGroups: mockUserSusuGroups,
      publicSusuGroups: mockPublicSusuGroups,
      handleJoinGroup: jest.fn(),
      handleLeaveGroup: jest.fn(),
    });

    mockRouter.navigate.mockClear();
  });

  it("renders all sections correctly", async () => {
    const { getByText, getAllByText } = render(<HomeScreen />);

    await waitFor(() => {
      expect(getByText("Try our all new AI tool - AiSus")).toBeTruthy();
      expect(getByText("My Susu Groups")).toBeTruthy();
      expect(getByText("Public Susu Groups")).toBeTruthy();
    });
  });

  it("displays user information in header", async () => {
    const { getByText } = render(<HomeScreen />);

    await waitFor(() => {
      expect(getByText("Hi")).toBeTruthy();
      expect(getByText("Test User")).toBeTruthy();
    });
  });

  it("renders user susu groups", async () => {
    const { getByText } = render(<HomeScreen />);

    await waitFor(() => {
      expect(getByText("20gh daily for 1k cashout")).toBeTruthy();
    });
  });

  it("renders public susu groups", async () => {
    const { getByText } = render(<HomeScreen />);

    await waitFor(() => {
      expect(getByText("50gh daily for 2k cashout")).toBeTruthy();
    });
  });

  it("navigates to content screen when View All is pressed", async () => {
    const { getAllByText } = render(<HomeScreen />);

    await waitFor(() => {
      const viewAllButtons = getAllByText("View All");
      fireEvent.press(viewAllButtons[0]);

      expect(mockRouter.navigate).toHaveBeenCalledWith("/(content)");
    });
  });

  it("handles empty states correctly", async () => {
    mockUseSuSuData.mockReturnValue({
      user: mockUser,
      userSusuGroups: [],
      publicSusuGroups: [],
      handleJoinGroup: jest.fn(),
      handleLeaveGroup: jest.fn(),
    });

    const { getByText } = render(<HomeScreen />);

    await waitFor(() => {
      expect(getByText("My Susu Groups")).toBeTruthy();
      expect(getByText("Public Susu Groups")).toBeTruthy();
    });
  });

  it("handles scroll animations", async () => {
    const { getByTestId } = render(<HomeScreen />);
  });
});
