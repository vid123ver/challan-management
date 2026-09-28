import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import App from "./App";

describe("Challan Management App", () => {
  it("shows the application title", () => {
    render(<App />);

    expect(
      screen.getByText("Challan Management System")
    ).toBeInTheDocument();
  });

  it("shows the search input", () => {
    render(<App />);

    expect(
      screen.getByPlaceholderText("Enter Challan Number")
    ).toBeInTheDocument();
  });

  it("shows the Search button", () => {
    render(<App />);

    expect(
      screen.getByRole("button", { name: "Search" })
    ).toBeInTheDocument();
  });
});