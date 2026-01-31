<script>
  import { Badge } from "$lib/components/ui/badge/index.js";
  import * as Card from "$lib/components/ui/card/index.js";
  import * as Table from "$lib/components/ui/table/index.js";
  import * as Item from "$lib/components/ui/item/index.js";
  import Deque from "double-ended-queue";
  import { cssVar } from "$lib/utils";
  import { onMount } from "svelte";
  import { serverUrl } from "$lib/store";
  import PowerIcon from "@lucide/svelte/icons/power";
  import RestartIcon from "@lucide/svelte/icons/rotate-ccw";
  import RunningProcessesIcon from "@lucide/svelte/icons/cpu";
  import QuickActionsIcon from "@lucide/svelte/icons/zap";
  import RecentRoutinesIcon from "@lucide/svelte/icons/webhook";
  import SuccessIcon from "@lucide/svelte/icons/circle-check";
  import FailureIcon from "@lucide/svelte/icons/circle-alert";
  import { Button } from "$lib/components/ui/button/index.js";
  import { calculateTimePassedAsVerboseString } from "$lib/utils";

  import UsageCard from "$lib/components/usage-card.svelte";
  import QuickAction from "$lib/components/quick-action.svelte";

  const usageBuffer = new Deque();
  let usage = $state([]);
  let runningProcesses = $state([]);
  let recentRoutines = $state([]);
  let time = 0;

  const fetchLiveStats = async () => {
    // MockData
    const cpuUsage = Math.floor(Math.random() * 100);
    const memoryUsage = Math.floor(Math.random() * 100);
    const diskUsage = Math.floor(Math.random() * 100);
    const diskIO = Math.floor(Math.random() * 100);

    runningProcesses = [
      {
        pid: 1234,
        name: "nginx",
        cpu: Math.random().toFixed(1) + "%",
        memory: Math.random().toFixed(1) + "%",
        user: "root",
      },
      {
        pid: 5678,
        name: "mysql",
        cpu: Math.random().toFixed(1) + "%",
        memory: Math.random().toFixed(1) + "%",
        user: "mysql",
      },
      {
        pid: 9101,
        name: "node",
        cpu: Math.random().toFixed(1) + "%",
        memory: Math.random().toFixed(1) + "%",
        user: "root",
      },
      {
        pid: 1122,
        name: "redis",
        cpu: Math.random().toFixed(1) + "%",
        memory: Math.random().toFixed(1) + "%",
        user: "redis",
      },
      {
        pid: 1314,
        name: "postgres",
        cpu: Math.random().toFixed(1) + "%",
        memory: Math.random().toFixed(1) + "%",
        user: "postgres",
      },
      {
        pid: 1516,
        name: "python-app",
        cpu: Math.random().toFixed(1) + "%",
        memory: Math.random().toFixed(1) + "%",
        user: "appuser",
      },
      {
        pid: 1718,
        name: "elastic",
        cpu: Math.random().toFixed(1) + "%",
        memory: Math.random().toFixed(1) + "%",
        user: "elastic",
      },
      {
        pid: 1920,
        name: "kafka",
        cpu: Math.random().toFixed(1) + "%",
        memory: Math.random().toFixed(1) + "%",
        user: "kafka",
      },
    ];
    recentRoutines = [
      {
        success: true,
        name: "test routine 1",
        timeSince: calculateTimePassedAsVerboseString(
          new Date("2026-01-31T10:16:42.090Z"),
        ),
      },
      {
        success: false,
        name: "test routine 2",
        timeSince: calculateTimePassedAsVerboseString(
          new Date("2026-01-30T10:16:42.090Z"),
        ),
      },
    ];
    if (usageBuffer.length > 5) usageBuffer.shift();
    usageBuffer.push({
      time: time++,
      cpuUsage: cpuUsage,
      memoryUsage,
      diskUsage,
      diskIO,
    });
    usage = usageBuffer.toArray();
  };

  $effect(() => {
    const interval = setInterval(fetchLiveStats, 2000);
    return () => clearInterval(interval);
  });

  // default colors
  let chartConfig = $state({
    chart1: {
      color: "#ff0000",
    },
    chart2: {
      color: "#00ff00",
    },
    chart3: {
      color: "#0000ff",
    },
    chart4: {
      color: "#ffff00",
    },
  });

  onMount(() => {
    // get chart colors from CSS variables
    chartConfig = {
      chart1: {
        color: cssVar("--chart-1"),
      },
      chart2: {
        color: cssVar("--chart-2"),
      },
      chart3: {
        color: cssVar("--chart-3"),
      },
      chart4: {
        color: cssVar("--chart-4"),
      },
    };
  });
</script>

<main class="p-3 flex flex-col gap-2 h-full" id="content">
  <div class="flex justify-between items-center">
    <div>
      <h1
        class="inline font-bold text-3xl mt-2 bg-linear-to-r from-orange-500 via-zinc-400 to-slate-500 bg-clip-text text-transparent"
      >
        Ferrum Dash
      </h1>
      <h6 class="text-xs text-muted-foreground">
        System Monitor & Remote Management
      </h6>
    </div>
    <Badge variant="secondary" class="p-3 h-7"
      ><span class="text-slate-400"> Server: </span>
      {new URL($serverUrl).hostname}</Badge
    >
  </div>
  <div
    class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 mt-4 w-full"
    id="usage-cards"
  >
    <UsageCard
      title="CPU Usage"
      chartConfig={{
        color: chartConfig.chart1.color,
        xKey: "time",
        yKey: "cpuUsage",
      }}
      chartData={usage}
    />
    <UsageCard
      title="Memory Usage"
      chartConfig={{
        color: chartConfig.chart2.color,
        xKey: "time",
        yKey: "memoryUsage",
      }}
      chartData={usage}
    />
    <UsageCard
      title="Disk Usage"
      chartConfig={{
        color: chartConfig.chart3.color,
        xKey: "time",
        yKey: "diskUsage",
      }}
      chartData={usage}
    />
    <UsageCard
      title="Disk I/O"
      chartConfig={{
        color: chartConfig.chart4.color,
        xKey: "time",
        yKey: "diskIO",
      }}
      chartData={usage}
    />
  </div>
  <div class="flex w-full gap-2 flex-col lg:flex-row">
    <div id="running-processes" class="w-full">
      <Card.Root class="p-3 gap-2 h-full flex flex-col">
        <Card.Header class="px-2 flex justify-between">
          <div class="flex gap-1 items-center">
            <RunningProcessesIcon class="w-4 h-4 text-primary" />
            <Card.Title class="text-lg font-bold">Running Processes</Card.Title>
          </div>
          <span class="text-sm text-muted-foreground"
            >{runningProcesses.length} processes</span
          >
        </Card.Header>
        <Card.Content class="px-2 flex-1 overflow-auto max-h-68">
          <Table.Root>
            <Table.Header>
              <Table.Row>
                <Table.Head>PID</Table.Head>
                <Table.Head>Process Name</Table.Head>
                <Table.Head>CPU Usage</Table.Head>
                <Table.Head>Memory Usage</Table.Head>
                <Table.Head>User</Table.Head>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {#each runningProcesses as process (process.pid)}
                <Table.Row>
                  <Table.Cell>{process.pid}</Table.Cell>
                  <Table.Cell>{process.name}</Table.Cell>
                  <Table.Cell>{process.cpu}</Table.Cell>
                  <Table.Cell>{process.memory}</Table.Cell>
                  <Table.Cell>{process.user}</Table.Cell>
                </Table.Row>
              {/each}
            </Table.Body>
          </Table.Root>
        </Card.Content>
      </Card.Root>
    </div>
    <div id="quick-actions" class="w-full lg:w-3/5">
      <Card.Root class="p-3 h-full flex flex-col">
        <Card.Header class="px-2 flex gap-1">
          <QuickActionsIcon class="w-4 h-4 text-primary" />
          <Card.Title class="px-0 font-bold">Quick Actions</Card.Title>
        </Card.Header>
        <Card.Content class="grid grid-cols-2 gap-2 px-2">
          <QuickAction
            label="Shutdown Server"
            urlFragment="/api/server/shutdown"
            icon={PowerIcon}
            iconColor="red"
          />
          <QuickAction
            label="Reboot Server"
            urlFragment="/api/server/reboot"
            icon={RestartIcon}
            iconColor="green"
          />
        </Card.Content>
      </Card.Root>
    </div>
  </div>
  <div id="recent-routines" class="flex-1">
    <Card.Root class="p-3 gap-2 h-full flex flex-col">
      <Card.Header class="px-2 flex justify-between">
        <div class="flex gap-1 items-center">
          <RecentRoutinesIcon class="w-4 h-4 text-accent" />
          <Card.Title class="text-lg font-bold">Recent Routines</Card.Title>
        </div>
        <Button variant="ghost" class="font-xs text-muted-foreground">
          View All
        </Button>
      </Card.Header>
      <Card.Content class="px-2 flex-1 overflow-auto">
        {#if recentRoutines.length === 0}
          <div
            class="text-sm text-muted-foreground flex h-full items-center justify-center"
          >
            No recent routines
          </div>
        {:else}
          {#each recentRoutines as recentRoutine}
            <Item.Root>
              <Item.Media>
                {#if recentRoutine.success}
                  <SuccessIcon class="text-green-600" />
                {:else}
                  <FailureIcon class="text-red-600" />
                {/if}
              </Item.Media>
              <Item.Content class="flex flex-row justify-between">
                <span>{recentRoutine.name}</span>
                <span class="text-xs text-muted-foreground"
                  >{recentRoutine.timeSince} ago</span
                >
              </Item.Content>
            </Item.Root>
          {/each}
        {/if}
      </Card.Content>
    </Card.Root>
  </div>
</main>
