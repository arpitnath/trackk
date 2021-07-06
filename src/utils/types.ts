export interface Group {
  id: string
  title: string
  tasks: Task[]
}
export type Data = Group[]

export type ButtonProps = {
  icon: string
  title: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onclickFunction: (e: any) => void
  _className: string
}

export type Task = {
  id: string
  heading: string
  content: string
}
