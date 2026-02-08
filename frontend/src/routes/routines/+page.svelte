<script>
  import RoutinesIcon from "@lucide/svelte/icons/webhook";
  import PlusIcon from "@lucide/svelte/icons/plus";
  import { Button } from "$lib/components/ui/button/index.js";
  import * as Card from "$lib/components/ui/card/index.js";

  let pageData = $state({});
  const load = () => {
    pageData = {
      activeRuleCount: 12,
      totalExecutionCount: 214,
      successPercentage: 53,
      last24h: 32,
    };
  };

  // initial load
  load();

  // other housekeeping code
  let successColor = $derived(
    pageData.successPercentage > 50 ? "text-green-500" : "text-red-500",
  );
</script>

<main class="p-3 flex flex-col gap-2 h-full" id="content">
  <section class="flex items-center justify-between" id="header">
    <div class="flex items-center">
      <div class="text-primary p-4">
        <RoutinesIcon />
      </div>
      <div>
        <h1 class="inline font-bold text-2xl mt-2">Routines</h1>
        <h6 class="text-xs text-muted-foreground">
          Automate multi-step workflows triggered by specific events.
        </h6>
      </div>
    </div>
    <Button class="bg-primary">
      <PlusIcon />
      New Rule
    </Button>
  </section>
  <section class="grid grid-cols-2 md:grid-cols-4 gap-2" id="at-a-glance">
    <Card.Root class="p-3 gap-2">
      <Card.Header class="px-3">
        <Card.Title class="text-sm text-muted-foreground"
          >Active Rules</Card.Title
        >
      </Card.Header>
      <Card.Content class="px-3">
        <h2 class="font-bold text-4xl">{pageData.activeRuleCount}</h2>
      </Card.Content>
    </Card.Root>
    <Card.Root class="p-3 gap-2">
      <Card.Header class="px-3">
        <Card.Title class="text-sm text-muted-foreground"
          >Total Executions</Card.Title
        >
      </Card.Header>
      <Card.Content class="px-3">
        <h2 class="font-bold text-4xl">{pageData.totalExecutionCount}</h2>
      </Card.Content>
    </Card.Root>
    <Card.Root class="p-3 gap-2">
      <Card.Header class="px-3">
        <Card.Title class="text-sm text-muted-foreground"
          >Success Rate</Card.Title
        >
      </Card.Header>
      <Card.Content class="px-3">
        <h2 class="font-bold text-4xl {successColor}">
          {pageData.successPercentage}%
        </h2>
      </Card.Content>
    </Card.Root>
    <Card.Root class="p-3 gap-2">
      <Card.Header class="px-3">
        <Card.Title class="text-sm text-muted-foreground">Last 24h</Card.Title>
      </Card.Header>
      <Card.Content class="px-3">
        <h2 class="font-bold text-4xl">{pageData.last24h}</h2>
      </Card.Content>
    </Card.Root>
  </section>
</main>
