import { HistoryTableItem } from './HistoryTableItem'

export default {
  title: 'Components/HistoryTableItem',
  component: HistoryTableItem,
}

export const Default = () => <HistoryTableItem date="Quinta-feira, 25 Jan, 2024" origin="Rua A, 123" destination="Rua B, 456" onClick={() => console.log('clicked')} />
