"use client"
import { TrendingUp } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
    } from "@/components/ui/card"
    import {
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
    } from "@/components/ui/chart"

    export function ProfileStatsChart({ last20kills = [], last20deaths = [] }) {
        if (!Array.isArray(last20kills) || last20kills.length === 0) {
                return (
                <Card>
                    <CardHeader>
                    <CardTitle>Match Performance</CardTitle>
                    </CardHeader>
                    <CardContent className="flex items-center justify-center h-40">
                    <div className="text-sm text-muted-foreground">Loading chart data...</div>
                    {/* Optionally use a loader spinner from shadcn here */}
                    </CardContent>
                </Card>
                );
            }
    // Build chart data from props
    const chartData = last20kills.map((kill, index) => ({
        match: `Game ${index + 1}`,
        kills: kill,
        deaths: last20deaths[index] ?? 0,
    }))

    const chartConfig = {
        kills: {
        label: "Kills",
        color: "hsl(var(--chart-1))",
        },
        deaths: {
        label: "Deaths",
        color: "hsl(var(--chart-2))",
        },
    }

    return (
        <Card style={{ height: "450px", width: "500px" }}>
        <CardHeader>
            <CardTitle>Recent Matches</CardTitle>
            <CardDescription>
            Kills and Deaths over the last 20 matches
            </CardDescription>
        </CardHeader>
        <CardContent>
            <ChartContainer config={chartConfig}>
            <AreaChart
                accessibilityLayer
                data={chartData}
                margin={{ left: 12, right: 12 }}
            >
                <CartesianGrid vertical={false} />
                <XAxis
                dataKey="match"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                />
                <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="line" />}
                />
                <Area
                dataKey="kills"
                type="natural"
                fill="var(--chart-1)"
                fillOpacity={0.4}
                stroke="var(--chart-1)"
                stackId="a"
                />
                <Area
                dataKey="deaths"
                type="natural"
                fill="var(--chart-2)"
                fillOpacity={0.4}
                stroke="var(--chart-2)"
                stackId="a"
                />
                <ChartLegend content={<ChartLegendContent />} />
            </AreaChart>
            </ChartContainer>
        </CardContent>
        <CardFooter>
            <div className="flex w-full items-start gap-2 text-sm">
            <div className="grid gap-2">
                <div className="flex items-center gap-2 font-medium leading-none">
                Performance trend <TrendingUp className="h-4 w-4" />
                </div>
                <div className="flex items-center gap-2 leading-none text-muted-foreground">
                Last 20 Matches
                </div>
            </div>
            </div>
        </CardFooter>
        </Card>
    )
}
