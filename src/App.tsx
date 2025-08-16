import React, { useState } from 'react';
import ChatInterface from './components/ChatInterface';
import EnglishDialog from './components/EnglishDialog';
import { callEnglishAgent } from './utils/mastraClient';
import { ScenarioType } from './types/englishChat';

import './App.css';

function App() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [englishContent, setEnglishContent] = useState('');
  const [loading, setLoading] = useState(false);

  const handleScenarioSelect = async (scenario: ScenarioType) => {
    setLoading(true);
    try {
      const response = await callEnglishAgent(scenario);
      console.log(response, 'response')
      setEnglishContent(response.text);
    } catch (error) {
      console.error('Error:', error);
      setEnglishContent('抱歉，获取对话内容失败，请稍后重试。');
    }
    setLoading(false);
  };

  return (
    <div className="App">
      <div className="header">
        <button 
          className="english-button"
          onClick={() => setIsDialogOpen(true)}
        >
          每日口语英语
        </button>
      </div>
      <ChatInterface />
      <EnglishDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSelect={handleScenarioSelect}
        englishContent={englishContent} // 传入对话内容
      />
      {loading && <div className="loading">加载中...</div>}
    </div>
  );
}

export default App;