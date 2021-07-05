export interface Group {
  id: number
  title: string
  tasks: string[]
}
export type Data = Group[]

export type ButtonProps = {
  icon: string
  title: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onclickFunction: (e: any) => void
}
