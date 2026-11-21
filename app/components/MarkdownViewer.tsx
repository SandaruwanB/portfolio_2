"use client";

import React, { useState } from "react";
import { normalizeImageUrl } from "../lib/imageUtils";
import { Copy, Check, ExternalLink } from "./Icons";
import ImageWithLoader from "./ImageWithLoader";

interface MarkdownViewerProps {
  content: string;
  className?: string;
}

export default function MarkdownViewer({ content, className = "" }: MarkdownViewerProps) {
  if (!content) return null;

  return (
    <div className={`space-y-6 text-zinc-800 dark:text-zinc-200 leading-relaxed font-sans ${className}`}>
      {renderMarkdownBlocks(content)}
    </div>
  );
}

function CodeBlock({ code, language }: { code: string; language?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-6 rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-950 text-zinc-100 shadow-md">
      <div className="flex items-center justify-between px-4 py-2 bg-zinc-900 border-b border-zinc-800/80 text-[11px] font-mono text-zinc-400">
        <span className="uppercase font-semibold tracking-wider text-emerald-400">
          {language || "CODE"}
        </span>
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors"
        >
          {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
          <span>{copied ? "Copied" : "Copy"}</span>
        </button>
      </div>
      <pre className="p-4 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed text-zinc-200">
        <code>{code}</code>
      </pre>
    </div>
  );
}

function renderMarkdownBlocks(rawText: string): React.ReactNode[] {
  const lines = rawText.split("\n");
  const blocks: React.ReactNode[] = [];
  let index = 0;

  let i = 0;
  while (i < lines.length) {
    const line = lines[i];

    // FENCED CODE BLOCKS (```lang ... ```)
    if (line.trim().startsWith("```")) {
      const lang = line.trim().slice(3).trim();
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith("```")) {
        codeLines.push(lines[i]);
        i++;
      }
      i++; // skip closing ```
      blocks.push(
        <CodeBlock key={`code-${index++}`} code={codeLines.join("\n")} language={lang} />
      );
      continue;
    }

    // HEADINGS
    if (line.startsWith("# ")) {
      blocks.push(
        <h1 key={`h1-${index++}`} className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight pt-4 pb-2 border-b border-zinc-200 dark:border-zinc-800">
          {renderInline(line.slice(2))}
        </h1>
      );
      i++;
      continue;
    }
    if (line.startsWith("## ")) {
      blocks.push(
        <h2 key={`h2-${index++}`} className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white tracking-tight pt-6 pb-2 border-b border-zinc-100 dark:border-zinc-800/60 flex items-center gap-2">
          <span className="w-2 h-2 rounded-xs bg-emerald-500 inline-block" />
          <span>{renderInline(line.slice(3))}</span>
        </h2>
      );
      i++;
      continue;
    }
    if (line.startsWith("### ")) {
      blocks.push(
        <h3 key={`h3-${index++}`} className="text-base sm:text-lg font-semibold text-zinc-900 dark:text-white tracking-tight pt-4 pb-1">
          {renderInline(line.slice(4))}
        </h3>
      );
      i++;
      continue;
    }
    if (line.startsWith("#### ")) {
      blocks.push(
        <h4 key={`h4-${index++}`} className="text-sm sm:text-base font-semibold text-zinc-800 dark:text-zinc-200 pt-3">
          {renderInline(line.slice(5))}
        </h4>
      );
      i++;
      continue;
    }

    // HORIZONTAL RULE (--- or ***)
    if (line.trim() === "---" || line.trim() === "***") {
      blocks.push(<hr key={`hr-${index++}`} className="border-t border-zinc-200 dark:border-zinc-800 my-8" />);
      i++;
      continue;
    }

    // BLOCKQUOTES (> Quote)
    if (line.startsWith("> ")) {
      const quoteLines: string[] = [line.slice(2)];
      i++;
      while (i < lines.length && lines[i].startsWith("> ")) {
        quoteLines.push(lines[i].slice(2));
        i++;
      }
      blocks.push(
        <blockquote key={`quote-${index++}`} className="p-4 my-4 rounded-xl border-l-4 border-emerald-500 bg-emerald-500/5 dark:bg-emerald-500/10 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 italic font-mono space-y-1">
          {quoteLines.map((ql, qIdx) => (
            <p key={qIdx}>{renderInline(ql)}</p>
          ))}
        </blockquote>
      );
      continue;
    }

    // STANDALONE IMAGE: ![alt](url)
    const imgMatch = line.trim().match(/^!\[(.*?)\]\((.*?)\)$/);
    if (imgMatch) {
      const alt = imgMatch[1];
      const rawUrl = imgMatch[2];
      const normalized = normalizeImageUrl(rawUrl);

      blocks.push(
        <div key={`img-${index++}`} className="my-6 rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800/80 bg-zinc-950 shadow-md">
          <ImageWithLoader
            src={normalized}
            alt={alt || "Architecture Diagram"}
            containerClassName="w-full max-h-[500px]"
            className="w-full h-full object-cover"
          />
          {alt && (
            <div className="p-2.5 text-center text-xs font-mono text-zinc-400 bg-zinc-900 border-t border-zinc-800">
              {alt}
            </div>
          )}
        </div>
      );
      i++;
      continue;
    }

    // TABLES (| col | col |)
    if (line.trim().startsWith("|") && line.trim().endsWith("|")) {
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith("|") && lines[i].trim().endsWith("|")) {
        tableLines.push(lines[i]);
        i++;
      }

      if (tableLines.length >= 2) {
        const headerRow = tableLines[0].split("|").slice(1, -1).map((c) => c.trim());
        const bodyRows = tableLines.slice(2).map((r) => r.split("|").slice(1, -1).map((c) => c.trim()));

        blocks.push(
          <div key={`table-${index++}`} className="my-6 overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-800">
            <table className="w-full text-left text-xs font-mono border-collapse">
              <thead>
                <tr className="bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 border-b border-zinc-200 dark:border-zinc-800">
                  {headerRow.map((h, hIdx) => (
                    <th key={hIdx} className="px-4 py-2.5 font-semibold">
                      {renderInline(h)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800/60 bg-white/50 dark:bg-zinc-950/40">
                {bodyRows.map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors">
                    {row.map((cell, cIdx) => (
                      <td key={cIdx} className="px-4 py-2 text-zinc-700 dark:text-zinc-300">
                        {renderInline(cell)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
        continue;
      }
    }

    // BULLETED LISTS (- or *)
    if (line.trim().startsWith("- ") || line.trim().startsWith("* ")) {
      const listItems: string[] = [];
      while (i < lines.length && (lines[i].trim().startsWith("- ") || lines[i].trim().startsWith("* "))) {
        listItems.push(lines[i].trim().slice(2));
        i++;
      }
      blocks.push(
        <ul key={`ul-${index++}`} className="my-4 space-y-2 pl-2">
          {listItems.map((item, lIdx) => (
            <li key={lIdx} className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0" />
              <span>{renderInline(item)}</span>
            </li>
          ))}
        </ul>
      );
      continue;
    }

    // NUMBERED LISTS (1. )
    if (/^\d+\.\s/.test(line.trim())) {
      const listItems: string[] = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i].trim())) {
        listItems.push(lines[i].trim().replace(/^\d+\.\s/, ""));
        i++;
      }
      blocks.push(
        <ol key={`ol-${index++}`} className="my-4 space-y-2 pl-5 list-decimal text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 font-mono">
          {listItems.map((item, lIdx) => (
            <li key={lIdx} className="pl-1 leading-relaxed">
              {renderInline(item)}
            </li>
          ))}
        </ol>
      );
      continue;
    }

    // EMPTY LINES
    if (!line.trim()) {
      i++;
      continue;
    }

    // REGULAR PARAGRAPHS
    const paraLines: string[] = [line];
    i++;
    while (
      i < lines.length &&
      lines[i].trim() &&
      !lines[i].trim().startsWith("#") &&
      !lines[i].trim().startsWith("```") &&
      !lines[i].trim().startsWith("- ") &&
      !lines[i].trim().startsWith("* ") &&
      !/^\d+\.\s/.test(lines[i].trim()) &&
      !lines[i].trim().startsWith("> ") &&
      !lines[i].trim().startsWith("|")
    ) {
      paraLines.push(lines[i]);
      i++;
    }

    blocks.push(
      <p key={`p-${index++}`} className="text-xs sm:text-sm sm:leading-relaxed text-zinc-700 dark:text-zinc-300">
        {renderInline(paraLines.join(" "))}
      </p>
    );
  }

  return blocks;
}

/**
 * Handles inline markdown:
 * - Bold: **text**
 * - Italic: *text*
 * - Inline Code: `code`
 * - Links: [text](url)
 * - Images inline: ![alt](url)
 */
function renderInline(text: string): React.ReactNode {
  // Regex pattern matching tokens
  const tokenRegex = /(\*\*.*?\*\*|\*.*?\*|`.*?`|!\[.*?\]\(.*?\) |\[.*?\]\(.*?\))/g;
  const parts = text.split(tokenRegex);

  return parts.map((part, idx) => {
    if (!part) return null;

    // Inline Image: ![alt](url)
    const imgMatch = part.match(/^!\[(.*?)\]\((.*?)\)$/);
    if (imgMatch) {
      const alt = imgMatch[1];
      const rawUrl = imgMatch[2];
      return (
        <span key={idx} className="block my-4">
          <ImageWithLoader
            src={rawUrl}
            alt={alt || "Documentation Diagram"}
            containerClassName="rounded-xl border border-zinc-200 dark:border-zinc-800 max-h-96 my-2"
            className="w-full h-full object-cover"
          />
        </span>
      );
    }

    // Hyperlink: [text](url)
    const linkMatch = part.match(/^\[(.*?)\]\((.*?)\)$/);
    if (linkMatch) {
      const linkText = linkMatch[1];
      const url = linkMatch[2];
      return (
        <a
          key={idx}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-emerald-600 dark:text-emerald-400 font-mono hover:underline inline-flex items-center gap-0.5"
        >
          <span>{linkText}</span>
          <ExternalLink className="w-3 h-3 inline ml-0.5 opacity-70" />
        </a>
      );
    }

    // Bold: **text**
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={idx} className="font-bold text-zinc-900 dark:text-white">
          {part.slice(2, -2)}
        </strong>
      );
    }

    // Italic: *text*
    if (part.startsWith("*") && part.endsWith("*")) {
      return (
        <em key={idx} className="italic text-zinc-800 dark:text-zinc-200">
          {part.slice(1, -1)}
        </em>
      );
    }

    // Inline Code: `code`
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code
          key={idx}
          className="px-1.5 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-emerald-600 dark:text-emerald-400 text-[11px] font-mono border border-zinc-200 dark:border-zinc-700/60"
        >
          {part.slice(1, -1)}
        </code>
      );
    }

    return part;
  });
}
