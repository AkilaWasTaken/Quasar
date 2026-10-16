export interface Award {
  id: string
  name: string
  event: string
  year: string
  isMain?: boolean
}

export const AWARDS: Award[] = [
  { id: 'design-award-2018', name: 'Design Award II', event: 'FIRST Tech Challenge', year: '2018-2019' },
  { id: 'think-award-2019', name: 'Think Award I', event: 'FIRST Tech Challenge', year: '2019-2020' },
  { id: 'control-award-2020', name: 'Control Award III', event: 'FIRST Tech Challenge', year: '2020-2021' },
  { id: 'eco-guard-2022', name: 'Eco Guard', event: 'FIRST Tech Challenge', year: '2022-2023' },
  { id: 'design-award-2023', name: 'Design Award II', event: 'FIRST Tech Challenge', year: '2023-2024' },
  { id: 'control-award-2024', name: 'Control Award III', event: 'FIRST Tech Challenge', year: '2024-2025' },
  { id: 'control-award-italy-2024', name: 'Control Award II', event: 'FIRST Tech Challenge — Italy', year: '2024-2025', isMain: true },
]
