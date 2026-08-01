import { createFileRoute } from "@tanstack/react-router";
import { LegacyPage } from "@/components/LegacyPage";

const css = `
        body {
            background-color: #050505;
            color: #e5e2e1;
            overflow-x: hidden;
        }

        /* Film Grain & Aurora Overlays */
        .film-grain {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            pointer-events: none;
            z-index: 0;
            opacity: 0.02;
            background-image: url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E');
            mix-blend-mode: overlay;
        }

        .aurora-bg {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            pointer-events: none;
            z-index: 1;
            background: radial-gradient(circle at 20% 30%, rgba(0, 210, 255, 0.05) 0%, transparent 40%),
                        radial-gradient(circle at 80% 70%, rgba(233, 195, 73, 0.05) 0%, transparent 40%);
            filter: blur(60px);
            animation: pulseAurora 20s infinite alternate ease-in-out;
        }

        @keyframes pulseAurora {
            0% { transform: scale(1); opacity: 0.8; }
            100% { transform: scale(1.1); opacity: 1; }
        }

        /* Holographic Scanlines */
        .scanlines {
            background: linear-gradient(
                to bottom,
                rgba(255,255,255,0),
                rgba(255,255,255,0) 50%,
                rgba(0,0,0,0.1) 50%,
                rgba(0,0,0,0.1)
            );
            background-size: 100% 4px;
        }

        /* Glassmorphism Panels */
        .glass-panel {
            background: rgba(255, 255, 255, 0.03);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.05);
            box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
        }

        .glass-panel:hover {
            background: rgba(255, 255, 255, 0.08);
            border-color: rgba(165, 231, 255, 0.3); /* Primary Blue */
        }

        .video-card-overlay {
            background: linear-gradient(to top, rgba(5,5,5,0.9) 0%, transparent 100%);
        }
        
        .timeline-line {
            background-image: linear-gradient(to bottom, rgba(165, 231, 255, 0.1) 50%, transparent 50%);
            background-size: 1px 12px;
        }
    `;

const html = `
<!-- Ambient Backgrounds -->
<div class="film-grain"></div>
<div class="aurora-bg"></div>
<!-- TopAppBar (Hidden on Mobile, Visible on Web) -->
<header class="hidden md:flex fixed top-0 w-full flex justify-between items-center px-margin-desktop h-20 z-50 bg-gradient-to-b from-surface-dim/80 to-transparent backdrop-blur-sm flat no shadows">
<div class="font-display-lg text-display-lg tracking-tighter text-primary uppercase">
            Nafsam
        </div>
<nav class="flex space-x-8 items-center">
<a class="text-on-surface-variant font-mono-ui text-mono-ui hover:text-primary transition-colors duration-300" href="#">Home</a>
<a class="text-on-surface-variant font-mono-ui text-mono-ui hover:text-primary transition-colors duration-300" href="#">Photos</a>
<a class="text-on-surface-variant font-mono-ui text-mono-ui hover:text-primary transition-colors duration-300" href="#">Songs</a>
<a class="text-primary font-bold font-mono-ui text-mono-ui hover:text-primary transition-colors duration-300 border-b border-primary pb-1" href="#">Videos</a>
<a class="text-on-surface-variant font-mono-ui text-mono-ui hover:text-primary transition-colors duration-300" href="#">Writings</a>
<a class="text-on-surface-variant font-mono-ui text-mono-ui hover:text-primary transition-colors duration-300" href="#">Feelings</a>
<a class="text-on-surface-variant font-mono-ui text-mono-ui hover:text-primary transition-colors duration-300" href="#">Journey</a>
<a class="text-on-surface-variant font-mono-ui text-mono-ui hover:text-primary transition-colors duration-300" href="#">Chat</a>
</nav>
<div class="flex space-x-4 items-center">
<button class="text-on-surface-variant hover:text-primary transition-colors duration-300">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 0;">language</span>
</button>
<button class="text-on-surface-variant hover:text-primary transition-colors duration-300">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 0;">lock</span>
</button>
<button class="text-on-surface-variant hover:text-primary transition-colors duration-300">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 0;">settings</span>
</button>
</div>
</header>
<!-- Top Mobile Header -->
<header class="md:hidden fixed top-0 w-full flex justify-between items-center px-margin-mobile h-20 z-50 bg-gradient-to-b from-surface-dim/90 to-transparent backdrop-blur-md">
<div class="font-display-lg-mobile text-display-lg-mobile tracking-tighter text-primary uppercase">
            Nafsam
        </div>
<button class="text-primary">
<span class="material-symbols-outlined">menu</span>
</button>
</header>
<!-- Main Content Canvas -->
<main class="relative z-10 pt-28 md:pt-32 pb-40 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto min-h-screen">
<!-- Section Header & Controls -->
<div class="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6 relative">
<div>
<h1 class="font-headline-md text-headline-md text-primary mb-2">Cinematic Archives</h1>
<p class="font-body-md text-body-md text-on-surface-variant max-w-lg">
                    Chronicles of light and motion. A curated temporal gallery of visual memories spanning the archive.
                </p>
</div>
<div class="flex items-center space-x-4 glass-panel rounded-full px-6 py-3">
<span class="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest">Theater Mode</span>
<label class="relative inline-flex items-center cursor-pointer">
<input class="sr-only peer" id="theaterModeToggle" type="checkbox" value=""/>
<div class="w-11 h-6 bg-surface-container-high rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-primary after:border-primary after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-container/20 border border-primary/20"></div>
</label>
</div>
</div>
<!-- Video Grid Layout -->
<div class="grid grid-cols-1 md:grid-cols-12 gap-gutter relative">
<!-- Vertical Timeline Axis (Desktop Only) -->
<div class="hidden md:block col-span-1 relative flex justify-center">
<div class="absolute top-0 bottom-0 w-px timeline-line"></div>
<div class="sticky top-40 h-16 flex flex-col items-center">
<div class="w-3 h-3 rounded-full bg-primary shadow-[0_0_10px_rgba(165,231,255,0.8)] z-10"></div>
<span class="font-mono-ui text-mono-ui text-primary mt-4 -rotate-90 origin-top-left absolute left-6 top-10 whitespace-nowrap">PRESENT</span>
</div>
</div>
<!-- Video Cards Container -->
<div class="col-span-1 md:col-span-11 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="videoGrid">
<!-- Video Card 1: Featured (Spans 2 cols on Desktop) -->
<article class="glass-panel rounded-xl overflow-hidden group relative aspect-video cursor-pointer md:col-span-2 lg:col-span-2 row-span-2 shadow-2xl transition-all duration-500 hover:scale-[1.02]">
<img class="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-luminosity group-hover:mix-blend-normal transition-all duration-700" data-alt="A highly cinematic wide shot of a futuristic neon-lit city street at night, reflecting in puddles, shot on 35mm film. High contrast, cinematic lighting, moody atmosphere, deep blues and vibrant pinks, sleek futuristic aesthetic." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAXShqs70GuWxx2npsX4sbbBRlfqlnHxm6_rGWD4pgMekXAXh6JwVUaj_ovvWBPX7J6vs1vZK4Yp_pzyCp7hAjIhNNd41urzuy20q0t4GuvugN11y5SO3UOgyzZ9iMWKUfLv_f021NHcsLJbsNRx9YmnfKqldUorzovEPV_EouBOjEiV3OrjwZknwiHShh5Flpl-mAvFFAYDxg7kryYkuoqvd4qwMpzc-yJKbi8NI60VKq38jguKq9GH8z3E4yrumA04c3fb83etrY"/>
<div class="absolute inset-0 video-card-overlay opacity-90 group-hover:opacity-70 transition-opacity duration-500"></div>
<div class="absolute inset-0 scanlines opacity-10 pointer-events-none"></div>
<div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-90 group-hover:scale-100">
<div class="w-16 h-16 rounded-full border border-primary bg-primary/10 backdrop-blur-md flex items-center justify-center">
<span class="material-symbols-outlined text-primary text-3xl ml-1" style="font-variation-settings: 'FILL' 1;">play_arrow</span>
</div>
</div>
<div class="absolute bottom-0 left-0 w-full p-6 flex justify-between items-end">
<div>
<div class="flex gap-2 mb-2">
<span class="font-label-caps text-label-caps bg-surface-container-low/50 border border-primary/20 backdrop-blur-sm text-primary px-2 py-1 rounded">2084.11.04</span>
<span class="font-label-caps text-label-caps bg-surface-container-low/50 border border-outline/20 backdrop-blur-sm text-tertiary-container px-2 py-1 rounded">ISTANBUL</span>
</div>
<h2 class="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary transition-colors">Echoes of the Bosphorus</h2>
<p class="font-body-md text-body-md text-on-surface-variant/70 mt-1 line-clamp-1">Boğaziçi'nin yankıları karanlıkta parlıyor.</p>
</div>
<div class="font-mono-ui text-mono-ui text-primary/80">14:23</div>
</div>
</article>
<!-- Video Card 2 -->
<article class="glass-panel rounded-xl overflow-hidden group relative aspect-video cursor-pointer transition-all duration-500 hover:scale-[1.02]">
<img class="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-700" data-alt="A serene, minimalist digital installation of glowing geometric rings floating in a vast, dark, museum-like space. Volumetric lighting cutting through subtle mist. Monochromatic color palette with subtle gold accents, invoking luxury and legacy." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBK8g6k3SB_anwMci_T0FzcSp8pITFmYGvaqo-XYD8Tw3b8qZRKCZt3FytZRNzld926tWeiPHAjMFvd2dOUAblfZJF7AIyhJ4TjadBTVNIk_6S2S73PZodm-7CdncEIkUhn0m00SnNClSaFTVLefZhuCunGMhLJzK7EvntmquHSs5rkWX0QNZxCDlC2Xtg5XK10-28U_xQFF_XgHk2LVf813SmFMVt7TPgSWsq39yEL3DkYlG8cOHFG7iF3LO99jxLmaP0GNRKZkPY"/>
<div class="absolute inset-0 video-card-overlay opacity-90 group-hover:opacity-60 transition-opacity duration-500"></div>
<div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
<div class="w-12 h-12 rounded-full border border-primary bg-primary/10 backdrop-blur-md flex items-center justify-center">
<span class="material-symbols-outlined text-primary" style="font-variation-settings: 'FILL' 1;">play_arrow</span>
</div>
</div>
<div class="absolute bottom-0 left-0 w-full p-4">
<div class="flex justify-between items-end">
<div>
<h3 class="font-headline-sm text-[20px] text-on-surface group-hover:text-primary transition-colors leading-tight">Vault Sequence Alpha</h3>
<div class="font-label-caps text-label-caps text-on-surface-variant mt-2 tracking-widest">TOKYO</div>
</div>
<div class="font-mono-ui text-mono-ui text-tertiary-container">03:45</div>
</div>
</div>
</article>
<!-- Video Card 3 -->
<article class="glass-panel rounded-xl overflow-hidden group relative aspect-video cursor-pointer transition-all duration-500 hover:scale-[1.02]">
<img class="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-700" data-alt="Abstract macro photography of ferrofluid reacting to a magnet, looking like dark, glossy alien architecture. Deep blacks, metallic silvers, and a single, intense beam of pure white light. High tech, sophisticated, mysterious." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDiH7SQq7mERRw12MOS2HiV_7iSu0cT_NTJHn-c71y4JlwvZcIPo6pdYz3SYdYYw1WlC6YKfN7WUoA7LXjZIxWfXVXGZ-VLwqg_VfWvBuY2OfTJWOqn3vplXVf56VNWP3qFIyfY4Z2tzAR4q2gfaGBkArnWyUupSdoYhu6BuN_bhkPivaoen2XL1mtX4S8otJwIjuQqqJInX7L1dfgcr80XjVI_q8Il8LOSXaL6pre1O-KGZm1L7Eqb5ADJrhpgLzOZ-uen6_AwCNY"/>
<div class="absolute inset-0 video-card-overlay opacity-90 group-hover:opacity-60 transition-opacity duration-500"></div>
<div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
<div class="w-12 h-12 rounded-full border border-primary bg-primary/10 backdrop-blur-md flex items-center justify-center">
<span class="material-symbols-outlined text-primary" style="font-variation-settings: 'FILL' 1;">play_arrow</span>
</div>
</div>
<div class="absolute bottom-0 left-0 w-full p-4">
<div class="flex justify-between items-end">
<div>
<h3 class="font-headline-sm text-[20px] text-on-surface group-hover:text-primary transition-colors leading-tight">Magnetic Flux</h3>
<div class="font-label-caps text-label-caps text-on-surface-variant mt-2 tracking-widest">LONDON</div>
</div>
<div class="font-mono-ui text-mono-ui text-tertiary-container">01:12</div>
</div>
</div>
</article>
<!-- Video Card 4 -->
<article class="glass-panel rounded-xl overflow-hidden group relative aspect-video cursor-pointer transition-all duration-500 hover:scale-[1.02]">
<img class="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-700" data-alt="A lone figure standing before a massive, ancient desert structure bathed in the ethereal glow of a binary sunset. Warm amber and deep purple sky. Cinematic wide angle, epic scale, evoking a sense of ancient memory and timelessness." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAerMjlbzjw5vFs5kqTE-_HPYDHJm3ypArgsCgHDru4HQ8AcLKfhBV7McPidGiaBz8THGwmUT_WysM8Czopmcn6u0d-Cw2i9BnNI0gQ1LKRfJMeCSw0eCwQbkvT077ddgcQOITyTW0bMfXsnB0n2_vS_9YXdyJ4PEz-YmNWoMhinkHeRVjqgm2KMUT6iPL7VUdc8qS1AgjaJson6WABv_P607rsxa4oz87YZpxeIdN5DwLRyov0CRy9-p9pEGdJ98zC1P44ALS3lmM"/>
<div class="absolute inset-0 video-card-overlay opacity-90 group-hover:opacity-60 transition-opacity duration-500"></div>
<div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
<div class="w-12 h-12 rounded-full border border-primary bg-primary/10 backdrop-blur-md flex items-center justify-center">
<span class="material-symbols-outlined text-primary" style="font-variation-settings: 'FILL' 1;">play_arrow</span>
</div>
</div>
<div class="absolute bottom-0 left-0 w-full p-4">
<div class="flex justify-between items-end">
<div>
<h3 class="font-headline-sm text-[20px] text-on-surface group-hover:text-primary transition-colors leading-tight">Desert Chronicles</h3>
<div class="font-label-caps text-label-caps text-on-surface-variant mt-2 tracking-widest">CAIRO</div>
</div>
<div class="font-mono-ui text-mono-ui text-tertiary-container">45:00</div>
</div>
</div>
</article>
</div>
</div>
</main>
<!-- BottomNavBar (Hidden on Desktop, Visible on Mobile) -->
<nav class="md:hidden docked fixed bottom-8 left-1/2 -translate-x-1/2 rounded-full w-[90%] max-w-4xl bg-surface-container-low/10 backdrop-blur-[30px] border border-primary/20 bg-clip-padding relative after:content-[''] after:absolute after:inset-0 after:bg-[url('scanlines.png')] after:opacity-5 after:pointer-events-none shadow-[0_0_40px_rgba(0,210,255,0.15)] flex justify-around items-center py-3 px-6 z-50">
<a class="flex flex-col items-center justify-center text-on-surface-variant/60 hover:text-on-surface transition-all duration-500 hover:bg-white/5" href="#">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 0;">home</span>
<span class="font-label-caps text-label-caps uppercase mt-1 text-[10px]">Home</span>
</a>
<a class="flex flex-col items-center justify-center text-on-surface-variant/60 hover:text-on-surface transition-all duration-500 hover:bg-white/5" href="#">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 0;">image</span>
<span class="font-label-caps text-label-caps uppercase mt-1 text-[10px]">Photos</span>
</a>
<a class="flex flex-col items-center justify-center text-on-surface-variant/60 hover:text-on-surface transition-all duration-500 hover:bg-white/5" href="#">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 0;">music_note</span>
<span class="font-label-caps text-label-caps uppercase mt-1 text-[10px]">Songs</span>
</a>
<!-- Active Tab: Videos -->
<a class="flex flex-col items-center justify-center bg-primary/10 text-primary border border-primary/30 rounded-full px-4 py-2 scale-110 opacity-70 transition-all hover:bg-white/5 Active: scale-95 transition-transform duration-200" href="#">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">movie</span>
<span class="font-label-caps text-label-caps uppercase mt-1 text-[10px]">Videos</span>
</a>
<a class="flex flex-col items-center justify-center text-on-surface-variant/60 hover:text-on-surface transition-all duration-500 hover:bg-white/5 hidden sm:flex" href="#">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 0;">edit_note</span>
<span class="font-label-caps text-label-caps uppercase mt-1 text-[10px]">Writings</span>
</a>
<a class="flex flex-col items-center justify-center text-on-surface-variant/60 hover:text-on-surface transition-all duration-500 hover:bg-white/5 hidden sm:flex" href="#">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 0;">favorite</span>
<span class="font-label-caps text-label-caps uppercase mt-1 text-[10px]">Feelings</span>
</a>
</nav>

`;

const script = `
        // Simple Theater Mode Toggle Script
        const theaterToggle = document.getElementById('theaterModeToggle');
        const mainContent = document.querySelector('main');
        const cards = document.querySelectorAll('.glass-panel');

        theaterToggle.addEventListener('change', (e) => {
            if (e.target.checked) {
                document.body.style.backgroundColor = '#000000';
                document.querySelector('.aurora-bg').style.opacity = '0.1';
            } else {
                document.body.style.backgroundColor = '#050505';
                document.querySelector('.aurora-bg').style.opacity = '1';
            }
        });
    `;

export const Route = createFileRoute("/videos")({
  head: () => ({
    meta: [
      { title: "Nafsam | Videos" },
      { name: "description", content: "Living motion archives preserved in cinematic fidelity." },
      { property: "og:title", content: "Nafsam | Videos" },
      { property: "og:description", content: "Living motion archives preserved in cinematic fidelity." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: VideosPage,
});

function VideosPage() {
  return (
    <LegacyPage
      css={css}
      html={html}
      script={script}
      bodyClassName="font-body-md text-body-md antialiased selection:bg-primary selection:text-on-primary"
      dir="ltr"
      lang="en"
    />
  );
}
