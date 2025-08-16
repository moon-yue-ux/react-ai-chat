import React, { useState } from 'react';
import { EnglishDialogProps, ScenarioType } from '../types/englishChat';
import './EnglishDialog.css';
import ReactMarkdown from 'react-markdown';


const scenarios: ScenarioType[] = ['购物', '观光', '点餐', '问路'];

const EnglishDialog: React.FC<EnglishDialogProps> = ({ isOpen, onClose, onSelect, englishContent }) => {
  const [response, setResponse] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [selectedScenario, setSelectedScenario] = useState<ScenarioType | null>(null);

  if (!isOpen) return null;

  const handleScenarioSelect = async (scenario: ScenarioType) => {
    setSelectedScenario(scenario);
    setLoading(true);
    try {
      await onSelect(scenario);
    } catch (error) {
      setResponse('抱歉，出现了一些错误。请稍后重试。');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dialog-overlay" onClick={onClose}>
      <div className="dialog-content" onClick={(e) => e.stopPropagation()}>
        <h2 className="dialog-title">每日英语练习</h2>
        <div className="dialog-body">
          <div className="scenario-buttons">
            {scenarios.map((scenario) => (
              <button
                key={scenario}
                onClick={() => handleScenarioSelect(scenario)}
                disabled={loading}
                className={selectedScenario === scenario ? 'active' : ''}
              >
                {scenario}
              </button>
            ))}
          </div>
          
          <div className={`response-area ${loading ? 'loading' : ''}`}>
            {loading ? '正在加载 AI 助手的回复...' : englishContent && (
              <div className="english-content">
                <h3>情境对话</h3>
                <div className="english-text">
                  <ReactMarkdown>{englishContent}</ReactMarkdown>
                </div>
              </div>
            )}
          </div>
        </div>

        <button className="close-button" onClick={onClose}>
          关闭
        </button>
      </div>
    </div>
  );
};

export default EnglishDialog;
