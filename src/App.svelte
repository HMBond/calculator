<script lang="ts">
  let temp = $state(0);
  let lastInput = $state("");
  let input = $derived(lastInput === "" ? temp.toString() : lastInput);
  let operator: (a: number, b: number) => number = $state(() =>
    parseFloat(lastInput)
  );

  const buttons = [
    {
      label: "AC",
      action: () => {
        lastInput = "";
        temp = 0;
        operator = (a: number, b: number) => 0;
      },
    },
    {
      label: "C",
      action: () => {
        lastInput = "0";
      },
    },
    {
      label: "←",
      action: () => {
        lastInput = lastInput.substring(0, lastInput.length - 1);
      },
    },
    {
      label: "/",
      action: () => {
        temp = parseFloat(lastInput || "0");
        operator = (a: number, b: number) => a / b;
        lastInput = "";
      },
    },
    {
      label: "7",
      action: () => {
        lastInput = lastInput === "" ? "7" : lastInput + "7";
      },
    },
    {
      label: "8",
      action: () => {
        lastInput = lastInput === "" ? "8" : lastInput + "8";
      },
    },
    {
      label: "9",
      action: () => {
        lastInput = lastInput === "" ? "9" : lastInput + "9";
      },
    },
    {
      label: "*",
      action: () => {
        temp = parseFloat(lastInput || "0");
        operator = (a: number, b: number) => a * b;
        lastInput = "";
      },
    },
    {
      label: "4",
      action: () => {
        lastInput = lastInput === "" ? "4" : lastInput + "4";
      },
    },
    {
      label: "5",
      action: () => {
        lastInput = lastInput === "" ? "5" : lastInput + "5";
      },
    },
    {
      label: "6",
      action: () => {
        lastInput = lastInput === "" ? "6" : lastInput + "6";
      },
    },
    {
      label: "-",
      action: () => {
        temp = parseFloat(lastInput || "0");
        operator = (a: number, b: number) => a - b;
        lastInput = "";
      },
    },

    {
      label: "1",
      action: () => {
        lastInput = lastInput === "" ? "1" : lastInput + "1";
      },
    },
    {
      label: "2",
      action: () => {
        lastInput = lastInput === "" ? "2" : lastInput + "2";
      },
    },
    {
      label: "3",
      action: () => {
        lastInput = lastInput === "" ? "3" : lastInput + "3";
      },
    },
    {
      label: "+",
      action: () => {
        temp = parseFloat(lastInput || "0");
        operator = (a: number, b: number) => a + b;
        lastInput = "";
      },
    },
    {
      label: "0",
      action: () => {
        lastInput = lastInput === "" ? "0" : lastInput + "0";
      },
    },
    {
      label: ".",
      action: () => {
        if (!lastInput.includes(".")) {
          if (lastInput === "") lastInput = "0.";
          else lastInput = lastInput + ".";
        }
      },
    },
    {
      label: "=",
      action: () => {
        lastInput = operator(temp, parseFloat(lastInput || "0")).toString();
        temp = parseFloat(lastInput);
        operator = () => parseFloat(lastInput);
      },
    },
  ];
</script>

<main>
  <h1>Calculator</h1>
  <span aria-label="display">{input}</span>
  <div>
    {#each buttons as button}
      <button onclick={button.action}>{button.label}</button>
    {/each}
  </div>
</main>

<style>
  main {
    display: grid;
  }
  span {
    text-align: right;
    padding: 1rem;
  }
  div {
    display: grid;
    grid-template-columns: 100px 100px 100px 100px;
  }
</style>
