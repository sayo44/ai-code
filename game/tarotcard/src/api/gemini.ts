import { GoogleGenerativeAI } from '@google/generative-ai';
import { DrawnCard, SpreadType } from '../types/tarot';

// 调试：检查环境变量
console.log('🔍 调试信息：');
console.log('环境变量 VITE_GEMINI_API_KEY:', import.meta.env.VITE_GEMINI_API_KEY ? '已设置' : '未设置');
console.log('所有环境变量:', import.meta.env);

// Gemini API Key 配置 - 支持多种配置方式
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

console.log('API_KEY 状态:', API_KEY && API_KEY !== 'YOUR_API_KEY_HERE' ? '✅ 已配置' : '❌ 未配置');

// 检查API Key是否配置
if (!API_KEY || API_KEY === 'YOUR_API_KEY_HERE') {
  console.warn('⚠️ Gemini API Key 未配置，将使用备用解读功能');
  console.warn('请设置环境变量 VITE_GEMINI_API_KEY 或在代码中配置API Key');
}

let genAI: GoogleGenerativeAI | null = null;

// 只有在API Key有效时才初始化
if (API_KEY && API_KEY !== 'YOUR_API_KEY_HERE') {
  try {
    console.log('🚀 正在初始化 Gemini AI...');
    genAI = new GoogleGenerativeAI(API_KEY);
    console.log('✅ Gemini AI 初始化成功');
  } catch (error) {
    console.error('Gemini AI 初始化失败:', error);
  }
} else {
  console.log('⚠️ 跳过 Gemini AI 初始化，API Key 未配置');
}

export interface TarotReadingRequest {
  question: string;
  cards: DrawnCard[];
  spread: SpreadType;
}

export async function generateTarotInterpretation(request: TarotReadingRequest): Promise<string> {
  console.log('📞 generateTarotInterpretation 被调用');
  
  // 检查本地存储的API Key
  const localApiKey = localStorage.getItem('gemini_api_key');
  if (localApiKey && !genAI) {
    console.log('🔑 发现本地API Key，重新初始化...');
    try {
      genAI = new GoogleGenerativeAI(localApiKey);
      console.log('✅ 使用本地API Key初始化成功');
    } catch (error) {
      console.error('❌ 本地API Key初始化失败:', error);
    }
  }
  
  // 如果没有有效的API Key或初始化失败，直接使用备用解读
  if (!genAI) {
    console.log('⚠️ 没有可用的Gemini AI实例，使用备用解读功能');
    return generateFallbackInterpretation(request);
  }

  try {
    console.log('🚀 开始调用Gemini API...');
    // 使用最新的模型名称
    const model = genAI.getGenerativeModel({ 
      model: 'gemini-1.5-flash',
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 2048,
      }
    });

    const prompt = createTarotPrompt(request);

    console.log('📝 生成的提示词长度:', prompt.length);
    console.log('🎯 调用模型: gemini-1.5-flash');
    
    const result = await model.generateContent(prompt);
    console.log('📨 收到API响应');
    
    if (!result.response) {
      console.error('❌ API响应为空');
      throw new Error('API 响应为空');
    }
    
    const text = result.response.text();
    console.log('📄 解读文本长度:', text?.length || 0);
    
    if (!text || text.trim().length === 0) {
      console.error('❌ API返回空内容');
      throw new Error('API 返回空内容');
    }
    
    console.log('🎉 Gemini API 调用成功！');
    return text;
    
  } catch (error: any) {
    console.error('💥 Gemini API 调用失败:', error);
    console.error('错误详情:', {
      message: error.message,
      status: error.status,
      code: error.code
    });
    
    // 详细的错误处理
    if (error?.message?.includes('API_KEY_INVALID')) {
      console.error('API Key 无效，请检查您的密钥');
    } else if (error?.message?.includes('QUOTA_EXCEEDED')) {
      console.error('API 配额已用完');
    } else if (error?.message?.includes('RATE_LIMIT_EXCEEDED')) {
      console.error('API 调用频率超限，请稍后再试');
    }
    
    // 使用备用解读而不是抛出错误
    console.log('🔄 切换到备用解读功能');
    return generateFallbackInterpretation(request);
  }
}

function createTarotPrompt(request: TarotReadingRequest): string {
  const { question, cards, spread } = request;
  
  const spreadNames = {
    single: '单张牌占卜',
    'three-card': '三张牌阵（过去-现在-未来）',
    'celtic-cross': '凯尔特十字牌阵'
  };

  let prompt = `你是一位经验丰富的塔罗牌占卜师，拥有深厚的塔罗知识和直觉洞察力。请为以下占卜提供专业、温暖且富有启发性的解读：

问题：${question}
牌阵：${spreadNames[spread]}

抽到的牌：
`;

  cards.forEach((card, index) => {
    const meanings = card.reversed ? 
      (Array.isArray(card.reversed) ? card.reversed : ['内在转化', '阻碍', '延迟']) : 
      card.upright;
    
    prompt += `${index + 1}. ${card.position}：${card.nameCN}（${card.name}）- ${card.reversed ? '逆位' : '正位'}
   关键词：${card.keywords.join('、')}
   含义：${meanings.join('、')}

`;
  });

  prompt += `请按照以下要求提供详细解读：

1. **整体概览**：首先对整体牌阵给出概括性的解读，分析整体能量和趋势
2. **逐牌解读**：详细解读每张牌在其特定位置上的含义，考虑正逆位的影响
3. **问题回应**：直接回应用户的问题，提供具体可行的指导建议
4. **积极引导**：语言要温暖、积极、富有启发性，给予希望和力量
5. **平衡观点**：避免过于绝对的预言，强调个人选择的重要性
6. **实用建议**：提供具体的行动建议和思考方向
7. **长度控制**：解读内容控制在600-1000字之间，确保详细而不冗长

请用中文进行解读，语调要专业而亲和，就像是在温馨的占卜室中面对面为用户提供咨询。
记住，塔罗牌是一面镜子，反映的是当下的能量状态，未来始终掌握在用户自己手中。`;

  return prompt;
}

// 备用解读函数，当 API 调用失败时使用
export function generateFallbackInterpretation(request: TarotReadingRequest): string {
  const { question, cards, spread } = request;

  const spreadNames = {
    single: '单张牌占卜',
    'three-card': '三张牌阵',
    'celtic-cross': '凯尔特十字牌阵'
  };

  let interpretation = `【${spreadNames[spread]}】占卜结果\n\n`;
  interpretation += `问题：${question}\n\n`;

  // 整体解读
  interpretation += `【整体解读】\n`;
  interpretation += `从您抽到的牌来看，`;
  
  const positiveCards = cards.filter(card => !card.reversed);
  const reversedCards = cards.filter(card => card.reversed);
  
  if (positiveCards.length > reversedCards.length) {
    interpretation += `大多数牌都是正位，显示出积极的能量和正面的发展趋势。这表明您正处在一个相对顺利的阶段，宇宙的能量正在支持您的成长。`;
  } else if (reversedCards.length > positiveCards.length) {
    interpretation += `出现较多逆位牌，提示您需要更多内省和调整。逆位并非坏事，它们往往代表内在的转化和即将到来的突破。`;
  } else {
    interpretation += `正位与逆位牌平衡出现，显示情况正在发生微妙的变化。这是一个需要您保持平衡心态，灵活应对的时期。`;
  }
  
  interpretation += `\n\n【具体解读】\n`;

  cards.forEach((card, index) => {
    // 修复：card.reversed 是布尔值，不是数组
    const meanings = card.reversed ? 
      ['内在转化', '阻碍', '延迟', '反思'] : 
      card.upright;
    const mainMeaning = meanings[0] || card.keywords[0];
    
    interpretation += `${card.position}：${card.nameCN}（${card.reversed ? '逆位' : '正位'}）\n`;
    interpretation += `这张牌在"${card.position}"位置上，主要体现了"${mainMeaning}"的能量。`;
    
    if (card.reversed) {
      interpretation += `逆位状态提醒您需要关注内在的调整和成长，这是一个向内探索的机会。`;
    } else {
      interpretation += `正位显示这是一个积极的信号，值得您去把握和发展。`;
    }
    
    interpretation += `\n\n`;
  });

  interpretation += `【指导建议】\n`;
  interpretation += `塔罗牌为您揭示的是当下的能量状态和可能的发展方向。记住，未来掌握在您自己手中，这些启示只是为您提供思考的角度。请保持开放的心态，相信自己的直觉，勇敢地做出选择。\n\n`;
  
  // 根据问题类型给出更具体的建议
  if (question.includes('爱情') || question.includes('感情')) {
    interpretation += `在感情方面，请记住真爱需要时间培养，保持真诚和耐心。`;
  } else if (question.includes('工作') || question.includes('事业')) {
    interpretation += `在事业发展上，专注于提升自己的能力，机会总是留给有准备的人。`;
  }
  
  interpretation += `\n\n愿这次占卜为您带来内心的平静和前进的方向。✨`;

  return interpretation;
}