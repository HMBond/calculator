import { fireEvent, render } from "@testing-library/svelte";
import { describe, expect, it } from "bun:test";
import App from "./App.svelte";

function clickSequence(
  getByText: (text: string) => HTMLElement,
  labels: string[]
) {
  labels.forEach((l) => {
    const btn = getByText(l);
    if (!btn) throw new Error(`Button ${l} not found`);
    fireEvent.click(btn);
  });
}

function getDisplay(container: HTMLElement) {
  const span = container.querySelector("span");
  return span ? span.textContent?.trim() ?? "" : "";
}

describe("Calculator basic behavior", () => {
  it("AC resets everything (temp -> 0 and display cleared)", async () => {
    const { container, getByText } = render(App);
    clickSequence(getByText, ["1", "2", "+", "3"]);
    expect(getDisplay(container)).toBe("3");
    await fireEvent.click(getByText("AC"));
    expect(getDisplay(container)).toBe("0");
  });

  it("C clears display but keeps temp value", async () => {
    const { container, getByText } = render(App);
    // enter 12, press + to store temp=12
    clickSequence(getByText, ["1", "2", "+"]);
    // enter 3
    clickSequence(getByText, ["3"]);
    expect(getDisplay(container)).toBe("3");
    await fireEvent.click(getByText("C"));
    // display should clear to 0 (implementation sets lastInput to "0")
    expect(getDisplay(container)).toBe("0");
    // now press = to apply operator (12 + 0)
    clickSequence(getByText, ["="]);
    expect(getDisplay(container)).toBe("12");
  });

  it("Backspace (←) removes last digit of current input", async () => {
    const { container, getByText } = render(App);
    clickSequence(getByText, ["1", "2", "3"]);
    expect(getDisplay(container)).toBe("123");
    await fireEvent.click(getByText("←"));
    await fireEvent.click(getByText("←"));
    expect(getDisplay(container)).toBe("1");
  });

  it("Performs basic arithmetic for + - * /", async () => {
    const { container, getByText } = render(App);
    // 8 * 7 = 56
    clickSequence(getByText, ["8", "*", "7", "="]);
    expect(getDisplay(container)).toBe("56");

    // 9 / 3 = 3
    clickSequence(getByText, ["AC"]);
    clickSequence(getByText, ["9", "/", "3", "="]);
    expect(getDisplay(container)).toBe("3");

    // 5 - 2 = 3
    clickSequence(getByText, ["AC"]);
    clickSequence(getByText, ["5", "-", "2", "="]);
    expect(getDisplay(container)).toBe("3");

    // 4 + 4 = 8
    clickSequence(getByText, ["AC"]);
    clickSequence(getByText, ["4", "+", "4", "="]);
    expect(getDisplay(container)).toBe("8");
  });

  it("Handles decimal arithmetic", async () => {
    const { container, getByText } = render(App);
    // 0.5 + 0.25 = 0.75
    clickSequence(getByText, ["AC"]);
    clickSequence(getByText, ["0", ".", "5", "+", "0", ".", "2", "5", "="]);
    // Using toEqual with parseFloat to avoid string formatting differences
    const got = parseFloat(getDisplay(container));
    expect(got).toBeCloseTo(0.75, 10);
  });
});
