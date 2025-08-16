export type ScenarioType = '购物' | '观光' | '点餐' | '问路';

export interface EnglishResponse {
  text: string;
}

export interface EnglishDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (scenario: ScenarioType) => Promise<void>;
  englishContent?: string;
}
