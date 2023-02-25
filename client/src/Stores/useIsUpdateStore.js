import { create } from 'zustand';

const useIsUpdate = create(set => ({
  isUpdate: true,
  setIsUpdate: state => set(() => ({ isUpdate: state })),
}));

export default useIsUpdate;
