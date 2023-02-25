import { create } from 'zustand';

const useIsUpdateStore = create(set => ({
  isUpdate: true,
  setIsUpdate: state => set(() => ({ isUpdate: state })),
}));

export default useIsUpdateStore;
