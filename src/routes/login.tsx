import { createFileRoute } from "@tanstack/react-router";
import { LegacyPage } from "@/components/LegacyPage";

const css = `
        .glass-panel {
            background: rgba(28, 27, 27, 0.03);
            backdrop-filter: blur(40px);
            border: 1px solid rgba(165, 231, 255, 0.1);
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
        @keyframes aurora {
            0% { transform: translate(0, 0) scale(1); }
            50% { transform: translate(-5%, 5%) scale(1.1); }
            100% { transform: translate(0, 0) scale(1); }
        }
        .aurora-bg {
            animation: aurora 20s infinite alternate ease-in-out;
        }
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 24;
        }
        .encrypted-glow:focus {
            box-shadow: 0 0 20px rgba(0, 210, 255, 0.2);
        }
    `;

const html = `
<!-- Cinematic Background -->
<div class="fixed inset-0 z-0">
<div class="absolute inset-0 bg-black/40 z-10"></div>
<div class="absolute inset-0 aurora-bg blur-[120px] opacity-20 z-0">
<div class="absolute top-0 -left-1/4 w-[800px] h-[800px] bg-primary rounded-full mix-blend-screen"></div>
<div class="absolute bottom-0 -right-1/4 w-[600px] h-[600px] bg-secondary rounded-full mix-blend-overlay"></div>
</div>
<div class="w-full h-full bg-cover bg-center transition-all duration-1000 scale-105 blur-md" data-alt="A cinematic, ultra-high-definition photograph of a romantic, ethereal landscape at twilight. The scene is heavily blurred to create a dreamy, bokeh effect, with soft glimmers of city lights or stars appearing as glowing circles of gold and soft blue. The overall aesthetic is one of deep, moody obsidian and midnight tones, with a touch of warmth like a fading sunset, perfectly aligning with a luxury digital vault theme." style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuAOzkhmtblaac2UUFemU4rmgNtVfPU3FMGhxvG_U63d4fcBDotgUBGdFLeEdMxIYTkkduhCdmMRoVvlZLdLC159uT0aSyxTwgV3SvUPngATdN6kgUsGca2BSF6sKMoSLiLx1NMm_O2SHoweO6kPwRz-VrQbqNq9828tc_X4ElE4a7NrRa0e7iRTP0oaP8i8gdxuvWzXukPgzg481EWnxUsW3WVzRVbXCrKyPBKvePMppklWztWk6m86sS1-jc3-BqpopTDEBiDQgjo')">
</div>
</div>
<!-- Layout Shell -->
<main class="relative z-20 flex flex-col items-center justify-center min-h-screen px-margin-mobile md:px-margin-desktop overflow-y-auto">
<!-- Header / Logo -->
<header class="fixed top-0 w-full z-50 flex justify-between items-center px-margin-mobile md:px-margin-desktop h-20 bg-gradient-to-b from-surface-dim/80 to-transparent backdrop-blur-sm">
<div class="font-display-lg-mobile text-display-lg-mobile tracking-tighter text-primary uppercase" data-nav="/">Nafsam</div>
<!-- Language Switcher (SideNavBar Logic) -->
<div class="flex items-center gap-4">
<div class="hidden md:flex gap-6 items-center">
<button class="font-mono-ui text-label-caps text-primary border-b border-primary pb-1">ARABIC</button>
<button class="font-mono-ui text-label-caps text-on-surface-variant hover:text-primary transition-colors">TURKISH</button>
<button class="font-mono-ui text-label-caps text-on-surface-variant hover:text-primary transition-colors">ENGLISH</button>
<button class="font-mono-ui text-label-caps text-on-surface-variant hover:text-primary transition-colors">PERSIAN</button>
</div>
<span class="material-symbols-outlined text-primary cursor-pointer">language</span>
</div>
</header>
<!-- Central Login Card -->
<div class="w-full max-w-lg glass-panel p-10 md:p-14 rounded-3xl relative scanlines overflow-hidden">
<!-- Counters Section -->
<div class="space-y-10 mb-12">
<!-- Countdown to Open Date -->
<div class="text-center">
<p class="font-mono-ui text-label-caps text-on-surface-variant mb-4 uppercase tracking-[0.2em]">الوقت المتبقي لفتح الأرشيف</p>
<div class="grid grid-cols-4 gap-4" id="countdown">
<div class="flex flex-col">
<span class="font-display-lg-mobile text-primary text-4xl" id="days">00</span>
<span class="font-mono-ui text-[10px] text-on-surface-variant">يوم</span>
</div>
<div class="flex flex-col">
<span class="font-display-lg-mobile text-primary text-4xl" id="hours">00</span>
<span class="font-mono-ui text-[10px] text-on-surface-variant">ساعة</span>
</div>
<div class="flex flex-col">
<span class="font-display-lg-mobile text-primary text-4xl" id="minutes">00</span>
<span class="font-mono-ui text-[10px] text-on-surface-variant">دقيقة</span>
</div>
<div class="flex flex-col">
<span class="font-display-lg-mobile text-primary text-4xl" id="seconds">00</span>
<span class="font-mono-ui text-[10px] text-on-surface-variant">ثانية</span>
</div>
</div>
</div>
<!-- Time Since Event -->
<div class="pt-8 border-t border-white/5 text-center">
<p class="font-mono-ui text-label-caps text-on-surface-variant mb-4 uppercase tracking-[0.2em]">منذ اللقاء الأول</p>
<p class="font-headline-sm text-on-surface opacity-80 leading-relaxed" id="time-since"></p>
<p class="font-mono-ui text-[10px] text-primary/60 mt-2">20 أغسطس 2025 • 04:04 ص</p>
</div>
</div>
<!-- Login Form -->
<form class="space-y-8" id="loginForm">
<div class="relative group">
<label class="font-mono-ui text-label-caps text-primary/60 block mb-3 text-right">مفتاح التشفير</label>
<div class="relative">
<input class="w-full bg-transparent border-0 border-b border-primary/20 focus:border-primary focus:ring-0 text-headline-sm py-4 px-0 transition-all duration-500 encrypted-glow placeholder:text-on-surface-variant/30 text-right font-light" placeholder="أدخل الرمز السري..." required="" type="password"/>
<span class="material-symbols-outlined absolute left-0 top-1/2 -translate-y-1/2 text-primary/40 group-focus-within:text-primary transition-colors">lock</span>
</div>
</div>
<button class="w-full h-16 rounded-full bg-white/5 border border-primary/30 text-primary font-mono-ui text-label-caps tracking-[0.3em] hover:bg-primary/10 active:scale-95 transition-all duration-300 flex items-center justify-center gap-3" type="submit">
                    فك التشفير
                    <span class="material-symbols-outlined">arrow_back</span>
</button>
</form>
<div class="mt-8 text-center">
<a class="font-mono-ui text-[11px] text-on-surface-variant/40 hover:text-primary transition-colors" href="#">اتصل بالأمين للأرشفة في حال فقدان المفتاح</a>
</div>
</div>
<!-- Footnote / Decorative -->
<footer class="fixed bottom-8 flex flex-col items-center gap-2 opacity-40">
<div class="w-px h-12 bg-gradient-to-t from-primary to-transparent"></div>
<p class="font-mono-ui text-label-caps text-[10px] tracking-widest">تشفير VOCALIS III نشط</p>
</footer>
</main>
<!-- Grain Overlay -->
<div class="fixed inset-0 pointer-events-none z-[100] opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

`;

const script = `
        // Set Open Date (1 year from event for example)
        const openDate = new Date("Aug 20, 2026 04:04:00").getTime();
        const startDate = new Date("Aug 20, 2025 04:04:00").getTime();

        function updateCounters() {
            const now = new Date().getTime();
            
            // Countdown logic
            const distance = openDate - now;
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            document.getElementById("days").innerText = days.toString().padStart(2, '0');
            document.getElementById("hours").innerText = hours.toString().padStart(2, '0');
            document.getElementById("minutes").innerText = minutes.toString().padStart(2, '0');
            document.getElementById("seconds").innerText = seconds.toString().padStart(2, '0');

            // Time since logic
            const timeDiff = now - startDate;
            const sDays = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
            const sHours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const sMins = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
            const sSecs = Math.floor((timeDiff % (1000 * 60)) / 1000);
            
            document.getElementById("time-since").innerText = \`\${sDays} يوم و \${sHours} ساعة\`;
        }

        setInterval(updateCounters, 1000);
        updateCounters();

        // Form Submission Interaction
        document.getElementById('loginForm').addEventListener('submit', function(e) {
            e.preventDefault();
            const btn = e.target.querySelector('button');
            btn.innerHTML = '<span class="material-symbols-outlined animate-spin">refresh</span> جاري التحقق...';
            btn.classList.add('opacity-70');
            
            setTimeout(() => {
                // Success simulation
                document.body.style.opacity = '0';
                document.body.style.transition = 'opacity 1s ease-in-out';
                setTimeout(() => {
                    window.location.href = '/';
                }, 1000);
            }, 2000);
        });

        // Atmospheric micro-interaction
        document.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 20;
            const y = (e.clientY / window.innerHeight - 0.5) * 20;
            document.querySelector('.aurora-bg').style.transform = \`translate(\${x}px, \${y}px)\`;
        });
    `;

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Nafsam | Login" },
      { name: "description", content: "Decrypt your Nafsam vault and unlock the archive." },
      { property: "og:title", content: "Nafsam | Login" },
      { property: "og:description", content: "Decrypt your Nafsam vault and unlock the archive." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  return (
    <LegacyPage
      css={css}
      html={html}
      script={script}
      bodyClassName="bg-surface-dim text-on-surface overflow-hidden font-body-md selection:bg-primary/30"
      dir="rtl"
      lang="ar"
    />
  );
}
