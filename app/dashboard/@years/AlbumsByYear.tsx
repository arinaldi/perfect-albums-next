'use client';
import { CartesianGrid, Line, LineChart, XAxis } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

export interface CountByYear {
  count: number;
  year: string;
}

interface Props {
  data: CountByYear[];
}

const chartConfig = {
  count: {
    color: 'hsl(var(--primary))',
    label: 'Albums',
  },
} satisfies ChartConfig;

export default function AlbumsByYear({ data }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Albums by year</CardTitle>
        <CardDescription>
          {data[0].year} &ndash; {data.at(-1)?.year}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
          <LineChart
            accessibilityLayer
            data={data}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              axisLine={false}
              dataKey="year"
              tickLine={false}
              tickMargin={10}
            />
            <ChartTooltip
              content={<ChartTooltipContent hideIndicator />}
              cursor={false}
            />
            <Line
              activeDot={{ r: 4 }}
              dataKey="count"
              dot={false}
              stroke="var(--color-count)"
              strokeWidth={1.5}
              type="natural"
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
