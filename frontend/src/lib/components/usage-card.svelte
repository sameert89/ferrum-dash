
<script>
/** 
This component displays a usage card with a line chart for given parameter.  
**/
import * as Chart from "$lib/components/ui/chart/index.js";
import * as Card from "$lib/components/ui/card/index.js";
import { LineChart, ChartClipPath } from "layerchart";
import { scaleLinear } from "d3-scale";
import { curveNatural } from "d3-shape";
let { title = "Title", chartConfig = {
    color: "#ff0000",
    xKey: "time",
    yKey: "usage"
}, chartData = [] } = $props();

</script>

<Card.Root class="h-44 pt-3 w-full">
    <Card.Header>
        <Card.Title class="text-xs">{title}</Card.Title>
        <Card.Description class="text-2xl font-black text-foreground"
            >{chartData.length
                ? chartData[chartData.length - 1][chartConfig.yKey]
                : 0}%</Card.Description
        >
    </Card.Header>
    <Card.Content>
        <Chart.Container config={chartConfig} class="w-full h-20">
            <LineChart
                data={chartData}
                x={chartConfig.xKey}
                xScale={scaleLinear()}
                axis="x"
                yScale={scaleLinear()}
                series={[
                    {
                        key: chartConfig.yKey,
                        label: "Usage",
                        color: chartConfig.color,
                    },
                ]}
                props={{
                    spline: {
                        curve: curveNatural,
                        motion: "tween",
                        strokeWidth: 2,
                    },
                    highlight: { points: { r: 4 } },
                    xAxis: {
                        ticks: 0,
                    },
                }}
            >
                {#snippet tooltip()}
                    <Chart.Tooltip hideLabel />
                {/snippet}
            </LineChart>
        </Chart.Container>
    </Card.Content>
</Card.Root>
