/**
 * @file App.test.js
 * @description Unified test suite for App component covering:
 * - Smoke test to verify render
 * - Role extraction and normalization from MSAL mock
 * - Conditional routing based on authentication state
 *
 * @auditTag app-root-test-v1
 * @lastReviewed 2025-10-28
 */

import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import { useMsal } from "@azure/msal-react";

// Mock MSAL context
jest.mock("@azure/msal-react", () => ({
  useMsal: jest.fn(),
}));

// Mock AppRoutes and MainLayout to isolate App logic
jest.mock("./routes/AppRoutes", () => ({ roles }) => (
  <div data-testid="app-routes">Routes for: {roles.join(", ")}</div>
));
jest.mock("./layout/MainLayout", () => ({ roles, children }) => (
  <div data-testid="main-layout">
    <p>Layout for: {roles.join(", ")}</p>
    {children}
  </div>
));
jest.mock("./components/LoadingScreen", () => ({ message }) => (
  <div data-testid="loading-screen">{message}</div>
));

describe("App component", () => {
  test("smoke test: renders without crashing", () => {
    useMsal.mockReturnValue({
      instance: {
        getAllAccounts: () => [],
      },
    });

    render(<App />);
    expect(screen.getByTestId("app-routes")).toBeInTheDocument();
  });

  test("extracts and normalizes roles from MSAL", () => {
    useMsal.mockReturnValue({
      instance: {
        getAllAccounts: () => [
          {
            idTokenClaims: {
              roles: ["Admin", "USERS"],
            },
          },
        ],
      },
    });

    render(<App />);
    expect(screen.getByText(/Layout for: admin, users/i)).toBeInTheDocument();
    expect(screen.getByText(/Routes for: admin, users/i)).toBeInTheDocument();
  });

  test("shows loading screen while resolving session", () => {
    // Simulate delayed MSAL response
    useMsal.mockReturnValue({
      instance: {
        getAllAccounts: () => [],
      },
    });

    const { rerender } = render(<App />);
    expect(screen.getByTestId("loading-screen")).toBeInTheDocument();

    // Simulate post-load state
    rerender(<App />);
    expect(screen.getByTestId("app-routes")).toBeInTheDocument();
  });

  test("renders unauthenticated routes if no account is found", () => {
    useMsal.mockReturnValue({
      instance: {
        getAllAccounts: () => [],
      },
    });

    render(<App />);
    expect(screen.getByText(/Routes for:/i)).toBeInTheDocument();
    expect(screen.queryByTestId("main-layout")).not.toBeInTheDocument();
  });
});
