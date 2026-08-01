const NAV_MAP: Record<string, string> = {
  home: "/home",
  dashboard: "/home",
  nafsam: "/home",
  photos: "/photos",
  songs: "/songs",
  videos: "/videos",
  writings: "/writings",
  journey: "/journey",
  feelings: "/journey",
  login: "/",
};

import { useEffect, useRef } from "react";
import { useNavigate } from "@tanstack/react-router";
import { translate, useI18n } from "@/lib/i18n";

type Props = {
  css: string;
  html: string;
  script?: string;
  bodyClassName?: string;
  dir?: string;
  lang?: string;
  hideLegacyChrome?: boolean;
};

const HIDE_CHROME_CSS = `
.legacy-chrome-off header[class*="fixed"],
.legacy-chrome-off nav[class*="fixed"] { display: none !important; }
`;

export function LegacyPage({
  css,
  html,
  script,
  bodyClassName,
  hideLegacyChrome = true,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { lang, rtl } = useI18n();

  useEffect(() => {
    const body = document.body;
    const added = (bodyClassName ?? "").split(/\s+/).filter(Boolean);
    body.classList.add(...added);
    document.documentElement.classList.add("dark");
    document.documentElement.setAttribute("dir", rtl ? "rtl" : "ltr");
    document.documentElement.setAttribute("lang", lang);
    return () => {
      body.classList.remove(...added);
      body.removeAttribute("style");
    };
  }, [bodyClassName, lang, rtl]);

  useEffect(() => {
    if (!script) return;
    const timers: number[] = [];
    const originalSetInterval = window.setInterval;
    const wrappedSetInterval = ((handler: TimerHandler, timeout?: number, ...args: unknown[]) => {
      const id = originalSetInterval(handler, timeout, ...args);
      timers.push(id);
      return id;
    }) as typeof window.setInterval;
    window.setInterval = wrappedSetInterval;
    try {
      new Function(script)();
    } catch (err) {
      console.error("legacy page script failed", err);
    }
    window.setInterval = originalSetInterval;
    return () => timers.forEach((id) => clearInterval(id));
  }, [script]);

  // Live translation of the legacy markup
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const applyTo = (node: Node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        const original = (node as Text).dataset0 ?? node.nodeValue ?? "";
        const next = translate(original, lang);
        if (next !== node.nodeValue) node.nodeValue = next;
        return;
      }
      if (node.nodeType !== Node.ELEMENT_NODE) return;
      const element = node as HTMLElement;
      if (element instanceof HTMLInputElement && element.placeholder) {
        element.placeholder = translate(element.placeholder, lang);
      }
      node.childNodes.forEach(applyTo);
    };

    const run = () => applyTo(el);
    run();

    const observer = new MutationObserver(() => {
      observer.disconnect();
      run();
      observer.observe(el, { childList: true, subtree: true, characterData: true });
    });
    observer.observe(el, { childList: true, subtree: true, characterData: true });
    return () => observer.disconnect();
  }, [lang, html]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.querySelectorAll("button, a").forEach((node) => {
      if (node.hasAttribute("data-nav")) return;
      const label = (node.textContent ?? "").trim().toLowerCase();
      const to = NAV_MAP[label];
      if (to) node.setAttribute("data-nav", to);
    });
    const onClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement | null)?.closest("[data-nav]");
      if (!target) return;
      const to = target.getAttribute("data-nav");
      if (!to) return;
      e.preventDefault();
      navigate({ to });
    };
    el.addEventListener("click", onClick);
    return () => el.removeEventListener("click", onClick);
  }, [navigate]);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css + (hideLegacyChrome ? HIDE_CHROME_CSS : "") }} />
      <div
        ref={ref}
        className={hideLegacyChrome ? "legacy-chrome-off" : undefined}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </>
  );
}
