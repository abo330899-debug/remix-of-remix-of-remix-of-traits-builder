import { useEffect, useRef } from "react";
import { useNavigate } from "@tanstack/react-router";

type Props = {
  css: string;
  html: string;
  script?: string;
  bodyClassName?: string;
  dir?: string;
  lang?: string;
};

export function LegacyPage({ css, html, script, bodyClassName, dir = "ltr", lang = "en" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const body = document.body;
    const added = (bodyClassName ?? "").split(/\s+/).filter(Boolean);
    body.classList.add(...added);
    document.documentElement.classList.add("dark");
    document.documentElement.setAttribute("dir", dir);
    document.documentElement.setAttribute("lang", lang);
    return () => {
      body.classList.remove(...added);
      body.removeAttribute("style");
    };
  }, [bodyClassName, dir, lang]);

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

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
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
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div ref={ref} dangerouslySetInnerHTML={{ __html: html }} />
    </>
  );
}