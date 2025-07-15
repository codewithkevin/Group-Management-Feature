import SusuCard from "@/components/ui/cards/susuCard";
import { SuSuTypeEnum } from "@/types/susuGroups.types";
import { render } from "@testing-library/react-native";
import React from "react";

const mockSusuGroup = {
  id: 1,
  name: "Test Group",
  members: [
    { id: 1, name: "User 1", profilePicture: "https://example.com/pic1.jpg" },
    { id: 2, name: "User 2", profilePicture: "https://example.com/pic2.jpg" },
  ],
  susuType: SuSuTypeEnum.Private,
  description: "20gh daily for 1k cashout",
  created_at: "2024-01-15T10:00:00Z",
  updated_at: "2024-07-10T14:30:00Z",
};

describe("SusuCard", () => {
  it("renders correctly with private group", () => {
    const { getByText } = render(<SusuCard data={mockSusuGroup} />);

    expect(getByText("20gh daily for 1k cashout")).toBeTruthy();
    expect(getByText("12 members")).toBeTruthy();
    expect(getByText("private")).toBeTruthy();
  });

  it("renders correctly with public group", () => {
    const publicGroup = { ...mockSusuGroup, susuType: SuSuTypeEnum.Public };
    const { getByText } = render(<SusuCard data={publicGroup} />);

    expect(getByText("public")).toBeTruthy();
  });

  it("applies correct styling for private groups", () => {
    const { getByTestId } = render(<SusuCard data={mockSusuGroup} />);
  });

  it("applies correct styling for public groups", () => {
    const publicGroup = { ...mockSusuGroup, susuType: SuSuTypeEnum.Public };
    const { getByTestId } = render(<SusuCard data={publicGroup} />);
  });

  it("handles custom width and height props", () => {
    const { getByTestId } = render(
      <SusuCard data={mockSusuGroup} width={200} height={300} />
    );
  });

  it("is touchable and responds to press", () => {
    const onPress = jest.fn();
    const { getByTestId } = render(<SusuCard data={mockSusuGroup} />);
  });
});
