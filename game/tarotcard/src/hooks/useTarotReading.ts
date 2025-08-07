import { useState, useCallback } from 'react';
import { tarotCards } from '../data/tarotCards';
import { Reading, DrawnCard, SpreadType } from '../types/tarot';
import { generateTarotInterpretation, generateFallbackInterpretation } from '../api/gemini';

export const useTarotReading = () => {
  const [currentReading, setCurrentReading] = useState<Reading | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const shuffleCards = useCallback(() => {
    const shuffled = [...tarotCards];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }, []);

  const getPositionNames = useCallback((spread: SpreadType) => {
    switch (spread) {
      case 'single':
        return ['当前指引'];
      case 'three-card':
        return ['过去', '现在', '未来'];
      case 'celtic-cross':
        return [
          '当前状况', '挑战/机遇', '远程过去', '近期过去',
          '可能结果', '近期未来', '你的方法', '外在影响',
          '希望与恐惧', '最终结果'
        ];
      default:
        return [''];
    }
  }, []);

  const drawCards = useCallback((spread: SpreadType) => {
    const shuffled = shuffleCards();
    const positions = getPositionNames(spread);
    const cardCount = positions.length;
    
    const drawnCards: DrawnCard[] = [];
    for (let i = 0; i < cardCount; i++) {
      const card = shuffled[i];
      const isReversed = Math.random() < 0.25; // 25% 逆位概率
      
      drawnCards.push({
        ...card,
        position: positions[i],
        reversed: isReversed
      });
    }
    
    return drawnCards;
  }, [shuffleCards, getPositionNames]);

  const performReading = useCallback(async (question: string, spread: SpreadType) => {
    setIsLoading(true);
    
    console.log('🎴 开始执行占卜...');
    console.log('问题:', question);
    console.log('牌阵:', spread);
    
    try {
      const cards = drawCards(spread);
      console.log('抽到的牌:', cards.map(c => c.nameCN));
      
      let interpretation: string;
      
      try {
        console.log('🤖 尝试调用 Gemini API...');
        // 尝试使用 Gemini API 进行解读
        interpretation = await generateTarotInterpretation({
          question,
          cards,
          spread
        });
        console.log('✅ Gemini API 调用成功');
      } catch (error) {
        console.warn('❌ AI 解读失败，使用备用解读:', error);
        // 如果 API 调用失败，使用备用解读
        interpretation = generateFallbackInterpretation({
          question,
          cards,
          spread
        });
        console.log('🔄 已切换到备用解读');
      }
      
      const reading: Reading = {
        id: Date.now().toString(),
        question,
        cards,
        interpretation,
        timestamp: Date.now(),
        spread
      };
      
      setCurrentReading(reading);
    } catch (error) {
      console.error('占卜过程中出错:', error);
      
      // 即使出现错误，也提供基本的占卜结果
      const cards = drawCards(spread);
      const reading: Reading = {
        id: Date.now().toString(),
        question,
        cards,
        interpretation: generateFallbackInterpretation({
          question,
          cards,
          spread
        }),
        timestamp: Date.now(),
        spread
      };
      setCurrentReading(reading);
    } finally {
      setIsLoading(false);
    }
  }, [drawCards]);

  const resetReading = useCallback(() => {
    setCurrentReading(null);
  }, []);

  return {
    currentReading,
    isLoading,
    performReading,
    resetReading
  };
};