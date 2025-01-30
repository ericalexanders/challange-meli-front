import { describe, it, expect, vi, type Mock } from "vitest";
import { render, screen } from "@testing-library/react";
import Items from "../Items";
import { useGetItems } from "@/services/itemsServices";

vi.mock("react-router-dom", () => ({
  useSearchParams: () => [new URLSearchParams({ q: "test" }), vi.fn()],
}));

vi.mock("@/services/itemsServices", () => ({
  useGetItems: vi.fn(),
}));

describe("Items Component", () => {
  it("should show loading state", () => {
    const mockUseGetItems = useGetItems as Mock;
    mockUseGetItems.mockReturnValue({
      isLoading: true,
      data: null,
    });

    render(<Items />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("should render items when data is loaded", () => {
    const mockData = {
      items: [
        {
          id: "1",
          title: "Test Item",
          picture: "test-image.jpg",
          price: {
            currency: "ARS",
            amount: 1000,
            decimals: "00",
          },
        },
      ],
    };

    const mockUseGetItems = useGetItems as Mock;
    mockUseGetItems.mockReturnValue({
      isLoading: false,
      data: mockData,
    });

    render(<Items />);

    expect(screen.getByText("Test Item")).toBeInTheDocument();
    expect(screen.getByText("ARS $ 1.000,00")).toBeInTheDocument();
    expect(screen.getByAltText("Test Item")).toBeInTheDocument();
  });
});
