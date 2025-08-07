import React from 'react';
import { DrawnCard } from '../types/tarot';
import { motion } from 'framer-motion';
import { Crown, Sword, Heart, Coins, Zap, Eye, Moon, Sun, Star, Shield, Flame, Droplets, Wind, Mountain, Trees as Tree, Flower, Diamond } from 'lucide-react';

interface TarotCardProps {
  card?: DrawnCard;
  isFlipped: boolean;
  isSelectable?: boolean;
  onClick?: () => void;
  delay?: number;
}

export const TarotCard: React.FC<TarotCardProps> = ({
  card,
  isFlipped,
  isSelectable = false,
  onClick,
  delay = 0
}) => {
  const cardVariants = {
    hidden: { rotateY: 0, scale: 0.8 },
    visible: { 
      rotateY: isFlipped ? 180 : 0,
      scale: isSelectable ? 1.05 : 1,
      transition: {
        delay,
        duration: 0.8,
        type: "spring",
        stiffness: 100
      }
    },
    hover: {
      scale: isSelectable ? 1.1 : (isFlipped ? 1.02 : 1),
      y: isSelectable ? -10 : 0,
      transition: { duration: 0.2 }
    }
  };

  // 获取牌的图案和颜色
  const getCardIcon = (card: DrawnCard) => {
    if (card.type === 'major') {
      // 大阿卡纳特殊图案
      const majorIcons: { [key: number]: React.ComponentType<any> } = {
        0: Wind,      // 愚者
        1: Zap,       // 魔术师
        2: Eye,       // 女祭司
        3: Flower,    // 皇后
        4: Crown,     // 皇帝
        5: Mountain,  // 教皇
        6: Heart,     // 恋人
        7: Shield,    // 战车
        8: Flame,     // 力量
        9: Star,      // 隐士
        10: Sun,      // 命运之轮
        11: Sword,    // 正义
        12: Tree,     // 倒吊人
        13: Moon,     // 死神
        14: Droplets, // 节制
        15: Flame,    // 恶魔
        16: Zap,      // 塔
        17: Star,     // 星星
        18: Moon,     // 月亮
        19: Sun,      // 太阳
        20: Crown,    // 审判
        21: Diamond   // 世界
      };
      return majorIcons[card.id] || Star;
    } else {
      // 小阿卡纳按花色
      switch (card.suit) {
        case 'wands': return Flame;
        case 'cups': return Heart;
        case 'swords': return Sword;
        case 'pentacles': return Coins;
        default: return Star;
      }
    }
  };

  const getCardColors = (card: DrawnCard) => {
    if (card.type === 'major') {
      return {
        gradient: 'from-purple-500 via-pink-500 to-yellow-500',
        bg: 'bg-gradient-to-br from-purple-600 to-pink-600',
        border: 'border-yellow-400',
        glow: 'shadow-purple-500/50'
      };
    } else {
      switch (card.suit) {
        case 'wands':
          return {
            gradient: 'from-red-500 via-orange-500 to-yellow-500',
            bg: 'bg-gradient-to-br from-red-500 to-orange-600',
            border: 'border-orange-400',
            glow: 'shadow-red-500/50'
          };
        case 'cups':
          return {
            gradient: 'from-blue-500 via-cyan-500 to-teal-500',
            bg: 'bg-gradient-to-br from-blue-500 to-cyan-600',
            border: 'border-cyan-400',
            glow: 'shadow-blue-500/50'
          };
        case 'swords':
          return {
            gradient: 'from-gray-500 via-blue-500 to-indigo-500',
            bg: 'bg-gradient-to-br from-gray-500 to-blue-600',
            border: 'border-blue-400',
            glow: 'shadow-gray-500/50'
          };
        case 'pentacles':
          return {
            gradient: 'from-green-500 via-yellow-500 to-amber-500',
            bg: 'bg-gradient-to-br from-green-500 to-yellow-600',
            border: 'border-yellow-400',
            glow: 'shadow-green-500/50'
          };
        default:
          return {
            gradient: 'from-purple-500 to-pink-500',
            bg: 'bg-gradient-to-br from-purple-500 to-pink-600',
            border: 'border-purple-400',
            glow: 'shadow-purple-500/50'
          };
      }
    }
  };

  const renderCardNumber = (card: DrawnCard) => {
    if (card.type === 'major') {
      return (
        <div className="text-xs font-bold text-white bg-black/30 rounded px-1">
          {card.id}
        </div>
      );
    } else if (card.number) {
      if (card.number <= 10) {
        return (
          <div className="text-xs font-bold text-white bg-black/30 rounded px-1">
            {card.number}
          </div>
        );
      } else {
        const courtCards = ['J', 'Q', 'K'];
        return (
          <div className="text-xs font-bold text-white bg-black/30 rounded px-1">
            {card.number === 11 ? 'P' : courtCards[card.number - 12] || 'A'}
          </div>
        );
      }
    }
    return null;
  };

  const renderSuitSymbols = (card: DrawnCard) => {
    if (card.type === 'minor' && card.suit && card.number && card.number <= 10) {
      const count = Math.min(card.number, 5); // 最多显示5个符号
      const Icon = getCardIcon(card);
      
      return (
        <div className="absolute inset-3 flex flex-wrap items-center justify-center gap-1">
          {[...Array(count)].map((_, i) => (
            <Icon 
              key={i} 
              size={card.number <= 3 ? 20 : card.number <= 6 ? 16 : 12} 
              className="text-white/80" 
            />
          ))}
          {card.number > 5 && (
            <div className="text-sm text-white/60 font-bold">
              +{card.number - 5}
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div
      className={`relative w-full h-full cursor-${isSelectable ? 'pointer' : 'default'} perspective-1000`}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      onClick={onClick}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {/* 卡片背面 */}
      <div
        className="absolute inset-0 w-full h-full backface-hidden rounded-lg shadow-lg"
        style={{ transform: 'rotateY(0deg)', backfaceVisibility: 'hidden' }}
      >
        <div className="w-full h-full bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 rounded-lg border-2 border-yellow-400/50 p-1">
          <div className="w-full h-full bg-gradient-radial from-purple-800/30 to-transparent rounded-md relative overflow-hidden">
            {/* 背面装饰图案 */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                <motion.div
                  className="w-20 h-20 sm:w-24 sm:h-24 border-2 border-yellow-400/60 rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                  className="absolute inset-3 border border-yellow-400/40 rounded-full"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Star className="w-8 h-8 sm:w-10 sm:h-10 text-yellow-400/80" />
                </div>
              </div>
            </div>
            
            {/* 背面星星装饰 */}
            <div className="absolute inset-0 opacity-30">
              <div className="absolute top-2 left-2 w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
              <div className="absolute top-4 right-3 w-1 h-1 bg-blue-300 rounded-full animate-pulse delay-300"></div>
              <div className="absolute bottom-3 left-3 w-1.5 h-1.5 bg-pink-300 rounded-full animate-pulse delay-700"></div>
              <div className="absolute bottom-2 right-2 w-1 h-1 bg-green-300 rounded-full animate-pulse delay-1000"></div>
            </div>
          </div>
        </div>
      </div>

      {/* 卡片正面 */}
      <div
        className="absolute inset-0 w-full h-full backface-hidden rounded-lg shadow-xl"
        style={{ transform: 'rotateY(180deg)', backfaceVisibility: 'hidden' }}
      >
        {card && (
          <div className={`w-full h-full bg-gradient-to-br from-amber-50 to-orange-100 rounded-lg border-2 ${getCardColors(card).border} p-1 ${getCardColors(card).glow} shadow-lg`}>
            <div className="w-full h-full bg-white rounded border border-amber-300 relative overflow-hidden">
              {/* 逆位标识 */}
              {card.reversed && (
                <div className="absolute top-1 right-1 bg-red-500 text-white text-xs px-1 py-0.5 rounded z-20 font-bold">
                  逆位
                </div>
              )}
              
              {/* 牌号 */}
              <div className="absolute top-1 left-1 z-20">
                {renderCardNumber(card)}
              </div>

              <div className="p-1 h-full flex flex-col">
                {/* 牌名 */}
                <div className="text-center mb-1 z-10 relative bg-white/80 rounded px-1">
                  <h3 className="text-sm md:text-base font-bold text-gray-800 leading-tight">
                    {card.nameCN}
                  </h3>
                  <p className="text-xs md:text-sm text-gray-600 italic leading-tight">{card.name}</p>
                </div>
                
                {/* 主图案区域 */}
                <div className="flex-1 flex items-center justify-center relative">
                  <div className={`w-20 h-24 sm:w-24 sm:h-32 md:w-28 md:h-36 ${getCardColors(card).bg} rounded-lg relative overflow-hidden ${card.reversed ? 'rotate-180' : ''} shadow-lg`}>
                    {/* 渐变背景 */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${getCardColors(card).gradient} opacity-90`} />
                    
                    {/* 主图标 */}
                    <div className="absolute inset-0 flex items-center justify-center z-10">
                      {React.createElement(getCardIcon(card), {
                        size: card.type === 'major' ? 40 : 36,
                        className: "text-white drop-shadow-lg"
                      })}
                    </div>
                    
                    {/* 装饰元素 */}
                    <div className="absolute top-1 left-1 w-2 h-2 bg-white/30 rounded-full" />
                    <div className="absolute bottom-1 right-1 w-2 h-2 bg-white/30 rounded-full" />
                    
                    {/* 小阿卡纳数字符号 */}
                    {renderSuitSymbols(card)}
                    
                    {/* 大阿卡纳特殊装饰 */}
                    {card.type === 'major' && (
                      <div className="absolute inset-2 border border-white/30 rounded-md">
                        <div className="absolute inset-1 border border-white/20 rounded-sm" />
                      </div>
                    )}
                  </div>
                </div>

                {/* 底部信息 */}
                <div className="text-center mt-1 z-10 relative bg-white/80 rounded px-1">
                  <p className="text-sm md:text-base text-gray-700 mb-1 font-medium">{card.position}</p>
                  <div className="flex flex-wrap justify-center gap-1">
                    {card.keywords.slice(0, 2).map((keyword, index) => (
                      <span key={index} className={`text-xs md:text-sm px-2 py-1 rounded text-white font-medium ${getCardColors(card).bg}`}>
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};