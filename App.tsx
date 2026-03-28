import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Heart,
    Star,
    Camera,
    Gift,
    ChevronDown,
    Smile,
    Truck,
    HardHat,
    Construction,
    Hammer,
    MessageCircle,
    Calendar,
    Sparkles,
    Pin,
    Globe,
    Music,
    Mic2
} from 'lucide-react';

// 自定义挖掘机小图标 (SVG)
const ExcavatorIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M2 21h20" />
        <path d="M7 21v-4l-1-1V9l3-2 4 2v7l-1 1v4" />
        <path d="M13 14h5l2-2v-3l-2-2h-5" />
        <circle cx="7" cy="18" r="2" />
        <circle cx="17" cy="18" r="2" />
    </svg>
);

// 气泡悄悄话组件
const SpeechBubble = ({ text, position, delay }: any) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.5, y: 20 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ type: "spring", damping: 12, delay }}
        className={`absolute hidden md:flex z-20 ${position} bg-white/90 backdrop-blur-sm px-6 py-3 rounded-[2rem] shadow-sm border border-amber-100 items-center gap-2`}
    >
        <MessageCircle className="text-amber-300" size={18} />
        <span className="font-bold text-amber-900/60 text-sm whitespace-nowrap">{text}</span>
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white/90 border-b border-r border-amber-100 rotate-45"></div>
    </motion.div>
);

// 拍立得照片组件
const PhotoCard = ({ src, caption, index, fallbackUrl }: any) => {
    const randomRotate = (index % 3 === 0 ? '-1.5deg' : index % 3 === 1 ? '1.5deg' : '0.5deg');
    const stickerColor = (index % 3 === 0 ? 'bg-amber-100' : index % 3 === 1 ? 'bg-blue-100' : 'bg-rose-100');

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: (index % 5) * 0.1 }}
            className="break-inside-avoid mb-10 relative group"
            style={{ rotate: randomRotate }}
        >
            <div className={`absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-8 ${stickerColor} opacity-60 backdrop-blur-sm rotate-2 z-10 rounded-sm shadow-sm group-hover:opacity-100 transition-opacity`}></div>

            <div className="bg-white p-4 pb-10 shadow-[0_4px_25px_rgb(0,0,0,0.02)] rounded-sm border border-amber-50 relative group-hover:shadow-[0_10px_40px_rgb(0,0,0,0.06)] transition-all duration-500">
                <div className="overflow-hidden rounded-xs bg-amber-50/30 mb-4">
                    <img
                        src={src}
                        alt={caption}
                        className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                        referrerPolicy="no-referrer"
                        onError={(e) => { (e.target as HTMLImageElement).src = fallbackUrl; }}
                    />
                </div>

                <div className="flex justify-center items-center gap-1 mb-2 opacity-40">
                    <Star size={8} className="text-amber-400 fill-amber-400" />
                    <Star size={8} className="text-amber-400 fill-amber-400" />
                    <Star size={8} className="text-amber-400 fill-amber-400" />
                </div>

                <p className="text-center font-bold text-amber-900/50 text-sm tracking-tight px-2 leading-relaxed">
                    {caption}
                </p>

                <div className="absolute bottom-2 right-2 text-amber-100/50 group-hover:text-amber-300 transition-colors">
                    <Pin size={14} />
                </div>
            </div>
        </motion.div>
    );
};

const App: React.FC = () => {
    const birthDate = new Date('2023-02-17');
    const today = new Date('2026-03-28');
    const diffDays = Math.ceil(Math.abs(today.getTime() - birthDate.getTime()) / (1000 * 60 * 60 * 24));

    const photos = [
        { src: "./20260328115230_7177_191.jpg", caption: "我是小乔丹" },
        { src: "./20260328115232_7178_191.jpg", caption: "可爱的小妹妹吗" },
        { src: "./20260328115310_7180_191.jpg", caption: "三岁愿望启动" },
        { src: "./20260328115311_7181_191.jpg", caption: "妈妈弄的小刺猬头" },
        { src: "./20260328115311_7182_191.jpg", caption: "哈哈大笑时刻" },
        { src: "./20260328115314_7185_191.jpg", caption: "雪地绅士" },
        { src: "./20260328115314_7186_191.jpg", caption: "可爱学生娃" },
        { src: "./20260328140820_7226_191.jpg", caption: "骑着小海豚出发啦！" },
        { src: "./20260328140821_7227_191.jpg", caption: "超级无敌甜的笑脸" },
        { src: "./20260328140822_7228_191.jpg", caption: "花丛中的帅气小模特" },
        { src: "./微信图片_20260328140803_7205_191.jpg", caption: "看！我和大海龟握个手" },
        { src: "./微信图片_20260328140804_7206_191.jpg", caption: "正在观察尼莫的小壮" },
        { src: "./微信图片_20260328140805_7207_191.jpg", caption: "冰面上的平衡感测试" },
        { src: "./微信图片_20260328140806_7208_191.jpg", caption: "极地冰雪大冒险" },
        { src: "./微信图片_20260328140806_7209_191.jpg", caption: "暖阳下的快乐蹲蹲" },
        { src: "./微信图片_20260328140807_7210_191.jpg", caption: "带着翻斗车去散步" },
        { src: "./微信图片_20260328140808_7211_191.jpg", caption: "爸爸怀里的小司机" },
        { src: "./微信图片_20260328140809_7212_191.jpg", caption: "帅气的小班长上线" },
        { src: "./微信图片_20260328140810_7213_191.jpg", caption: "正在搬运“重型”物资" },
        { src: "./微信图片_20260328140810_7214_191.jpg", caption: "和好朋友打个招呼" },
        { src: "./微信图片_20260328140811_7215_191.jpg", caption: "这就是我的快乐基地！" },
        { src: "./微信图片_20260328140812_7216_191.jpg", caption: "沙发上的悠闲航行时刻" },
        { src: "./微信图片_20260328140813_7217_191.jpg", caption: "补充能量，准备出发" },
        { src: "./微信图片_20260328140814_7218_191.jpg", caption: "今天又是满载而归的一天" },
        { src: "./微信图片_20260328140815_7219_191.jpg", caption: "观察小动物在干什么" },
        { src: "./微信图片_20260328140815_7220_191.jpg", caption: "真香！大口大口吃玉米" },
        { src: "./微信图片_20260328140816_7221_191.jpg", caption: "专注干饭的小壮最可爱" },
        { src: "./微信图片_20260328140817_7222_191.jpg", caption: "夜晚的小小发现者" },
        { src: "./微信图片_20260328140818_7223_191.jpg", caption: "红红火火的快乐时刻" },
        { src: "./微信图片_20260328140819_7224_191.jpg", caption: "和好朋友的海豚航行" },
        { src: "./微信图片_20260328140819_7225_191.jpg", caption: "全宇宙最有潜力的歌神" },
        { src: "./微信图片_20260328141218_7229_191.jpg", caption: "草坪上的工程车作业中" },
        { src: "./微信图片_20260328141225_7230_191.jpg", caption: "带着运输车去拉货" },
        { src: "./微信图片_20260328141244_7231_191.jpg", caption: "向着阳光，全速奔跑！" },
        { src: "./微信图片_20260328141300_7232_191.jpg", caption: "捕获一只毛茸茸的羊驼" },
        { src: "./微信图片_20260328141311_7233_191.jpg", caption: "小羊的爱心投喂官" },
        { src: "./微信图片_20260328141339_7236_191.jpg", caption: "先“干”为敬" },
        { src: "./微信图片_20260328141345_7237_191.jpg", caption: "太好喝啦！" },
        { src: "./微信图片_20260328141403_7238_191.jpg", caption: "草坪上的快乐起飞" },
        { src: "./微信图片_20260328141435_7241_191.jpg", caption: "与汪星人的秘密会谈" },
        { src: "./微信图片_20260328141450_7242_191.jpg", caption: "发现夜空中的奇妙信号" },
        { src: "./微信图片_20260328141524_7243_191.jpg", caption: "平安果的小守护者" },
        { src: "./微信图片_20260328142051_7244_191.jpg", caption: "复古时光里的小老板" },
        { src: "./微信图片_20260328142052_7245_191.jpg", caption: "阳光下的巡视时刻" },
        { src: "./微信图片_20260328142053_7246_191.jpg", caption: "冰凉一夏的补给站" },
        { src: "./微信图片_20260328142054_7247_191.jpg", caption: "目标：冲向云霄的大飞机！" },
        { src: "./微信图片_20260328142055_7248_191.jpg", caption: "正在与大熊猫交换情报" },
        { src: "./微信图片_20260328142055_7250_191.jpg", caption: "光盘行动" },
        { src: "./微信图片_20260328142056_7251_191.jpg", caption: "豪饮豪吃" },
        { src: "./微信图片_20260328142057_7252_191.jpg", caption: "圣诞小老人" },
        { src: "./微信图片_20260328142058_7253_191.jpg", caption: "我来尝尝咸淡！" },
        { src: "./微信图片_20260328142059_7254_191.jpg", caption: "酷哦" },
        { src: "./微信图片_20260328142059_7255_191.jpg", caption: "我在夏威夷" },
        { src: "./微信图片_20260328142101_7257_191.jpg", caption: "学习学习" },
        { src: "./微信图片_20260328142102_7258_191.jpg", caption: "凳子放这里嘛" },
        { src: "./微信图片_20260328142103_7259_191.jpg", caption: "湖畔的静谧时刻" },
        { src: "./微信图片_20260328142103_7260_191.jpg", caption: "观察水里的小秘密" },
        { src: "./微信图片_20260328142104_7261_191.jpg", caption: "旷野里的回头一瞥" },
        { src: "./微信图片_20260328142107_7262_191.jpg", caption: "拉粑粑也要看书哦" }
    ];

    const fallbackUrl = "https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&q=80&w=800";

    return (
        <div className="min-h-screen bg-[#FFFEFA] text-amber-950 font-sans selection:bg-amber-100 overflow-x-hidden">

            {/* 背景装饰 */}
            <div className="fixed inset-0 pointer-events-none opacity-[0.02] flex flex-col justify-around py-20 px-10">
                <Truck size={120} className="self-start rotate-12" />
                <Construction size={100} className="self-end -rotate-12" />
                <ExcavatorIcon className="self-center scale-150" />
            </div>

            {/* Navigation */}
            <nav className="fixed top-0 w-full z-50 px-8 py-6 flex justify-between items-center backdrop-blur-md bg-white/30 border-b border-amber-50">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-amber-200/80 flex items-center justify-center text-white shadow-sm rotate-3">
                        <HardHat size={22} />
                    </div>
                    <div>
                        <span className="font-black text-xl tracking-tight text-amber-900/80 block uppercase">小壮的乐园</span>
                        <span className="text-[9px] font-bold text-amber-300 uppercase tracking-widest">Est. 2023.02.17</span>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative h-screen flex items-center justify-center px-6">

                {/* --- 这里就是找回的灵魂口头禅！四个角落都安排上了 --- */}
                <SpeechBubble text="妈妈我好想你呀~" position="top-[20%] left-[5%] md:left-[15%]" delay={0.5} />
                <SpeechBubble text="我要吃三个！" position="top-[30%] right-[5%] md:right-[15%]" delay={0.9} />
                <SpeechBubble text="我还没有玩完呢~" position="bottom-[35%] left-[8%] md:left-[20%]" delay={1.3} />
                <SpeechBubble text="我要玩大挖机！" position="bottom-[25%] right-[8%] md:right-[20%]" delay={1.7} />

                <div className="relative z-10 text-center max-w-4xl mt-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <div className="flex justify-center mb-8">
                            <motion.div
                                animate={{ y: [-10, 10, -10] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="bg-amber-50/80 p-5 rounded-[2.5rem] text-amber-300 shadow-sm border border-amber-100"
                            >
                                <ExcavatorIcon className="w-12 h-12" />
                            </motion.div>
                        </div>

                        <h1 className="text-6xl md:text-8xl font-black mb-10 tracking-tighter leading-tight">
                            <span className="text-amber-900/90">你好, </span>
                            <span className="text-amber-400 relative inline-block">
                               小壮
                               <svg className="absolute -bottom-2 left-0 w-full opacity-40" viewBox="0 0 100 10" preserveAspectRatio="none">
                                 <path d="M0 5 Q 25 0, 50 5 T 100 5" stroke="#FCD34D" strokeWidth="4" fill="none" strokeLinecap="round" />
                               </svg>
                            </span>
                        </h1>

                        <p className="text-lg md:text-xl text-amber-800/50 font-medium mb-12 max-w-2xl mx-auto leading-relaxed">
                            来到地球生活的第 <span className="text-amber-400 font-black">{diffDays}</span> 天<br/>
                            这里是属于你的超大型成长基地！
                        </p>

                        <div className="flex flex-wrap justify-center gap-4">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' })}
                                className="px-10 py-4 bg-amber-300 text-white rounded-[2rem] font-black text-lg shadow-lg shadow-amber-200/50 hover:bg-amber-400 transition-all flex items-center gap-3"
                            >
                                开启探索记录 <Camera size={20} />
                            </motion.button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Gallery Section */}
            <section id="gallery" className="py-32 px-8">
                <div className="container mx-auto max-w-7xl">
                    <div className="flex flex-col items-center mb-24 text-center">
                        <div className="flex items-center gap-2 mb-4">
                            <Sparkles className="text-amber-200" size={18} />
                            <span className="text-amber-300 font-black tracking-[0.4em] uppercase text-[10px] px-4 py-1.5 bg-amber-50/50 rounded-full border border-amber-100/50">Growth Archive</span>
                            <Sparkles className="text-amber-200" size={18} />
                        </div>
                        <h2 className="text-5xl md:text-6xl font-black text-amber-900/80 tracking-tighter italic">成长纪念册</h2>
                    </div>

                    {/* 瀑布流布局 */}
                    <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-8">
                        {photos.map((photo, i) => (
                            <PhotoCard
                                key={i}
                                src={photo.src}
                                caption={photo.caption}
                                index={i}
                                fallbackUrl={fallbackUrl}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-24 px-8 text-center bg-amber-50/20 border-t border-amber-50">
                <div className="flex flex-col items-center gap-8">
                    <div className="flex items-center gap-3">
                        <ExcavatorIcon className="w-10 h-10 text-amber-200" />
                        <span className="text-xl font-black text-amber-900/40 tracking-tighter uppercase">Happy Planet // XZ.</span>
                    </div>
                    <p className="text-amber-900/10 text-[10px] font-black tracking-[0.4em] uppercase">
                        Since 2023.02.17 · 陪小壮一起成长的第 {diffDays} 天
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default App;
