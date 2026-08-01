import { createFileRoute } from "@tanstack/react-router";
import { LegacyPage } from "@/components/LegacyPage";

const css = `
        body {
            background-color: #050505;
            color: #e5e2e1;
            overflow-x: hidden;
        }

        /* Ambient Background Effects */
        .ambient-aurora {
            position: fixed;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: radial-gradient(circle at 50% 50%, rgba(0, 210, 255, 0.05) 0%, transparent 50%),
                        radial-gradient(circle at 20% 80%, rgba(165, 231, 255, 0.03) 0%, transparent 40%);
            z-index: -2;
            pointer-events: none;
            animation: drift 30s linear infinite alternate;
        }
        
        .film-grain {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 9999;
            opacity: 0.02;
            background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
            mix-blend-mode: overlay;
        }

        .scanlines {
            background-image: repeating-linear-gradient(
                to bottom,
                transparent,
                transparent 3px,
                rgba(255, 255, 255, 0.02) 4px
            );
        }

        @keyframes drift {
            0% { transform: translate(0, 0) scale(1); }
            100% { transform: translate(-2%, 3%) scale(1.05); }
        }

        /* Glassmorphism Utilities */
        .glass-panel {
            background: rgba(255, 255, 255, 0.03);
            backdrop-filter: blur(30px);
            -webkit-backdrop-filter: blur(30px);
            border: 1px solid rgba(255, 255, 255, 0.05);
        }
        
        .glass-panel-interactive:hover {
            background: rgba(255, 255, 255, 0.08);
            border: 1px solid rgba(165, 231, 255, 0.3);
            box-shadow: 0 0 20px rgba(165, 231, 255, 0.1);
        }

        /* Audio Player Customizations */
        input[type=range] {
            -webkit-appearance: none;
            width: 100%;
            background: transparent;
        }

        input[type=range]::-webkit-slider-thumb {
            -webkit-appearance: none;
            height: 12px;
            width: 12px;
            border-radius: 50%;
            background: #a5e7ff;
            cursor: pointer;
            margin-top: -5px;
            box-shadow: 0 0 10px rgba(165, 231, 255, 0.8);
        }

        input[type=range]::-webkit-slider-runnable-track {
            width: 100%;
            height: 2px;
            cursor: pointer;
            background: rgba(255, 255, 255, 0.2);
            border-radius: 1px;
        }
        
        input[type=range]:focus {
            outline: none;
        }
        
        .play-btn-glow {
            box-shadow: 0 0 15px rgba(165, 231, 255, 0.2);
            transition: all 0.3s ease;
        }
        
        .play-btn-glow:hover {
            box-shadow: 0 0 25px rgba(165, 231, 255, 0.5);
            background-color: rgba(165, 231, 255, 0.2);
        }
    `;

const html = `
<!-- Ambient Layers -->
<div class="ambient-aurora"></div>
<div class="film-grain"></div>
<!-- TopAppBar -->
<header class="bg-transparent fixed top-0 w-full bg-gradient-to-b from-surface-dim/80 to-transparent backdrop-blur-sm flex justify-between items-center px-margin-mobile md:px-margin-desktop h-20 w-full z-50 transition-all">
<div class="flex items-center gap-4">
<h1 class="font-display-lg-mobile text-display-lg-mobile md:font-display-lg md:text-display-lg tracking-tighter text-primary uppercase" data-nav="/home">Nafsam</h1>
<span class="text-on-surface-variant font-mono-ui text-mono-ui uppercase mt-2 hidden md:block opacity-60">/// Archive / Songs</span>
</div>
<div class="flex items-center gap-4 hidden md:flex">
<span class="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors duration-300 cursor-pointer" data-icon="language">language</span>
<span class="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors duration-300 cursor-pointer" data-icon="lock">lock</span>
<span class="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors duration-300 cursor-pointer" data-icon="settings">settings</span>
</div>
</header>
<!-- Main Content Canvas -->
<main class="w-full max-w-container-max px-margin-mobile md:px-margin-desktop pt-32 md:pt-40 flex-grow z-10">
<div class="mb-12">
<h2 class="font-headline-md text-headline-md text-primary mb-2">Resonance Chamber</h2>
<p class="font-body-md text-body-md text-on-surface-variant max-w-2xl">Archived frequencies. Audio logs and musical fragments preserved in the void.</p>
</div>
<!-- Glassmorphic Grid -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
<!-- Audio Card 1 (English) -->
<div class="glass-panel glass-panel-interactive rounded-xl p-6 relative overflow-hidden group transition-all duration-500">
<div class="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
<div class="flex justify-between items-start mb-6">
<div>
<h3 class="font-headline-sm text-headline-sm text-on-surface mb-1 truncate">Echoes of the Void</h3>
<p class="font-mono-ui text-mono-ui text-on-surface-variant uppercase tracking-widest">Archivist Alpha</p>
</div>
<span class="font-label-caps text-label-caps text-primary/50">ENG</span>
</div>
<div class="relative w-full h-32 mb-6 rounded-lg overflow-hidden flex items-center justify-center bg-surface-container/50 border border-white/5">
<!-- Abstract Waveform representation -->
<div class="flex items-center gap-1 h-12 opacity-60">
<div class="w-1 bg-primary rounded-full animate-[pulse_1s_ease-in-out_infinite]" style="height: 20%"></div>
<div class="w-1 bg-primary rounded-full animate-[pulse_1.2s_ease-in-out_infinite]" style="height: 60%"></div>
<div class="w-1 bg-primary rounded-full animate-[pulse_0.8s_ease-in-out_infinite]" style="height: 40%"></div>
<div class="w-1 bg-primary rounded-full animate-[pulse_1.5s_ease-in-out_infinite]" style="height: 100%"></div>
<div class="w-1 bg-primary rounded-full animate-[pulse_1.1s_ease-in-out_infinite]" style="height: 30%"></div>
<div class="w-1 bg-primary rounded-full animate-[pulse_0.9s_ease-in-out_infinite]" style="height: 80%"></div>
<div class="w-1 bg-primary rounded-full animate-[pulse_1.3s_ease-in-out_infinite]" style="height: 50%"></div>
</div>
</div>
<div class="flex flex-col gap-4">
<div class="flex items-center gap-3 text-on-surface-variant font-mono-ui text-xs">
<span>0:00</span>
<input class="flex-grow" max="100" min="0" type="range" value="0"/>
<span>4:32</span>
</div>
<div class="flex justify-between items-center mt-2">
<button class="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors">shuffle</button>
<div class="flex items-center gap-4">
<button class="material-symbols-outlined text-on-surface hover:text-primary transition-colors">skip_previous</button>
<button class="material-symbols-outlined text-primary text-4xl play-btn-glow rounded-full p-1 bg-primary/10" data-weight="fill">play_circle</button>
<button class="material-symbols-outlined text-on-surface hover:text-primary transition-colors">skip_next</button>
</div>
<button class="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors">volume_up</button>
</div>
</div>
</div>
<!-- Audio Card 2 (Arabic - RTL) -->
<div class="glass-panel glass-panel-interactive rounded-xl p-6 relative overflow-hidden group transition-all duration-500" dir="rtl">
<div class="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
<div class="flex justify-between items-start mb-6">
<div>
<h3 class="font-headline-sm text-headline-sm text-on-surface mb-1 truncate">أصوات الذاكرة</h3>
<p class="font-mono-ui text-mono-ui text-on-surface-variant uppercase tracking-widest">محفوظات</p>
</div>
<span class="font-label-caps text-label-caps text-primary/50" dir="ltr">ARB</span>
</div>
<div class="relative w-full h-32 mb-6 rounded-lg overflow-hidden flex items-center justify-center bg-surface-container/50 border border-white/5">
<div class="flex items-center gap-1 h-12 opacity-60" dir="ltr">
<div class="w-1 bg-primary rounded-full animate-[pulse_1.1s_ease-in-out_infinite]" style="height: 50%"></div>
<div class="w-1 bg-primary rounded-full animate-[pulse_0.9s_ease-in-out_infinite]" style="height: 30%"></div>
<div class="w-1 bg-primary rounded-full animate-[pulse_1.3s_ease-in-out_infinite]" style="height: 80%"></div>
<div class="w-1 bg-primary rounded-full animate-[pulse_0.8s_ease-in-out_infinite]" style="height: 20%"></div>
<div class="w-1 bg-primary rounded-full animate-[pulse_1.5s_ease-in-out_infinite]" style="height: 90%"></div>
<div class="w-1 bg-primary rounded-full animate-[pulse_1s_ease-in-out_infinite]" style="height: 40%"></div>
</div>
</div>
<div class="flex flex-col gap-4" dir="ltr">
<div class="flex items-center gap-3 text-on-surface-variant font-mono-ui text-xs">
<span>0:00</span>
<input class="flex-grow" max="100" min="0" type="range" value="0"/>
<span>3:15</span>
</div>
<div class="flex justify-between items-center mt-2">
<button class="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors">shuffle</button>
<div class="flex items-center gap-4">
<button class="material-symbols-outlined text-on-surface hover:text-primary transition-colors">skip_previous</button>
<button class="material-symbols-outlined text-primary text-4xl play-btn-glow rounded-full p-1 bg-primary/10" data-weight="fill">play_circle</button>
<button class="material-symbols-outlined text-on-surface hover:text-primary transition-colors">skip_next</button>
</div>
<button class="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors">volume_up</button>
</div>
</div>
</div>
<!-- Audio Card 3 (Instrumental) -->
<div class="glass-panel glass-panel-interactive rounded-xl p-6 relative overflow-hidden group transition-all duration-500">
<div class="absolute inset-0 bg-gradient-to-br from-secondary-fixed-dim/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
<div class="flex justify-between items-start mb-6">
<div>
<h3 class="font-headline-sm text-headline-sm text-on-surface mb-1 truncate">Stellar Drift</h3>
<p class="font-mono-ui text-mono-ui text-on-surface-variant uppercase tracking-widest">Instrumental</p>
</div>
<span class="font-label-caps text-label-caps text-secondary-fixed-dim/50">INST</span>
</div>
<div class="relative w-full h-32 mb-6 rounded-lg overflow-hidden flex items-center justify-center bg-surface-container/50 border border-white/5">
<div class="flex items-center gap-1 h-12 opacity-60">
<div class="w-1 bg-secondary-fixed-dim rounded-full animate-[pulse_2s_ease-in-out_infinite]" style="height: 10%"></div>
<div class="w-1 bg-secondary-fixed-dim rounded-full animate-[pulse_2.2s_ease-in-out_infinite]" style="height: 20%"></div>
<div class="w-1 bg-secondary-fixed-dim rounded-full animate-[pulse_1.8s_ease-in-out_infinite]" style="height: 15%"></div>
<div class="w-1 bg-secondary-fixed-dim rounded-full animate-[pulse_2.5s_ease-in-out_infinite]" style="height: 30%"></div>
<div class="w-1 bg-secondary-fixed-dim rounded-full animate-[pulse_2.1s_ease-in-out_infinite]" style="height: 25%"></div>
</div>
</div>
<div class="flex flex-col gap-4">
<div class="flex items-center gap-3 text-on-surface-variant font-mono-ui text-xs">
<span>0:00</span>
<input class="flex-grow" max="100" min="0" type="range" value="0"/>
<span>8:42</span>
</div>
<div class="flex justify-between items-center mt-2">
<button class="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors">shuffle</button>
<div class="flex items-center gap-4">
<button class="material-symbols-outlined text-on-surface hover:text-primary transition-colors">skip_previous</button>
<button class="material-symbols-outlined text-secondary-fixed-dim text-4xl play-btn-glow rounded-full p-1 bg-secondary-fixed-dim/10" data-weight="fill" style="box-shadow: 0 0 15px rgba(233, 195, 73, 0.2);">play_circle</button>
<button class="material-symbols-outlined text-on-surface hover:text-primary transition-colors">skip_next</button>
</div>
<button class="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors">volume_up</button>
</div>
</div>
</div>
</div>
</main>
<!-- BottomNavBar (Hidden on MD+, visible on mobile/tablet) -->
<nav class="md:hidden bg-surface-container-low/10 font-label-caps text-label-caps uppercase text-primary font-mono-ui docked fixed bottom-8 left-1/2 -translate-x-1/2 rounded-full w-[90%] max-w-4xl backdrop-blur-[30px] border border-primary/20 bg-clip-padding relative after:content-[''] after:absolute after:inset-0 after:bg-[url('scanlines.png')] after:opacity-5 after:pointer-events-none shadow-[0_0_40px_rgba(0,210,255,0.15)] fixed bottom-8 left-1/2 -translate-x-1/2 w-[95%] max-w-5xl z-50 flex justify-around items-center py-3 px-6">
<a class="flex flex-col items-center justify-center text-on-surface-variant/60 hover:text-on-surface transition-all duration-500 hover:bg-white/5" href="#">
<span class="material-symbols-outlined mb-1">home</span>
<span class="text-[10px]">Home</span>
</a>
<a class="flex flex-col items-center justify-center text-on-surface-variant/60 hover:text-on-surface transition-all duration-500 hover:bg-white/5" href="#">
<span class="material-symbols-outlined mb-1">image</span>
<span class="text-[10px]">Photos</span>
</a>
<!-- ACTIVE STATE: Songs -->
<a class="flex flex-col items-center justify-center bg-primary/10 text-primary border border-primary/30 rounded-full px-4 py-2 scale-110 hover:bg-white/5 Active: scale-95 transition-transform duration-200" href="#">
<span class="material-symbols-outlined mb-1">music_note</span>
<span class="text-[10px]">Songs</span>
</a>
<a class="flex flex-col items-center justify-center text-on-surface-variant/60 hover:text-on-surface transition-all duration-500 hover:bg-white/5" href="#">
<span class="material-symbols-outlined mb-1">movie</span>
<span class="text-[10px]">Videos</span>
</a>
<a class="flex flex-col items-center justify-center text-on-surface-variant/60 hover:text-on-surface transition-all duration-500 hover:bg-white/5 hidden sm:flex" href="#">
<span class="material-symbols-outlined mb-1">edit_note</span>
<span class="text-[10px]">Writings</span>
</a>
</nav>
<!-- Top Nav Cluster for Desktop (Replaces BottomNavBar intent) -->
<nav class="hidden md:flex fixed top-24 left-1/2 -translate-x-1/2 z-40 bg-surface-container-low/30 backdrop-blur-md border border-white/5 rounded-full px-6 py-2 gap-8 shadow-2xl">
<a class="font-label-caps text-label-caps text-on-surface-variant hover:text-primary transition-colors tracking-widest uppercase" href="#">Home</a>
<a class="font-label-caps text-label-caps text-on-surface-variant hover:text-primary transition-colors tracking-widest uppercase" href="#">Photos</a>
<a class="font-label-caps text-label-caps text-primary border-b border-primary tracking-widest uppercase pb-1" href="#">Songs</a>
<a class="font-label-caps text-label-caps text-on-surface-variant hover:text-primary transition-colors tracking-widest uppercase" href="#">Videos</a>
<a class="font-label-caps text-label-caps text-on-surface-variant hover:text-primary transition-colors tracking-widest uppercase" href="#">Writings</a>
</nav>
`;

const script = ``;

export const Route = createFileRoute("/songs")({
  head: () => ({
    meta: [
      { title: "Nafsam | Songs Archive" },
      { name: "description", content: "Sonic imprints and echoes stored in the Nafsam acoustic vault." },
      { property: "og:title", content: "Nafsam | Songs Archive" },
      { property: "og:description", content: "Sonic imprints and echoes stored in the Nafsam acoustic vault." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SongsPage,
});

function SongsPage() {
  return (
    <LegacyPage
      css={css}
      html={html}
      script={script}
      bodyClassName="antialiased min-h-screen relative flex flex-col items-center pb-32"
      dir="ltr"
      lang="en"
    />
  );
}
