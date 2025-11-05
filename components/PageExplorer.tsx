"use client";

import { useMemo, useState } from "react";
import type { BookPage } from "@/data/book";
import { bookPages } from "@/data/book";

const TOTAL_PAGES = bookPages.length;

const clampPage = (page: number) => {
  if (Number.isNaN(page)) return 1;
  if (page < 1) return 1;
  if (page > TOTAL_PAGES) return TOTAL_PAGES;
  return Math.floor(page);
};

const themeOptions = ["सर्व विषय", ...new Set(bookPages.map((page) => page.theme))];

const filterPages = (theme: string, term: string) => {
  const themeFiltered =
    theme === themeOptions[0]
      ? bookPages
      : bookPages.filter((page) => page.theme === theme);

  if (!term.trim()) {
    return themeFiltered;
  }

  const query = term.trim().toLowerCase();
  return themeFiltered.filter((page) => {
    const haystack = [
      page.title,
      page.summary,
      page.paragraphs.join(" "),
      page.quote,
      page.mentor,
      page.location,
      page.event,
    ]
      .join(" ")
      .toLowerCase();

    return haystack.includes(query);
  });
};

export function PageExplorer() {
  const [pageNumber, setPageNumber] = useState(1);
  const [selectedTheme, setSelectedTheme] = useState(themeOptions[0]);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPages = useMemo(
    () => filterPages(selectedTheme, searchTerm),
    [selectedTheme, searchTerm],
  );

  const displayPage: BookPage | null = useMemo(() => {
    if (!filteredPages.length) {
      return null;
    }
    return (
      filteredPages.find((page) => page.pageNumber === pageNumber) ??
      filteredPages[0]
    );
  }, [filteredPages, pageNumber]);

  const handleThemeChange = (value: string) => {
    setSelectedTheme(value);
    const nextPages = filterPages(value, searchTerm);
    if (nextPages.length) {
      setPageNumber(nextPages[0].pageNumber);
    }
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    const nextPages = filterPages(selectedTheme, value);
    if (nextPages.length) {
      setPageNumber(nextPages[0].pageNumber);
    }
  };

  const jumpToPage = (value: number) => {
    const normalized = clampPage(value);
    if (!filteredPages.length) {
      setPageNumber(normalized);
      return;
    }
    const match = filteredPages.find((page) => page.pageNumber === normalized);
    if (match) {
      setPageNumber(match.pageNumber);
      return;
    }
    setPageNumber(filteredPages[0].pageNumber);
  };

  const progress = displayPage
    ? (displayPage.pageNumber / TOTAL_PAGES) * 100
    : 0;

  return (
    <div className="space-y-12">
      <section className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-lg shadow-slate-100 backdrop-blur dark:border-slate-800 dark:bg-slate-900/70 dark:shadow-none md:p-8">
        <header className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
              नेव्हिगेशन पॅनेल
            </p>
            <h2 className="mt-1 text-2xl font-semibold text-slate-950 dark:text-slate-100 md:text-3xl">
              आपल्या आवडीचे पृष्ठ निवडा
            </h2>
          </div>
          {displayPage ? (
            <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
              <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                पृष्ठ क्रमांक {displayPage.pageNumber}
              </span>
              <span>/{TOTAL_PAGES}</span>
            </div>
          ) : (
            <div className="text-sm font-semibold text-rose-600 dark:text-rose-400">
              शोध निकषांसाठी कोणतेही पृष्ठ उपलब्ध नाही
            </div>
          )}
        </header>

        <div className="grid gap-6 md:grid-cols-3">
          <label className="flex flex-col gap-2">
            <span className="text-sm font-semibold text-slate-600 dark:text-slate-300">
              पृष्ठ क्रमांक (१ - {TOTAL_PAGES})
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() =>
                  jumpToPage((displayPage?.pageNumber ?? pageNumber) - 1)
                }
                className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 active:scale-[0.98] dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
              >
                मागील
              </button>
              <input
                type="number"
                min={1}
                max={TOTAL_PAGES}
                value={displayPage?.pageNumber ?? pageNumber}
                onChange={(event) => jumpToPage(Number(event.target.value))}
                className="w-full rounded-xl border border-slate-200 px-4 py-2 text-center text-lg font-semibold text-slate-900 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
              />
              <button
                type="button"
                onClick={() =>
                  jumpToPage((displayPage?.pageNumber ?? pageNumber) + 1)
                }
                className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 active:scale-[0.98] dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
              >
                पुढील
              </button>
            </div>
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-sm font-semibold text-slate-600 dark:text-slate-300">
              विषय निवडा
            </span>
            <select
              value={selectedTheme}
              onChange={(event) => handleThemeChange(event.target.value)}
              className="w-full rounded-xl border border-slate-200 px-4 py-2 text-base text-slate-800 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
            >
              {themeOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-sm font-semibold text-slate-600 dark:text-slate-300">
              शब्दशोध (थीम, स्थान, उद्धरण)
            </span>
            <input
              type="text"
              value={searchTerm}
              onChange={(event) => handleSearchChange(event.target.value)}
              placeholder="उदा. शिकागो, सेवा, निर्भयता…"
              className="w-full rounded-xl border border-slate-200 px-4 py-2 text-base text-slate-800 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
            />
          </label>
        </div>

        <div className="mt-8">
          <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
            <span>वाचन प्रगती</span>
            <span>{progress.toFixed(0)}%</span>
          </div>
          <div className="mt-2 h-3 rounded-full bg-slate-100 dark:bg-slate-800">
            <div
              className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-sky-500 to-indigo-500 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </section>

      <article className="rounded-3xl border border-slate-200 bg-white/95 p-8 shadow-xl shadow-slate-200 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/80 dark:shadow-none">
        {!displayPage ? (
          <div className="py-12 text-center text-lg font-semibold text-slate-500 dark:text-slate-300">
            निवडलेल्या शोध निकषांसाठी कोणतीही माहिती उपलब्ध नाही. कृपया शोध मर्यादा बदलून पुन्हा प्रयत्न करा.
          </div>
        ) : (
          <>
            <header className="border-b border-slate-100 pb-6 dark:border-slate-800">
              <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                पृष्ठ {displayPage.pageNumber} · {displayPage.theme}
              </p>
          <h3 className="mt-2 text-3xl font-semibold text-slate-950 dark:text-slate-100">
            {displayPage.title}
          </h3>
          <p className="mt-4 text-lg leading-8 text-slate-700 dark:text-slate-300">
            {displayPage.summary}
          </p>

          <dl className="mt-6 grid gap-4 text-sm text-slate-600 dark:text-slate-300 md:grid-cols-3">
            <div className="rounded-2xl bg-slate-50 px-4 py-3 dark:bg-slate-800/70">
              <dt className="font-semibold text-slate-500 dark:text-slate-400">
                कालखंड
              </dt>
              <dd className="text-base font-medium text-slate-800 dark:text-slate-200">
                इ.स. {displayPage.year}
              </dd>
            </div>
            <div className="rounded-2xl bg-slate-50 px-4 py-3 dark:bg-slate-800/70">
              <dt className="font-semibold text-slate-500 dark:text-slate-400">
                स्थळ / घटना
              </dt>
              <dd className="text-base font-medium text-slate-800 dark:text-slate-200">
                {displayPage.location} · {displayPage.event}
              </dd>
            </div>
            <div className="rounded-2xl bg-slate-50 px-4 py-3 dark:bg-slate-800/70">
              <dt className="font-semibold text-slate-500 dark:text-slate-400">
                प्रेरणादायी व्यक्तिमत्त्व
              </dt>
              <dd className="text-base font-medium text-slate-800 dark:text-slate-200">
                {displayPage.mentor}
              </dd>
            </div>
          </dl>
            </header>

            <section className="mt-8 space-y-6 text-base leading-8 text-slate-700 dark:text-slate-300">
              {displayPage.paragraphs.map((paragraph, idx) => (
                <p key={idx} className="text-lg leading-9">
              {paragraph}
            </p>
          ))}
            </section>

        <section className="mt-10 grid gap-8 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
          <div className="rounded-2xl border border-emerald-100 bg-emerald-50/80 p-6 dark:border-emerald-900/40 dark:bg-emerald-900/20">
            <h4 className="text-sm font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">
              प्रेरक उद्धरण
            </h4>
            <p className="mt-3 text-xl font-semibold text-emerald-900 dark:text-emerald-200">
              {`“${displayPage.quote}”`}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-6 dark:border-slate-700 dark:bg-slate-800/70">
            <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-400">
              कृती दिशानिर्देश
            </h4>
            <p className="mt-3 text-sm text-slate-700 dark:text-slate-300">
              {displayPage.callToAction}
            </p>
          </div>
        </section>

            <section className="mt-10 rounded-2xl border border-indigo-100 bg-indigo-50/60 p-6 dark:border-indigo-900/60 dark:bg-indigo-900/20">
              <h4 className="text-sm font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
                मुख्य निरीक्षणे
              </h4>
              <ul className="mt-4 space-y-3 text-base text-indigo-900 dark:text-indigo-100">
                {displayPage.insights.map((insight, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-indigo-500 dark:bg-indigo-300" />
                    <span>{insight}</span>
                  </li>
                ))}
              </ul>
            </section>
          </>
        )}
      </article>

      <section className="rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-lg shadow-slate-100 backdrop-blur dark:border-slate-800 dark:bg-slate-900/70 dark:shadow-none md:p-8">
        <header className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              सूचीपत्र
            </p>
            <h4 className="mt-1 text-xl font-semibold text-slate-900 dark:text-slate-100">
              जलद नेव्हिगेशन
            </h4>
          </div>
          <button
            type="button"
            onClick={() => {
              setSelectedTheme(themeOptions[0]);
              setSearchTerm("");
              setPageNumber(1);
            }}
            className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 active:scale-[0.98] dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
          >
            सर्व पृष्ठे
          </button>
        </header>

        <div className="max-h-[420px] overflow-y-auto pr-2">
          <div className="grid grid-cols-3 gap-3 text-sm sm:grid-cols-4 md:grid-cols-6">
            {filteredPages.map((page) => {
              const isActive = displayPage
                ? page.pageNumber === displayPage.pageNumber
                : false;
              return (
                <button
                  key={page.pageNumber}
                  type="button"
                  onClick={() => jumpToPage(page.pageNumber)}
                  className={`rounded-2xl border px-3 py-2 text-left transition ${
                    isActive
                      ? "border-emerald-500 bg-emerald-500/10 text-emerald-700 shadow-sm dark:border-emerald-400 dark:bg-emerald-400/10 dark:text-emerald-200"
                      : "border-slate-200 bg-white/70 hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800/70 dark:hover:bg-slate-700/70"
                  }`}
                >
                  <span className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                    पृष्ठ {page.pageNumber}
                  </span>
                  <span className="mt-1 block text-sm font-semibold text-slate-800 dark:text-slate-200">
                    {page.theme}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
