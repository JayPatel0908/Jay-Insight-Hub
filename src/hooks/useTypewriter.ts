import { useEffect, useState } from "react";

interface Options {
  words: string[];
  typeSpeed?: number;
  deleteSpeed?: number;
  pauseMs?: number;
}

export function useTypewriter({
  words,
  typeSpeed = 90,
  deleteSpeed = 45,
  pauseMs = 1400,
}: Options) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!words.length) return;
    const current = words[index % words.length];

    if (!deleting && text === current) {
      const t = setTimeout(() => setDeleting(true), pauseMs);
      return () => clearTimeout(t);
    }
    if (deleting && text === "") {
      setDeleting(false);
      setIndex((i) => (i + 1) % words.length);
      return;
    }

    const t = setTimeout(
      () => {
        setText((prev) =>
          deleting
            ? current.slice(0, Math.max(0, prev.length - 1))
            : current.slice(0, prev.length + 1),
        );
      },
      deleting ? deleteSpeed : typeSpeed,
    );
    return () => clearTimeout(t);
  }, [text, deleting, index, words, typeSpeed, deleteSpeed, pauseMs]);

  return text;
}
