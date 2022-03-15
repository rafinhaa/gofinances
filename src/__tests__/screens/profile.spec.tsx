import React from "react";
import { render } from "@testing-library/react-native";

import Profile from "../../screens/Profile";

test("check if show correctly user input name placeholder", () => {
  const { getByPlaceholderText } = render(<Profile />);
  const inputName = getByPlaceholderText("Nome");
  expect(inputName.props.placeholder).toBeTruthy(); // Verifica se foi encontrado
});

test("checks if user data has been loaded", () => {
  const { getByTestId } = render(<Profile />);
  const inputName = getByTestId("input-name");
  const inputSurname = getByTestId("input-surname");

  expect(inputName.props.value).toEqual("Rafael");
  expect(inputSurname.props.value).toEqual("Soncine");
});

test("check if title render correctly", () => {
  const { getByTestId } = render(<Profile />);
  const textTitle = getByTestId("text-title");
  expect(textTitle.props.children).toContain("Perfil"); // Filho do elemento (tudo o que tem dentro da tag)
});
