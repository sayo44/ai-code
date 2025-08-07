import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Key, ExternalLink, AlertCircle, CheckCircle } from 'lucide-react';

interface ApiKeySetupProps {
  onApiKeySet: (apiKey: string) => void;
  onSkip: () => void;
}

export const ApiKeySetup: React.FC<ApiKeySetupProps> = ({ onApiKeySet, onSkip }) => {
  const [apiKey, setApiKey] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const [validationResult, setValidationResult] = useState<'success' | 'error' | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!apiKey.trim()) return;

    setIsValidating(true);
    setValidationResult(null);

    try {
      // 简单验证API Key格式
      if (apiKey.startsWith('AIza') && apiKey.length > 30) {
        setValidationResult('success');
        setTimeout(() => {
          onApiKeySet(apiKey);
        }, 1000);
      } else {
        setValidationResult('error');
      }
    } catch (error) {
      setValidationResult('error');
    } finally {
      setIsValidating(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen flex items-center justify-center p-6"
    >
      <div className="max-w-md w-full space-y-6">
        <div className="text-center">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mb-4">
            <Key className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">配置 Gemini API</h2>
          <p className="text-gray-300">
            为了获得AI智能解读，请配置您的Gemini API Key
          </p>
        </div>

        <div className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 backdrop-blur-sm rounded-xl p-6 border border-blue-500/30">
          <div className="flex items-start gap-3 mb-4">
            <AlertCircle className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-gray-300">
              <p className="mb-2">获取免费API Key的步骤：</p>
              <ol className="list-decimal list-inside space-y-1 text-xs">
                <li>访问 Google AI Studio</li>
                <li>登录您的Google账户</li>
                <li>点击"Create API Key"</li>
                <li>复制生成的API Key</li>
              </ol>
            </div>
          </div>
          
          <a
            href="https://aistudio.google.com/app/apikey"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 text-sm mb-4"
          >
            <ExternalLink className="w-4 h-4" />
            打开 Google AI Studio
          </a>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Gemini API Key
            </label>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="AIza..."
              className="w-full p-3 bg-gray-900/50 border border-purple-500/50 rounded-lg text-white placeholder-gray-400 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 focus:outline-none"
            />
            {validationResult === 'success' && (
              <div className="flex items-center gap-2 mt-2 text-green-400 text-sm">
                <CheckCircle className="w-4 h-4" />
                API Key 格式正确
              </div>
            )}
            {validationResult === 'error' && (
              <div className="flex items-center gap-2 mt-2 text-red-400 text-sm">
                <AlertCircle className="w-4 h-4" />
                API Key 格式不正确，请检查
              </div>
            )}
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onSkip}
              className="flex-1 px-4 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
            >
              跳过（使用基础解读）
            </button>
            <button
              type="submit"
              disabled={!apiKey.trim() || isValidating}
              className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white rounded-lg transition-all duration-300"
            >
              {isValidating ? '验证中...' : '确认配置'}
            </button>
          </div>
        </form>

        <div className="text-center">
          <p className="text-xs text-gray-400">
            您的API Key将仅在本地使用，不会被上传到服务器
          </p>
        </div>
      </div>
    </motion.div>
  );
};