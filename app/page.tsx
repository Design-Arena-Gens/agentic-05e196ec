import { bookMetadata, bookPages } from "@/data/book";
import { PageExplorer } from "@/components/PageExplorer";

export default function Home() {
  const totalPages = bookPages.length;
  const sections = [
    {
      label: "लेखनाची प्रेरणा",
      value: bookMetadata.subtitle,
    },
    {
      label: "आवृत्ती",
      value: `${bookMetadata.version} · ${bookMetadata.lastUpdated}`,
    },
    {
      label: "समर्पण",
      value: bookMetadata.dedication,
    },
  ];

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-slate-100 font-sans text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <div className="pointer-events-none absolute inset-x-0 top-[-10rem] -z-10 blur-3xl">
        <div className="mx-auto h-[24rem] max-w-5xl bg-gradient-to-r from-emerald-400/40 via-sky-400/30 to-indigo-500/40 opacity-70" />
      </div>

      <main className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-6 pb-24 pt-20 md:px-10 lg:px-12">
        <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white/80 p-10 shadow-xl shadow-slate-200 backdrop-blur dark:border-slate-800 dark:bg-slate-900/70 dark:shadow-none md:p-14">
          <div className="grid gap-10 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] md:gap-16">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-emerald-600 dark:text-emerald-400">
                {bookMetadata.author}
              </p>
              <h1 className="mt-4 text-4xl font-bold leading-tight text-slate-950 dark:text-white md:text-5xl">
                {bookMetadata.title}
              </h1>
              <p className="mt-6 text-lg leading-8 text-slate-700 dark:text-slate-300">
                {bookMetadata.description}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4 text-sm font-semibold text-slate-600 dark:text-slate-300">
                <span className="rounded-full bg-emerald-100 px-4 py-2 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-200">
                  ३०० पृष्ठांची समग्र निर्मिती
                </span>
                <span className="rounded-full bg-indigo-100 px-4 py-2 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-200">
                  {totalPages} पृष्ठे · डिजिटल आवृत्ती
                </span>
              </div>
            </div>

            <div className="space-y-6 rounded-2xl border border-slate-200 bg-slate-50/90 p-6 dark:border-slate-700 dark:bg-slate-800/70">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                संदर्भ माहिती
              </h2>
              <dl className="space-y-4 text-sm text-slate-700 dark:text-slate-300">
                {sections.map((section) => (
                  <div key={section.label}>
                    <dt className="font-semibold text-slate-500 dark:text-slate-400">
                      {section.label}
                    </dt>
                    <dd className="mt-1 leading-7">{section.value}</dd>
                  </div>
                ))}
                <div>
                  <dt className="font-semibold text-slate-500 dark:text-slate-400">
                    संकलन
                  </dt>
                  <dd className="mt-1 leading-7">{bookMetadata.compiledBy}</dd>
                </div>
              </dl>
            </div>
          </div>
        </section>

        <PageExplorer />
      </main>
    </div>
  );
}
