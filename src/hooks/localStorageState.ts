import React from 'react'
import { Data, Group, Tag } from '../utils/types'

export const useLocalStorgeState = (
  key: string,
  defaultValue: Data | (() => Data) | Tag[] | string,
  { serialize = JSON.stringify, deserialize = JSON.parse } = {}
) => {
  const [state, setState] = React.useState(() => {
    let valueInLocalStorage = window.localStorage.getItem(key)

    if (valueInLocalStorage === 'undefined') {
      valueInLocalStorage = window.localStorage.getItem(`copy${key}`)
      window.localStorage.removeItem(key)
    }

    if (valueInLocalStorage) {
      return deserialize(valueInLocalStorage)
    }

    //if we are getting the data may be with a function call or getting for an api
    return typeof defaultValue === 'function' ? defaultValue() : defaultValue
  })

  const prevKeyRef = React.useRef(key)

  React.useLayoutEffect(() => {
    window.localStorage.setItem(`copy${key}`, serialize(state))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key])

  React.useEffect(() => {
    const prevKey = prevKeyRef.current

    if (prevKey !== key) {
      window.localStorage.removeItem(prevKey)
    }

    if (key === 'board') {
      state?.forEach((group: Group) => {
        group.tasks?.forEach((arr) => {
          if (arr === undefined || arr === null) {
            setState((prevState: Data) => {
              const copyPrev = JSON.parse(JSON.stringify(prevState))
              const newState = copyPrev.tasks?.splice(
                group.tasks.indexOf(arr),
                1
              )
              return newState
            })
          }
        })
      })
    }

    prevKeyRef.current = key
    window.localStorage.setItem(key, serialize(state))
  }, [key, serialize, state])

  return [state, setState]
}
