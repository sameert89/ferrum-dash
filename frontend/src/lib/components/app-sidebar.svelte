<script>
import * as Sidebar from "$lib/components/ui/sidebar/index.js";
import { Button } from "$lib/components/ui/button/index.js";
import HomeIcon from "@lucide/svelte/icons/home";
import BarChart3Icon from "@lucide/svelte/icons/bar-chart-3";
import ZapIcon from "@lucide/svelte/icons/zap";
import TerminalIcon from "@lucide/svelte/icons/terminal";
import SettingsIcon from "@lucide/svelte/icons/settings";
import GithubIcon from "@lucide/svelte/icons/github";
import { page } from "$app/state";
import { mode } from "mode-watcher";

import logo from '$lib/assets/logo.png';

const items = [
	{
		title: "Home",
		url: "/home",
		icon: HomeIcon,
	},
	{
		title: "Insights",
		url: "/insights",
		icon: BarChart3Icon,
	},
	{
		title: "Webhooks",
		url: "/webhooks",
		icon: ZapIcon,
	},
	{
		title: "Shell",
		url: "/shell",
		icon: TerminalIcon,
	},
	{
		title: "Settings",
		url: "/settings",
		icon: SettingsIcon,
	},
];
</script>

<Sidebar.Root collapsible="icon">
	<Sidebar.Header>
		<img src={logo} alt ="App Logo" class="h-10 w-10 mx-auto mt-4 rounded-md"/>
	</Sidebar.Header>
	<Sidebar.Content class="flex items-center mx-auto">
		<Sidebar.Group>
			<Sidebar.GroupContent>
				<Sidebar.Menu>
					{#each items as item (item.title)}
						<Sidebar.MenuItem>
							<Sidebar.MenuButton size="xl" class="flex justify-center" isActive={page.url.pathname === item.url}>
								{#snippet child({ props })}
									<a href={item.url} {...props}>
										<item.icon />
										<span class="group-data-[collapsible=icon]:hidden">{item.title}</span>
									</a>
								{/snippet}
							</Sidebar.MenuButton>
						</Sidebar.MenuItem>
					{/each}
				</Sidebar.Menu>
			</Sidebar.GroupContent>
		</Sidebar.Group>
	</Sidebar.Content>
	<Sidebar.Footer class="flex items-center mt-auto">
		<a href="https://github.com/sameert89">
			<Button variant="secondary" class="rounded-full" >
				<GithubIcon/>
			</Button>
		</a>
	</Sidebar.Footer>
</Sidebar.Root>
