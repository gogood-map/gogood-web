import {DashboardLine} from './DashboardLine';

export default {
  title: 'Dashboard',
  component: DashboardLine,
}

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July']
const data = [65, 59, 80, 81, 56, 55, 40]

const Template = () => <DashboardLine data={data} labels={labels} />

export const Basic = Template.bind({})
