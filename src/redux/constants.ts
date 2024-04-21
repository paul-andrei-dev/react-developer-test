// NAMESPACES
export const USERS = 'users'
export const PROJECTS = 'projects'

const ALL_NAMESPACES = [
    USERS,
    PROJECTS
] as const

export type Namespace = typeof ALL_NAMESPACES[number];

