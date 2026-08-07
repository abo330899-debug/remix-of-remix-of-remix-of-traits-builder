import { createFileRoute } from "@tanstack/react-router";
import { LegacyPage } from "@/components/LegacyPage";

const css = `
        body {
            background-color: #050505;
            color: #e5e2e1;
            overflow-x: hidden;
        }

        .glass-panel {
            background: rgba(255, 255, 255, 0.03);
            backdrop-filter: blur(40px);
            -webkit-backdrop-filter: blur(40px);
            border: 1px solid rgba(165, 231, 255, 0.1);
        }

        .timeline-line {
            background: linear-gradient(to bottom, transparent, #a5e7ff 15%, #a5e7ff 85%, transparent);
            box-shadow: 0 0 15px rgba(165, 231, 255, 0.3);
        }

        .scanlines::after {
            content: "";
            position: absolute;
            inset: 0;
            background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.1) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.02), rgba(0, 255, 0, 0.01), rgba(0, 0, 255, 0.02));
            background-size: 100% 4px, 3px 100%;
            pointer-events: none;
            z-index: 10;
        }

        .parallax-target {
            transition: transform 0.1s ease-out;
        }

        .noise-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            opacity: 0.03;
            z-index: 9999;
            background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
        }

        @keyframes pulse-glow {
            0%, 100% { opacity: 0.5; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.2); }
        }

        .timeline-node {
            animation: pulse-glow 3s infinite ease-in-out;
        }
    `;

const html = `
<div class="noise-overlay"></div>
<!-- Background Shader -->

<!-- Top Navigation Shell -->
<nav class="fixed top-0 w-full z-50 flex justify-between items-center px-margin-mobile md:px-margin-desktop h-20 w-full bg-gradient-to-b from-surface-dim/80 to-transparent backdrop-blur-sm">
<div class="font-display-lg-mobile text-display-lg-mobile tracking-tighter text-primary uppercase" data-nav="/home">Nafsam</div>
<div class="hidden md:flex items-center gap-8">
<a class="text-on-surface-variant hover:text-primary transition-colors duration-300 font-mono-ui uppercase text-[11px] tracking-[0.2em]" href="#">Archive</a>
<a class="text-on-surface-variant hover:text-primary transition-colors duration-300 font-mono-ui uppercase text-[11px] tracking-[0.2em]" href="#">Legacy</a>
<a class="text-primary font-bold font-mono-ui uppercase text-[11px] tracking-[0.2em]" href="#">Journey</a>
<a class="text-on-surface-variant hover:text-primary transition-colors duration-300 font-mono-ui uppercase text-[11px] tracking-[0.2em]" href="#">Vault</a>
</div>
<div class="flex items-center gap-4 text-primary">
<span class="material-symbols-outlined cursor-pointer hover:opacity-70 transition-all">language</span>
<span class="material-symbols-outlined cursor-pointer hover:opacity-70 transition-all">lock</span>
<span class="material-symbols-outlined cursor-pointer hover:opacity-70 transition-all">settings</span>
</div>
</nav>
<!-- Hero Content -->
<header class="relative pt-40 pb-20 px-margin-mobile md:px-margin-desktop text-center">
<div class="max-w-3xl mx-auto space-y-6">
<span class="font-mono-ui text-label-caps uppercase text-primary tracking-[0.3em] block mb-4">Sequence III : Temporal Stream</span>
<h1 class="font-display-lg text-display-lg text-primary leading-none">The Immortal Journey</h1>
<p class="font-body-lg text-body-lg text-on-surface-variant leading-relaxed max-w-xl mx-auto">
                A chronological distillation of moments preserved in the obsidian vault. Every interaction, every sensation, every echo of a life once lived, suspended forever in crystalline perfection.
            </p>
</div>
</header>
<!-- Journey Timeline Content -->
<main class="relative min-h-screen pb-40">
<!-- Central Timeline Axis -->
<div class="absolute left-1/2 top-0 bottom-0 w-px timeline-line -translate-x-1/2 z-0 hidden md:block"></div>
<div class="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop space-y-24 md:space-y-48 relative">
<!-- Entry 1: Left Aligned -->
<div class="relative grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
<div class="md:pr-16 text-right order-2 md:order-1">
<div class="inline-block px-4 py-1 glass-panel rounded-full font-mono-ui text-[10px] text-primary uppercase tracking-[0.2em] mb-4">October 14, 2024</div>
<h2 class="font-headline-md text-headline-md text-on-surface mb-4 italic">The Genesis of Stillness</h2>
<p class="text-on-surface-variant font-body-md leading-relaxed mb-8">
                        The first archive was formed in the quiet of a coastal morning. A deliberate choice to freeze the ephemeral spray of the Atlantic against the grey cliffs of Vík.
                    </p>
<button class="font-mono-ui text-label-caps uppercase border border-primary/30 px-6 py-2 rounded-full hover:bg-primary/10 transition-all active:scale-95 text-primary">View Metadata</button>
</div>
<div class="relative order-1 md:order-2 group">
<div class="absolute -left-6 top-1/2 -translate-y-1/2 w-4 h-4 bg-primary rounded-full timeline-node z-10 hidden md:block"></div>
<div class="aspect-[4/3] glass-panel p-2 overflow-hidden rounded-xl parallax-target shadow-2xl" data-speed="0.05">
<div class="w-full h-full bg-cover bg-center rounded-lg grayscale group-hover:grayscale-0 transition-all duration-1000" data-alt="A cinematic, high-contrast black and white photograph of dramatic basalt cliffs in Vík, Iceland. Moody atmospheric fog rolls over the dark grey Atlantic ocean waves crashing against the shore. The lighting is ethereal and soft, evoking a sense of deep solitude and technological preservation." style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuCR0gtmcQFX343q_hIWQ6asimtL5hDgEd766KW3SJ-fjabyTGGKLOpwT6Dl3Y-Ff4K1DubHxnlFy6Gfx5UmtxWUdEGnNNCVDXKMJ3BzSjxH_1Ccg-VAbLsZjXLQk0tGUR7bA3JKb0i4kQjTfBdzzOQHPD2jM5SF_JFNzvcFybs0xJZjdDGVliOISfeHwK0SmZlHHrgx-5Bjf3j6IcLoO1Qb1nlPN11GNQ4agp5LPwlawB71VRREXKchukvbnzW4678fwFebB7W00nI')"></div>
</div>
</div>
</div>
<!-- Entry 2: Right Aligned -->
<div class="relative grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
<div class="relative order-1 group">
<div class="absolute -right-6 top-1/2 -translate-y-1/2 w-4 h-4 bg-primary rounded-full timeline-node z-10 hidden md:block"></div>
<div class="aspect-[4/3] glass-panel p-2 overflow-hidden rounded-xl parallax-target shadow-2xl" data-speed="-0.05">
<div class="w-full h-full bg-cover bg-center rounded-lg grayscale group-hover:grayscale-0 transition-all duration-1000" data-alt="A macro close-up of a futuristic glowing memory chip embedded in a translucent crystalline structure. Blue and gold light fibers weave through the glass-like interior. The background is an infinite obsidian void, giving the impression of a digital relic suspended in deep space." style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuCDPTZ32gYZZBu_-JJWOJodtpPmD92fTAMye8K5esHL6emXJgt_2-LI3W-ZIdO87PPzLDif2SQ2MeVp10igqItBd33LfQnxJPzzmsqf8f_GiDvMmIVB6xYj-3S-5QTjjD0yCenJLpU5v4u-bH-b_2GWJvNtjY7dIUnim9-irogE9RdGFwe8fr2RGqQa8KCBRwdwaEc6Z2hJ7MNLEDJBBvz0KTYNS8n7c1Lcrql_OjEJ3dkjj6_udb_4CO7ES7gpNQLqwain8aDNSMs')"></div>
</div>
</div>
<div class="md:pl-16 order-2">
<div class="inline-block px-4 py-1 glass-panel rounded-full font-mono-ui text-[10px] text-primary uppercase tracking-[0.2em] mb-4">December 02, 2024</div>
<h2 class="font-headline-md text-headline-md text-on-surface mb-4 italic">The Encryption of Thought</h2>
<p class="text-on-surface-variant font-body-md leading-relaxed mb-8">
                        Vocalis III encryption protocols were finalized today. The neural patterns of the primary archivist were successfully mapped to the holographic matrix, ensuring total fidelity of emotional resonance.
                    </p>
<button class="font-mono-ui text-label-caps uppercase border border-primary/30 px-6 py-2 rounded-full hover:bg-primary/10 transition-all active:scale-95 text-primary">Access Vault</button>
</div>
</div>
<!-- Entry 3: Left Aligned -->
<div class="relative grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
<div class="md:pr-16 text-right order-2 md:order-1">
<div class="inline-block px-4 py-1 glass-panel rounded-full font-mono-ui text-[10px] text-primary uppercase tracking-[0.2em] mb-4">January 19, 2025</div>
<h2 class="font-headline-md text-headline-md text-on-surface mb-4 italic">Ethereal Convergence</h2>
<p class="text-on-surface-variant font-body-md leading-relaxed mb-8">
                        The integration of the multi-layered aurora gradients. A visual symphony designed to mimic the shifting nature of memories—never static, always breathing, forever evolving within the archival space.
                    </p>
<button class="font-mono-ui text-label-caps uppercase border border-primary/30 px-6 py-2 rounded-full hover:bg-primary/10 transition-all active:scale-95 text-primary">Analyze Waveforms</button>
</div>
<div class="relative order-1 md:order-2 group">
<div class="absolute -left-6 top-1/2 -translate-y-1/2 w-4 h-4 bg-primary rounded-full timeline-node z-10 hidden md:block"></div>
<div class="aspect-[4/3] glass-panel p-2 overflow-hidden rounded-xl parallax-target shadow-2xl" data-speed="0.08">
<div class="w-full h-full bg-cover bg-center rounded-lg grayscale group-hover:grayscale-0 transition-all duration-1000" data-alt="An artistic rendering of soft, ethereal aurora borealis light dancing across a dark celestial sky. The colors are muted cyan and deep indigo. The composition is minimal and elegant, with the lights appearing like gossamer ribbons of silk floating in a silent, high-tech vacuum." style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuCfNSY-Wq4KtkoV8CuLfVHZEp-GFTMw4RpDS50bGv1Lkgpm6RZflypZTHExbLsh3eAiSxYvXbHf4E0kzy1cH86dzmLkxy5bqdAB5ckPtiCiWsxTquDbeaWzcGD-no3ASHANc6UMoDUuX93wjD4GZ73fJN9ETMQRDjMc0JPJrbez8_ToapZbpIs404MAe-WjB6e0aqHu81bWgYBQ41l5zWW8f_yJNJiSxjU3V2RP2oR8HbmOkDu9jv09uK0X5UEi4cKsl3CT-3mCZUE')"></div>
</div>
</div>
</div>
</div>
</main>
<!-- Bottom Floating Navigation -->
<nav class="fixed bottom-8 left-1/2 -translate-x-1/2 w-[95%] max-w-5xl z-50 flex justify-around items-center py-3 px-6 glass-panel rounded-full scanlines shadow-[0_0_40px_rgba(0,210,255,0.15)] after:content-[''] after:absolute after:inset-0 after:bg-[url('scanlines.png')] after:opacity-5 after:pointer-events-none" id="bottom-nav">
<a class="flex flex-col items-center justify-center text-on-surface-variant/60 hover:text-on-surface transition-all duration-500 hover:bg-white/5 p-2 rounded-full" href="#">
<span class="material-symbols-outlined">home</span>
<span class="font-mono-ui text-[8px] mt-1 uppercase tracking-widest">Home</span>
</a>
<a class="flex flex-col items-center justify-center text-on-surface-variant/60 hover:text-on-surface transition-all duration-500 hover:bg-white/5 p-2 rounded-full" href="#">
<span class="material-symbols-outlined">image</span>
<span class="font-mono-ui text-[8px] mt-1 uppercase tracking-widest">Photos</span>
</a>
<a class="flex flex-col items-center justify-center text-on-surface-variant/60 hover:text-on-surface transition-all duration-500 hover:bg-white/5 p-2 rounded-full" href="#">
<span class="material-symbols-outlined">music_note</span>
<span class="font-mono-ui text-[8px] mt-1 uppercase tracking-widest">Songs</span>
</a>
<a class="flex flex-col items-center justify-center bg-primary/10 text-primary border border-primary/30 rounded-full px-5 py-2 scale-110 shadow-lg shadow-primary/20" href="#">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">auto_awesome_motion</span>
<span class="font-mono-ui text-[8px] mt-1 uppercase tracking-widest font-bold">Journey</span>
</a>
<a class="flex flex-col items-center justify-center text-on-surface-variant/60 hover:text-on-surface transition-all duration-500 hover:bg-white/5 p-2 rounded-full" href="#">
<span class="material-symbols-outlined">edit_note</span>
<span class="font-mono-ui text-[8px] mt-1 uppercase tracking-widest">Writings</span>
</a>
<a class="flex flex-col items-center justify-center text-on-surface-variant/60 hover:text-on-surface transition-all duration-500 hover:bg-white/5 p-2 rounded-full" href="#">
<span class="material-symbols-outlined">favorite</span>
<span class="font-mono-ui text-[8px] mt-1 uppercase tracking-widest">Feelings</span>
</a>
<a class="flex flex-col items-center justify-center text-on-surface-variant/60 hover:text-on-surface transition-all duration-500 hover:bg-white/5 p-2 rounded-full" href="#">
<span class="material-symbols-outlined">chat_bubble</span>
<span class="font-mono-ui text-[8px] mt-1 uppercase tracking-widest">Chat</span>
</a>
</nav>
<!-- Side Archive Details (Hidden by default, can be toggled) -->
<aside class="fixed right-0 top-0 h-full z-[60] flex flex-col bg-surface-dim/95 backdrop-blur-xl border-l border-primary/10 shadow-2xl w-80 translate-x-full transition-transform duration-700" id="side-nav">
<div class="p-8 flex flex-col h-full">
<div class="flex items-center gap-4 mb-12">
<div class="w-12 h-12 rounded-full border border-primary/30 overflow-hidden">
<img class="w-full h-full object-cover" data-alt="A stylized portrait of a high-net-worth archivist, sophisticated lighting, wearing minimalist futuristic apparel in a dark grey and white palette. The mood is one of prestige and calm intelligence." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDXC1ZtiP8t3u1DGPjqruJUH_B8e0R4MxvgR62UYYPKcmTW10JVzULzPl6EwwgtzVQAArxPbCz4tbb7trpaJJaqiLaiLsiPti3oj_EdhngtUcvI_CrnD-23lVO0B2Z-H5O7hJiaGdlRjCZVA87dwr4zaFlFzqRBYtY_xsZc5-IwILtEBHcyy7-uxjlcpodDLocP72-UC_nILK10o6dZ42n20wSqORLh-6QBxRs8JZBQTn9KvqwLR0IHJI17_gJGZVstJWcrLYmv40s"/>
</div>
<div>
<h3 class="font-headline-sm text-headline-sm text-primary">Archivist</h3>
<p class="text-[10px] font-mono-ui uppercase text-on-surface-variant">Vocalis III Encryption Active</p>
</div>
</div>
<div class="space-y-6 flex-grow">
<p class="font-label-caps text-label-caps text-primary/60 uppercase tracking-widest">Available Streams</p>
<nav class="space-y-2">
<a class="flex justify-between items-center p-3 rounded-lg text-primary font-bold border-r-2 border-primary bg-primary/5" href="#">
<span class="font-body-md text-body-md">English (Primary)</span>
<span class="material-symbols-outlined text-sm">language</span>
</a>
<a class="flex justify-between items-center p-3 rounded-lg text-on-surface-variant hover:bg-primary/5 transition-all" href="#">
<span class="font-body-md text-body-md">Turkish</span>
<span class="material-symbols-outlined text-sm">language</span>
</a>
<a class="flex justify-between items-center p-3 rounded-lg text-on-surface-variant hover:bg-primary/5 transition-all" href="#">
<span class="font-body-md text-body-md">Arabic</span>
<span class="material-symbols-outlined text-sm">language</span>
</a>
<a class="flex justify-between items-center p-3 rounded-lg text-on-surface-variant hover:bg-primary/5 transition-all" href="#">
<span class="font-body-md text-body-md">Persian</span>
<span class="material-symbols-outlined text-sm">language</span>
</a>
</nav>
</div>
<button class="w-full bg-primary text-on-primary py-4 rounded-xl font-mono-ui uppercase tracking-widest font-bold hover:brightness-110 transition-all">
                Invite New Member
            </button>
</div>
</aside>

`;

const script = `
        // Simple Parallax Effect
        window.addEventListener('scroll', () => {
            const parallaxItems = document.querySelectorAll('.parallax-target');
            const scrolled = window.pageYOffset;
            
            parallaxItems.forEach(item => {
                const speed = item.getAttribute('data-speed') || 0.1;
                const offset = item.getBoundingClientRect().top;
                const limit = window.innerHeight;
                
                if (offset < limit && offset > -item.offsetHeight) {
                    item.style.transform = \`translateY(\${(scrolled * speed) % 50}px)\`;
                }
            });
        });

        // Hover effect for interactive lines
        document.querySelectorAll('.glass-panel').forEach(panel => {
            panel.addEventListener('mousemove', (e) => {
                const rect = panel.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                panel.style.setProperty('--mouse-x', \`\${x}px\`);
                panel.style.setProperty('--mouse-y', \`\${y}px\`);
            });
        });

        // Side nav toggle logic (via language icon)
        const sideNav = document.getElementById('side-nav');
        const langIcon = document.querySelector('.material-symbols-outlined'); // Simplified selection
        
        document.querySelectorAll('.material-symbols-outlined').forEach(icon => {
            if(icon.innerText === 'language' || icon.innerText === 'settings') {
                icon.addEventListener('click', () => {
                    sideNav.classList.toggle('translate-x-full');
                });
            }
        });

        // Close side nav when clicking outside
        document.addEventListener('click', (e) => {
            if (!sideNav.contains(e.target) && !e.target.closest('nav')) {
                sideNav.classList.add('translate-x-full');
            }
        });
    `;

export const Route = createFileRoute("/journey")({
  head: () => ({
    meta: [
      { title: "Nafsam | Journey through Time" },
      { name: "description", content: "From the beginning to the trace — the eternal Nafsam narrative timeline." },
      { property: "og:title", content: "Nafsam | Journey through Time" },
      { property: "og:description", content: "From the beginning to the trace — the eternal Nafsam narrative timeline." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: JourneyPage,
});

function JourneyPage() {
  return (
    <LegacyPage
      css={css}
      html={html}
      script={script}
      bodyClassName="font-body-md text-body-md selection:bg-primary/30"
      dir="ltr"
      lang="en"
    />
  );
}
