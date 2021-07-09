export type Color = {
  id: string
  color: string
  style: {
    backgroundColor: string
  }
}

export const lableColors: Color[] = [
  {
    id: 'green_01',
    color: 'green',
    style: {
      backgroundColor: 'hsl(125, 81%, 86%)'
    }
  },
  {
    id: 'purple_01',
    color: 'purple',
    style: {
      backgroundColor: 'hsl(240, 41%, 76%)'
    }
  },
  {
    id: 'blue_01',
    color: 'blue',
    style: {
      backgroundColor: 'hsl(205, 59%, 80%)'
    }
  },
  {
    id: 'green_02',
    color: 'olive',
    style: {
      backgroundColor: 'hsl(106, 21%, 66%)'
    }
  },
  {
    id: 'red_01',
    color: 'red',
    style: {
      backgroundColor: 'hsl(345, 69%, 90%)'
    }
  },
  {
    id: 'orange_01',
    color: 'orange',
    style: {
      backgroundColor: 'hsl(25, 80%, 77%)'
    }
  }
]
