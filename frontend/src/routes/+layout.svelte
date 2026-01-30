<script>
	import "../app.css";
	import favicon from '$lib/assets/favicon.svg';
	import * as Sidebar from "$lib/components/ui/sidebar/index.js";
	import AppSidebar from "$lib/components/app-sidebar.svelte";
	import { ModeWatcher, toggleMode } from "mode-watcher";
	import { Button } from "$lib/components/ui/button/index.js";
	import SunIcon from "@lucide/svelte/icons/sun";
	import MoonIcon from "@lucide/svelte/icons/moon";

	let { children } = $props();

</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<Sidebar.Provider class="flex"> 
	<AppSidebar />
	<main class="flex-1">
		<ModeWatcher defaultMode={"dark"}/>
		{@render children?.()}
	</main>
</Sidebar.Provider>

<Button onclick={toggleMode} variant="outline" size="icon" class="hidden fixed top-0 right-0 m-4">
  <SunIcon
    class="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all! dark:scale-0 dark:-rotate-90"
  />
  <MoonIcon
    class="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all! dark:scale-100 dark:rotate-0"
  />
  <span class="sr-only">Toggle theme</span>
</Button>
