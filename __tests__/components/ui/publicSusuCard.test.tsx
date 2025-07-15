import PublicSuSuCard from "@/components/ui/cards/publicSusuCard";
import { SuSuTypeEnum } from "@/types/susuGroups.types";
import { render } from "@testing-library/react-native";
import React from "react";

const mockPublicSusuGroup = {
  id: 1,
  name: "Public Test Group",
  members: [],
  susuType: SuSuTypeEnum.Public,
  description: "50gh daily for 2k cashout",
  created_at: "2024-01-15T10:00:00Z",
  updated_at: "2024-07-10T14:30:00Z",
};

describe("PublicSuSuCard", () => {
  it("renders correctly", () => {
    const { getByText } = render(<PublicSuSuCard data={mockPublicSusuGroup} />);

    expect(getByText("50gh daily for 2k cashout")).toBeTruthy();
    expect(getByText("12 members left")).toBeTruthy();
  });

  it("displays member avatars", () => {
    const { getAllByRole } = render(
      <PublicSuSuCard data={mockPublicSusuGroup} />
    );

    const images = getAllByRole("image");
    expect(images).toHaveLength(5);
  });
});
