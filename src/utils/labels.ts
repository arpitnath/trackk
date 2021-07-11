import { Tag } from './types'

export type Color = {
  id: string
  color: string
  style: {
    backgroundColor: string
  }
}

export const lableColors: Color[] = [
  {
    id: '9F27410725AB8CC8854A2769C7A516B8',
    color: 'green',
    style: {
      backgroundColor: 'hsl(125, 81%, 86%)'
    }
  },
  {
    id: 'BB7AEDFA61007447DD6EFAF9F37641E3',
    color: 'purple',
    style: {
      backgroundColor: 'hsl(240, 41%, 76%)'
    }
  },
  {
    id: '48D6215903DFF56238E52E8891380C8F',
    color: 'blue',
    style: {
      backgroundColor: 'hsl(205, 59%, 80%)'
    }
  },
  {
    id: 'F431B0EEA3C08186ED101E588BFB3A2F',
    color: 'olive',
    style: {
      backgroundColor: 'hsl(106, 61%, 66%)'
    }
  },
  {
    id: 'BDA9643AC6601722A28F238714274DA4',
    color: 'red',
    style: {
      backgroundColor: 'hsl(345, 69%, 90%)'
    }
  },
  {
    id: 'FE01D67A002DFA0F3AC084298142ECCD',
    color: 'orange',
    style: {
      backgroundColor: 'hsl(25, 80%, 77%)'
    }
  }
]

export const tags: Tag[] = [
  {
    id: 'E3255BAE220613022D67E26D2E4FA689',
    tag: '🐞 Bugs'
  }
]

export const savedTags: Tag[] = [
  {
    id: '350550C2F36AF7E8DE3463D6F78B1C81',
    tag: '🐣 Hatched'
  }
]
