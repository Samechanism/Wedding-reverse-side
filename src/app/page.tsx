import Image from "next/image";
import RSVPForm from "@/components/RSVPForm";
import couplePhoto1 from "../../image/2.jpg";
import couplePhoto2 from "../../image/3.jpg";
import couplePhoto3 from "../../image/10.jpg";

export default function HomePage() {
  return (
    <main className="site-shell">
      <nav className="site-nav">
        <a href="#top" className="site-mark">B-SIDE</a>
        <div className="nav-links">
          <a href="#details">DETAILS</a>
          <a href="#gallery">PHOTOS</a>
          <a href="#rsvp">RSVP</a>
        </div>
      </nav>

      <section id="top" className="hero">
        <div className="hero-copy">
          <p className="hero-kicker">SHOTA &amp; HIKARU PRESENT</p>
          <h1>
            <span>The</span>
            B-Side
            <em>Reception</em>
          </h1>
          <div className="hero-meta">
            <span>2026.11.21 SAT</span>
            <span>HIROSHIMA</span>
          </div>
        </div>
        <div className="hero-image" role="img" aria-label="ShotaとHikaruの写真">
          <Image
            className="hero-photo"
            src={couplePhoto1}
            alt=""
            fill
            preload
            sizes="(max-width: 760px) 100vw, 50vw"
          />
          <p>Shota <i>&amp;</i> Hikaru</p>
        </div>
        <a href="#details" className="scroll-cue">SCROLL TO THE B-SIDE ↓</a>
      </section>

      <section className="intro">
        <p className="section-number">01 / INVITATION</p>
        <div className="intro-copy">
          <p className="intro-lead">いつものふたりの、<br />いつもより少し特別な一日。</p>
          <div>
            <p>ささやかなパーティーを開きます。<br />美味しい食事と音楽を囲んで、<br />皆さまと楽しい時間を過ごせたら嬉しいです。</p>
            <p className="host-signature">Shota &amp; Hikaru</p>
          </div>
        </div>
      </section>

      <section className="message-section">
        <div className="message-photo" role="img" aria-label="ShotaとHikaruの写真">
          <Image
            className="message-photo-image"
            src={couplePhoto2}
            alt=""
            fill
            sizes="(max-width: 760px) 100vw, 50vw"
          />
        </div>
        <div className="message-copy">
          <p className="section-number">A MESSAGE FROM US</p>
          <h2>To our<br /><em>favorite people.</em></h2>
          <div className="message-body">
            <p>いつも私たちを支えてくださる<br />大切な皆さまへ</p>
            <p>日頃の感謝を直接お伝えしたく、<br />ささやかなパーティーを開くことにしました。</p>
            <p>かしこまった式ではなく、<br />美味しい食事と音楽を楽しみながら、<br />たくさん笑って過ごせる一日にしたいと思っています。</p>
            <p>皆さまと同じ時間を過ごせることを、<br />心から楽しみにしています。</p>
          </div>
          <p className="host-signature">Shota &amp; Hikaru</p>
        </div>
      </section>

      <section id="details" className="details-section">
        <div className="section-heading">
          <p className="section-number">02 / INFORMATION</p>
          <h2>Party<br /><em>Details</em></h2>
        </div>
        <div className="detail-grid">
          <article>
            <p className="detail-label">DATE &amp; TIME</p>
            <p className="detail-main">November 21<br />Saturday, 2026</p>
            <p className="detail-sub">OPEN 12:00<br />START 12:30</p>
          </article>
          <article>
            <p className="detail-label">DRESS CODE</p>
            <p className="detail-main">Smart<br />Casual</p>
            <p className="detail-sub">少しだけおめかしして、<br />あなたらしい装いで。</p>
          </article>
        </div>
        <div className="venue-heading">
          <p className="detail-label">VENUE &amp; ACCESS</p>
          <p>広島電鉄 胡町駅から徒歩5分</p>
        </div>
        <div className="map-frame">
          <iframe
            title="Lit -ASOBIYA- 周辺地図"
            src="https://www.google.com/maps?q=広島市中区薬研堀7-9+三和ビル&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <div className="map-card">
            <p className="detail-label">LOCATION</p>
            <p>Lit <span>-ASOBIYA-</span></p>
            <address>広島市中区薬研堀7-9<br />三和ビル4階</address>
            <p className="map-access">広島電鉄 胡町駅より徒歩5分</p>
            <a href="https://www.google.com/maps/search/?api=1&query=広島市中区薬研堀7-9+三和ビル" target="_blank" rel="noreferrer">
              大きな地図で見る ↗
            </a>
          </div>
        </div>
      </section>

      <section id="gallery" className="gallery-section">
        <div className="section-heading">
          <p className="section-number">03 / SNAPSHOTS</p>
          <h2>Us, and the<br /><em>good times.</em></h2>
        </div>
        <div className="gallery-grid">
          <figure className="gallery-photo gallery-host">
            <Image
              className="gallery-host-image"
              src={couplePhoto3}
              alt=""
              fill
              sizes="(max-width: 760px) 100vw, 66vw"
            />
            <figcaption>Shota &amp; Hikaru</figcaption>
          </figure>
          <figure className="gallery-photo gallery-party">
            <figcaption>Good music</figcaption>
          </figure>
          <figure className="gallery-photo gallery-table">
            <figcaption>Good food</figcaption>
          </figure>
        </div>
        <p className="photo-note">写真は今後追加・調整予定です。</p>
      </section>

      <section id="rsvp" className="rsvp-section">
        <div className="rsvp-heading">
          <p className="section-number">04 / RSVP</p>
          <h2>Will you<br /><em>join us?</em></h2>
          <p>11月14日（土）までに<br />出欠をお知らせください。</p>
        </div>
        <div className="rsvp-form-wrap">
          <RSVPForm />
        </div>
      </section>

      <footer>
        <p>THE B-SIDE RECEPTION</p>
        <p>SHOTA &amp; HIKARU · 2026.11.21</p>
      </footer>
    </main>
  );
}
