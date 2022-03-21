import "jest-fetch-mock";

import { renderHook, act } from "@testing-library/react-hooks";
import { mocked } from "jest-mock";
import { AuthProvider, useAuth } from "../auth";
import { startAsync } from "expo-auth-session";
import fetchMock from "jest-fetch-mock";
import AsyncStorage from "@react-native-async-storage/async-storage";

jest.mock("expo-auth-session");

//Coloque no inicio do arquivo para habilitar o mock do fetch.
fetchMock.enableMocks();
describe("AuthProvider", () => {
  beforeEach(async () => {
    const userCollectionKey = "@gofinances:user";
    await AsyncStorage.removeItem(userCollectionKey);
  });
  it("should be able to sign in with Google account existing", async () => {
    //Primeiro, nós precisamos do Token. Então, vamos Mockar a função de startAsync.
    const googleMocked = mocked(startAsync as any);
    googleMocked.mockReturnValueOnce({
      type: "success",
      params: {
        access_token: "any_token",
      },
    });

    //Agora que temos o Token, vamos mockar a requisição ttp dos dados de profile do usuário.
    fetchMock.mockResponseOnce(
      JSON.stringify({
        id: "test-id",
        given_name: "John Doe",
        email: "abc@aa.com",
        picture: "any.png",
      })
    );

    const { result, waitForNextUpdate } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    act(async () => await result.current.signInWithGoogle());
    await waitForNextUpdate();

    expect(result.current.user.email).toBe("abc@aa.com");
  });

  it("should not connect if cancel authentication with Google", async () => {
    const googleMocked = mocked(startAsync as any);
    googleMocked.mockReturnValueOnce({
      type: "cancel",
    });

    const { result, waitForNextUpdate } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    act(async () => await result.current.signInWithGoogle());
    await waitForNextUpdate();

    expect(result.current.user).not.toHaveProperty("id");
  });

  it("should be error with incorrectly Google parameters", async () => {
    const { result, waitForNextUpdate } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    try {
      act(async () => await result.current.signInWithGoogle());
      await waitForNextUpdate();
    } catch (error) {
      expect(result.current.user).toThrowError();
    }
  });
});
