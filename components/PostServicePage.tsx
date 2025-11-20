
import React, { useState } from 'react';
import { DollarSign, Clock, List, Plus, X, Upload, Sparkles } from 'lucide-react';

const PostServicePage: React.FC = () => {
  const [features, setFeatures] = useState<string[]>(['']);

  const addFeature = () => setFeatures([...features, '']);
  const removeFeature = (index: number) => setFeatures(features.filter((_, i) => i !== index));
  const updateFeature = (index: number, val: string) => {
      const newFeatures = [...features];
      newFeatures[index] = val;
      setFeatures(newFeatures);
  };

  return (
    <div className="w-full max-w-3xl mx-auto pb-32 pt-12 px-6 animate-in fade-in duration-500">
        <div className="mb-10 text-center">
            <h1 className="text-3xl font-black text-white mb-3">Post a Service</h1>
            <p className="text-neutral-500 text-sm">Offer your production skills to the world.</p>
        </div>

        <div className="bg-[#0a0a0a] border border-neutral-800 rounded-xl p-8 shadow-2xl">
            <form className="space-y-8">
                {/* Title */}
                <div className="space-y-2">
                    <label className="text-xs font-bold text-white uppercase tracking-wider">Service Title</label>
                    <input type="text" className="w-full bg-neutral-900 border border-neutral-800 rounded-lg p-3 text-white focus:border-primary/50 focus:outline-none" placeholder="e.g. I will mix and master your track" />
                </div>

                <div className="grid grid-cols-2 gap-6">
                    {/* Price */}
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2"><DollarSign size={14}/> Price</label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500">$</span>
                            <input type="number" className="w-full bg-neutral-900 border border-neutral-800 rounded-lg p-3 pl-8 text-white focus:border-primary/50 focus:outline-none font-mono" placeholder="150.00" />
                        </div>
                    </div>
                    {/* Delivery */}
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2"><Clock size={14}/> Delivery Time (Days)</label>
                        <input type="number" className="w-full bg-neutral-900 border border-neutral-800 rounded-lg p-3 text-white focus:border-primary/50 focus:outline-none font-mono" placeholder="2" />
                    </div>
                </div>

                {/* Description */}
                <div className="space-y-2">
                    <label className="text-xs font-bold text-white uppercase tracking-wider">Description</label>
                    <textarea className="w-full h-32 bg-neutral-900 border border-neutral-800 rounded-lg p-3 text-white focus:border-primary/50 focus:outline-none resize-none" placeholder="Describe exactly what you offer..." />
                </div>

                {/* Features */}
                <div className="space-y-3">
                    <label className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2"><List size={14}/> Included Features</label>
                    {features.map((feat, i) => (
                        <div key={i} className="flex gap-2">
                            <input 
                                value={feat}
                                onChange={(e) => updateFeature(i, e.target.value)}
                                type="text" 
                                className="flex-1 bg-neutral-900 border border-neutral-800 rounded-lg p-2 text-sm text-white focus:border-primary/50 focus:outline-none" 
                                placeholder="e.g. HQ Audio File" 
                            />
                            <button type="button" onClick={() => removeFeature(i)} className="p-2 text-neutral-500 hover:text-white hover:bg-white/5 rounded"><X size={16}/></button>
                        </div>
                    ))}
                    <button type="button" onClick={addFeature} className="text-xs font-bold text-primary flex items-center gap-1 hover:underline">
                        <Plus size={14} /> Add Feature
                    </button>
                </div>

                {/* Cover Image */}
                <div className="space-y-2">
                     <label className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2"><Upload size={14}/> Cover Image</label>
                     <div className="border-2 border-dashed border-neutral-800 rounded-xl p-8 flex flex-col items-center justify-center text-neutral-500 hover:text-white hover:border-neutral-600 hover:bg-white/5 transition-all cursor-pointer">
                        <Upload size={24} className="mb-2" />
                        <span className="text-xs font-mono">Click to upload service thumbnail</span>
                     </div>
                </div>

                <div className="pt-4 border-t border-white/5 flex justify-end">
                    <button className="px-8 py-3 bg-primary text-black font-bold rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2">
                        <Sparkles size={16} />
                        Publish Service
                    </button>
                </div>
            </form>
        </div>
    </div>
  );
};

export default PostServicePage;
