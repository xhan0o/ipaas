'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { activityData } from '@/lib/mock-data'
import { format } from 'date-fns'
import { ArrowUpRight } from 'lucide-react'
import { ResponsiveLine } from '@nivo/line'
import { useMemo } from 'react'
import { useTheme } from '@/components/theme-provider'

export function ActivityChart() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  // Transform data for Nivo format
  const chartData = useMemo(() => {
    // Define type for aggregated data
    interface AggregatedEntry {
      time: string
      total: number
      Shopify?: number
      Amazon?: number
      NetSuite?: number
      QuickBooks?: number
      [key: string]: string | number | undefined
    }

    // Group data by hour and aggregate
    const aggregated = activityData.reduce((acc: AggregatedEntry[], curr) => {
      const hour = format(curr.timestamp, 'HH:00')
      const existing = acc.find(d => d.time === hour)

      if (existing) {
        const categoryKey = curr.integrationId === 'shopify' ? 'Shopify' :
                           curr.integrationId === 'amazon' ? 'Amazon' :
                           curr.integrationId === 'netsuite' ? 'NetSuite' :
                           curr.integrationId === 'quickbooks' ? 'QuickBooks' : null
        
        if (categoryKey && ['Shopify', 'Amazon', 'NetSuite', 'QuickBooks'].includes(categoryKey)) {
          existing[categoryKey] = (existing[categoryKey] || 0) + curr.recordCount
        }
        existing.total += curr.recordCount
      } else {
        const categoryKey = curr.integrationId === 'shopify' ? 'Shopify' :
                           curr.integrationId === 'amazon' ? 'Amazon' :
                           curr.integrationId === 'netsuite' ? 'NetSuite' :
                           curr.integrationId === 'quickbooks' ? 'QuickBooks' : null
        
        const newEntry: AggregatedEntry = {
          time: hour,
          total: curr.recordCount
        }
        
        if (categoryKey && ['Shopify', 'Amazon', 'NetSuite', 'QuickBooks'].includes(categoryKey)) {
          newEntry[categoryKey] = curr.recordCount
        }
        
        acc.push(newEntry)
      }

      return acc
    }, []).sort((a, b) => a.time.localeCompare(b.time))

    // Transform to Nivo format
    const series = (['Shopify', 'Amazon', 'NetSuite', 'QuickBooks'] as const).map(name => ({
      id: name,
      data: aggregated.map(item => ({
        x: item.time,
        y: (item[name] as number) || 0
      })),
      color: name === 'Shopify' ? '#3b82f6' :
             name === 'Amazon' ? '#f59e0b' :
             name === 'NetSuite' ? '#10b981' :
             '#8b5cf6'
    }))

    return series
  }, [])

  const colors = ['#3b82f6', '#f59e0b', '#10b981', '#8b5cf6']
  const textColor = isDark ? 'rgba(214, 214, 214, 0.9)' : 'rgba(30, 41, 59, 0.9)'
  const gridColor = isDark ? 'rgba(148, 163, 184, 0.15)' : 'rgba(148, 163, 184, 0.2)'
  const axisColor = isDark ? 'rgba(148, 163, 184, 0.4)' : 'rgba(148, 163, 184, 0.5)'

  return (
    <Card className="border-border/60 bg-card/80 backdrop-blur">
      <CardHeader className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <CardTitle className="text-lg font-semibold">
            Activity Timeline · Last 24 Hours
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Throughput per integration, aggregated hourly. Use it to anticipate load spikes.
          </p>
        </div>
        <Button variant="outline" size="sm" className="border-border/60">
          <ArrowUpRight className="mr-2 h-4 w-4" />
          Export CSV
        </Button>
      </CardHeader>
      <CardContent className="h-[420px] w-full pt-6">
        <div className="h-full w-full">
          <ResponsiveLine
            data={chartData}
            margin={{ top: 20, right: 20, bottom: 60, left: 70 }}
            xScale={{ type: 'point' }}
            yScale={{
              type: 'linear',
              min: 0,
              max: 'auto',
              nice: true
            }}
            curve="monotoneX"
            axisTop={null}
            axisRight={null}
            axisBottom={{
              tickSize: 0,
              tickPadding: 12,
              tickRotation: -45,
              legend: '',
              legendOffset: 36,
              legendPosition: 'middle',
              format: (value) => value,
              tickValues: chartData[0]?.data.filter((_, i) => i % 2 === 0).map(d => d.x)
            }}
            axisLeft={{
              tickSize: 0,
              tickPadding: 12,
              tickRotation: 0,
              legend: 'Records',
              legendOffset: -50,
              legendPosition: 'middle',
              format: (value) => `${value.toLocaleString()}`
            }}
            pointSize={8}
            pointColor={{ from: 'color', modifiers: [] }}
            pointBorderWidth={2}
            pointBorderColor={{ from: 'serieColor' }}
            pointLabelYOffset={-12}
            enableArea={true}
            areaBaselineValue={0}
            areaOpacity={0.15}
            areaBlendMode="normal"
            useMesh={true}
            enableGridX={true}
            enableGridY={true}
            gridXValues={chartData[0]?.data.map(d => d.x)}
            gridYValues={5}
            colors={colors}
            theme={{
              background: 'transparent',
              text: {
                fontSize: 12,
                fill: textColor,
                fontFamily: 'inherit'
              },
              axis: {
                domain: {
                  line: {
                    stroke: axisColor,
                    strokeWidth: 1
                  }
                },
                ticks: {
                  line: {
                    stroke: axisColor,
                    strokeWidth: 1
                  },
                  text: {
                    fontSize: 11,
                    fill: textColor,
                    fontFamily: 'inherit'
                  }
                },
                legend: {
                  text: {
                    fontSize: 12,
                    fill: textColor,
                    fontFamily: 'inherit',
                    fontWeight: 600
                  }
                }
              },
              grid: {
                line: {
                  stroke: gridColor,
                  strokeWidth: 1,
                  strokeDasharray: '4 4'
                }
              },
              tooltip: {
                container: {
                  background: isDark ? 'rgba(15, 23, 42, 0.95)' : 'rgba(255, 255, 255, 0.95)',
                  color: textColor,
                  fontSize: 12,
                  borderRadius: '8px',
                  padding: '8px 12px',
                  border: `1px solid ${isDark ? 'rgba(148, 163, 184, 0.2)' : 'rgba(148, 163, 184, 0.3)'}`,
                  backdropFilter: 'blur(10px)',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                }
              },
              legends: {
                text: {
                  fontSize: 11,
                  fill: textColor,
                  fontFamily: 'inherit'
                }
              }
            }}
            legends={[
              {
                anchor: 'top-right',
                direction: 'row',
                justify: false,
                translateX: 0,
                translateY: -10,
                itemsSpacing: 20,
                itemDirection: 'left-to-right',
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 1,
                symbolSize: 12,
                symbolShape: 'circle',
                effects: [
                  {
                    on: 'hover',
                    style: {
                      itemOpacity: 0.8
                    }
                  }
                ]
              }
            ]}
            animate={true}
            motionConfig={{
              mass: 1,
              tension: 280,
              friction: 60
            }}
            tooltip={({ point }) => {
              const seriesColor = point.seriesColor
              return (
                <div style={{
                  background: isDark ? 'rgba(15, 23, 42, 0.95)' : 'rgba(255, 255, 255, 0.95)',
                  color: textColor,
                  borderRadius: '8px',
                  padding: '8px 12px',
                  border: `1px solid ${isDark ? 'rgba(148, 163, 184, 0.2)' : 'rgba(148, 163, 184, 0.3)'}`,
                  backdropFilter: 'blur(10px)',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                  fontSize: '12px',
                  fontFamily: 'inherit'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: seriesColor }} />
                    <div style={{ fontWeight: 600 }}>{point.seriesId}</div>
                  </div>
                  <div style={{ fontSize: '14px', marginBottom: '2px' }}>
                    {point.data.y.toLocaleString()} records
                  </div>
                  <div style={{ fontSize: '11px', opacity: 0.7 }}>
                    {point.data.x}
                  </div>
                </div>
              )
            }}
          />
        </div>
      </CardContent>
    </Card>
  )
}
