import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";

import Register from "../";
import { ThemeProvider } from "styled-components/native";
import theme from "../../../global/styles/theme";

const Provider = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

jest.mock("@react-navigation/native", () => {
  return {
    useNavigation: jest.fn(),
  };
});

describe("Register", () => {
  it("should be open category modal when user click on the category button", async () => {
    const { getByTestId, debug } = render(<Register />, { wrapper: Provider });

    const categoryModal = getByTestId("category-modal");
    const categoryButton = getByTestId("category-button");

    fireEvent.press(categoryButton);

    await waitFor(() => {
      expect(categoryModal.props.visible).toBeTruthy();
    });
  });
});
