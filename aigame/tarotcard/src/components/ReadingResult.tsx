import React from 'react';
import { motion } from 'framer-motion';
import { Reading } from '../types/tarot';
import { TarotCard } from './TarotCard';
import { Calendar, Clock, Sparkles } from 'lucide-react';

interface ReadingResultProps {
  reading: Reading;
  onNewReading: () => void;
}

export const ReadingResult: React.FC<ReadingResultProps> = ({
  reading,
  onNewReading
}) => {
  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getSpreadName = (spread: string) => {
    const names = {
      single: '单张牌占卜',
      'three-card': '三张牌阵',
      'celtic-cross': '凯尔特十字'
    };
    return names[spread as keyof typeof names] || spread;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="max-w-4xl mx-auto space-y-8"
    >
      {/* 占卜信息头部 */}
      <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 backdrop-blur-sm rounded-xl p-6 border border-purple-500/30">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-yellow-400 mb-2 flex items-center gap-2">
              <Sparkles className="w-6 h-6" />
              占卜结果
            </h2>
            <p className="text-gray-300 mb-1">
              <strong className="text-white">问题：</strong>{reading.question}
            </p>
            <p className="text-gray-300">
              <strong className="text-white">牌阵：</strong>{getSpreadName(reading.spread)}
            </p>
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-400">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {formatDate(reading.timestamp)}
            </div>
          </div>
        </div>
      </div>

      {/* 抽到的牌 */}
      <div className="bg-gradient-to-br from-gray-900/50 to-purple-900/30 backdrop-blur-sm rounded-xl p-6 border border-purple-500/30">
        <h3 className="text-xl font-semibold text-white mb-6 text-center">抽到的牌</h3>
        <div className={`grid gap-6 ${
          reading.cards.length === 1 
            ? 'justify-center' 
            : reading.cards.length === 3 
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
              : 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'
        } justify-items-center`}>
          {reading.cards.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              className="flex flex-col items-center space-y-3"
            >
              <div className="w-32 h-48 sm:w-40 sm:h-60 md:w-44 md:h-66">
                <TarotCard card={card} isFlipped={true} delay={index * 0.1} />
              </div>
              <div className="text-center max-w-40">
                <p className="text-sm font-medium text-yellow-400 mb-1">
                  {card.position}
                </p>
                <p className="text-xs text-gray-400">
                  {card.reversed ? '逆位' : '正位'}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* AI 解读 */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="bg-gradient-to-br from-indigo-900/40 to-purple-900/40 backdrop-blur-sm rounded-xl p-6 border border-indigo-500/30"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-xl font-semibold text-white">AI 智能解读</h3>
        </div>
        
        <div className="prose prose-invert max-w-none">
          <div className="text-gray-200 leading-relaxed whitespace-pre-wrap">
            {reading.interpretation}
          </div>
        </div>
      </motion.div>

      {/* 操作按钮 */}
      <div className="flex justify-center pt-6">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onNewReading}
          className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
        >
          开始新的占卜
        </motion.button>
      </div>
    </motion.div>
  );
};