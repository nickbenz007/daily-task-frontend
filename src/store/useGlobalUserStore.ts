import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {IAuthenticatedUser} from '@/types';

interface IUserStore {
  user: IAuthenticatedUser | null;
  updateUser: (user: IAuthenticatedUser | null) => void;
}

const useGlobalUserStore = create<IUserStore>()(
  persist(
    setState => ({
      user: null,
      updateUser: user => {
        setState(state => ({...state, user}));
      },
    }),
    {
      name: 'daily-task-user-store',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export default useGlobalUserStore;
