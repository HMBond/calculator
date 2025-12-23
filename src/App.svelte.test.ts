import { render, screen } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { expect, test } from "vitest";
import App from "./App.svelte";

test("App", async () => {
  const user = userEvent.setup();
  render(App);

  const button = screen.getByRole("button", { name: "1" });
  const display = screen.getByLabelText("display");

  await user.click(button);
  expect(display.textContent).toBe("1");
});
