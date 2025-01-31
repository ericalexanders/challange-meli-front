import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import ItemDetails from "../ItemDetails";
import { useGetItemsDetails } from "@/services/itemsServices";

vi.mock("react-router-dom", async () => {
  const actual = await import("react-router-dom");
  return {
    ...actual,
    useParams: () => ({ id: "1" }),
  };
});

vi.mock("@/services/itemsServices", () => ({
  useGetItemsDetails: vi.fn(),
}));

describe("ItemDetails Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should show loading state", () => {
    useGetItemsDetails.mockReturnValue({
      isLoading: true,
      data: null,
    });

    render(<ItemDetails />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("should render item details when data is loaded", () => {
    const mockData = {
      item: {
        id: "1",
        title: "Test Item",
        price: {
          amount: 1000,
          decimals: "00",
        },
        description: "This is a test description",
        pictures: [
          { secure_url: "https://example.com/image1.jpg" },
          { secure_url: "https://example.com/image2.jpg" },
        ],
      },
    };

    useGetItemsDetails.mockReturnValue({
      isLoading: false,
      data: mockData,
    });

    render(<ItemDetails />);

    expect(screen.getAllByText("Test Item")).toHaveLength(2);

    expect(screen.getAllByText("$ 1.000,00")).toHaveLength(2);
    expect(screen.getByText("Descripción del producto")).toBeInTheDocument();
    expect(screen.getByText("This is a test description")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /comprar/i })).toBeInTheDocument();
  });

  it("should not crash if data is missing", () => {
    useGetItemsDetails.mockReturnValue({
      isLoading: false,
      data: null,
    });

    render(<ItemDetails />);

    expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
    expect(screen.queryByText("Descripción del producto")).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /comprar/i })).not.toBeInTheDocument();
  });
});
