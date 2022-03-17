import { renderHook, act } from "@testing-library/react-hooks";
import { AuthProvider, useAuth } from "../auth";

describe("Auth Hook", () => {
  it("should be able to sign in with Google account existing", async () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });
    const { signInWithGoogle } = result.current;
    await act(() => signInWithGoogle());
    expect(result.current.user).toBeTruthy();
  });
});
