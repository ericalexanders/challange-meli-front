import { describe, it, expect, vi, type Mock, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";

import Items from "../Items";
import { useGetItems } from "@/services/itemsServices";

vi.mock("react-router-dom", async () => {
  const actual = await import("react-router-dom");
  return {
    ...actual,
    useSearchParams: () => [new URLSearchParams({ q: "test" }), vi.fn()],
    Link: ({ to, children }: { to: string; children: React.ReactNode }) => <a href={to}>{children}</a>,
  };
});

vi.mock("@/services/itemsServices", () => ({
  useGetItems: vi.fn(),
}));

describe("Items Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should show loading state", () => {
    (useGetItems as Mock).mockReturnValue({
      isLoading: true,
      data: null,
    });

    render(<Items />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("should render items when data is loaded", async () => {
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

    (useGetItems as Mock).mockReturnValue({
      isLoading: false,
      data: mockData,
    });

    render(<Items />);

    expect(screen.getByText("Test Item")).toBeInTheDocument();
    expect(screen.getByText("ARS $ 1.000,00")).toBeInTheDocument();
    expect(screen.getByAltText("Test Item")).toBeInTheDocument();
  });

  it("should not render items if data is empty", () => {
    (useGetItems as Mock).mockReturnValue({
      isLoading: false,
      data: { items: [] },
    });

    render(<Items />);

    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });
});
