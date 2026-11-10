export type LearningModuleStatus = 'planned' | 'prototype' | 'ready';

export interface LearningModule {
  id: string;
  title: string;
  status: LearningModuleStatus;
  summary: string;
}
