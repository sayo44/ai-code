import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SpreadSelector } from './components/SpreadSelector';
import { TarotCard } from './components/TarotCard';
import { ReadingResult } from './components/ReadingResult';
import { ApiKeySetup } from './components/ApiKeySetup';
import { useTarotReading } from './hooks/useTarotReading';
import { SpreadType } from './types/tarot';
import { Sparkles, Moon, Star, Italic as Crystal } from 'lucide-react';

function App() {
  const [currentStep, setCurrentStep] = useState<'welcome' | 'apikey' | 'setup' | 'drawing' | 'result'>('welcome');
  const [selectedSpread, setSelectedSpread] = useState<SpreadType>('single');
  const [question, setQuestion] = useState('');
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasApiKey, setHasApiKey] = useState(false);
  
  const { currentReading, isLoading, performReading, resetReading } = useTarotReading();

  // 检查是否已有API Key
  useEffect(() => {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY || localStorage.getItem('gemini_api_key');
    if (apiKey && apiKey !== 'YOUR_API_KEY_HERE') {
      setHasApiKey(true);
    }
  }, []);

  const handleStartJourney = () => {
    if (hasApiKey) {
      setCurrentStep('setup');
    } else {
      setCurrentStep('apikey');
    }
  };

  const handleApiKeySet = (apiKey: string) => {
    localStorage.setItem('gemini_api_key', apiKey);
    setHasApiKey(true);
    setCurrentStep('setup');
  };

  const handleSkipApiKey = () => {
    setCurrentStep('setup');
  };

  const handleStartReading = () => {
    if (question.trim()) {
      setCurrentStep('drawing');
      setSelectedCards([]);
      setIsDrawing(true);
    }
  };

  const handleCardSelection = (cardIndex: number) => {
    if (isDrawing && selectedCards.length < getCardCount(selectedSpread)) {
      const newSelection = [...selectedCards, cardIndex];
      setSelectedCards(newSelection);
      
      // 立即检查是否已选够牌数
      const requiredCount = getCardCount(selectedSpread);
      if (newSelection.length === requiredCount) {
        // 立即停止抽牌状态，避免显示错误提示
        setIsDrawing(false);
        setTimeout(() => {
          performReading(question, selectedSpread).then(() => {
            setCurrentStep('result');
          });
        }, 500);
      }
    }
  };

  const getCardCount = (spread: SpreadType): number => {
    switch (spread) {
      case 'single': return 1;
      case 'three-card': return 3;
      case 'celtic-cross': return 10;
      default: return 1;
    }
  };

  const handleNewReading = () => {
    resetReading();
    setCurrentStep('welcome');
    setQuestion('');
    setSelectedCards([]);
    setIsDrawing(false);
  };

  const renderFloatingElements = () => (
    <>
      <motion.div
        className="fixed top-10 left-10 text-yellow-400 opacity-20"
        animate={{ rotate: 360, y: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      >
        <Star size={24} />
      </motion.div>
      <motion.div
        className="fixed top-20 right-16 text-purple-400 opacity-20"
        animate={{ rotate: -360, y: [0, 20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      >
        <Moon size={20} />
      </motion.div>
      <motion.div
        className="fixed bottom-20 left-20 text-pink-400 opacity-20"
        animate={{ rotate: 360, x: [0, 15, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      >
        <Crystal size={18} />
      </motion.div>
      <motion.div
        className="fixed bottom-16 right-12 text-cyan-400 opacity-20"
        animate={{ rotate: -360, x: [0, -10, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
      >
        <Sparkles size={22} />
      </motion.div>
    </>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-pink-950 relative overflow-hidden">
      {/* 背景装饰元素 */}
      {renderFloatingElements()}
      
      {/* 背景星空效果 */}
      <div className="fixed inset-0 opacity-30">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10">
        <AnimatePresence mode="wait">
          {currentStep === 'welcome' && (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.8 }}
              className="min-h-screen flex items-center justify-center p-6"
            >
              <div className="max-w-2xl text-center space-y-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                  className="mx-auto w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mb-8"
                >
                  <Sparkles className="w-12 h-12 text-white" />
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 bg-clip-text text-transparent mb-4"
                >
                  神秘塔罗
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="text-xl text-gray-300 mb-8 leading-relaxed"
                >
                  探索内心的智慧，倾听宇宙的声音<br />
                  让古老的塔罗为您指引前路
                </motion.p>

                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9, type: "spring" }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleStartJourney}
                  className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-full text-lg transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
                >
                  开始占卜之旅
                </motion.button>
              </div>
            </motion.div>
          )}

          {currentStep === 'apikey' && (
            <motion.div
              key="apikey"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.6 }}
            >
              <ApiKeySetup
                onApiKeySet={handleApiKeySet}
                onSkip={handleSkipApiKey}
              />
            </motion.div>
          )}

          {currentStep === 'setup' && (
            <motion.div
              key="setup"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.6 }}
              className="min-h-screen p-6"
            >
              <div className="max-w-4xl mx-auto pt-16">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-center mb-12"
                >
                  <h2 className="text-4xl font-bold text-white mb-4">准备占卜</h2>
                  <p className="text-gray-300 text-lg">请选择占卜方式并输入您的问题</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="space-y-8"
                >
                  <div>
                    <h3 className="text-2xl font-semibold text-white mb-6 text-center">选择占卜牌阵</h3>
                    <SpreadSelector
                      selectedSpread={selectedSpread}
                      onSpreadChange={setSelectedSpread}
                    />
                  </div>

                  <div className="max-w-2xl mx-auto">
                    <h3 className="text-2xl font-semibold text-white mb-4 text-center">输入您的问题</h3>
                    <div className="relative">
                      <textarea
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        placeholder="请输入您想要询问的问题..."
                        className="w-full p-4 bg-gray-900/50 border border-purple-500/50 rounded-xl text-white placeholder-gray-400 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 focus:outline-none resize-none h-32 backdrop-blur-sm"
                        maxLength={200}
                      />
                      <div className="absolute bottom-3 right-3 text-sm text-gray-400">
                        {question.length}/200
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-center gap-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setCurrentStep('welcome')}
                      className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-full transition-colors duration-300"
                    >
                      返回
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleStartReading}
                      disabled={!question.trim()}
                      className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
                    >
                      开始抽牌
                    </motion.button>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}

          {currentStep === 'drawing' && (
            <motion.div
              key="drawing"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 0.6 }}
              className="min-h-screen p-6 flex items-center justify-center"
            >
              <div className="max-w-6xl mx-auto text-center">
                <motion.h2
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-3xl font-bold text-white mb-6"
                >
                  {isDrawing ? (
                    selectedCards.length < getCardCount(selectedSpread) 
                      ? `请选择第 ${selectedCards.length + 1} 张牌` 
                      : '选牌完成，正在解读...'
                  ) : '正在解读中...'}
                </motion.h2>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mb-8"
                >
                  <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 backdrop-blur-sm rounded-xl p-4 border border-purple-500/30 max-w-2xl mx-auto">
                    <p className="text-gray-300">
                      <span className="text-yellow-400 font-semibold">问题：</span>
                      {question}
                    </p>
                  </div>
                </motion.div>

                {isDrawing ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className={`grid gap-4 max-w-6xl mx-auto ${
                      selectedCards.length >= getCardCount(selectedSpread) 
                        ? 'opacity-50 pointer-events-none' 
                        : 'grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8'
                    }`}
                  >
                    {[...Array(32)].map((_, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.02 }}
                        className="w-20 h-28 sm:w-24 sm:h-36 md:w-28 md:h-40"
                      >
                        <TarotCard
                          isFlipped={selectedCards.includes(index)}
                          isSelectable={!selectedCards.includes(index) && selectedCards.length < getCardCount(selectedSpread)}
                          onClick={() => handleCardSelection(index)}
                        />
                      </motion.div>
                    ))}
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center justify-center py-12"
                  >
                    <div className="text-center space-y-4">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="mx-auto w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center"
                      >
                        <Sparkles className="w-8 h-8 text-white" />
                      </motion.div>
                      <p className="text-xl text-gray-300">
                        {isLoading ? 'AI 正在为您解读牌意...' : '解读完成'}
                      </p>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}

          {currentStep === 'result' && currentReading && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="min-h-screen p-6 py-16"
            >
              <ReadingResult
                reading={currentReading}
                onNewReading={handleNewReading}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;