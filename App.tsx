import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Heart,
    Star,
    Rocket,
    Camera,
    Gift,
    ChevronDown,
    Sparkles,
    Shield,
    Compass,
    Cpu,
    Zap,
    Globe
} from 'lucide-react';

// 自定义的 3D 行星场景组件 (整合在单文件中)
const PlanetScene = () => {
    return (
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
            {/* 核心星球 */}
            <motion.div
                animate={{
                    rotate: 360,
                    scale: [1, 1.05, 1]
                }}
                transition={{
                    rotate: { duration: 100, repeat: Infinity, ease: "linear" },
                    scale: { duration: 8, repeat: Infinity, ease: "easeInOut" }
                }}
                className="relative w-64 h-64 md:w-96 md:h-96 rounded-full bg-gradient-to-br from-cyan-900 via-blue-950 to-black shadow-[0_0_100px_rgba(6,182,212,0.3)] border border-cyan-500/20"
            >
                {/* 星球表面纹理效果 */}
                <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at:30%_30%,rgba(255,255,255,0.2)_0%,transparent_70%)] rounded-full"></div>

                {/* 星环 1 */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[20%] border border-cyan-500/20 rounded-[100%] rotate-[15deg]"></div>
                {/* 星环 2 */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[160%] h-[15%] border border-blue-500/10 rounded-[100%] rotate-[-10deg]"></div>
            </motion.div>

            {/* 背景点阵星星 */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>

            {/* 漂浮的小星星 */}
            {[...Array(30)].map((_, i) => (
                <motion.div
                    key={i}
                    initial={{
                        x: Math.random() * 1200 - 600,
                        y: Math.random() * 1200 - 600,
                        opacity: Math.random()
                    }}
                    animate={{
                        y: [0, -30, 0],
                        opacity: [0.2, 1, 0.2]
                    }}
                    transition={{
                        duration: 2 + Math.random() * 3,
                        repeat: Infinity,
                        delay: Math.random() * 5
                    }}
                    className="absolute w-1 h-1 bg-cyan-400 rounded-full shadow-[0_0_5px_#22d3ee]"
                />
            ))}
        </div>
    );
};

// 酷炫的照片视窗组件
const PhotoWindow = ({ src, caption, index, fallbackUrl }: any) => {
    const [imgSrc, setImgSrc] = useState(src);
    const [isError, setIsError] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ y: -15, scale: 1.02 }}
            className="relative group cursor-pointer"
        >
            {/* 外部发光层 */}
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-100 transition duration-700"></div>

            <div className="relative bg-[#0a0a0a] rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                <div className="aspect-[4/5] overflow-hidden relative">
                    <img
                        src={imgSrc}
                        alt={caption}
                        className={`w-full h-full object-cover transition-all duration-1000 ${isError ? 'opacity-80' : 'grayscale-[0.4] group-hover:grayscale-0'} group-hover:scale-110`}
                        referrerPolicy="no-referrer"
                        onError={() => {
                            if (!isError) {
                                setIsError(true);
                                setImgSrc(fallbackUrl);
                            }
                        }}
                    />
                    {/* 扫描线效果 */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] pointer-events-none opacity-20 group-hover:opacity-40"></div>
                </div>

                {/* 底部信息条 */}
                <div className="p-5 bg-gradient-to-t from-black via-black/90 to-transparent border-t border-white/5">
                    <div className="flex justify-between items-end">
                        <div>
                            <p className="text-cyan-500 font-mono text-[9px] mb-1 uppercase tracking-[0.3em]">Sector Archive // 0{index + 1}</p>
                            <h4 className="text-white font-black text-xl tracking-tight">{caption}</h4>
                        </div>
                        <div className="text-white/20 font-mono text-[10px] pb-1">35.2°N 116.4°E</div>
                    </div>
                </div>

                {/* 状态指示灯 */}
                <div className="absolute top-4 left-4 flex gap-2">
                    <div className="w-2 h-2 rounded-full bg-cyan-500 shadow-[0_0_8px_#22d3ee] animate-pulse"></div>
                    <div className="px-2 py-0.5 rounded-sm bg-cyan-500/10 border border-cyan-500/20 text-[8px] font-mono text-cyan-400 uppercase tracking-widest">Live</div>
                </div>
            </div>
        </motion.div>
    );
};

const App: React.FC = () => {
    // 预设的高质量航天主题占位图，用于在本地图片不可用时展示预览效果
    const fallbackPhotos = [
        "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1541873676947-91901048b64e?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1517976487492-5750f3195933?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1543324564-7082e7913300?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1536697246747-0853062245f3?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&q=80&w=800"
    ];

    return (
        <div className="relative min-h-screen bg-[#050505] text-white selection:bg-cyan-500/30 overflow-x-hidden">
            {/* 全局背景噪声 */}
            <div className="fixed inset-0 pointer-events-none opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>

            {/* 顶部导航 */}
            <nav className="fixed top-0 w-full z-50 px-8 py-6 flex justify-between items-center backdrop-blur-xl bg-black/40 border-b border-white/5">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-700 flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.3)]">
                        <Shield size={20} className="text-white" />
                    </div>
                    <div>
                        <span className="font-black tracking-[0.25em] text-xs uppercase block">Mission Control</span>
                        <span className="text-[9px] text-cyan-500 font-mono tracking-widest opacity-70">PROTOCOL v3.0.4</span>
                    </div>
                </div>
                <div className="flex items-center gap-8">
                    <div className="hidden md:flex gap-6 text-[10px] tracking-[0.3em] uppercase text-white/40 font-bold">
                        <span className="hover:text-cyan-400 cursor-pointer transition-colors">Navigation</span>
                        <span className="hover:text-cyan-400 cursor-pointer transition-colors">Telemetry</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1 bg-cyan-500/10 rounded-full border border-cyan-500/20">
                        <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-ping"></div>
                        <span className="text-[10px] font-mono text-cyan-500 tracking-tighter">SIGNAL: STEADY</span>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <PlanetScene />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050505]/40 to-[#050505]"></div>
                </div>

                <div className="relative z-10 text-center px-6 max-w-6xl">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <div className="flex justify-center mb-10">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                                className="relative p-2 border border-cyan-500/20 rounded-full"
                            >
                                <div className="p-5 bg-cyan-500/5 rounded-full border border-cyan-500/10">
                                    <Compass className="text-cyan-400" size={40} />
                                </div>
                                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-cyan-500 rounded-full shadow-[0_0_10px_#22d3ee]"></div>
                            </motion.div>
                        </div>

                        <h1 className="text-7xl md:text-[10rem] font-black tracking-tighter mb-8 leading-[0.85] uppercase italic">
                            BEYOND <br/>
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 drop-shadow-[0_10px_20px_rgba(6,182,212,0.3)]">
                                HORIZON
                            </span>
                        </h1>

                        <p className="text-sm md:text-xl text-white/40 font-mono tracking-[0.4em] max-w-3xl mx-auto mb-14 uppercase">
                            Explorer Profile: 宝贝成长记录 // MISSION_DAY: 1095
                        </p>

                        <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
                            <motion.button
                                whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(6, 182, 212, 0.5)" }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' })}
                                className="px-12 py-5 bg-cyan-500 text-black rounded-sm font-black text-sm tracking-[0.4em] uppercase transition-all shadow-xl"
                            >
                                初始化核心档案
                            </motion.button>
                            <div className="flex flex-col items-start font-mono text-[9px] text-white/30 border-l border-white/10 pl-6 space-y-1">
                                <div>LATITUDE: 35.6895° N</div>
                                <div>LONGITUDE: 139.6917° E</div>
                                <div className="text-cyan-500/50">SYSTEM_STATUS: READY</div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-cyan-500/40 animate-bounce cursor-pointer" onClick={() => document.getElementById('quote')?.scrollIntoView({ behavior: 'smooth' })}>
                    <ChevronDown size={32} />
                </div>
            </section>

            {/* Quote Section */}
            <section id="quote" className="py-48 px-6 relative border-y border-white/5 bg-[#080808]">
                <div className="container mx-auto max-w-5xl">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="flex flex-col items-center text-center"
                    >
                        <div className="w-16 h-16 rounded-full bg-yellow-400/10 flex items-center justify-center mb-10 border border-yellow-400/20 shadow-[0_0_30px_rgba(250,204,21,0.1)]">
                            <Zap className="text-yellow-400" size={32} />
                        </div>
                        <h2 className="text-3xl md:text-5xl font-light leading-[1.4] tracking-tight text-white/95 italic">
                            “生命是一场漫长的航行，<br/>
                            而你正以最闪耀的频率，<br/>
                            向着星辰大海发出信号。”
                        </h2>
                        <div className="mt-16 h-24 w-[1px] bg-gradient-to-b from-cyan-500 via-blue-500 to-transparent"></div>
                    </motion.div>
                </div>
            </section>

            {/* Gallery Section */}
            <section id="gallery" className="py-32 px-6">
                <div className="container mx-auto max-w-7xl">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-32 gap-10">
                        <div className="relative">
                            <div className="absolute -left-10 top-0 text-[10rem] font-black text-white/[0.02] select-none leading-none">MEM</div>
                            <span className="text-cyan-500 font-mono tracking-[0.6em] uppercase text-[10px] mb-4 block relative z-10">Visual Archive Unit</span>
                            <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter relative z-10">视觉记忆档案</h2>
                        </div>
                        <div className="text-right font-mono text-white/20 text-[10px] space-y-1 mb-2">
                            <div>ENCRYPTION: AES-256-GCM</div>
                            <div>COMPRESSION: LZMA_ULTRA</div>
                            <div className="text-cyan-500/40">AUTH_TOKEN: VERIFIED</div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        <PhotoWindow
                            src="./20260328115230_7177_191.jpg"
                            fallbackUrl={fallbackPhotos[0]}
                            caption="超市补给行动"
                            index={0}
                        />
                        <PhotoWindow
                            src="./20260328115232_7178_191.jpg"
                            fallbackUrl={fallbackPhotos[1]}
                            caption="能量释放瞬间"
                            index={1}
                        />
                        <PhotoWindow
                            src="./20260328115310_7180_191.jpg"
                            fallbackUrl={fallbackPhotos[2]}
                            caption="生命周期：三年"
                            index={2}
                        />
                        <PhotoWindow
                            src="./20260328115311_7181_191.jpg"
                            fallbackUrl={fallbackPhotos[3]}
                            caption="核心快乐反馈"
                            index={3}
                        />
                        <PhotoWindow
                            src="./20260328115311_7182_191.jpg"
                            fallbackUrl={fallbackPhotos[4]}
                            caption="音频频率测试"
                            index={4}
                        />
                        <PhotoWindow
                            src="./20260328115314_7185_191.jpg"
                            fallbackUrl={fallbackPhotos[5]}
                            caption="雪地极端环境适应"
                            index={5}
                        />
                        <PhotoWindow
                            src="./20260328115314_7186_191.jpg"
                            fallbackUrl={fallbackPhotos[6]}
                            caption="预备宇航员形态"
                            index={6}
                        />
                    </div>
                </div>
            </section>

            {/* Wishes Section */}
            <section className="py-48 px-6 relative overflow-hidden">
                <div className="container mx-auto max-w-4xl relative">
                    {/* 背景发光球 */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-900/10 rounded-full blur-[160px] pointer-events-none"></div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="relative bg-white/[0.02] backdrop-blur-2xl p-16 md:p-24 rounded-3xl border border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.5)] overflow-hidden"
                    >
                        {/* 装饰激光线 */}
                        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>

                        <div className="flex justify-center mb-14">
                            <div className="p-4 bg-cyan-500/10 rounded-full border border-cyan-500/20">
                                <Sparkles className="text-cyan-400" size={48} />
                            </div>
                        </div>

                        <h2 className="text-4xl md:text-5xl font-black text-center mb-14 uppercase tracking-[0.2em] italic">基地指挥官指令</h2>

                        <div className="space-y-10 text-center relative z-10">
                            <p className="text-2xl md:text-4xl font-light text-white/90 leading-tight tracking-tight">
                                “愿你拥有星辰大海的征途，<br/>
                                也拥有随时降落家港的勇气。”
                            </p>

                            <div className="flex flex-col items-center gap-6 pt-10">
                                <div className="flex justify-center items-center gap-6">
                                    <div className="h-[1px] w-12 bg-white/20"></div>
                                    <p className="text-cyan-500 font-mono font-bold tracking-[0.5em] uppercase text-xs">Origin Commanders</p>
                                    <div className="h-[1px] w-12 bg-white/20"></div>
                                </div>
                                <div className="text-[10px] font-mono text-white/20 tracking-widest">ENCRYPTED_SIGNATURE: MOM_AND_DAD_001</div>
                            </div>
                        </div>

                        {/* 装饰小图标 */}
                        <div className="absolute top-6 right-6 opacity-10">
                            <Globe size={120} />
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-24 px-6 text-center border-t border-white/5 bg-black/50 backdrop-blur-md">
                <div className="flex flex-col items-center gap-8">
                    <div className="flex items-center gap-4">
                        <div className="w-1.5 h-1.5 rounded-full bg-cyan-500"></div>
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                        <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>
                    </div>
                    <div className="font-mono text-[9px] tracking-[0.6em] text-white/20 uppercase">
                        End of Transmission // mission_completed // 2026.03
                    </div>
                    <div className="text-[10px] text-white/10 font-mono">
                        SERVER_STATUS: ONLINE // UPTIME: 1095 DAYS
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default App;
