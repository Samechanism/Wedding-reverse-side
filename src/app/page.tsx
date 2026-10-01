import RSVPForm from "@/components/RSVPForm";

const photos = [
  { title: "Good moments", className: "photo-one" },
  { title: "Together", className: "photo-two" },
  { title: "Cheers", className: "photo-three" }
];

export default function HomePage() {
  return (
    <main>
      <nav className="fixed top-0 z-20 flex w-full items-center justify-between px-6 py-5 text-white md:px-12">
        <a href="#top" className="font-display text-lg tracking-[0.2em]">G&C</a>
        <div className="hidden gap-8 text-xs tracking-[0.2em] md:flex">
          <a href="#story" className="transition-opacity hover:opacity-60">STORY</a>
          <a href="#details" className="transition-opacity hover:opacity-60">DETAILS</a>
          <a href="#rsvp" className="transition-opacity hover:opacity-60">RSVP</a>
        </div>
      </nav>

      <section id="top" className="hero flex min-h-[92vh] items-end px-6 pb-16 md:px-16 md:pb-24">
        <div className="relative z-10 max-w-3xl text-white">
          <p className="mb-5 text-xs tracking-[0.35em] text-white/75">A DAY TO REMEMBER</p>
          <h1 className="font-display text-6xl leading-[0.95] md:text-9xl">Gather<br /><i>&amp; Celebrate</i></h1>
          <p className="mt-8 max-w-md text-sm leading-7 text-white/80">大切な人たちと、笑って、語って、乾杯する。<br />そんな特別な一日をご一緒しませんか。</p>
        </div>
        <a href="#story" className="absolute bottom-8 right-8 z-10 text-[10px] tracking-[0.25em] text-white/70 md:right-16">SCROLL ↓</a>
      </section>

      <section id="story" className="mx-auto max-w-5xl px-6 py-24 md:py-36">
        <p className="eyebrow">THE STORY</p>
        <div className="mt-8 grid gap-10 md:grid-cols-[1fr_1.3fr] md:items-end">
          <h2 className="font-display text-4xl leading-tight text-ink md:text-6xl">A little party,<br /><i>a lot of joy.</i></h2>
          <p className="max-w-lg text-sm leading-8 text-stone-600">節目を迎えるこの日に、これまでお世話になった皆さまと楽しい時間を過ごしたく、小さなパーティーを開くことにしました。気取らず、肩の力を抜いて。思い出に残る夜を一緒に作れたら嬉しいです。</p>
        </div>
      </section>

      <section id="details" className="bg-[#ebe8df] px-6 py-24 md:py-32">
        <div className="mx-auto max-w-5xl">
          <p className="eyebrow">THE DETAILS</p>
          <div className="mt-10 grid gap-px overflow-hidden rounded-sm bg-stone-400/30 md:grid-cols-3">
            <div className="bg-[#ebe8df] p-8"><p className="label">WHEN</p><p className="mt-5 font-display text-2xl">Saturday, 14<br />November 2026</p><p className="mt-4 text-sm text-stone-600">17:00 doors open<br />17:30 start</p></div>
            <div className="bg-[#ebe8df] p-8"><p className="label">WHERE</p><p className="mt-5 font-display text-2xl">The Garden<br />Room</p><p className="mt-4 text-sm text-stone-600">東京都渋谷区神宮前 0-0-0<br />表参道駅より徒歩5分</p></div>
            <div className="bg-[#ebe8df] p-8"><p className="label">DRESS CODE</p><p className="mt-5 font-display text-2xl">Come as<br /><i>you are.</i></p><p className="mt-4 text-sm text-stone-600">あなたらしい装いで<br />お越しください。</p></div>
          </div>
          <div className="mt-10 flex flex-col justify-between gap-5 border-t border-stone-400/50 pt-6 text-sm text-stone-600 md:flex-row"><span>ACCESS / 表参道駅 A2出口から徒歩5分</span><a href="#rsvp" className="font-bold tracking-[0.15em] text-ink underline underline-offset-4">RSVPへ進む →</a></div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-24 md:py-32">
        <p className="eyebrow">MOMENTS</p>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {photos.map((photo) => <div key={photo.title} className={`photo-card ${photo.className}`}><span>{photo.title}</span></div>)}
        </div>
      </section>

      <section id="rsvp" className="bg-[#2f3935] px-6 py-24 text-white md:py-32">
        <div className="mx-auto max-w-2xl">
          <p className="eyebrow text-[#d4b5a6]">RÉPONDEZ S&apos;IL VOUS PLAÎT</p>
          <h2 className="mt-6 font-display text-5xl md:text-7xl">Will you join us?</h2>
          <p className="mt-6 text-sm leading-7 text-white/65">出欠のお返事をお聞かせください。<br />ご都合が合えば、ぜひご一緒しましょう。</p>
          <RSVPForm />
        </div>
      </section>

      <footer className="bg-[#2f3935] px-6 pb-10 text-center text-xs tracking-[0.2em] text-white/40">GATHER &amp; CELEBRATE · 2026</footer>
    </main>
  );
}
