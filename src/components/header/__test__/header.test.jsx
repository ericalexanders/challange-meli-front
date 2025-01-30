import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { BrowserRouter } from "react-router-dom";
import Header from "../Header";

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("Header Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    render(
      <BrowserRouter
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <Header />
      </BrowserRouter>,
    );
  });

  it("renders the logo", () => {
    const logo = screen.getByRole("img", { name: /mercadolibre logo/i });
    expect(logo).toBeInTheDocument();
  });

  it("renders the input field", () => {
    const input = screen.getByPlaceholderText(/buscar.../i);
    expect(input).toBeInTheDocument();
  });

  it("allows the user to type in the input", async () => {
    const input = screen.getByPlaceholderText(/buscar.../i);
    await userEvent.type(input, "Celulares");
    expect(input).toHaveValue("Celulares");
  });

  it("triggers search when clicking the search icon", async () => {
    const input = screen.getByPlaceholderText(/buscar.../i);
    await userEvent.type(input, "Laptops");

    const searchIcon = screen.getByTestId("search-icon");
    await userEvent.click(searchIcon);

    expect(mockNavigate).toHaveBeenCalledWith("/items?search=Laptops&limit=4");
  });

  it("does not trigger search when clicking inside the input field", async () => {
    const input = screen.getByPlaceholderText(/buscar.../i);
    await userEvent.click(input);

    expect(mockNavigate).not.toHaveBeenCalled();
  });
});
