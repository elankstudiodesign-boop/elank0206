import React, { useState } from 'react';
import { Ingredient, NodeData, Recipe, Season, SkinType } from '../types';
import { Search, FlaskConical, Droplets, User, Calendar, Beaker, Download } from 'lucide-react';

interface SidebarProps {
  season: Season;
  setSeason: (s: Season) => void;
  skin: SkinType;
  setSkin: (s: SkinType) => void;
  activeNodeId: string | null;
  activeNodeData: NodeData | undefined;
  recipes: Recipe[];
  onCalculate: (nodes: NodeData[], skin: SkinType, weight: number, conc: number) => Ingredient[];
  onPerformance: (nodes: NodeData[], skin: SkinType) => { longevity: string; distance: string };
}

export const Sidebar: React.FC<SidebarProps> = ({
  season,
  setSeason,
  skin,
  setSkin,
  activeNodeId,
  activeNodeData,
  recipes,
  onCalculate,
  onPerformance
}) => {
  const [weight, setWeight] = useState(10);
  const [concentration, setConcentration] = useState(15);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredRecipes = recipes.filter(r => {
    const matchesNode = activeNodeId ? r.ids.includes(activeNodeId) : false;
    const matchesSeason = r.primarySeason === season;
    if (activeNodeId) return matchesNode && matchesSeason;
    return false;
  }).filter(r => {
      if (!searchTerm) return true;
      return r.rawSelected.some(n => n.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }).slice(0, 10);

  const getConcLabel = (val: number) => {
    if (val === 10) return "Eau de Toilette (EDT)";
    if (val === 15) return "Eau de Parfum (EDP)";
    if (val >= 20) return "Parfum / Extrait";
    return "Eau de Cologne (EDC)";
  };

  const handleExport = (id: number) => {
    alert(`Đang tải xuống công thức #${id + 1000}...`);
  };

  const skinTypes: { id: SkinType; label: string }[] = [
    { id: 'DRY', label: 'Da Khô' },
    { id: 'OIL', label: 'Da Dầu' },
    { id: 'COM', label: 'Hỗn Hợp' }
  ];

  const seasons: { id: Season; label: string }[] = [
    { id: 'SP', label: 'Xuân' },
    { id: 'SU', label: 'Hạ' },
    { id: 'AU', label: 'Thu' },
    { id: 'WI', label: 'Đông' }
  ];

  return (
    <aside className="sidebar w-full md:w-[450px] h-[50vh] md:h-full sidebar-glass flex flex-col p-4 md:p-6 z-50 overflow-hidden relative shadow-2xl border-b md:border-b-0 md:border-r border-[var(--border)]">
      {/* Header */}
      <div className="mb-4 md:mb-6 flex flex-col">
        <h1 className="font-[Space_Grotesk] font-bold text-xl md:text-3xl text-[var(--gold)] tracking-[4px] m-0 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
          ELANK STUDIO
        </h1>
        <div className="text-[0.5rem] md:text-[0.6rem] tracking-[6px] text-[#888] uppercase mt-1 pl-1">
          Cổng Thông Tin Kỹ Thuật Mùi Hương
        </div>
      </div>

      {/* Lab Parameters */}
      <div className="lab-settings bg-[rgba(255,255,255,0.02)] p-3 md:p-4 border border-[var(--border)] mb-4 md:mb-5 rounded-lg backdrop-blur-sm hidden md:block">
        <div className="flex items-center gap-2 mb-4 border-b border-[rgba(255,255,255,0.05)] pb-2">
            <FlaskConical size={14} className="text-[var(--gold)]" />
            <span className="text-[0.65rem] text-[var(--gold)] font-bold tracking-[2px] uppercase">
            Thông Số Phòng Lab
            </span>
        </div>
        
        <div className="flex items-end gap-4 mb-4">
            <div className="flex-1">
                <label className="block text-[0.65rem] text-gray-400 mb-1 tracking-wide">TỔNG KHỐI LƯỢNG (Gram)</label>
                <input
                    type="number"
                    className="w-full bg-[rgba(0,0,0,0.3)] border border-[#444] text-[var(--gold)] p-2 font-[Space_Grotesk] outline-none rounded focus:border-[var(--gold)] transition-colors"
                    value={weight}
                    min={0.1}
                    step={0.1}
                    onChange={(e) => setWeight(parseFloat(e.target.value) || 0)}
                />
            </div>
            <div className="flex-1">
                <label className="block text-[0.65rem] text-gray-400 mb-1 tracking-wide">NỒNG ĐỘ (%)</label>
                 <div className="relative">
                    <input
                        type="number"
                        className="w-full bg-[rgba(0,0,0,0.3)] border border-[#444] text-[var(--gold)] p-2 font-[Space_Grotesk] outline-none rounded focus:border-[var(--gold)] transition-colors"
                        value={concentration}
                        readOnly
                    />
                 </div>
            </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-[0.65rem] text-gray-500 flex items-center gap-1">
                <Droplets size={10} /> Loại:
            </span>
            <span className="text-[var(--gold)] text-[0.65rem] font-[Space_Grotesk] tracking-wide">
              {getConcLabel(concentration)}
            </span>
          </div>
          <input
            type="range"
            min="5"
            max="30"
            step="5"
            className="w-full h-1 bg-[#333] rounded-lg appearance-none cursor-pointer"
            value={concentration}
            onChange={(e) => setConcentration(parseInt(e.target.value))}
          />
        </div>
      </div>

      {/* Main Controls */}
      <div className="control-panel mb-4 space-y-3 md:space-y-4">
        {/* Search */}
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[var(--gold)] transition-colors" size={14} />
          <input
            type="text"
            className="w-full bg-[rgba(255,255,255,0.03)] border border-[#333] py-2 pl-9 pr-3 text-white font-[Space_Grotesk] text-[0.7rem] md:text-[0.75rem] outline-none rounded-lg focus:border-[var(--gold)] focus:bg-[rgba(255,255,255,0.05)] transition-all placeholder:text-gray-600"
            placeholder="Tìm kiếm nốt hương..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Filters Grid */}
        <div className="grid grid-cols-2 gap-2 md:gap-4">
             {/* Skin Type */}
             <div className="space-y-1 md:space-y-2">
                <div className="flex items-center gap-1.5 text-[var(--gold)] opacity-80">
                    <User size={12} />
                    <span className="text-[0.6rem] font-bold tracking-[1.5px] uppercase">Loại Da</span>
                </div>
                <div className="flex rounded-md overflow-hidden border border-[#333]">
                    {skinTypes.map((s) => (
                        <button
                        key={s.id}
                        onClick={() => setSkin(s.id)}
                        className={`flex-1 py-1.5 md:py-2 text-[0.6rem] md:text-[0.65rem] font-medium transition-all ${
                            skin === s.id 
                            ? 'bg-[var(--gold-dim)] text-white' 
                            : 'bg-transparent text-gray-500 hover:bg-[rgba(255,255,255,0.02)] hover:text-gray-300'
                        }`}
                        >
                        {s.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Season */}
            <div className="space-y-1 md:space-y-2">
                <div className="flex items-center gap-1.5 text-[var(--gold)] opacity-80">
                    <Calendar size={12} />
                    <span className="text-[0.6rem] font-bold tracking-[1.5px] uppercase">Mùa</span>
                </div>
                <div className="flex rounded-md overflow-hidden border border-[#333]">
                    {seasons.map((s) => (
                        <button
                        key={s.id}
                        onClick={() => setSeason(s.id)}
                        className={`flex-1 py-1.5 md:py-2 text-[0.6rem] md:text-[0.65rem] font-medium transition-all ${
                            season === s.id 
                            ? 'bg-[var(--gold-dim)] text-white' 
                            : 'bg-transparent text-gray-500 hover:bg-[rgba(255,255,255,0.02)] hover:text-gray-300'
                        }`}
                        >
                        {s.label}
                        </button>
                    ))}
                </div>
            </div>
        </div>
      </div>
      
      {/* Divider */}
      <div className="flex items-center gap-2 mb-2 pb-2 border-b border-[#333]">
            <Beaker size={14} className="text-[var(--gold)]" />
            <span className="text-[0.7rem] font-bold tracking-[2px] text-[var(--gold)]">PHÂN TÍCH DỮ LIỆU</span>
      </div>

      {/* Content Area */}
      <div id="info-panel" className="flex-1 overflow-y-auto pr-1 custom-scrollbar">
        {!activeNodeId ? (
        <div className="h-full flex flex-col items-center justify-center text-gray-600 opacity-50 space-y-4">
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-dashed border-gray-600 flex items-center justify-center">
                <Droplets size={20} />
            </div>
            <p className="text-[0.6rem] md:text-[0.7rem] tracking-[2px] text-center max-w-[200px]">
                CHỌN MỘT NỐT HƯƠNG TRÊN BIỂU ĐỒ ĐỂ GIẢI MÃ CÔNG THỨC
            </p>
        </div>
        ) : (
        <>
            <div className="flex justify-between items-end mb-4 border-b border-[#333] pb-2">
                <h3 className="text-[var(--gold)] text-[0.8rem] tracking-[2px] font-bold uppercase">
                KẾT QUẢ: <span className="text-white">{activeNodeData?.name}</span>
                </h3>
                <span className="text-[0.6rem] text-gray-500">{filteredRecipes.length} công thức</span>
            </div>

            <div className="space-y-4 pb-4">
            {filteredRecipes.map((r) => {
                const ingredients = onCalculate(r.rawSelected, skin, weight, concentration);
                const perf = onPerformance(r.rawSelected, skin);
                
                return (
                <div key={r.id} className="perf-card bg-[rgba(20,20,20,0.6)] border border-[var(--border)] rounded-lg p-4 md:p-5 border-l-[3px] border-l-[var(--active-color)] hover:bg-[rgba(30,30,30,0.8)] transition-colors group">
                    <div className="flex justify-between items-start mb-3 md:mb-4">
                        <div>
                            <div className="text-[0.8rem] md:text-[0.9rem] font-bold text-white tracking-wider mb-1">CÔNG THỨC #{r.id + 1000}</div>
                            <div className="text-[0.55rem] md:text-[0.6rem] text-gray-400">Tối ưu cho {skin === 'DRY' ? 'Da Khô' : skin === 'OIL' ? 'Da Dầu' : 'Da Hỗn Hợp'}</div>
                        </div>
                        <button 
                            onClick={() => handleExport(r.id)}
                            className="text-[var(--gold)] opacity-50 hover:opacity-100 transition-opacity p-2 hover:bg-[rgba(255,255,255,0.05)] rounded"
                            title="Tải xuống công thức"
                        >
                        <Download size={16} />
                        </button>
                    </div>
                    
                    <div className="flex gap-4 mb-3 md:mb-4 bg-[rgba(0,0,0,0.3)] p-2 md:p-3 rounded border border-[rgba(255,255,255,0.03)]">
                        <div className="flex-1 text-center border-r border-[#333]">
                            <span className="block text-[0.5rem] md:text-[0.55rem] text-[#666] tracking-[1px] uppercase mb-1">Lưu hương</span>
                            <span className="text-[0.8rem] md:text-[0.9rem] text-[var(--gold-bright)] font-bold font-[Space_Grotesk]">{perf.longevity}</span>
                        </div>
                        <div className="flex-1 text-center">
                            <span className="block text-[0.5rem] md:text-[0.55rem] text-[#666] tracking-[1px] uppercase mb-1">Tỏa hương</span>
                            <span className="text-[0.8rem] md:text-[0.9rem] text-[var(--gold-bright)] font-bold font-[Space_Grotesk]">{perf.distance}</span>
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        {ingredients.map((ing, idx) => (
                        <div 
                            key={idx} 
                            className={`text-[0.7rem] md:text-[0.75rem] flex justify-between items-center py-1 ${ing.isAlcohol ? 'text-[var(--gold-bright)] border-t border-dashed border-[#444] mt-2 pt-2' : 'text-gray-300'}`}
                        >
                            <span className="font-light">{ing.name} <span className="text-gray-600 text-[0.6rem] md:text-[0.65rem] ml-1">({ing.pct}%)</span></span>
                            <span className="text-[var(--gold)] font-medium bg-[rgba(255,255,255,0.05)] px-2 py-0.5 rounded">{ing.gram}g</span>
                        </div>
                        ))}
                    </div>
                </div>
                );
            })}
            </div>
        </>
        )}
      </div>
    </aside>
  );
};
