import { createFileRoute } from "@tanstack/react-router";
import { LegacyPage } from "@/components/LegacyPage";

const css = `
        body {
            background-color: #050505;
            color: #e5e2e1;
            overflow-x: hidden;
        }

        /* Ambient Backgrounds */
        .ambient-aurora {
            position: fixed;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: radial-gradient(circle at 50% 50%, rgba(0, 210, 255, 0.05) 0%, rgba(13, 13, 13, 0) 50%),
                        radial-gradient(circle at 20% 80%, rgba(0, 103, 127, 0.08) 0%, rgba(13, 13, 13, 0) 40%);
            z-index: -2;
            pointer-events: none;
            filter: blur(80px);
            animation: pulse-aurora 15s infinite alternate ease-in-out;
        }

        @keyframes pulse-aurora {
            0% { transform: scale(1) translate(0, 0); opacity: 0.8; }
            50% { transform: scale(1.05) translate(2%, 2%); opacity: 1; }
            100% { transform: scale(0.95) translate(-2%, -1%); opacity: 0.9; }
        }

        .film-grain {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 100;
            opacity: 0.03;
            background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
            mix-blend-mode: overlay;
        }

        /* Glassmorphism Classes */
        .glass-panel {
            background: rgba(255, 255, 255, 0.03);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.05);
            box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.3);
        }
        
        .glass-panel-interactive {
            transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        .glass-panel-interactive:hover {
            background: rgba(255, 255, 255, 0.06);
            border-color: rgba(165, 231, 255, 0.3); /* primary color with opacity */
            transform: translateY(-4px);
            box-shadow: 0 12px 40px 0 rgba(0, 210, 255, 0.1);
        }

        .scanline-overlay {
            position: relative;
        }
        .scanline-overlay::after {
            content: '';
            position: absolute;
            inset: 0;
            background: linear-gradient(to bottom, transparent 50%, rgba(255, 255, 255, 0.02) 50%);
            background-size: 100% 4px;
            pointer-events: none;
            border-radius: inherit;
        }
        
        /* Typography utilities */
        .writing-title-rtl {
            font-family: 'Playfair Display', serif; /* Or appropriate RTL serif */
        }
        .writing-body-rtl {
             font-family: 'Geist', sans-serif; /* Or appropriate RTL sans */
        }
    `;

const html = `
<div class="ambient-aurora"></div>
<div class="film-grain"></div>
<!-- TopAppBar -->
<header class="flex justify-between items-center px-margin-mobile md:px-margin-desktop h-20 w-full z-50 fixed top-0 w-full bg-gradient-to-b from-surface-dim/80 to-transparent backdrop-blur-sm">
<div class="font-display-lg-mobile text-display-lg-mobile tracking-tighter text-primary uppercase" data-nav="/home">Nafsam</div>
<div class="flex items-center gap-6">
<span class="material-symbols-outlined text-primary hover:text-primary transition-colors duration-300 cursor-pointer text-on-surface-variant font-bold" style="font-variation-settings: 'FILL' 0;">language</span>
<span class="material-symbols-outlined text-primary hover:text-primary transition-colors duration-300 cursor-pointer text-on-surface-variant font-bold" style="font-variation-settings: 'FILL' 0;">lock</span>
<span class="material-symbols-outlined text-primary hover:text-primary transition-colors duration-300 cursor-pointer text-on-surface-variant font-bold" style="font-variation-settings: 'FILL' 0;">settings</span>
</div>
</header>
<main class="w-full max-w-container-max px-margin-mobile md:px-margin-desktop pt-32 pb-48 flex-grow flex flex-col items-center">
<!-- Header Section -->
<section class="w-full max-w-4xl text-center mb-16 space-y-4">
<h1 class="font-display-lg text-display-lg text-on-surface tracking-tight">Archives of Thought</h1>
<p class="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">Fragments of memory, philosophical inquiries, and daily logs preserved within the neural vault.</p>
<div class="flex justify-center mt-8">
<button class="glass-panel scanline-overlay rounded-full px-8 py-3 font-mono-ui text-mono-ui text-primary uppercase tracking-widest border border-primary/40 hover:bg-primary/10 transition-all duration-300">
                     New Entry
                 </button>
</div>
</section>
<!-- Writings Grid -->
<section class="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-gutter">
<!-- Entry 1 (English) -->
<article class="glass-panel glass-panel-interactive scanline-overlay rounded-2xl p-8 flex flex-col gap-6 relative overflow-hidden group cursor-pointer">
<div class="flex justify-between items-start w-full">
<div class="font-label-caps text-label-caps text-secondary uppercase tracking-widest">Oct 24, 2045</div>
<span class="material-symbols-outlined text-on-surface-variant/50 group-hover:text-primary transition-colors" style="font-variation-settings: 'FILL' 0;">bookmark_border</span>
</div>
<div class="space-y-4">
<h2 class="font-headline-md text-headline-md text-on-surface">The Digital Atrium</h2>
<p class="font-body-md text-body-md text-on-surface-variant line-clamp-4 leading-relaxed">
                        Walking through the simulated archives today, I was struck by how silence renders differently in a digital space. There's an absolute absence of friction, a perfection that borders on the uncanny. The memories stored here don't degrade like paper or fade like celluloid...
                    </p>
</div>
<div class="mt-auto pt-6 flex items-center gap-4 border-t border-white/5">
<div class="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center">
<span class="material-symbols-outlined text-sm text-on-surface-variant">person</span>
</div>
<span class="font-mono-ui text-mono-ui text-on-surface-variant">Log #492</span>
</div>
</article>
<!-- Entry 2 (Arabic - RTL) -->
<article class="glass-panel glass-panel-interactive scanline-overlay rounded-2xl p-8 flex flex-col gap-6 relative overflow-hidden group cursor-pointer" dir="rtl">
<div class="flex justify-between items-start w-full">
<div class="font-label-caps text-label-caps text-primary-fixed-dim uppercase tracking-widest">تشرين الأول ٢٢, ٢٠٤٥</div>
<span class="material-symbols-outlined text-on-surface-variant/50 group-hover:text-primary transition-colors" style="font-variation-settings: 'FILL' 0;">bookmark</span>
</div>
<div class="space-y-4">
<h2 class="writing-title-rtl text-3xl font-semibold text-on-surface">صدى الذاكرة</h2>
<p class="writing-body-rtl text-lg text-on-surface-variant line-clamp-4 leading-loose">
                        في زوايا هذا الفضاء المظلم، أجد شظايا من أفكار قديمة تتلألأ كنجوم بعيدة. هل نحن حقاً ما نتذكره، أم أننا ما نختار أن نحتفظ به في هذه الأوعية الزجاجية؟ كل يوم يمر يضيف طبقة جديدة من الشفافية المعقدة...
                    </p>
</div>
<div class="mt-auto pt-6 flex items-center gap-4 border-t border-white/5">
<span class="font-mono-ui text-mono-ui text-on-surface-variant">سجل #٤٩١</span>
</div>
</article>
<!-- Entry 3 (Persian - RTL) -->
<article class="glass-panel glass-panel-interactive scanline-overlay rounded-2xl p-8 flex flex-col gap-6 relative overflow-hidden group cursor-pointer" dir="rtl">
<div class="flex justify-between items-start w-full">
<div class="font-label-caps text-label-caps text-tertiary uppercase tracking-widest">مهر ۳۰, ۱۴۲۴</div>
<span class="material-symbols-outlined text-on-surface-variant/50 group-hover:text-primary transition-colors" style="font-variation-settings: 'FILL' 0;">bookmark_border</span>
</div>
<div class="space-y-4">
<h2 class="writing-title-rtl text-3xl font-semibold text-on-surface">آینه در تاریکی</h2>
<p class="writing-body-rtl text-lg text-on-surface-variant line-clamp-4 leading-loose">
                       انعکاس نور آبی روی دیوارهای شیشه‌ای، حس تعلیق در فضایی بی‌کران را به من می‌دهد. انگار زمان در این محفظه متوقف شده است. واژه‌ها روی صفحه محو می‌شوند و دوباره جان می‌گیرند، مانند نبض یک موجود زنده...
                   </p>
</div>
<div class="mt-auto pt-6 flex items-center gap-4 border-t border-white/5">
<span class="font-mono-ui text-mono-ui text-on-surface-variant">یادداشت #۴۹۰</span>
</div>
</article>
<!-- Entry 4 (English Image Card) -->
<article class="glass-panel glass-panel-interactive scanline-overlay rounded-2xl flex flex-col relative overflow-hidden group cursor-pointer border-none p-0">
<div class="h-48 w-full relative">
<div class="absolute inset-0 bg-cover bg-center w-full h-full mix-blend-screen opacity-80 group-hover:opacity-100 transition-opacity duration-500" data-alt="A highly detailed, cinematic shot of a futuristic glowing holographic artifact floating in a dark, expansive void. The object is composed of intricate glowing blue geometric lines and soft white light, reflecting off a polished obsidian surface below. The mood is mysterious and technological, using a color palette of deep blacks, cyan blue, and pure white." style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuBCWiojj3mVyGE4XQGf1WBQUNYurOGXewrwBzWbsW1MY2Q_dAYB0QL6l626-nIsjLuEUps81kVp-SgGHQhqxyvy3xlkro-K6WDBcrep0Q23cOU5t_nvmAwxlxs4X-LSkwWekCphos0q1NVY4rCNUGsRQPbdgTkCiSLWTPHwQN-2goMs94rmtUgBAmX8NGgp3I12TWZY3z67L5tFRiPdk9Ex5mVhrnqTvO5Dp4VxD6CNmtJJW524aTMyyh2Hx1yr_GFq1CE0Z3Xqr3w')"></div>
<div class="absolute inset-0 bg-gradient-to-t from-surface-dim to-transparent"></div>
<div class="absolute top-6 left-6 font-label-caps text-label-caps text-inverse-surface uppercase tracking-widest bg-black/50 px-3 py-1 rounded backdrop-blur-md">Oct 20, 2045</div>
</div>
<div class="p-8 pt-4 flex flex-col gap-4 bg-surface-dim/50 backdrop-blur-md h-full">
<h2 class="font-headline-md text-headline-md text-on-surface">Architectural Anomalies</h2>
<p class="font-body-md text-body-md text-on-surface-variant line-clamp-3 leading-relaxed">
                        I noticed a structural anomaly in Sector 4 of the neural net today. A recursive loop that shouldn't exist, beautiful in its mathematical impossibility.
                    </p>
<div class="mt-auto pt-4 flex items-center gap-4">
<span class="font-mono-ui text-mono-ui text-on-surface-variant">Log #489</span>
</div>
</div>
</article>
</section>
<!-- Farewell Text Section -->
<section class="w-full max-w-4xl mt-32 mb-16 relative">
<div class="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-primary/0 via-primary/20 to-primary/0 pointer-events-none"></div>
<div class="glass-panel scanline-overlay rounded-3xl p-12 text-center relative z-10 mx-auto w-full md:w-3/4 flex flex-col items-center border-primary/20">
<span class="material-symbols-outlined text-4xl text-primary/50 mb-6" style="font-variation-settings: 'FILL' 0;">wb_twilight</span>
<h3 class="font-headline-sm text-headline-sm text-on-surface mb-6">The Final Protocol</h3>
<p class="font-body-md text-body-md text-on-surface-variant leading-relaxed max-w-lg mb-8 italic">
                    "When the glass shatters and the light fades, the archive remains. Not as data, but as echo. We are the sum of our recorded silences."
                </p>
<div class="font-label-caps text-label-caps text-primary tracking-[0.2em] uppercase">End of Sequence</div>
</div>
</section>
</main>
<!-- BottomNavBar -->
<nav class="fixed bottom-8 left-1/2 -translate-x-1/2 w-[95%] max-w-5xl z-50 flex justify-around items-center py-3 px-6 bg-surface-container-low/10 backdrop-blur-[30px] border border-primary/20 bg-clip-padding relative after:content-[''] after:absolute after:inset-0 after:bg-[url('scanlines.png')] after:opacity-5 after:pointer-events-none shadow-[0_0_40px_rgba(0,210,255,0.15)] docked fixed bottom-8 left-1/2 -translate-x-1/2 rounded-full w-[90%] max-w-4xl">
<div class="flex flex-col items-center justify-center text-on-surface-variant/60 hover:text-on-surface transition-all duration-500 hover:bg-white/5 p-2 rounded-lg cursor-pointer">
<span class="material-symbols-outlined mb-1" style="font-variation-settings: 'FILL' 0;">home</span>
<span class="font-label-caps text-label-caps uppercase">Home</span>
</div>
<div class="flex flex-col items-center justify-center text-on-surface-variant/60 hover:text-on-surface transition-all duration-500 hover:bg-white/5 p-2 rounded-lg cursor-pointer">
<span class="material-symbols-outlined mb-1" style="font-variation-settings: 'FILL' 0;">image</span>
<span class="font-label-caps text-label-caps uppercase">Photos</span>
</div>
<div class="flex flex-col items-center justify-center text-on-surface-variant/60 hover:text-on-surface transition-all duration-500 hover:bg-white/5 p-2 rounded-lg cursor-pointer">
<span class="material-symbols-outlined mb-1" style="font-variation-settings: 'FILL' 0;">music_note</span>
<span class="font-label-caps text-label-caps uppercase">Songs</span>
</div>
<div class="flex flex-col items-center justify-center text-on-surface-variant/60 hover:text-on-surface transition-all duration-500 hover:bg-white/5 p-2 rounded-lg cursor-pointer">
<span class="material-symbols-outlined mb-1" style="font-variation-settings: 'FILL' 0;">movie</span>
<span class="font-label-caps text-label-caps uppercase">Videos</span>
</div>
<!-- Active Tab: Writings -->
<div class="flex flex-col items-center justify-center bg-primary/10 text-primary border border-primary/30 rounded-full px-4 py-2 scale-110 cursor-pointer shadow-[0_0_15px_rgba(0,210,255,0.3)]">
<span class="material-symbols-outlined mb-1" style="font-variation-settings: 'FILL' 1;">edit_note</span>
<span class="font-label-caps text-label-caps uppercase">Writings</span>
</div>
<div class="flex flex-col items-center justify-center text-on-surface-variant/60 hover:text-on-surface transition-all duration-500 hover:bg-white/5 p-2 rounded-lg cursor-pointer">
<span class="material-symbols-outlined mb-1" style="font-variation-settings: 'FILL' 0;">favorite</span>
<span class="font-label-caps text-label-caps uppercase">Feelings</span>
</div>
<div class="flex flex-col items-center justify-center text-on-surface-variant/60 hover:text-on-surface transition-all duration-500 hover:bg-white/5 p-2 rounded-lg cursor-pointer">
<span class="material-symbols-outlined mb-1" style="font-variation-settings: 'FILL' 0;">auto_awesome_motion</span>
<span class="font-label-caps text-label-caps uppercase">Journey</span>
</div>
<div class="flex flex-col items-center justify-center text-on-surface-variant/60 hover:text-on-surface transition-all duration-500 hover:bg-white/5 p-2 rounded-lg cursor-pointer">
<span class="material-symbols-outlined mb-1" style="font-variation-settings: 'FILL' 0;">chat_bubble</span>
<span class="font-label-caps text-label-caps uppercase">Chat</span>
</div>
</nav>

`;

const script = `
        // Subtle scroll effect for cards
        document.addEventListener('DOMContentLoaded', () => {
            const cards = document.querySelectorAll('article');
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }
                });
            }, { threshold: 0.1 });

            cards.forEach(card => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
                observer.observe(card);
            });
        });
    `;

export const Route = createFileRoute("/writings")({
  head: () => ({
    meta: [
      { title: "Nafsam | Writings" },
      { name: "description", content: "Coded journals and written logs from the Nafsam archive." },
      { property: "og:title", content: "Nafsam | Writings" },
      { property: "og:description", content: "Coded journals and written logs from the Nafsam archive." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: WritingsPage,
});

function WritingsPage() {
  return (
    <LegacyPage
      css={css}
      html={html}
      script={script}
      bodyClassName="antialiased font-body-md text-body-md bg-background min-h-screen relative flex flex-col items-center"
      dir="ltr"
      lang="en"
    />
  );
}
