import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ChartData, Point, BubbleDataPoint, ChartOptions } from 'chart.js'
import { designTokens } from 'design-tokens'
import { useEffect } from 'react'

export type DashboardProps = {
  data: number[]
  labels: string[]
}

export function DashboardLine(props: DashboardProps) {
  const { data, labels } = props
  ChartJS.register(Title, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement)

  const dataDash = {
    labels: labels,
    datasets: [
      {
        data: data,
        fill: false,
        backgroundColor: designTokens.color.primary,
        borderColor: designTokens.color.primary,
        tension: 0.3,
        borderWidth: 2,
        pointBorderWidth: 0,
      }
    ],
  } as ChartData<"line", (number | [number, number] | Point | BubbleDataPoint | null)[], unknown>

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        display: false,
      }
    },
    maintainAspectRatio: false,
  } as ChartOptions<"line">

  useEffect(() => {
    const chart = ChartJS.getChart('lineChart')
    if (chart) {
      chart.data = {
        labels: labels,
        datasets: [
          {
            data: data,
            fill: false,
            backgroundColor: designTokens.color.primary,
            borderColor: designTokens.color.primary,
            tension: 0.3,
            borderWidth: 2,
            pointBorderWidth: 0,
          }
        ],
      }
      chart.update()
    }
  }, [data, labels])

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      gap: designTokens.spacing.medium,
      height: '100%',
    }}>
      <Line id='lineChart' data={dataDash} options={options} />
    </div>
  )
}
