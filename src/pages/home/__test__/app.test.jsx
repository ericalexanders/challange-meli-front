import { render, screen } from "@testing-library/react";
import App from "../App";

describe("App Component", () => {
  it("Debe renderizar correctamente el título", () => {
    render(<App />);

    const heading = screen.getByText(/Bienvenido a mercado libre/i);
    expect(heading).toBeInTheDocument();
  });
});
