"use client"

import * as React from "react"
import { TrendingUp } from "lucide-react"
import { PieChart, Pie, Cell, Label } from "recharts"
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
    ChartTooltip,
    ChartTooltipContent,
    } from "@/components/ui/chart"

    export function StatsPieChart({
    last20kills = [],
    last20deaths = [],
    last20assists = [],
    }) {
    if (!Array.isArray(last20kills) || last20kills.length === 0) {
        return (
        <Card>
            <CardHeader>
            <CardTitle>Match Performance</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-center h-40">
            <div className="text-sm text-muted-foreground">Loading chart data...</div>
            </CardContent>
        </Card>
        )
    }

    // Sum total KDA stats
    const totalKills = last20kills.reduce((sum, val) => sum + val, 0)
    const totalDeaths = last20deaths.reduce((sum, val) => sum + val, 0)
    const totalAssists = last20assists.reduce((sum, val) => sum + val, 0)

    const chartData = [
        { name: "Kills", value: totalKills, fill: "#ff6384", label: "Kills" },
        { name: "Deaths", value: totalDeaths, fill: "#36a2eb", label: "Deaths" },
        { name: "Assists", value: totalAssists, fill: "#cc65fe", label: "Assists" },
    ]

    const chartConfig = {
            kills: {
            label: "Kills",
            color: "#ff6384",
            },
            deaths: {
            label: "Deaths",
            color: "#36a2eb",
            },
            assists: {
            label: "Assists",
            color: "#cc65fe",
            },
        };

    const totalStats = totalKills + totalDeaths + totalAssists

    return (
            <Card className="flex flex-col" style={{ height: "450px", width: "500px" }}>
            <CardHeader className="items-center pb-0">
            <CardTitle>Pie Chart - Donut with Text</CardTitle>
            <CardDescription>Last 20 Games</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
            <ChartContainer
                config={chartConfig}
                className="mx-auto aspect-square max-h-[250px]"
            >
                <PieChart>
                <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                />
                <Pie
                    data={chartData}
                    dataKey="value"
                    nameKey="label"
                    innerRadius={60}
                    outerRadius={100}
                    strokeWidth={5}
                >
                    {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                    <Label
                    content={({ viewBox }) => {
                        if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                        return (
                            <text
                            x={viewBox.cx}
                            y={viewBox.cy}
                            textAnchor="middle"
                            dominantBaseline="middle"
                            >
                            <tspan
                                x={viewBox.cx}
                                y={viewBox.cy}
                                className="fill-foreground text-3xl font-bold"
                            >
                                {totalStats.toLocaleString()}
                            </tspan>
                            <tspan
                                x={viewBox.cx}
                                y={(viewBox.cy || 0) + 24}
                                className="fill-muted-foreground"
                            >
                                Total KDA
                            </tspan>
                            </text>
                        )
                        }
                    }}
                    />
                </Pie>
                </PieChart>
            </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">
            <div className="leading-none text-muted-foreground">
                Stats from your last 20 matches
            </div>
            </CardFooter>
        </Card>
    )
}