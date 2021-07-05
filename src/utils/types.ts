export interface Group {
  id: number
  title: string
  tasks: string[]
}
export type Data = Group[]

export type ButtonProps = {
  icon: string
  title: string
}
