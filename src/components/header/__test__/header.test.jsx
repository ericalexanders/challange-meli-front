import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import Header from "../Header";

describe("Header Component", () => {
  it("renders the logo", () => {
    render(<Header />);
    const logo = screen.getByRole("img", { name: /mercadolibre logo/i });
    expect(logo).toBeInTheDocument();
  });

  it("renders the input field", () => {
    render(<Header />);
    const input = screen.getByPlaceholderText(/buscar.../i);
    expect(input).toBeInTheDocument();
  });

  it("allows the user to type in the input", async () => {
    render(<Header />);
    const input = screen.getByPlaceholderText(/buscar.../i);
    await userEvent.type(input, "Celulares");
    expect(input).toHaveValue("Celulares");
  });

  it("triggers search when clicking the search icon", async () => {
    const handleSearch = vi.fn(); // Mock de la función

    render(<Header />);

    // Buscar el input y escribir un valor
    const input = screen.getByPlaceholderText(/buscar.../i);
    await userEvent.type(input, "Laptops");

    // Buscar el icono de búsqueda y simular el click
    const searchIcon = screen.getByTestId("search-icon");
    searchIcon.addEventListener("click", handleSearch);
    await userEvent.click(searchIcon);

    expect(handleSearch).toHaveBeenCalled();
  });
});
