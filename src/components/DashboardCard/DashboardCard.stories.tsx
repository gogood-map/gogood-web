import { DashboardCard } from './DashboardCard'

export default {
  title: 'DashboardCard',
  component: DashboardCard,
}

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const data = [65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 56]

const Template = () => <DashboardCard height='50vh' data={data} labels={labels} title='SIM' type='line' />

export const Basic = Template.bind({})
