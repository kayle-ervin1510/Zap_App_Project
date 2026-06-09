import { createContext, useContext, useState, useRef } from 'react'

const AppContext = createContext(null)

const SCREEN_TIME_HISTORY = [
  {
    label: 'Today',
    date: 'June 9th, 2026',
    totalMinutes: 327,
    apps: [
      { name: 'Amazon', minutes: 42, hourly: [
        { label: '3:00 PM', hour: 15, minutes: 30 },
        { label: '7:00 PM', hour: 19, minutes: 12 },
      ]},
      { name: 'Minecraft', minutes: 255, hourly: [
        { label: '2:00 AM', hour: 2, minutes: 45 },
        { label: '9:00 AM', hour: 9, minutes: 30 },
        { label: '2:00 PM', hour: 14, minutes: 60 },
        { label: '5:00 PM', hour: 17, minutes: 60 },
        { label: '8:00 PM', hour: 20, minutes: 60 },
      ]},
      { name: 'Google', minutes: 30, hourly: [
        { label: '10:00 AM', hour: 10, minutes: 15 },
        { label: '4:00 PM', hour: 16, minutes: 15 },
      ]},
    ],
  },
  {
    label: 'Yesterday',
    date: 'June 8th, 2026',
    totalMinutes: 960,
    apps: [
      { name: 'Amazon', minutes: 135, hourly: [
        { label: '11:00 AM', hour: 11, minutes: 60 },
        { label: '3:00 PM', hour: 15, minutes: 75 },
      ]},
      { name: 'Minecraft', minutes: 780, hourly: [
        { label: '12:00 AM', hour: 0, minutes: 120 },
        { label: '2:00 AM', hour: 2, minutes: 90 },
        { label: '9:00 AM', hour: 9, minutes: 60 },
        { label: '12:00 PM', hour: 12, minutes: 120 },
        { label: '4:00 PM', hour: 16, minutes: 120 },
        { label: '8:00 PM', hour: 20, minutes: 120 },
        { label: '11:00 PM', hour: 23, minutes: 60 },
      ]},
      { name: 'Google', minutes: 45, hourly: [
        { label: '1:00 PM', hour: 13, minutes: 25 },
        { label: '6:00 PM', hour: 18, minutes: 20 },
      ]},
    ],
  },
  {
    label: 'June 7th',
    date: 'June 7th, 2026',
    totalMinutes: 720,
    apps: [
      { name: 'Amazon', minutes: 60, hourly: [
        { label: '2:00 PM', hour: 14, minutes: 60 },
      ]},
      { name: 'Minecraft', minutes: 600, hourly: [
        { label: '8:00 AM', hour: 8, minutes: 60 },
        { label: '11:00 AM', hour: 11, minutes: 120 },
        { label: '3:00 PM', hour: 15, minutes: 120 },
        { label: '7:00 PM', hour: 19, minutes: 120 },
        { label: '10:00 PM', hour: 22, minutes: 60 },
        { label: '11:30 PM', hour: 23, minutes: 60 },
      ]},
      { name: 'Google', minutes: 60, hourly: [
        { label: '10:00 AM', hour: 10, minutes: 30 },
        { label: '5:00 PM', hour: 17, minutes: 30 },
      ]},
    ],
  },
  {
    label: 'June 6th',
    date: 'June 6th, 2026',
    totalMinutes: 195,
    apps: [
      { name: 'Amazon', minutes: 15, hourly: [
        { label: '4:00 PM', hour: 16, minutes: 15 },
      ]},
      { name: 'Minecraft', minutes: 150, hourly: [
        { label: '3:00 PM', hour: 15, minutes: 90 },
        { label: '7:00 PM', hour: 19, minutes: 60 },
      ]},
      { name: 'Google', minutes: 30, hourly: [
        { label: '12:00 PM', hour: 12, minutes: 30 },
      ]},
    ],
  },
  {
    label: 'June 5th',
    date: 'June 5th, 2026',
    totalMinutes: 480,
    apps: [
      { name: 'Amazon', minutes: 90, hourly: [
        { label: '1:00 PM', hour: 13, minutes: 50 },
        { label: '6:00 PM', hour: 18, minutes: 40 },
      ]},
      { name: 'Minecraft', minutes: 330, hourly: [
        { label: '4:00 PM', hour: 16, minutes: 120 },
        { label: '7:00 PM', hour: 19, minutes: 120 },
        { label: '10:00 PM', hour: 22, minutes: 90 },
      ]},
      { name: 'Google', minutes: 60, hourly: [
        { label: '9:00 AM', hour: 9, minutes: 30 },
        { label: '3:00 PM', hour: 15, minutes: 30 },
      ]},
    ],
  },
]

const PARENT_SCREEN_TIME = [
  {
    label: 'Today',
    date: 'June 9th, 2026',
    totalMinutes: 214,
    apps: [
      { name: 'Email', minutes: 75, hourly: [
        { label: '8:00 AM', hour: 8, minutes: 30 },
        { label: '12:00 PM', hour: 12, minutes: 25 },
        { label: '5:00 PM', hour: 17, minutes: 20 },
      ]},
      { name: 'Chrome', minutes: 90, hourly: [
        { label: '9:00 AM', hour: 9, minutes: 45 },
        { label: '2:00 PM', hour: 14, minutes: 45 },
      ]},
      { name: 'Zap App', minutes: 49, hourly: [
        { label: '7:30 AM', hour: 7, minutes: 20 },
        { label: '6:00 PM', hour: 18, minutes: 29 },
      ]},
    ],
  },
  {
    label: 'Yesterday',
    date: 'June 8th, 2026',
    totalMinutes: 390,
    apps: [
      { name: 'Email', minutes: 120, hourly: [
        { label: '8:00 AM', hour: 8, minutes: 60 },
        { label: '2:00 PM', hour: 14, minutes: 60 },
      ]},
      { name: 'Chrome', minutes: 210, hourly: [
        { label: '9:00 AM', hour: 9, minutes: 90 },
        { label: '1:00 PM', hour: 13, minutes: 60 },
        { label: '7:00 PM', hour: 19, minutes: 60 },
      ]},
      { name: 'Zap App', minutes: 60, hourly: [
        { label: '7:00 AM', hour: 7, minutes: 30 },
        { label: '5:00 PM', hour: 17, minutes: 30 },
      ]},
    ],
  },
  {
    label: 'June 7th',
    date: 'June 7th, 2026',
    totalMinutes: 155,
    apps: [
      { name: 'Email', minutes: 45, hourly: [
        { label: '8:00 AM', hour: 8, minutes: 45 },
      ]},
      { name: 'Chrome', minutes: 80, hourly: [
        { label: '10:00 AM', hour: 10, minutes: 40 },
        { label: '3:00 PM', hour: 15, minutes: 40 },
      ]},
      { name: 'Zap App', minutes: 30, hourly: [
        { label: '6:30 PM', hour: 18, minutes: 30 },
      ]},
    ],
  },
]

export function AppProvider({ children }) {
  const [registeredUsers, setRegisteredUsers] = useState([])
  const [pendingUser, setPendingUser] = useState(null)
  const [currentUser, setCurrentUser] = useState(null)
  const [children_, setChildren] = useState([])
  const [activityLog, setActivityLog] = useState([])
  // Tracks which (childId:appName) pairs have had their restriction set at least once
  const configuredRestrictions = useRef(new Set())

  function logActivity(childName, appName, action) {
    const now = new Date()
    const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    setActivityLog(prev => [{
      id: now.getTime() + Math.random(),
      time,
      date: 'June 9th, 2026',
      childName,
      appName,
      action,
    }, ...prev])
  }

  function startRegistration(userData) {
    setPendingUser(userData)
  }

  function confirmEmail() {
    if (!pendingUser) return false
    setRegisteredUsers(prev => [...prev, pendingUser])
    setPendingUser(null)
    return true
  }

  function login(usernameOrEmail, password) {
    const user = registeredUsers.find(
      u =>
        (u.username === usernameOrEmail || u.email === usernameOrEmail) &&
        u.password === password
    )
    if (user) {
      setCurrentUser(user)
      return true
    }
    return false
  }

  function logout() {
    setCurrentUser(null)
  }

  function findUserByEmail(email) {
    return registeredUsers.find(u => u.email.toLowerCase() === email.toLowerCase()) || null
  }

  function resetPassword(email, newPassword) {
    setRegisteredUsers(prev =>
      prev.map(u =>
        u.email.toLowerCase() === email.toLowerCase() ? { ...u, password: newPassword } : u
      )
    )
    if (currentUser?.email?.toLowerCase() === email.toLowerCase()) {
      setCurrentUser(prev => ({ ...prev, password: newPassword }))
    }
  }

  function deleteAccount() {
    setRegisteredUsers(prev => prev.filter(u => u.username !== currentUser?.username))
    setChildren([])
    setCurrentUser(null)
  }

  function updateParentProfile(updates) {
    setCurrentUser(prev => ({ ...prev, ...updates }))
    setRegisteredUsers(prev =>
      prev.map(u => (u.username === currentUser.username ? { ...u, ...updates } : u))
    )
  }

  function changePassword(currentPw, newPw) {
    if (currentUser.password !== currentPw) return false
    const updates = { password: newPw }
    setCurrentUser(prev => ({ ...prev, ...updates }))
    setRegisteredUsers(prev =>
      prev.map(u => (u.username === currentUser.username ? { ...u, ...updates } : u))
    )
    return true
  }

  function addChild(childData) {
    const newChild = {
      id: Date.now(),
      name: childData.name,
      screenTimeHistory: SCREEN_TIME_HISTORY,
      dailyGoalMinutes: null,
      stoppedApps: {},
      devices: [],
      apps: {
        timeRestricted: childData.timeRestrictedApps
          .split(',')
          .map(a => a.trim())
          .filter(Boolean)
          .map(name => ({ name, hours: 1, minutes: 0, requirePassword: false, requireEmail: false })),
        timeUnlimited: childData.timeUnlimitedApps
          .split(',')
          .map(a => a.trim())
          .filter(Boolean),
        unauthorized: childData.unauthorizedApps
          .split(',')
          .map(a => a.trim())
          .filter(Boolean),
      },
    }
    setChildren(prev => [...prev, newChild])
    return newChild.id
  }

  function removeChild(childId) {
    setChildren(prev => prev.filter(c => c.id !== Number(childId)))
  }

  function updateChildName(childId, newName) {
    setChildren(prev =>
      prev.map(c => (c.id === Number(childId) ? { ...c, name: newName } : c))
    )
  }

  function setChildGoal(childId, minutes) {
    setChildren(prev =>
      prev.map(c => (c.id === Number(childId) ? { ...c, dailyGoalMinutes: minutes } : c))
    )
  }

  function toggleStopApp(childId, appName) {
    const child = children_.find(c => c.id === Number(childId))
    const isStopping = child ? !child.stoppedApps[appName] : true
    setChildren(prev =>
      prev.map(c => {
        if (c.id !== Number(childId)) return c
        const stopped = { ...c.stoppedApps }
        stopped[appName] = !stopped[appName]
        return { ...c, stoppedApps: stopped }
      })
    )
    if (child) {
      logActivity(child.name, appName,
        isStopping
          ? `Stopped ${appName} for ${child.name}`
          : `Resumed ${appName} for ${child.name}`)
    }
  }

  function updateAppRestriction(childId, appName, updates) {
    const child = children_.find(c => c.id === Number(childId))
    setChildren(prev =>
      prev.map(c => {
        if (c.id !== Number(childId)) return c
        return {
          ...c,
          apps: {
            ...c.apps,
            timeRestricted: c.apps.timeRestricted.map(app =>
              app.name === appName ? { ...app, ...updates } : app
            ),
          },
        }
      })
    )
    if (child && (updates.hours !== undefined || updates.minutes !== undefined)) {
      const existing = child.apps.timeRestricted.find(a => a.name === appName)
      const newH = updates.hours ?? existing?.hours ?? 0
      const newM = updates.minutes ?? existing?.minutes ?? 0
      const timeParts = []
      if (newH > 0) timeParts.push(`${newH} hr${newH !== 1 ? 's' : ''}`)
      if (newM > 0) timeParts.push(`${newM} min`)
      const timeStr = timeParts.join(' and ') || '0 min'
      const key = `${childId}:${appName}`
      const isInitialSet = !configuredRestrictions.current.has(key)
      configuredRestrictions.current.add(key)
      if (isInitialSet) {
        logActivity(child.name, appName,
          `You set ${child.name}'s ${appName} restrictions to ${timeStr}`)
      } else {
        logActivity(child.name, appName,
          `You added an additional ${timeStr} to ${child.name}'s ${appName} time`)
      }
    }
  }

  function removeApp(childId, listType, appName) {
    if (listType === 'timeRestricted') {
      configuredRestrictions.current.delete(`${childId}:${appName}`)
    }
    const child = children_.find(c => c.id === Number(childId))
    setChildren(prev =>
      prev.map(c => {
        if (c.id !== Number(childId)) return c
        const list = c.apps[listType]
        const updated =
          listType === 'timeRestricted'
            ? list.filter(a => a.name !== appName)
            : list.filter(a => a !== appName)
        return { ...c, apps: { ...c.apps, [listType]: updated } }
      })
    )
    if (child) {
      const action =
        listType === 'unauthorized'
          ? `${child.name}'s access to ${appName} has been unblocked`
          : listType === 'timeUnlimited'
          ? `${child.name}'s unlimited access to ${appName} has been removed`
          : `You removed ${appName} from ${child.name}'s restricted apps`
      logActivity(child.name, appName, action)
    }
  }

  function addApp(childId, listType, appName) {
    const trimmed = appName.trim()
    if (!trimmed) return
    const child = children_.find(c => c.id === Number(childId))
    setChildren(prev =>
      prev.map(c => {
        if (c.id !== Number(childId)) return c
        const list = c.apps[listType]
        const alreadyExists =
          listType === 'timeRestricted'
            ? list.some(a => a.name.toLowerCase() === trimmed.toLowerCase())
            : list.some(a => a.toLowerCase() === trimmed.toLowerCase())
        if (alreadyExists) return c
        const newEntry =
          listType === 'timeRestricted'
            ? { name: trimmed, hours: 1, minutes: 0, requirePassword: false, requireEmail: false }
            : trimmed
        return { ...c, apps: { ...c.apps, [listType]: [...list, newEntry] } }
      })
    )
    if (child) {
      const actionMap = {
        timeRestricted: `You set ${child.name}'s ${trimmed} restrictions to 1 hr 0 min`,
        timeUnlimited: `${child.name}'s access to ${trimmed} has been approved with unlimited time`,
        unauthorized: `${child.name}'s access to ${trimmed} has been blocked`,
      }
      logActivity(child.name, trimmed, actionMap[listType])
    }
  }

  function addDevice(childId, deviceName) {
    const trimmed = deviceName.trim()
    if (!trimmed) return
    setChildren(prev =>
      prev.map(child => {
        if (child.id !== Number(childId)) return child
        if (child.devices.some(d => d.name.toLowerCase() === trimmed.toLowerCase())) return child
        return { ...child, devices: [...child.devices, { id: Date.now(), name: trimmed }] }
      })
    )
  }

  function removeDevice(childId, deviceId) {
    setChildren(prev =>
      prev.map(child => {
        if (child.id !== Number(childId)) return child
        return { ...child, devices: child.devices.filter(d => d.id !== deviceId) }
      })
    )
  }

  function getChild(childId) {
    return children_.find(c => c.id === Number(childId)) || null
  }

  return (
    <AppContext.Provider
      value={{
        currentUser,
        pendingUser,
        children: children_,
        parentScreenTime: PARENT_SCREEN_TIME,
        activityLog,
        startRegistration,
        confirmEmail,
        login,
        logout,
        findUserByEmail,
        resetPassword,
        deleteAccount,
        updateParentProfile,
        changePassword,
        addChild,
        removeChild,
        updateChildName,
        setChildGoal,
        toggleStopApp,
        updateAppRestriction,
        removeApp,
        addApp,
        addDevice,
        removeDevice,
        getChild,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  return useContext(AppContext)
}
