import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { apiGetCurrent, apiGetRole } from '~/apis/user'
export const useUserStore = create(
    persist((set, get) => ({
        token: null,
        current: null,
        roles: [],
        setToken: (token) => {
            set(() => ({
                token
            }))
        },
        getCurrent: async () => {
            const response = await apiGetCurrent()
            if (response.success) {
                return set(() => ({
                    current: response.currentUser
                }))
            } else {
                return set(() => ({
                    current: null
                }))
            }
        },
        getRoles: async () => {
            const response = await apiGetRole()
            if (response.success) {
                return set(() => ({
                    roles: response.roles
                }))
            } else {
                return set(() => ({
                    roles: []
                }))
            }
        },
        Logout: () => {
            return set(() => ({
                token: null,
                current: null,
            }))
        }
    }),
        {
            name: 'rest06',
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => {
                return Object.fromEntries(
                    Object.entries(state).filter(el => el[0] === 'token' || el[0] === 'current')
                )
            }
        },
    ))