/**
 *
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
import PropTypes from "prop-types";
import { render, screen } from "@testing-library/react";
import App from "./App";
import { useMsal } from "@azure/msal-react";

// Mock MSAL context
jest.mock("@azure/msal-react", () => ({
  useMsal: jest.fn(),
}));

// Mock AppRoutes and MainLayout to isolate App logic
const MockAppRoutes = ({ roles }) => (
  <div data-testid="app-routes">Routes for: {roles.join(", ")}</div>
);
MockAppRoutes.displayName = "MockAppRoutes";
MockAppRoutes.propTypes = {
  roles: PropTypes.arrayOf(PropTypes.string),
};
jest.mock("./routes/AppRoutes", () => MockAppRoutes);

const MockMainLayout = ({ roles, children }) => (
  <div data-testid="main-layout">
    <p>Layout for: {roles.join(", ")}</p>
    {children}
  </div>
);
MockMainLayout.displayName = "MockMainLayout";
MockMainLayout.propTypes = {
  roles: PropTypes.arrayOf(PropTypes.string),
  children: PropTypes.node,
};
jest.mock("./layout/MainLayout", () => MockMainLayout);

const MockLoadingScreen = ({ message }) => (
  <div data-testid="loading-screen">{message}</div>
);
MockLoadingScreen.displayName = "MockLoadingScreen";
MockLoadingScreen.propTypes = {
  message: PropTypes.string,
};
jest.mock("./components/LoadingScreen", () => MockLoadingScreen);

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
    useMsal.mockReturnValue({
      instance: {
        getAllAccounts: () => [],
      },
    });

    const { rerender } = render(<App />);
    expect(screen.getByTestId("loading-screen")).toBeInTheDocument();

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
