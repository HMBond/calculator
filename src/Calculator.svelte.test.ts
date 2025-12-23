import { fireEvent, getByRole, render } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import App from "./App.svelte";

async function clickSequence(container: HTMLElement, labels: string[]) {
  labels.forEach(async (l) => {
    const btn = getByRole(container, "button", { name: l });
    if (!btn) throw new Error(`Button ${l} not found`);
    await fireEvent.click(btn);
  });
}

function getDisplay(container: HTMLElement) {
  const span = container.querySelector("span");
  return span ? span.textContent?.trim() ?? "" : "";
}

describe("Calculator basic behavior", () => {
  const { container, getByText } = render(App);
  it("AC resets everything (temp -> 0 and display cleared)", async () => {
    await clickSequence(container, ["AC"]);
    await clickSequence(container, ["1", "2", "+", "3"]);
    expect(getDisplay(container)).toBe("3");
    await fireEvent.click(getByText("AC"));
    expect(getDisplay(container)).toBe("0");
  });

  it("C clears display but keeps temp value", async () => {
    await clickSequence(container, ["AC"]);
    // enter 12, press + to store temp=12
    await clickSequence(container, ["1", "2", "+"]);
    // enter 3
    await clickSequence(container, ["3"]);
    expect(getDisplay(container)).toBe("3");
    await fireEvent.click(getByText("C"));
    // display should clear to 0 (implementation sets lastInput to "0")
    expect(getDisplay(container)).toBe("0");
    // now press = to apply operator (12 + 0)
    await clickSequence(container, ["="]);
    expect(getDisplay(container)).toBe("12");
  });

  it("Backspace (←) removes last digit of current input", async () => {
    await clickSequence(container, ["AC"]);
    await clickSequence(container, ["1", "2", "3"]);
    expect(getDisplay(container)).toBe("123");
    await fireEvent.click(getByText("←"));
    await fireEvent.click(getByText("←"));
    expect(getDisplay(container)).toBe("1");
  });

  it("Performs basic arithmetic for + - * /", async () => {
    await clickSequence(container, ["AC"]);
    // 8 * 7 = 56
    await clickSequence(container, ["8", "*", "7", "="]);
    expect(getDisplay(container)).toBe("56");

    // 9 / 3 = 3
    await clickSequence(container, ["AC"]);
    await clickSequence(container, ["9", "/", "3", "="]);
    expect(getDisplay(container)).toBe("3");

    // 5 - 2 = 3
    await clickSequence(container, ["AC"]);
    await clickSequence(container, ["5", "-", "2", "="]);
    expect(getDisplay(container)).toBe("3");

    // 4 + 4 = 8
    await clickSequence(container, ["AC"]);
    await clickSequence(container, ["4", "+", "4", "="]);
    expect(getDisplay(container)).toBe("8");
  });

  it("Handles decimal arithmetic", async () => {
    // 0.5 + 0.25 = 0.75
    await clickSequence(container, ["AC"]);
    await clickSequence(container, [
      "0",
      ".",
      "5",
      "+",
      "0",
      ".",
      "2",
      "5",
      "=",
    ]);
    // Using toEqual with parseFloat to avoid string formatting differences
    const got = parseFloat(getDisplay(container));
    expect(got).toBe(0.75);
  });
});
