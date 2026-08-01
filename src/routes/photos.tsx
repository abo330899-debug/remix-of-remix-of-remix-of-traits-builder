import { createFileRoute } from "@tanstack/react-router";
import { LegacyPage } from "@/components/LegacyPage";

const css = `
        body {
            background-color: #050505;
            background-image: radial-gradient(circle at 50% 50%, rgba(0, 210, 255, 0.05) 0%, transparent 50%);
            overflow-x: hidden;
        }
        .glass-card {
            background: rgba(255, 255, 255, 0.03);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(165, 231, 255, 0.1);
            transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
        }
        .glass-card:hover {
            background: rgba(255, 255, 255, 0.08);
            border-color: rgba(165, 231, 255, 0.4);
            box-shadow: 0 0 30px rgba(0, 210, 255, 0.1);
        }
        .scanline-overlay {
            position: fixed;
            inset: 0;
            background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.1) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.02), rgba(0, 255, 0, 0.01), rgba(0, 0, 255, 0.02));
            background-size: 100% 4px, 3px 100%;
            pointer-events: none;
            z-index: 100;
            opacity: 0.3;
        }
        .aurora {
            position: fixed;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: radial-gradient(circle at 30% 20%, rgba(0, 210, 255, 0.08) 0%, transparent 40%),
                        radial-gradient(circle at 70% 80%, rgba(233, 195, 73, 0.05) 0%, transparent 40%);
            filter: blur(80px);
            animation: drift 20s infinite alternate linear;
            z-index: -1;
        }
        @keyframes drift {
            from { transform: rotate(0deg); }
            to { transform: rotate(10deg) translate(50px, 50px); }
        }
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 24;
        }
        .lightbox-active {
            overflow: hidden;
        }
    `;

const html = `
<div class="scanline-overlay"></div>
<div class="aurora"></div>
<!-- Top Navigation Bar -->
<header class="fixed top-0 w-full bg-transparent z-50">
<div class="flex justify-between items-center px-margin-mobile md:px-margin-desktop h-20 w-full bg-gradient-to-b from-surface-dim/80 to-transparent backdrop-blur-sm">
<div class="font-display-lg-mobile text-display-lg-mobile tracking-tighter text-primary uppercase" data-nav="/">Nafsam</div>
<div class="hidden md:flex items-center gap-8">
<nav class="flex gap-6">
<a class="text-on-surface-variant hover:text-primary transition-colors duration-300 font-label-caps text-label-caps uppercase" href="#">Archives</a>
<a class="text-primary font-bold transition-colors duration-300 font-label-caps text-label-caps uppercase" href="#">Gallery</a>
<a class="text-on-surface-variant hover:text-primary transition-colors duration-300 font-label-caps text-label-caps uppercase" href="#">Timeline</a>
</nav>
<div class="flex items-center gap-4 text-primary">
<span class="material-symbols-outlined cursor-pointer hover:opacity-70 transition-all">language</span>
<span class="material-symbols-outlined cursor-pointer hover:opacity-70 transition-all">lock</span>
<span class="material-symbols-outlined cursor-pointer hover:opacity-70 transition-all">settings</span>
</div>
</div>
</div>
</header>
<main class="pt-32 pb-40 px-margin-mobile md:px-margin-desktop min-h-screen max-w-container-max mx-auto">
<!-- Header Section -->
<section class="mb-12">
<h1 class="font-display-lg text-display-lg text-on-surface mb-2">Memory <span class="text-primary">Vault</span></h1>
<p class="font-body-md text-body-md text-on-surface-variant max-w-2xl">A curated sequence of visual remnants, preserved in the high-fidelity resonance of the digital afterlife. Each frame is a bridge to what was once fleeting.</p>
</section>
<!-- Gallery Grid -->
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-gutter">
<!-- Photo Card 1 -->
<div class="group relative aspect-[4/3] glass-card rounded-xl overflow-hidden cursor-pointer" onclick="openLightbox(0)">
<div class="absolute inset-0 bg-surface-container-highest animate-pulse" id="loader-1"></div>
<img class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" data-alt="A cinematic, high-contrast black and white photograph of a lone figure standing on a foggy bridge in a futuristic cityscape. Neon blue highlights reflect off the wet pavement. The atmosphere is melancholic and ethereal, with deep obsidian shadows and glowing light-leak textures, perfectly capturing a moment of digital immortality." onload="document.getElementById('loader-1').style.display='none'" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDjCpws5DbcavOZGPVwVl8FXeNNoHGg0F_VjbuxMKx_hB789rHyom6_g2mZZ7No6qYbK27ptBjlUXfxiofABDdFGYBmZsh7xb6t0tdS2qUoBWiYhRqEon3Y79xThP2OB_oiJPrCbI_1jkabou5h9yC8gQ6vTmsdaow-iiJoZYDojoVii4GADkz1ksb3eAxhMcoOfsR3qFJuvn-jhBe4Zb1aOVYZy0KHC3SuCf9qPM9YFduKZrFX2WM0uQ2E5uv1MQuFDcXubnlb70k"/>
<div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-6 flex flex-col justify-end">
<span class="font-label-caps text-label-caps text-primary mb-1">M-ARCHIVE 402</span>
<h3 class="font-headline-sm text-[16px] text-on-surface uppercase">The Silent Shore</h3>
</div>
</div>
<!-- Photo Card 2 -->
<div class="group relative aspect-[4/3] glass-card rounded-xl overflow-hidden cursor-pointer" onclick="openLightbox(1)">
<div class="absolute inset-0 bg-surface-container-highest animate-pulse" id="loader-2"></div>
<img class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" data-alt="A lush, vibrant forest interior where the sunlight filters through giant, translucent digital leaves that glow with golden energy. The lighting is warm and heavenly, using a luxury cinematic palette of gold and deep teal. High-fidelity textures of moss and floating spores create a dreamlike, living memory atmosphere." onload="document.getElementById('loader-2').style.display='none'" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBGPpCuF6AndEHM2LN42Vpf7No7sMFxDKkHqJSd3jw_wEf7j1E8pR1HG4DvviDKbwRLP2CC0F8yTYa6FZF2uiAsse1NyPa-ZypukYjQWtGSZ8GjqRSSkAQPBpX-mspXJ5u0vh5woZD3r99XnVh0dJcWitSpyovZzYXk6KOJjrDXo9WCRD0Yet7u5yMumiHuLMdPe38bORaCeP0xriMXyM0UiwqHQeXe6TZ4J1MxOk9WaeTxyVu61DB-ySAl3_WY2RAjCTtEtlPJ508"/>
<div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-6 flex flex-col justify-end">
<span class="font-label-caps text-label-caps text-primary mb-1">M-ARCHIVE 781</span>
<h3 class="font-headline-sm text-[16px] text-on-surface uppercase">Echoes of Eden</h3>
</div>
</div>
<!-- Photo Card 3 -->
<div class="group relative aspect-[4/3] glass-card rounded-xl overflow-hidden cursor-pointer" onclick="openLightbox(2)">
<img class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" data-alt="An abstract, architectural shot of a brutalist glass monolith reaching into a velvet night sky. The building is illuminated from within by rhythmic pulses of cyan light. The composition is stark and minimalist, emphasizing the cinematic luxury of a private vault. Grainy film textures add a tactile, nostalgic quality." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDEHbSM1QeXl4PZJR_vtleidR6Mnz_8GK800yzCvoab2_sOM75XxwpkOfSNfty7CL7ijFiIw1MHGoWn8TT7AYZMxooTlwtQbUG6VJuq5dFOgV9OWvJhJJSHF9nvycq_FHb5Lx5a1gI1cWzybAuFHGCkhOvOWuVqBtheZdnEpUKCIGpGUaaWVLMKIQV9lm7SZY-SeOfKsYZBRk3XTTyeqM3yn-J4RzyGcb9gmNEWwGANX9U8h2vB56QFG6TouLu2OnORIS0EZuXy1nE"/>
<div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-6 flex flex-col justify-end">
<span class="font-label-caps text-label-caps text-primary mb-1">M-ARCHIVE 129</span>
<h3 class="font-headline-sm text-[16px] text-on-surface uppercase">Vertical Void</h3>
</div>
</div>
<!-- Photo Card 4 -->
<div class="group relative aspect-[4/3] glass-card rounded-xl overflow-hidden cursor-pointer" onclick="openLightbox(3)">
<img class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" data-alt="A close-up of a holographic interface floating over a person's palm, displaying a celestial map. The light from the hologram casts a soft blue glow on the skin. The background is a blurred, deep obsidian workspace. The mood is intimate and technologically sophisticated, evoking a sense of reverence for human legacy." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDuOIQ3t1i9GBTqp6RNz5Eyn6fHoHpxaq8EbzylL_mfSxROu-NVF_FYHjR8uyBNbbmt0wmZDSSvoZmUqueiwpFPdFM93_T6MIpYR4Oz1NMDjUvOZxrxr8moDqpi28J0l2SrM2A-NcMEACc1R8t6mQlpESxNX26HxGbs9AJL4iaPfDNr0qF0q7jED3C9tC7qh8VKmSmuLYfc3oaODNQkQeCrTc1f5udnx3GcZ_S1H-BWSzAH0JYwVFFJUAKYf_IJxKaO0_WJsrFq29E"/>
<div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-6 flex flex-col justify-end">
<span class="font-label-caps text-label-caps text-primary mb-1">M-ARCHIVE 882</span>
<h3 class="font-headline-sm text-[16px] text-on-surface uppercase">Identity Map</h3>
</div>
</div>
<!-- More Cards to fill the grid -->
<div class="group relative aspect-[4/3] glass-card rounded-xl overflow-hidden cursor-pointer" onclick="openLightbox(4)">
<img class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" data-alt="A wide-angle landscape of a salt flat at dawn, reflecting a sky filled with multiple moons. The lighting is ethereal and cool-toned, with soft purples and silvers. The scene feels like a futuristic sanctuary, expansive and calm, with a subtle film grain overlay and holographic scanlines visible in the clouds." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBU2WhNQTpVvUfO_LZ46pcK5etfVnKcAqQJW92YNXdOKEZYPp0yvaosWlQxjP5QayEfpc0GaoCb1CZj7uJOdOC6zPaFM06u6v8y57EIGfzBF-bOph_IDGZvTmRKyLKn9p4uvRvWJVxA8UZzPsgy55wygdlucrYugCDYicfaDVO0BuXfjAQGs-4i-QO5ryEEqgmbOnHvPnJbVkIL2fL6K9dKCtzHuxZNByinUU5LbDuIuftdAo5LDprk4xwHANU4Q7RhNFCFFtKsUvU"/>
<div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-6 flex flex-col justify-end">
<span class="font-label-caps text-label-caps text-primary mb-1">M-ARCHIVE 551</span>
<h3 class="font-headline-sm text-[16px] text-on-surface uppercase">Prism Plains</h3>
</div>
</div>
<div class="group relative aspect-[4/3] glass-card rounded-xl overflow-hidden cursor-pointer" onclick="openLightbox(5)">
<img class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" data-alt="A detailed shot of a single drop of liquid mercury suspended in mid-air, reflecting a complex grid of light. The environment is dark and sterile, like a high-tech laboratory vault. The lighting uses primary blue and silver accents. The image represents the fluidity and purity of preserved data in a cinematic, luxury style." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAEmeRN_MHBhNbae6kEURIPGjumYFpf2S_c_tPaK8p2a3JPcB0a674QG3JaZgAfsCcDc5PAArANicaCDRH9rexn1l_kpSuhjy3IYhl-RIuMVWHH0ZjdbdS654LXpMnO4sRWIAjtpA2yzCZ7qDn6QlBe3ZG8DdfG2OLsDU1Nbe4Olgm30deAgu0wE4CSW4pNcWk-QUMYGj6TuIA0JobLYwBqmtvgnnNxuu84lYIduqws1fSkqq60QMV5bK6iGXcd7dRYh58qtrFp7v4"/>
<div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-6 flex flex-col justify-end">
<span class="font-label-caps text-label-caps text-primary mb-1">M-ARCHIVE 303</span>
<h3 class="font-headline-sm text-[16px] text-on-surface uppercase">The Catalyst</h3>
</div>
</div>
<div class="group relative aspect-[4/3] glass-card rounded-xl overflow-hidden cursor-pointer" onclick="openLightbox(6)">
<img class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" data-alt="A cinematic, low-angle shot of a futuristic library where books are made of glowing glass panels. The room is vast and dark, with light-trails moving between shelves. The visual style is high-end sci-fi with a moody, obsidian and gold color palette. The image evokes deep wisdom and the concept of an infinite archive." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDVSN9d_uV1RTc4-zdBbqhinRBkldkhtlK8iFtH-18Y7Ae3miv8CtH2NK77oHlKMJmZTIC2v1-9huMZ60cPlryUBaPr7I7H_lUQAaJbgjtzF7W1okn29mFuMWj6d0CaiItrCPEwIr1mRzF613gCaoGu_P7R8tPZ8AwU80Kf3AwWNY48vI7uZ6ewQ3jPxV_ceyglbnViDIfZ6r1BVccEghCD2rXXiINkwfajZA8rINbB_3rb_XOy1fysytAW-kmxzfkGtV6pdiPvSwQ"/>
<div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-6 flex flex-col justify-end">
<span class="font-label-caps text-label-caps text-primary mb-1">M-ARCHIVE 912</span>
<h3 class="font-headline-sm text-[16px] text-on-surface uppercase">Illuminated Lore</h3>
</div>
</div>
<div class="group relative aspect-[4/3] glass-card rounded-xl overflow-hidden cursor-pointer" onclick="openLightbox(7)">
<img class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" data-alt="A portrait of a person whose silhouette is dissolving into a stream of glowing particles and light-code. The background is a gradient of deep cosmic blues and blacks. The lighting is dramatic and back-lit, creating a sense of transition between the physical and the digital. The mood is profound and aesthetically sophisticated." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCdx8hMO-ZLevhhqrJ12pwUQCsBjvYmj0VDPhXfAH5n0W-vtVdTMl9Min9gYonvzPL0M4FXxdZ8KKAK7YQbWuip8VKu0dl4PwGgHuOhPvlQ0kQGlUvf2zeMKSh5Gj-O5cEuvvjJ_B8ftVPA7d67_aUAD_u_Q3hyKhbI4EZHXhic7Lz6DPq5k6Q-eU5nCIIR0t6M-gHM7TO6zqyZQLyzTxQd90UeX_XsnsscWuhl8UbqCFANsZnN62b8ony7qgrY0auhVSgmIF_Vg-o"/>
<div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-6 flex flex-col justify-end">
<span class="font-label-caps text-label-caps text-primary mb-1">M-ARCHIVE 001</span>
<h3 class="font-headline-sm text-[16px] text-on-surface uppercase">The Ascension</h3>
</div>
</div>
</div>
</main>
<!-- Bottom Navigation Dock -->
<nav class="fixed bottom-8 left-1/2 -translate-x-1/2 w-[95%] max-w-5xl z-50 flex justify-around items-center py-3 px-6 bg-surface-container-low/10 backdrop-blur-[30px] border border-primary/20 rounded-full shadow-[0_0_40px_rgba(0,210,255,0.15)] relative after:content-[''] after:absolute after:inset-0 after:bg-[url('scanlines.png')] after:opacity-5 after:pointer-events-none">
<button class="flex flex-col items-center justify-center text-on-surface-variant/60 hover:text-on-surface transition-all duration-500 hover:bg-white/5 p-2 rounded-full">
<span class="material-symbols-outlined">home</span>
<span class="font-label-caps text-label-caps uppercase mt-1 hidden md:block">Home</span>
</button>
<button class="flex flex-col items-center justify-center bg-primary/10 text-primary border border-primary/30 rounded-full px-4 py-2 scale-110 active:scale-95 transition-transform duration-200">
<span class="material-symbols-outlined">image</span>
<span class="font-label-caps text-label-caps uppercase mt-1 hidden md:block">Photos</span>
</button>
<button class="flex flex-col items-center justify-center text-on-surface-variant/60 hover:text-on-surface transition-all duration-500 hover:bg-white/5 p-2 rounded-full">
<span class="material-symbols-outlined">music_note</span>
<span class="font-label-caps text-label-caps uppercase mt-1 hidden md:block">Songs</span>
</button>
<button class="flex flex-col items-center justify-center text-on-surface-variant/60 hover:text-on-surface transition-all duration-500 hover:bg-white/5 p-2 rounded-full">
<span class="material-symbols-outlined">movie</span>
<span class="font-label-caps text-label-caps uppercase mt-1 hidden md:block">Videos</span>
</button>
<button class="flex flex-col items-center justify-center text-on-surface-variant/60 hover:text-on-surface transition-all duration-500 hover:bg-white/5 p-2 rounded-full">
<span class="material-symbols-outlined">edit_note</span>
<span class="font-label-caps text-label-caps uppercase mt-1 hidden md:block">Writings</span>
</button>
<button class="flex flex-col items-center justify-center text-on-surface-variant/60 hover:text-on-surface transition-all duration-500 hover:bg-white/5 p-2 rounded-full">
<span class="material-symbols-outlined">favorite</span>
<span class="font-label-caps text-label-caps uppercase mt-1 hidden md:block">Feelings</span>
</button>
<button class="flex flex-col items-center justify-center text-on-surface-variant/60 hover:text-on-surface transition-all duration-500 hover:bg-white/5 p-2 rounded-full">
<span class="material-symbols-outlined">auto_awesome_motion</span>
<span class="font-label-caps text-label-caps uppercase mt-1 hidden md:block">Journey</span>
</button>
<button class="flex flex-col items-center justify-center text-on-surface-variant/60 hover:text-on-surface transition-all duration-500 hover:bg-white/5 p-2 rounded-full">
<span class="material-symbols-outlined">chat_bubble</span>
<span class="font-label-caps text-label-caps uppercase mt-1 hidden md:block">Chat</span>
</button>
</nav>
<!-- Lightbox / Theater Mode Overlay -->
<div class="fixed inset-0 z-[100] bg-black/95 backdrop-blur-3xl hidden flex-col items-center justify-center p-8 opacity-0 transition-opacity duration-500" id="lightbox">
<button class="absolute top-8 right-8 text-on-surface hover:text-primary transition-colors" onclick="closeLightbox()">
<span class="material-symbols-outlined text-4xl">close</span>
</button>
<div class="relative w-full max-w-6xl aspect-[4/3] flex items-center justify-center group">
<button class="absolute left-0 top-1/2 -translate-y-1/2 bg-white/5 hover:bg-white/10 p-4 rounded-full text-on-surface opacity-0 group-hover:opacity-100 transition-opacity" onclick="changePhoto(-1)">
<span class="material-symbols-outlined">chevron_left</span>
</button>
<img class="max-w-full max-h-full object-contain shadow-2xl" data-alt="A cinematic placeholder for the lightbox detailed view, maintaining the high-end obsidian and neon aesthetic of the memory vault." id="lightbox-img" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDUDlJHzOUXyPXQKxaQpP6cbOlpk1vCM-qVYH8RRR89mVxsesrbmGbrxgl1ljtR-gptUrtI5AiTxJc6GwSMEBMBdwOpp9I2zwijF5ZGVDlSQVeavKtZPHQ7KYJCEWs0rROQxThOIfp17iGsJfC7zle3E96fDacpldpQ9Q1Q48lULg7y9mPd3UImaf9mwxQff3X4K_kCmIHIvHWTk_ow0dCovRpp9u7Ua6fhxQdY_oXDntwZzdzwjao-iwWBDs85yNQkiKKESOYKR2w"/>
<button class="absolute right-0 top-1/2 -translate-y-1/2 bg-white/5 hover:bg-white/10 p-4 rounded-full text-on-surface opacity-0 group-hover:opacity-100 transition-opacity" onclick="changePhoto(1)">
<span class="material-symbols-outlined">chevron_right</span>
</button>
</div>
<div class="mt-8 text-center max-w-2xl">
<div class="font-label-caps text-label-caps text-primary mb-2" id="lightbox-label">ARCHIVE ID</div>
<h2 class="font-headline-md text-display-lg-mobile text-on-surface mb-4" id="lightbox-title">TITLE</h2>
<p class="font-body-md text-body-md text-on-surface-variant" id="lightbox-desc">The metadata description will reside here, providing emotional and historical context to the digital memory captured in this specific resonant frame.</p>
</div>
</div>

`;

const script = `
        const photos = [
            { id: 'M-ARCHIVE 402', title: 'The Silent Shore', desc: 'An echo from the year 2042. The fog on the bridge felt thicker than usual, a sensory buffer against the rising tides of the digital ocean.' },
            { id: 'M-ARCHIVE 781', title: 'Echoes of Eden', desc: 'Synthesized flora reacting to the presence of an observer. A recreation of a garden that no longer exists in the physical realm.' },
            { id: 'M-ARCHIVE 129', title: 'Vertical Void', desc: 'The structural integrity of the vault itself. Monolithic and unyielding, housing billions of lives in cold storage.' },
            { id: 'M-ARCHIVE 882', title: 'Identity Map', desc: 'The moment a soul is digitized. The celestial map represents the unique harmonic frequency of a single consciousness.' },
            { id: 'M-ARCHIVE 551', title: 'Prism Plains', desc: 'A dreamscape generated during the initial sleep-mode of the archive. A subconscious projection of peace.' },
            { id: 'M-ARCHIVE 303', title: 'The Catalyst', desc: 'A single drop of the encryption fluid. It holds the key to unlocking millions of hidden sub-memories.' },
            { id: 'M-ARCHIVE 912', title: 'Illuminated Lore', desc: 'Every glass panel represents a life. To walk through this room is to walk through the history of a civilization.' },
            { id: 'M-ARCHIVE 001', title: 'The Ascension', desc: 'The final frame before physical dissolution. A transition marked by light and the shedding of the material shell.' }
        ];

        let currentIndex = 0;

        function openLightbox(index) {
            currentIndex = index;
            updateLightboxContent();
            const lightbox = document.getElementById('lightbox');
            lightbox.classList.remove('hidden');
            document.body.classList.add('lightbox-active');
            setTimeout(() => {
                lightbox.classList.add('opacity-100');
            }, 10);
        }

        function closeLightbox() {
            const lightbox = document.getElementById('lightbox');
            lightbox.classList.remove('opacity-100');
            document.body.classList.remove('lightbox-active');
            setTimeout(() => {
                lightbox.classList.add('hidden');
            }, 500);
        }

        function changePhoto(dir) {
            currentIndex = (currentIndex + dir + photos.length) % photos.length;
            updateLightboxContent();
        }

        function updateLightboxContent() {
            const photo = photos[currentIndex];
            document.getElementById('lightbox-label').innerText = photo.id;
            document.getElementById('lightbox-title').innerText = photo.title;
            document.getElementById('lightbox-desc').innerText = photo.desc;
            // In a real app, you would swap the image src here
        }

        // Close on Esc
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowRight') changePhoto(1);
            if (e.key === 'ArrowLeft') changePhoto(-1);
        });
    `;

export const Route = createFileRoute("/photos")({
  head: () => ({
    meta: [
      { title: "Nafsam | Photo Archive" },
      { name: "description", content: "High-fidelity captures preserved in the Nafsam visual memory archive." },
      { property: "og:title", content: "Nafsam | Photo Archive" },
      { property: "og:description", content: "High-fidelity captures preserved in the Nafsam visual memory archive." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PhotosPage,
});

function PhotosPage() {
  return (
    <LegacyPage
      css={css}
      html={html}
      script={script}
      bodyClassName="selection:bg-primary/30"
      dir="ltr"
      lang="en"
    />
  );
}
