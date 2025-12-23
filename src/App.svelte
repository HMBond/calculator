<script lang="ts">
  let temp = $state(0);
  let lastInput = $state("");
  let input = $derived(lastInput === "" ? temp.toString() : lastInput);
  let operator: (a: number, b: number) => number = $state(() =>
    parseFloat(lastInput)
  );

  function ac() {
    lastInput = "";
    temp = 0;
    operator = (a: number, b: number) => 0;
  }

  function clearDisplay() {
    lastInput = "0";
  }

  function backspace() {
    if (lastInput === "" || lastInput === "0") {
      // keep display at 0 instead of revealing temp
      lastInput = "0";
      return;
    }
    lastInput = lastInput.substring(0, lastInput.length - 1);
    if (lastInput === "") lastInput = "0";
  }

  function setOperator(fn: (a: number, b: number) => number) {
    temp = parseFloat(lastInput || "0");
    operator = fn;
    lastInput = "";
  }

  function digit(n: string) {
    // prevent multiple leading zeros: if current is exactly "0"
    if (lastInput === "0") {
      if (n === "0") return; // ignore extra leading zeros
      lastInput = n; // replace single leading zero with new digit
      return;
    }
    lastInput = lastInput === "" ? n : lastInput + n;
  }

  function pressDot() {
    if (!lastInput.includes(".")) {
      if (lastInput === "") lastInput = "0.";
      else lastInput = lastInput + ".";
    }
  }

  function equals() {
    lastInput = operator(temp, parseFloat(lastInput || "0")).toString();
    temp = parseFloat(lastInput);
    operator = () => parseFloat(lastInput);
  }
</script>

<main>
  <span aria-label="display">{input}</span>
  <div>
    <button aria-label="AC" onclick={ac}>AC</button>
    <button aria-label="C" onclick={clearDisplay}>C</button>
    <button aria-label="←" onclick={backspace}>←</button>
    <button aria-label="/" onclick={() => setOperator((a, b) => a / b)}>
      /
    </button>

    <button aria-label="7" onclick={() => digit("7")}>7</button>
    <button aria-label="8" onclick={() => digit("8")}>8</button>
    <button aria-label="9" onclick={() => digit("9")}>9</button>
    <button aria-label="*" onclick={() => setOperator((a, b) => a * b)}>
      *
    </button>

    <button aria-label="4" onclick={() => digit("4")}>4</button>
    <button aria-label="5" onclick={() => digit("5")}>5</button>
    <button aria-label="6" onclick={() => digit("6")}>6</button>
    <button aria-label="-" onclick={() => setOperator((a, b) => a - b)}>
      -
    </button>

    <button aria-label="1" onclick={() => digit("1")}>1</button>
    <button aria-label="2" onclick={() => digit("2")}>2</button>
    <button aria-label="3" onclick={() => digit("3")}>3</button>
    <button aria-label="+" onclick={() => setOperator((a, b) => a + b)}>
      +
    </button>

    <button aria-label="0" onclick={() => digit("0")}>0</button>
    <button aria-label="." onclick={pressDot}>.</button>
    <button aria-label="=" onclick={equals}> = </button>
  </div>
</main>

<style>
  main {
    display: grid;
    gap: 1rem;
  }

  span {
    text-align: right;
    padding: 1rem;
  }

  div {
    display: grid;
    gap: 1rem;
    grid-template-columns: 100px 100px 100px 100px;
  }
</style>
