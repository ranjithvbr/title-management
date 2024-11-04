import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Register from "../components/Register";
import { MemoryRouter, BrowserRouter as Router } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";

jest.spyOn(window, "alert").mockImplementation(() => {});

beforeAll(() => {
  delete window.location;
  window.location = { href: "" };
});

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("Register Component", () => {

  test("renders registration form with email and password inputs", () => {
    render(
      <Router>
        <Register />
      </Router>
    );
    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /register/i })).toBeInTheDocument();
  });

  test("shows error on invalid registration", async () => {
    render(
      <Router>
        <Register />
      </Router>
    );
    fireEvent.change(screen.getByPlaceholderText(/email/i), { target: { value: "test@gmail.com" } });
    fireEvent.change(screen.getByPlaceholderText(/password/i), { target: { value: "testuser" } });
    fireEvent.click(screen.getByRole("button", { name: /register/i }));
    expect(mockNavigate).toHaveBeenCalledWith("/login");
  });

  test("navigates to login page when link is clicked", () => {
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );
    const loginLink = screen.getByText(/login here/i);
    expect(loginLink).toHaveAttribute("href", "/login");
  });
});
