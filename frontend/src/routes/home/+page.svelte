<script>
import { Badge } from "$lib/components/ui/badge/index.js";
import * as Card from "$lib/components/ui/card/index.js";
import Deque from "double-ended-queue";
import { cssVar } from "$lib/utils";
import { onMount } from "svelte";
import { serverUrl } from "$lib/store";
import PowerIcon from "@lucide/svelte/icons/power";
import RestartIcon from "@lucide/svelte/icons/rotate-ccw"

import UsageCard from "$lib/components/usage-card.svelte";
import QuickAction from "$lib/components/quick-action.svelte";

const usageBuffer = new Deque();
let usage = $state([]);
let time = 0;

const fetchLiveStats = async () => {
	// MockData
	const cpuUsage = Math.floor(Math.random() * 100);
	const memoryUsage = Math.floor(Math.random() * 100);
	const diskUsage = Math.floor(Math.random() * 100);
	const diskIO = Math.floor(Math.random() * 100);
	if(usageBuffer.length > 5)
		usageBuffer.shift();
	usageBuffer.push({ time: time++, cpuUsage: cpuUsage, memoryUsage, diskUsage, diskIO });
	usage = usageBuffer.toArray();
};

$effect(() => {
	const interval = setInterval(fetchLiveStats, 2000);
	return () => clearInterval(interval);
});

// default colors
let chartConfig = $state({
	chart1: {
		color: "#ff0000"
	},
	chart2: {
		color: "#00ff00"
	},
	chart3: {
		color: "#0000ff"
	},
	chart4: {
		color: "#ffff00"
	}
});

onMount(() => {
	// get chart colors from CSS variables
	chartConfig = {
		chart1: {
			color: cssVar("--chart-1")
		},
		chart2: {
			color: cssVar("--chart-2")
		},
		chart3: {
			color: cssVar("--chart-3")
		},
		chart4: {
			color: cssVar("--chart-4")
		}
	};
});

</script>

<main class="p-3 flex flex-col gap-2" id="content">
	<div class="flex justify-between items-center">
	<div>
		<h1 class="inline font-bold text-3xl mt-2 bg-linear-to-r from-orange-500 via-zinc-400 to-slate-500 bg-clip-text text-transparent"> Ferrum Dash </h1>
		<h6 class="text-xs text-muted-foreground"> System Monitor & Remote Management </h6>
	</div>
	<Badge variant="secondary" class="p-3 h-7"><span class="text-slate-400"> Server: </span> {new URL($serverUrl).hostname}</Badge>
	</div>
	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4 w-full" id="usage-cards">
		<UsageCard title="CPU Usage" chartConfig={{ color: chartConfig.chart1.color, xKey: "time", yKey: "cpuUsage" }} chartData={usage} />
		<UsageCard title="Memory Usage" chartConfig={{ color: chartConfig.chart2.color, xKey: "time", yKey: "memoryUsage" }} chartData={usage} />
		<UsageCard title="Disk Usage" chartConfig={{ color: chartConfig.chart3.color, xKey: "time", yKey: "diskUsage" }} chartData={usage} />
		<UsageCard title="Disk I/O" chartConfig={{ color: chartConfig.chart4.color, xKey: "time", yKey: "diskIO" }} chartData={usage} />
	</div>
	<div id="quick-actions"> 
		<Card.Root>
			<Card.Header>
				<Card.Title class="text-lg font-bold"> Quick Actions </Card.Title>
			</Card.Header>
			<Card.Content class="grid grid-cols-2">
				<QuickAction label="Shutdown Server" urlFragment="/api/server/shutdown" icon={PowerIcon} iconColor="red" />
			</Card.Content>
			<Card.Content class="grid grid-cols-2">
				<QuickAction label="Reboot Server" urlFragment="/api/server/reboot" icon={RestartIcon} iconColor="green" />
			</Card.Content>
		</Card.Root>		
	</div>
</main>