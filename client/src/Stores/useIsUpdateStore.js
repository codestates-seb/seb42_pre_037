import { create } from 'zustand';

export const useIsUpdateQuestionStore = create(set => ({
  isUpdate: true,
  setIsUpdate: state => set(() => ({ isUpdate: state })),
}));

export const useIsUpdateAnswerStore = create(set => ({
  isUpdate: true,
  setIsUpdate: state => set(() => ({ isUpdate: state })),
}));
