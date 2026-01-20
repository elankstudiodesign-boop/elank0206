import React, { useState, useEffect } from 'react';
import { generateImageFromPrompt, editImageWithPrompt } from '../services/geminiService';
import { Wand2, Loader2, RefreshCw, Send, Image as ImageIcon, X, Info } from 'lucide-react';

interface VisualLabProps {
  activeRecipeName: string | null;
  scentProfile: string;
}

export const VisualLab: React.FC<VisualLabProps> = ({ activeRecipeName, scentProfile }) => {
  const [image, setImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (activeRecipeName) {
        setPrompt(`Thiết kế chai nước hoa tối giản, nghệ thuật cho mùi hương tên '${activeRecipeName}', nốt hương: ${scentProfile}. Ánh sáng điện ảnh, độ phân giải 8k, phong cách sang trọng.`);
    }
  }, [activeRecipeName, scentProfile]);

  const handleGenerate = async () => {
    if (!prompt) return;
    setIsLoading(true);
    setError(null);
    
    try {
      if (image) {
        // Edit mode (Mocked)
        const result = await editImageWithPrompt(image, prompt);
        if (result) setImage(result);
      } else {
        // Generate mode (Mocked)
        const result = await generateImageFromPrompt(prompt);
        if (result) setImage(result);
      }
    } catch (e) {
      setError("Không thể tạo hình ảnh. Vui lòng thử lại.");
    } finally {
      setIsLoading(false);
    }
  };

  const clearImage = () => {
    setImage(null);
    setPrompt('');
  };

  return (
    <div className="h-full flex flex-col p-5 bg-[rgba(255,255,255,0.02)] border border-[rgba(212,175,55,0.2)] rounded-lg shadow-inner">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-[var(--gold)] text-xs tracking-[3px] font-bold flex items-center gap-2 uppercase">
          <Wand2 size={16} /> Thiết Kế Chai & Bao Bì
        </h3>
        {image && (
          <button onClick={clearImage} className="text-[10px] flex items-center gap-1 text-gray-500 hover:text-[var(--error)] transition-colors px-2 py-1 rounded hover:bg-[rgba(255,77,77,0.1)]">
            <X size={12} /> ĐẶT LẠI
          </button>
        )}
      </div>

      <div className="flex-1 bg-black/40 border border-dashed border-gray-800 rounded-lg mb-5 relative overflow-hidden flex items-center justify-center group shadow-2xl">
        {image ? (
          <img src={image} alt="Generated Perfume" className="w-full h-full object-cover animate-in fade-in duration-700" />
        ) : (
          <div className="text-center p-8 opacity-60">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-[rgba(255,255,255,0.03)] flex items-center justify-center">
                <ImageIcon className="text-gray-500" size={32} />
            </div>
            <h4 className="text-[var(--gold)] text-sm mb-2 font-medium">Chưa có thiết kế</h4>
            <p className="text-gray-600 text-xs font-light max-w-[200px] mx-auto leading-relaxed">
              Mô tả ý tưởng của bạn hoặc chọn một công thức để xem bản demo thiết kế (Chế độ mô phỏng).
            </p>
          </div>
        )}
        
        {isLoading && (
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-10">
            <div className="flex flex-col items-center">
                <div className="relative">
                    <Loader2 className="animate-spin text-[var(--gold)] mb-4" size={40} />
                    <div className="absolute inset-0 bg-[var(--gold)] blur-lg opacity-20 animate-pulse"></div>
                </div>
                <span className="text-[var(--gold)] text-[11px] tracking-[4px] font-bold animate-pulse">ĐANG XỬ LÝ DỮ LIỆU...</span>
                <span className="text-gray-500 text-[9px] mt-2">Vui lòng đợi trong giây lát</span>
            </div>
          </div>
        )}
      </div>

      <div className="space-y-3">
        <label className="text-[0.65rem] text-gray-400 tracking-wider uppercase font-bold ml-1">Mô tả ý tưởng (Prompt)</label>
        <div className="relative">
            <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder={image ? "Nhập thay đổi (vd: Thêm chi tiết vàng kim, làm tối nền)..." : "Mô tả kiểu dáng chai, màu sắc, ánh sáng..."}
            className="w-full bg-[rgba(255,255,255,0.05)] border border-[#333] py-3.5 pl-4 pr-12 text-white text-xs font-[Space_Grotesk] focus:border-[var(--gold)] outline-none rounded-lg transition-all shadow-lg focus:shadow-[0_0_15px_rgba(255,255,255,0.05)]"
            onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
            />
            <button 
                onClick={handleGenerate}
                disabled={isLoading || !prompt}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-md text-[var(--gold)] disabled:opacity-30 hover:bg-[var(--gold)] hover:text-black transition-all"
                title="Tạo hình ảnh (Mô phỏng)"
            >
                {image ? <RefreshCw size={16} /> : <Send size={16} />}
            </button>
        </div>
        {error && <p className="text-[var(--error)] text-[11px] bg-[rgba(255,77,77,0.1)] p-2 rounded border border-[var(--error)]">{error}</p>}
        
        <div className="flex justify-between items-center pt-2 border-t border-[rgba(255,255,255,0.05)]">
             <span className="text-[9px] text-gray-600 tracking-wide uppercase flex items-center gap-1">
                <Info size={10} /> Chế độ Demo (Không dùng API)
            </span>
            <span className="text-[9px] text-[var(--gold)] opacity-50">
                ELANK STUDIO v2.0
            </span>
        </div>
      </div>
    </div>
  );
};
