<script>
  import { Button } from "$lib/components/ui/button/index.js";
  import ZapIcon from "@lucide/svelte/icons/zap";
  import axios from "axios";

  import { serverUrl } from "$lib/store";

  // Component to render as the icon; defaults to ZapIcon
  let {
    icon: Icon = ZapIcon,
    label = "Quick Action",
    urlFragment = "",
    iconColor = "red",
  } = $props();

  const handleClick = async () => {
    const url = new URL($serverUrl);
    url.pathname = urlFragment;
    await axios
      .post(url.toString())
      .then((response) => {
        console.log("Action triggered successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error triggering action:", error);
      });
  };
</script>

<Button
  variant="secondary"
  size="lg"
  onclick={handleClick}
  class="flex flex-col justify-center h-15 w-full hover:bg-primary hover:text-black"
>
  <Icon color={iconColor} class="size-5" />
  <span class="text-xs">{label}</span>
</Button>
