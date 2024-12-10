"use client"
import React from 'react'
import { Provider } from 'jotai'
const JotaiWrapper = ({children}:{children:React.ReactNode}) => {
  return (
    <div>
        <Provider>
            {children}
        </Provider>
    </div>
  )
}

export default JotaiWrapper