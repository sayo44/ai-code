import React from 'react';
import { motion } from 'framer-motion';
import { SpreadType } from '../types/tarot';
import { Zap, Clock, Grid3x3 } from 'lucide-react';

interface SpreadSelectorProps {
  selectedSpread: SpreadType;
  onSpreadChange: (spread: SpreadType) => void;
}

export const SpreadSelector: React.FC<SpreadSelectorProps> = ({
  selectedSpread,
  onSpreadChange
}) => {
  const spreads = [
    {
      type: 'single' as SpreadType,
      name: '单张牌占卜',
      description: '快速获得简单明了的指导',
      icon: Zap,
      cards: 1
    },
    {
      type: 'three-card' as SpreadType,
      name: '三张牌阵',
      description: '过去、现在、未来的时间线解读',
      icon: Clock,
      cards: 3
    },
    {
      type: 'celtic-cross' as SpreadType,
      name: '凯尔特十字',
      description: '最经典的全面占卜牌阵',
      icon: Grid3x3,
      cards: 10
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {spreads.map((spread) => {
        const Icon = spread.icon;
        const isSelected = selectedSpread === spread.type;
        
        return (
          <motion.div
            key={spread.type}
            className={`relative p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
              isSelected
                ? 'border-yellow-400 bg-gradient-to-br from-purple-900/50 to-pink-900/50 shadow-lg shadow-yellow-400/20'
                : 'border-purple-700/50 bg-gradient-to-br from-gray-900/30 to-purple-900/30 hover:border-purple-500'
            }`}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSpreadChange(spread.type)}
          >
            <div className="flex flex-col items-center text-center space-y-3">
              <div className={`p-3 rounded-full ${
                isSelected 
                  ? 'bg-yellow-400/20 text-yellow-400' 
                  : 'bg-purple-500/20 text-purple-400'
              }`}>
                <Icon size={24} />
              </div>
              
              <div>
                <h3 className={`font-bold text-lg mb-1 ${
                  isSelected ? 'text-yellow-400' : 'text-white'
                }`}>
                  {spread.name}
                </h3>
                <p className="text-gray-300 text-sm mb-2">
                  {spread.description}
                </p>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                  isSelected
                    ? 'bg-yellow-400/20 text-yellow-400'
                    : 'bg-purple-500/20 text-purple-400'
                }`}>
                  {spread.cards} 张牌
                </span>
              </div>
            </div>

            {isSelected && (
              <motion.div
                className="absolute inset-0 rounded-xl bg-gradient-to-br from-yellow-400/10 to-pink-400/10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            )}
          </motion.div>
        );
      })}
    </div>
  );
};