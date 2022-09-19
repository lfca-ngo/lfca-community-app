import { useRouter } from 'next/router'
import React, { createContext, useContext, useEffect, useState } from 'react'

import { LS_ACTION_LIST } from '../components/ActionsList'
import { trackEvent } from '../services/analytics'
import { DESKTOP, getScreenSizeType } from '../utils'
import { ACTIONS } from '../utils/routes'
import { useDarkMode } from './useDarkMode'
import { useLocalStorage } from './useLocalStorage'
import { usePersistentNavigation } from './usePersistentNavigation'

const CLIENT = 'client'
const SERVER = 'server'
const SCREEN_SIZE = 'screen_size'

const initialState = {
  isClient: false,
  key: SERVER,
  screenSize: DESKTOP,
}

const AppContext = createContext(initialState)

export const AppProvider = ({
  categoriesList,
  children,
}: {
  categoriesList: string[]
  children: React.ReactNode
}) => {
  const router = useRouter()
  // states
  const [screenSize, setScreenSize] = useLocalStorage(
    SCREEN_SIZE,
    initialState.screenSize
  )
  const [isClient, setClient] = useState(initialState.isClient)
  // reset position
  const { options, resetPosition } = usePersistentNavigation(
    LS_ACTION_LIST,
    false,
    {
      categories: categoriesList,
    }
  )
  // after options are updated in local storage, we need to
  // trigger a rerun to populate the components we do this
  // by updating the app key based on the returned categories

  const key = isClient ? CLIENT : SERVER

  // set dark mode
  useDarkMode()

  // due to SSG we only know if it's mobile
  // after first client side render
  useEffect(() => {
    const screenSize = getScreenSizeType(window, document)
    setClient(true)
    setScreenSize(screenSize)
  }, [])

  // on route change
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      // track page view
      trackEvent({
        name: 'pageView',
        values: {
          to: url,
        },
      })
      // only persist the browsing state when the user goes from
      // the dashboard to the action detail page and back
      // in all other cases, reset the browsing state
      const fromDashboardToDetails =
        router.pathname === ACTIONS && url.startsWith('/action/')
      const fromDetailPageToDashboard =
        router.pathname.startsWith('/action/') && url === ACTIONS

      if (!(fromDashboardToDetails || fromDetailPageToDashboard)) {
        resetPosition()
      }
    }

    router.events.on('routeChangeStart', handleRouteChange)

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method:
    return () => {
      router.events.off('routeChangeStart', handleRouteChange)
    }
  }, [router.pathname, resetPosition, router.events])

  // wait with initial render until client side
  // to avoid SSR flashing
  if (!isClient) return null

  return (
    <AppContext.Provider
      key={options?.categories?.length}
      value={{
        isClient,
        key,
        screenSize,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useScreenSize = () => {
  const { screenSize } = useContext(AppContext)
  return screenSize
}

export const useIsClient = () => {
  const { isClient } = useContext(AppContext)
  return isClient
}
