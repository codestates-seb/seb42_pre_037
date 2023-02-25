import { create } from 'zustand';

export const useQuestionIsUpdate = create(set => ({
  isUpdate: true,
  setIsUpdate: state => set(() => ({ isUpdate: state })),
}));

export const useAnswerIsUpdate = create(set => ({
  isUpdate: true,
  setIsUpdate: state => set(() => ({ isUpdate: state })),
}));
