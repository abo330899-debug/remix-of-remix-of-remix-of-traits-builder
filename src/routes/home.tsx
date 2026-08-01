import { createFileRoute } from "@tanstack/react-router";
import { LegacyPage } from "@/components/LegacyPage";

const css = `
        :root {
            --scanline-color: rgba(165, 231, 255, 0.03);
        }
        body {
            background-color: #050505;
            color: #e5e2e1;
            overflow-x: hidden;
        }
        .glass-panel {
            background: rgba(255, 255, 255, 0.03);
            backdrop-filter: blur(40px);
            -webkit-backdrop-filter: blur(40px);
            border: 1px solid rgba(255, 255, 255, 0.05);
            position: relative;
            overflow: hidden;
        }
        .glass-panel::before {
            content: "";
            position: absolute;
            inset: 0;
            background: linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 100%);
            pointer-events: none;
        }
        .scanlines {
            position: fixed;
            inset: 0;
            background: linear-gradient(to bottom, transparent 50%, var(--scanline-color) 50%);
            background-size: 100% 4px;
            pointer-events: none;
            z-index: 100;
        }
        .aurora {
            position: fixed;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: radial-gradient(circle at 50% 50%, rgba(0, 210, 255, 0.08), rgba(233, 195, 73, 0.05), transparent 50%);
            animation: rotate 60s linear infinite;
            z-index: -1;
            filter: blur(80px);
        }
        @keyframes rotate {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
        .grid-lines {
            position: fixed;
            inset: 0;
            background-image: linear-gradient(rgba(165, 231, 255, 0.05) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(165, 231, 255, 0.05) 1px, transparent 1px);
            background-size: 80px 80px;
            z-index: -1;
        }
        .tile-glow-blue:hover { box-shadow: 0 0 30px rgba(0, 210, 255, 0.2); border-color: rgba(0, 210, 255, 0.4); }
        .tile-glow-gold:hover { box-shadow: 0 0 30px rgba(233, 195, 73, 0.2); border-color: rgba(233, 195, 73, 0.4); }
        .tile-glow-white:hover { box-shadow: 0 0 30px rgba(255, 255, 255, 0.15); border-color: rgba(255, 255, 255, 0.3); }
        
        .pulse-bar {
            animation: pulse-height 1.5s ease-in-out infinite alternate;
        }
        @keyframes pulse-height {
            from { height: 4px; }
            to { height: 24px; }
        }
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 24;
            vertical-align: middle;
        }
    `;

const html = `
<div class="aurora"></div>
<div class="grid-lines"></div>
<div class="scanlines"></div>
<!-- Top Navigation Anchor -->
<header class="fixed top-0 w-full bg-gradient-to-b from-surface-dim/80 to-transparent backdrop-blur-sm h-20 z-50 flex justify-between items-center px-margin-mobile md:px-margin-desktop">
<div class="font-display-lg text-display-lg-mobile md:text-display-lg tracking-tighter text-primary uppercase" data-nav="/home">Nafsam</div>
<div class="flex gap-6 items-center">
<div class="hidden md:flex gap-8">
<button class="font-label-caps text-label-caps text-primary font-bold hover:text-primary transition-colors duration-300">DASHBOARD</button>
<button class="font-label-caps text-label-caps text-on-surface-variant hover:text-primary transition-colors duration-300">ARCHIVE</button>
<button class="font-label-caps text-label-caps text-on-surface-variant hover:text-primary transition-colors duration-300">NODES</button>
</div>
<div class="flex gap-4">
<span class="material-symbols-outlined text-primary cursor-pointer hover:opacity-70 transition-all">language</span>
<span class="material-symbols-outlined text-primary cursor-pointer hover:opacity-70 transition-all">lock</span>
<span class="material-symbols-outlined text-primary cursor-pointer hover:opacity-70 transition-all">settings</span>
</div>
</div>
</header>
<main class="pt-32 pb-40 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
<!-- Stats Strip -->
<div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
<div class="glass-panel p-6 rounded-xl flex items-center gap-4">
<div class="p-3 rounded-full bg-primary/10 border border-primary/20">
<span class="material-symbols-outlined text-primary">calendar_today</span>
</div>
<div>
<div class="font-label-caps text-label-caps text-on-surface-variant uppercase">Days Passed</div>
<div class="font-headline-sm text-headline-sm text-primary">1,402 <span class="text-body-md font-body-md opacity-50">EY</span></div>
</div>
</div>
<div class="glass-panel p-6 rounded-xl flex items-center gap-4">
<div class="p-3 rounded-full bg-secondary/10 border border-secondary/20">
<span class="material-symbols-outlined text-secondary">timer</span>
</div>
<div>
<div class="font-label-caps text-label-caps text-on-surface-variant uppercase">Live Session</div>
<div class="font-headline-sm text-headline-sm text-secondary" id="session-timer">04:12:45</div>
</div>
</div>
<div class="glass-panel p-6 rounded-xl flex items-center gap-4">
<div class="p-3 rounded-full bg-tertiary/10 border border-tertiary/20">
<span class="material-symbols-outlined text-tertiary">folder_special</span>
</div>
<div>
<div class="font-label-caps text-label-caps text-on-surface-variant uppercase">Module Count</div>
<div class="font-headline-sm text-headline-sm text-on-surface">643 Units</div>
</div>
</div>
</div>
<div class="flex flex-col lg:flex-row gap-8">
<!-- Main Content Area: Bento Grid Tiles -->
<div class="flex-grow grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
<!-- Tile 1: Photos -->
<div data-nav="/photos" class="group glass-panel rounded-2xl aspect-square flex flex-col justify-end p-8 tile-glow-blue transition-all duration-500 cursor-pointer relative">
<div class="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity duration-700 bg-cover bg-center" data-alt="A cinematic, high-contrast black and white photograph of a sleek, futuristic glass building reflected in a perfectly still pool of water at midnight. The lighting is ethereal and minimal, with a faint blue neon glow emanating from the structure's interior. The atmosphere is quiet, luxurious, and mysterious, capturing a moment of digital immortality." style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuDrzjcqV0mMuPt4LIceOrqV_FNkaIJKd-vKacHNwPapRQpHkEnaysUbOZGxPslyUuQRcjxAQQNiT_sTTEdLkDWWFCu47D77BrPSFxAqUECWUx1Txqn8oxW0bnm_OSHNC7ly8GNdIYYd60-L0mGPG40Hwj852GaMtJZ7bCEkJa8rl2kmIEARTqFUgcy_aclXUW_SqOKYDtcx3qgZS5y0hKmGybq58A_GUFlkX1hQ6wu_qcnxmEmFbOUOkyBR0uzjozTY1FiiSW6LWk0')"></div>
<div class="relative z-10">
<span class="material-symbols-outlined text-primary text-4xl mb-4">image</span>
<h3 class="font-headline-md text-headline-md text-white mb-2">Photos</h3>
<p class="font-body-md text-body-md text-on-surface-variant">4.2k High-Fidelity Captures</p>
</div>
</div>
<!-- Tile 2: Journey -->
<div data-nav="/journey" class="group glass-panel rounded-2xl aspect-square flex flex-col justify-end p-8 tile-glow-gold transition-all duration-500 cursor-pointer relative md:col-span-2 lg:col-span-1">
<div class="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity duration-700 bg-cover bg-center" data-alt="An abstract visualization of a timeline or journey, depicted as a glowing gold thread weaving through a dark, foggy void filled with floating crystal particles. The light is warm and inviting, suggesting a golden legacy. The style is sophisticated, digital art with a heavy focus on depth and cinematic motion blur." style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuCWYeL58EbsCgmYus-0cjuiM79mv0f_KN051lCP5O2TsNfEy1Ede3CbpRk_sZrQLWdCe3qT_Jur6okEvOO8IhhjrZpPHHbP3mZkdBm8RyBCLHmPLWQROaS9qgWe1yUK2DyNFTktYbL-VoVKOOMLLPthIuh54NkUmMR6guP8hIOv7hUQY4hKmvaJQFklb8icCmNNmKQd_3q8CxSfhoVbg3oXfsRQY69H6RDEnz9EahIRue8X8DhBr1ZQpieJEgw2Lt01k6QhQvPhspo')"></div>
<div class="relative z-10">
<span class="material-symbols-outlined text-secondary text-4xl mb-4">auto_awesome_motion</span>
<h3 class="font-headline-md text-headline-md text-white mb-2">Journey</h3>
<p class="font-body-md text-body-md text-on-surface-variant">The Eternal Narrative</p>
</div>
</div>
<!-- Tile 3: Songs -->
<div data-nav="/songs" class="group glass-panel rounded-2xl aspect-square flex flex-col justify-end p-8 tile-glow-white transition-all duration-500 cursor-pointer relative">
<div class="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity duration-700 bg-cover bg-center" data-alt="A macro shot of a vintage vinyl record player's needle resting on a modern, transparent glass record. Subtle iridescent colors shimmer on the surface under soft, studio lighting. The aesthetic is a blend of retro-nostalgia and futuristic technology, symbolizing preserved acoustic memories in a digital vault." style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuC-5kSFg9vdKx1oqw10svckCOWiYU2UWazr7Es_ddUmpF6gYQY0dodHyRnr4N3T_fpPX_rSbcPAY2fg2ZlQoniFgGpoXsVKw-SvATp4D8pZXWz6peNVS8QRhWGn0YCgKLVcawi8tH3iPBFFUev5y7kMwnT55KhT-0heTzOROSCHia67BlwyL2zePg6zPGLytKS6xbaPDaK2x65umNmnS0bWhvLIF6g9WLUGJsF1WjJZvSfsJbBqtNBzFvjNhUy9qGOSK1zU0gOERGE')"></div>
<div class="relative z-10">
<span class="material-symbols-outlined text-on-surface text-4xl mb-4">music_note</span>
<h3 class="font-headline-md text-headline-md text-white mb-2">Songs</h3>
<p class="font-body-md text-body-md text-on-surface-variant">Sonic Imprints &amp; Echoes</p>
</div>
</div>
<!-- Tile 4: Videos -->
<div data-nav="/videos" class="group glass-panel rounded-2xl aspect-square flex flex-col justify-end p-8 tile-glow-blue transition-all duration-500 cursor-pointer relative">
<div class="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity duration-700 bg-cover bg-center" data-alt="A slow-motion capture of a breaking wave, stylized with a grainy film texture and a deep indigo color palette. The light catches the foam, making it sparkle like digital noise. The feel is cinematic and grand, representing deep-stored video memories in a high-end personal archive." style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuBZ_K23pbei7ksNVdPLbGxlFT3WOr7s-14H0B8kenxs4Xzyvw7O_OoozRn6vggXGpe8rNjQ73bPt59ypTA_jrlC4Iov8TZ_6LPN0VdH1dfj45nL304aFbdBnEqL18FGLXi-UcFjjqJ0oJBOHCnYoLZ3vkoy86nihyEworGqudpHWUSkwwDlGG9a3TXCAjIIVS-9LRh94ActNC7CSIq96FVR67rvFfVmPz6XfT-aUh0FD0p5JT50_8zMuD0QG_G6bL2VGjgS-mg_kTI')"></div>
<div class="relative z-10">
<span class="material-symbols-outlined text-primary text-4xl mb-4">movie</span>
<h3 class="font-headline-md text-headline-md text-white mb-2">Videos</h3>
<p class="font-body-md text-body-md text-on-surface-variant">Living Motion Archives</p>
</div>
</div>
<!-- Tile 5: Writings -->
<div data-nav="/writings" class="group glass-panel rounded-2xl aspect-square flex flex-col justify-end p-8 tile-glow-white transition-all duration-500 cursor-pointer relative">
<div class="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity duration-700 bg-cover bg-center" data-alt="A minimalist desk setup with a glowing holographic notepad displaying elegant, cursive light-text against a dark background. A single ray of light illuminates a futuristic stylus. The scene is calm, intellectual, and focused, emphasizing the importance of written legacy in a digital age." style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuA1UJXTRVr7RQC7mdVzE7hrrEuVZesoabvWzNX52yRvaPk9Uw2niSsmg8o_dqxuyqY3AV2fTQu-TkLW2QmUHQ5kTvaOVtFL9Nk0HSkMFot8Qbol_FZsIxuvWDZhw3m7HoE4_3NdHuiBqenhnZtuhLKx_9a_llh9Kxp6_f2wSUIh7oFrMcLTbo7WhHQJSew-d6FYiSOo_pfx8VfDDPcVbFyz5bJPiaV8kAYtKR6xLWLSiCdhlHTsVGBPrMifSiQBQe9DVVRDq2ragU8')"></div>
<div class="relative z-10">
<span class="material-symbols-outlined text-on-surface text-4xl mb-4">edit_note</span>
<h3 class="font-headline-md text-headline-md text-white mb-2">Writings</h3>
<p class="font-body-md text-body-md text-on-surface-variant">Coded Journals &amp; Logs</p>
</div>
</div>
<!-- Tile 6: Feelings -->
<div data-nav="/journey" class="group glass-panel rounded-2xl aspect-square flex flex-col justify-end p-8 tile-glow-gold transition-all duration-500 cursor-pointer relative">
<div class="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity duration-700 bg-cover bg-center" data-alt="An ethereal, abstract representation of human emotion using swirling patterns of warm amber and cool teal light. The patterns resemble a nebula in deep space, soft and organic. It represents the biometric tracking of sentiment and feelings in a luxury digital interface." style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuBLZdbymzEcIy5gDlb3k2TsvYT9vDk9H2aSbeBecL4BUW1MxHhgsyJfZXPMVNYAh_1U05qUyQ_QJJPSvMKwp1sEhUBXt-PaGP_KF-W8-oLSvjzeB6Dvif6yBXmrtav3pA_3-7qInQPHOvyxL9aozjBcXxiCoY4EKiBIgQf-F-oA6mvwYTBTh8xPr85exE8_DyDCG_U3ZLE58nmfvumfjFJj6xVbfOwrSuhs4yY9X3dc84bDPR_-id6vF_NT9bXOk6eEq_6wKXSqqWs')"></div>
<div class="relative z-10">
<span class="material-symbols-outlined text-secondary text-4xl mb-4">favorite</span>
<h3 class="font-headline-md text-headline-md text-white mb-2">Feelings</h3>
<p class="font-body-md text-body-md text-on-surface-variant">Biometric Sentiment Data</p>
</div>
</div>
</div>
<!-- Sidebar -->
<aside class="w-full lg:w-80 flex flex-col gap-6">
<!-- Chat Card -->
<div class="glass-panel p-6 rounded-2xl border-primary/20 bg-primary/5">
<div class="flex justify-between items-start mb-4">
<div class="flex gap-3">
<div class="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30">
<span class="material-symbols-outlined text-primary">group</span>
</div>
<div>
<h4 class="font-body-md font-bold text-primary">Star &amp; Ilham</h4>
<p class="text-xs text-on-surface-variant">Active Connection</p>
</div>
</div>
<span class="bg-primary text-on-primary text-[10px] px-2 py-1 rounded-full font-bold">3 NEW</span>
</div>
<p class="font-body-md text-sm text-on-surface-variant italic line-clamp-2">"The decryption of the 1994 archives is nearly complete..."</p>
</div>
<!-- Activity Pulse -->
<div class="glass-panel p-6 rounded-2xl">
<h4 class="font-label-caps text-label-caps uppercase text-on-surface-variant mb-4">Network Pulse</h4>
<div class="flex items-end gap-1 h-12">
<div class="pulse-bar bg-primary/40 w-full rounded-full" style="animation-delay: 0.1s"></div>
<div class="pulse-bar bg-primary/60 w-full rounded-full" style="animation-delay: 0.4s"></div>
<div class="pulse-bar bg-primary/30 w-full rounded-full" style="animation-delay: 0.2s"></div>
<div class="pulse-bar bg-primary w-full rounded-full" style="animation-delay: 0.6s"></div>
<div class="pulse-bar bg-primary/50 w-full rounded-full" style="animation-delay: 0.3s"></div>
<div class="pulse-bar bg-primary/80 w-full rounded-full" style="animation-delay: 0.5s"></div>
<div class="pulse-bar bg-primary/40 w-full rounded-full" style="animation-delay: 0.7s"></div>
<div class="pulse-bar bg-primary/60 w-full rounded-full" style="animation-delay: 0.2s"></div>
</div>
<div class="mt-4 flex justify-between items-center text-[10px] text-on-surface-variant font-mono-ui">
<span>LATENCY: 12ms</span>
<span>UPLOADING: 84%</span>
</div>
</div>
<!-- Quick Jump Chips -->
<div class="flex flex-wrap gap-2">
<span class="font-label-caps text-[10px] border border-on-surface-variant/20 px-3 py-1.5 rounded-full hover:bg-primary/10 hover:border-primary/40 cursor-pointer transition-all">RECENT_MEMS</span>
<span class="font-label-caps text-[10px] border border-on-surface-variant/20 px-3 py-1.5 rounded-full hover:bg-primary/10 hover:border-primary/40 cursor-pointer transition-all">ENCRYPTION_LOGS</span>
<span class="font-label-caps text-[10px] border border-on-surface-variant/20 px-3 py-1.5 rounded-full hover:bg-primary/10 hover:border-primary/40 cursor-pointer transition-all">FAVORITES</span>
<span class="font-label-caps text-[10px] border border-on-surface-variant/20 px-3 py-1.5 rounded-full hover:bg-primary/10 hover:border-primary/40 cursor-pointer transition-all">GLOBAL_SEARCH</span>
</div>
</aside>
</div>
</main>
<!-- Bottom Nav Bar -->
<nav class="fixed bottom-8 left-1/2 -translate-x-1/2 w-[95%] max-w-5xl z-50 flex justify-around items-center py-3 px-6 bg-surface-container-low/10 backdrop-blur-[30px] border border-primary/20 rounded-full shadow-[0_0_40px_rgba(0,210,255,0.15)] relative after:content-[''] after:absolute after:inset-0 after:bg-[url('scanlines.png')] after:opacity-5 after:pointer-events-none">
<button class="flex flex-col items-center justify-center bg-primary/10 text-primary border border-primary/30 rounded-full px-4 py-2 scale-110 active:scale-95 transition-all duration-200">
<span class="material-symbols-outlined">home</span>
<span class="font-label-caps text-[8px] uppercase mt-1">Home</span>
</button>
<button class="flex flex-col items-center justify-center text-on-surface-variant/60 hover:text-on-surface transition-all duration-500 active:scale-95">
<span class="material-symbols-outlined">image</span>
<span class="font-label-caps text-[8px] uppercase mt-1">Photos</span>
</button>
<button class="flex flex-col items-center justify-center text-on-surface-variant/60 hover:text-on-surface transition-all duration-500 active:scale-95">
<span class="material-symbols-outlined">music_note</span>
<span class="font-label-caps text-[8px] uppercase mt-1">Songs</span>
</button>
<button class="flex flex-col items-center justify-center text-on-surface-variant/60 hover:text-on-surface transition-all duration-500 active:scale-95">
<span class="material-symbols-outlined">movie</span>
<span class="font-label-caps text-[8px] uppercase mt-1">Videos</span>
</button>
<button class="flex flex-col items-center justify-center text-on-surface-variant/60 hover:text-on-surface transition-all duration-500 active:scale-95">
<span class="material-symbols-outlined">edit_note</span>
<span class="font-label-caps text-[8px] uppercase mt-1">Writings</span>
</button>
<button class="flex flex-col items-center justify-center text-on-surface-variant/60 hover:text-on-surface transition-all duration-500 active:scale-95">
<span class="material-symbols-outlined">favorite</span>
<span class="font-label-caps text-[8px] uppercase mt-1">Feelings</span>
</button>
<button class="flex flex-col items-center justify-center text-on-surface-variant/60 hover:text-on-surface transition-all duration-500 active:scale-95">
<span class="material-symbols-outlined">auto_awesome_motion</span>
<span class="font-label-caps text-[8px] uppercase mt-1">Journey</span>
</button>
<button class="flex flex-col items-center justify-center text-on-surface-variant/60 hover:text-on-surface transition-all duration-500 active:scale-95">
<span class="material-symbols-outlined">chat_bubble</span>
<span class="font-label-caps text-[8px] uppercase mt-1">Chat</span>
</button>
</nav>

`;

const script = `
        // Micro-interaction for the live session timer
        const timerElement = document.getElementById('session-timer');
        let seconds = 15165; // Matches 04:12:45
        
        setInterval(() => {
            seconds++;
            const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
            const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
            const s = (seconds % 60).toString().padStart(2, '0');
            timerElement.textContent = \`\${h}:\${m}:\${s}\`;
        }, 1000);

        // Tile hover effect: mouse tracking for light source
        document.querySelectorAll('.glass-panel').forEach(panel => {
            panel.addEventListener('mousemove', e => {
                const rect = panel.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                panel.style.setProperty('--mouse-x', \`\${x}px\`);
                panel.style.setProperty('--mouse-y', \`\${y}px\`);
            });
        });
    `;

export const Route = createFileRoute("/home")({
  head: () => ({
    meta: [
      { title: "Nafsam | Home Dashboard" },
      { name: "description", content: "Your living archive: photos, songs, videos, writings and the eternal journey." },
      { property: "og:title", content: "Nafsam | Home Dashboard" },
      { property: "og:description", content: "Your living archive: photos, songs, videos, writings and the eternal journey." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <LegacyPage
      css={css}
      html={html}
      script={script}
      bodyClassName="bg-background"
      dir="ltr"
      lang="en"
    />
  );
}
