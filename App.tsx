import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlanetScene } from './components/PlanetScene';
import {
    Heart,
    Star,
    Rocket,
    Camera,
    Gift,
    Calendar,
    ChevronDown,
    Sparkles,
    Music,
    Smile,
    BookOpen
} from 'lucide-react';

const MilestoneCard = ({ title, date, description, icon: Icon, color, index }: any) => (
    <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1 }}
        className="relative group"
    >
        <div className="absolute -inset-1 bg-gradient-to-r from-planet-blue to-planet-pink rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
        <div className="relative bg-white/80 backdrop-blur-sm p-8 rounded-2xl border border-white/50 shadow-xl hover:shadow-2xl transition-all duration-300">
            <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-6 shadow-inner ${color}`}>
                <Icon className="text-white" size={28} />
            </div>
            <span className="text-xs font-bold tracking-widest text-planet-blue uppercase mb-2 block">{date}</span>
            <h3 className="text-2xl font-bold text-planet-dark mb-3 font-kuaile">{title}</h3>
            <p className="text-planet-dark/70 leading-relaxed">{description}</p>
        </div>
    </motion.div>
);

const PhotoFrame = ({ src, caption, rotation }: any) => (
    <motion.div
        whileHover={{ scale: 1.05, rotate: 0 }}
        style={{ rotate: rotation }}
        className="bg-white p-4 pb-12 shadow-2xl rounded-sm border border-stone-100 transform transition-all duration-300"
    >
        <div className="aspect-[3/4] overflow-hidden bg-stone-100 mb-4">
            <img
                src={src}
                alt={caption}
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                referrerPolicy="no-referrer"
            />
        </div>
        <p className="text-center font-kuaile text-planet-dark/60 text-lg">{caption}</p>
    </motion.div>
);

const App: React.FC = () => {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    const milestones = [
        {
            title: "三岁生日快乐",
            date: "2026年3月",
            description: "吹灭三根蜡烛，许下小小的愿望。你已经是大孩子啦！",
            icon: Gift,
            color: "bg-planet-pink"
        },
        {
            title: "幼儿园初体验",
            date: "2026年春",
            description: "背起小书包，迈向新世界。你的勇敢超出了我们的想象。",
            icon: BookOpen,
            color: "bg-planet-blue"
        },
        {
            title: "小小艺术家",
            date: "日常点滴",
            description: "用画笔涂抹出彩虹，用积木搭建出城堡。你的想象力是无穷的。",
            icon: Smile,
            color: "bg-planet-orange"
        },
        {
            title: "快乐探险家",
            date: "探索中",
            description: "对世界充满好奇，每一个小昆虫、每一朵小花都是你的好朋友。",
            icon: Sparkles,
            color: "bg-planet-yellow"
        }
    ];

    return (
        <div className="relative min-h-screen font-sans">
            {/* Hero Section */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden bg-planet-dark">
                <PlanetScene />

                <div className="relative z-10 text-center px-6">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                    >
            <span className="inline-block px-4 py-1 rounded-full bg-planet-yellow/20 text-planet-yellow text-sm font-bold tracking-widest uppercase mb-6 border border-planet-yellow/30">
              HAPPY 3RD BIRTHDAY
            </span>
                        <h1 className="text-7xl md:text-9xl font-kuaile text-white mb-8 drop-shadow-2xl">
                            快乐星球<br/>
                            <span className="text-planet-yellow italic">成长记</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-white/70 font-light max-w-2xl mx-auto mb-12">
                            记录宝贝每一个闪光的瞬间，探索属于你的奇妙宇宙。
                        </p>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => document.getElementById('milestones')?.scrollIntoView({ behavior: 'smooth' })}
                            className="px-8 py-4 bg-planet-yellow text-planet-dark rounded-full font-bold text-lg shadow-lg hover:bg-white transition-colors duration-300 flex items-center gap-2 mx-auto"
                        >
                            开启探索之旅 <Rocket size={20} />
                        </motion.button>
                    </motion.div>
                </div>

                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/30 animate-bounce">
                    <ChevronDown size={32} />
                </div>
            </section>

            {/* Intro Section */}
            <section className="py-32 px-6 bg-[#FDFCF0]">
                <div className="container mx-auto max-w-4xl text-center">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        <Smile className="mx-auto text-planet-pink mb-8" size={48} />
                        <h2 className="text-4xl md:text-5xl font-kuaile text-planet-dark mb-8">
                            亲爱的宝贝，三岁快乐！
                        </h2>
                        <p className="text-xl text-planet-dark/60 leading-relaxed italic">
                            “你不是在长大，你是在发光。”<br/>
                            这三年来，你带给我们的快乐，比满天的繁星还要多。<br/>
                            在这个属于你的快乐星球上，你可以永远做那个无忧无虑的小探险家。
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Milestones */}
            <section id="milestones" className="py-32 px-6 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full opacity-50 pointer-events-none">
                    <div className="absolute top-1/4 left-10 w-64 h-64 bg-planet-blue rounded-full blur-[120px]"></div>
                    <div className="absolute bottom-1/4 right-10 w-64 h-64 bg-planet-pink rounded-full blur-[120px]"></div>
                </div>

                <div className="container mx-auto relative z-10">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
                        <div className="max-w-xl">
                            <span className="text-planet-blue font-bold tracking-widest uppercase text-sm mb-4 block">Timeline</span>
                            <h2 className="text-5xl font-kuaile text-planet-dark">成长足迹</h2>
                        </div>
                        <p className="text-planet-dark/50 max-w-xs text-right hidden md:block">
                            每一个微小的进步，都是我们心中最伟大的奇迹。
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {milestones.map((m, i) => (
                            <MilestoneCard key={i} {...m} index={i} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Gallery Section */}
            <section className="py-32 px-6 bg-white">
                <div className="container mx-auto">
                    <div className="text-center mb-20">
                        <Camera className="mx-auto text-planet-orange mb-6" size={40} />
                        <h2 className="text-5xl font-kuaile text-planet-dark mb-4">瞬间定格</h2>
                        <p className="text-planet-dark/40">那些被爱包围的时刻</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
                        <PhotoFrame
                            src="/微信图片_20260328115230_7177_191.jpg"
                            caption="超市里的小帮手"
                            rotation="-3deg"
                        />
                        <PhotoFrame
                            src="/微信图片_20260328115232_7178_191.jpg"
                            caption="灿烂的笑容"
                            rotation="2deg"
                        />
                        <PhotoFrame
                            src="/微信图片_20260328115310_7180_191.jpg"
                            caption="三岁生日快乐！"
                            rotation="-1deg"
                        />
                        <PhotoFrame
                            src="/微信图片_20260328115311_7181_191.jpg"
                            caption="纯真的快乐"
                            rotation="3deg"
                        />
                        <PhotoFrame
                            src="/微信图片_20260328115311_7182_191.jpg"
                            caption="哈哈大笑时刻"
                            rotation="-2deg"
                        />
                        <PhotoFrame
                            src="/微信图片_20260328115314_7185_191.jpg"
                            caption="雪地里的小绅士"
                            rotation="1deg"
                        />
                        <div className="md:col-span-2 lg:col-span-1 flex justify-center">
                            <PhotoFrame
                                src="/微信图片_20260328115314_7186_191.jpg"
                                caption="帅气的小学生模样"
                                rotation="4deg"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Wishes Section */}
            <section className="py-32 px-6 bg-planet-dark text-white text-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(255,217,61,0.2)_0%,transparent_70%)]"></div>
                </div>

                <div className="container mx-auto max-w-3xl relative z-10">
                    <Gift className="mx-auto text-planet-yellow mb-8" size={48} />
                    <h2 className="text-5xl font-kuaile mb-12">爸爸妈妈的寄语</h2>
                    <div className="glass p-12 rounded-3xl">
                        <p className="text-2xl font-light leading-relaxed mb-8">
                            “愿你眼中有星辰，心中有大海。愿你一生被爱，永远保持对世界的好奇与温柔。”
                        </p>
                        <div className="w-20 h-1 bg-planet-yellow mx-auto mb-6"></div>
                        <p className="text-planet-yellow font-bold tracking-widest uppercase">爱你的爸爸妈妈</p>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 px-6 text-center bg-[#FDFCF0]">
                <div className="flex items-center justify-center gap-4 mb-6">
                    <div className="w-10 h-10 bg-planet-yellow rounded-full flex items-center justify-center text-planet-dark font-bold text-xl">★</div>
                    <span className="font-kuaile text-2xl text-planet-dark">快乐星球成长记</span>
                </div>
                <p className="text-planet-dark/30 text-sm">© 2026 宝贝的快乐星球 · 用爱记录成长</p>
            </footer>
        </div>
    );
};

export default App;
