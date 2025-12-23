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
        lastInput = parseFloat(lastInput + "7").toString();
      },
    },
    {
      label: "8",
      action: () => {
        lastInput = parseFloat(lastInput + "8").toString();
      },
    },
    {
      label: "9",
      action: () => {
        lastInput = parseFloat(lastInput + "9").toString();
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
        lastInput = parseFloat(lastInput + "4").toString();
      },
    },
    {
      label: "5",
      action: () => {
        lastInput = parseFloat(lastInput + "5").toString();
      },
    },
    {
      label: "6",
      action: () => {
        lastInput = parseFloat(lastInput + "6").toString();
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
        lastInput = parseFloat(lastInput + "1").toString();
      },
    },
    {
      label: "2",
      action: () => {
        lastInput = parseFloat(lastInput + "2").toString();
      },
    },
    {
      label: "3",
      action: () => {
        lastInput = parseFloat(lastInput + "3").toString();
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
        lastInput = parseFloat(lastInput + "0").toString();
      },
    },
    {
      label: ".",
      action: () => {
        if (!input.includes(".")) {
          if (lastInput === "") lastInput = "0.";
          else lastInput = parseFloat(lastInput + ".").toString();
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
  <span>{input}</span>
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
