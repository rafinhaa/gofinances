import React from "react";
import { render } from "@testing-library/react-native";

import Profile from "../../screens/Profile";

describe("Profile Screen", () => {
  it("should have placeholder correctly in input name", () => {
    const { getByPlaceholderText } = render(<Profile />);
    const inputName = getByPlaceholderText("Nome");
    expect(inputName.props.placeholder).toBeTruthy(); // Verifica se foi encontrado
  });
  it("should be loaded user data", () => {
    const { getByTestId } = render(<Profile />);
    const inputName = getByTestId("input-name");
    const inputSurname = getByTestId("input-surname");

    expect(inputName.props.value).toEqual("Rafael");
    expect(inputSurname.props.value).toEqual("Soncine");
  });

  it("should exist title correctly", () => {
    const { getByTestId } = render(<Profile />);
    const textTitle = getByTestId("text-title");
    expect(textTitle.props.children).toContain("Perfil"); // Filho do elemento (tudo o que tem dentro da tag)
  });
});
