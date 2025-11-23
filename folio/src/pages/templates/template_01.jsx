import React from "react";
import { GiButterfly } from "react-icons/gi";
import "./template_01.css";

const mockData = {
  general: {
    name: "Ramez Masad",
    title: "Student",
    email: "ramez@example.com",
    location: "STL, MO",
    linkedin: "",
    avatarUrl: "",
  },
  bio: {
    about:
      "Student at SLU",
  },
  experience: [
    {
      role: "Student",
      company: "SLU",
      link: "#",
      start: "2025",
      end: "Present",
      location: "STL",
      bullets: [
        "Bullet 1.",
        "Bullet 2.",
        "Bullet 3.",
      ],
    },
    {
      role: "Job Title 2",
      company: "company 2",
      link: "#",
      start: "2025",
      end: "Present",
      location: "STL",
      bullets: [
        "Bullet 1.",
        "Bullet 2.",
        "Bullet 3.",
      ],
    },
  ],
  projects: [
    {
      title: "Portfolio Builder",
      summary:
        "A React + Firebase starter that helps students and freelancers launch a polished portfolio in minutes.",
      tags: ["React", "Firebase"],
      image: "",
      liveUrl: "#",
      repoUrl: "#",
    },
    {
      title: "Project 2",
      summary:
        "project description goes here.",
      tags: ["Language 1", "Language 2"],
      image: "",
      liveUrl: "#",
      repoUrl: "#",
    },
  ],
  education: [
    { degree: "MS, Artificial Intelligence", school: "SLU", start: "2025", end: "2026" },
  ],
};

export default function Template01({ data = mockData }) {
  const g = data.general || {};
  const about = data.bio?.about || "";
  const xp = data.experience || [];
  const projects = data.projects || [];
  const edu = data.education || [];

  return (
    <div className="folio-template">
      {/* <nav className="folio-nav">
        <div className="folio-nav__inner">
          <div className="folio-nav__brand">
            <GiButterfly /> Folio
          </div>
          <div className="folio-nav__links">
            <a className="folio-nav__link" href="#about">About</a>
            <a className="folio-nav__link" href="#experience">Experience</a>
            <a className="folio-nav__link" href="#projects">Projects</a>
            <a className="folio-nav__link" href="#education">Education</a>
            <a className="folio-nav__link" href="#contact">Contact</a>
          </div>
        </div>
      </nav> */}

      <main className="folio-shell">
        <section className="folio-hero">
          <img
            className="folio-hero__avatar"
            src={g.avatarUrl || "/images/profile-placeholder.png"}
            alt={`${g.name || "User"} avatar`}
          />
          <div>
            <h1 className="folio-hero__name">{g.name || "Your Name"}</h1>
            {g.title && <p className="folio-hero__title">{g.title}</p>}
            <div className="folio-hero__meta">
              {g.location && <span>{g.location}</span>}
              {g.linkedin && (
                <a href={g.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
              )}
              {g.email && (
                <a href={`mailto:${g.email}`} className="folio-hero__contact">Contact</a>
              )}
            </div>
          </div>
        </section>

        {about && (
          <section id="about" className="folio-section">
            <h2 className="folio-section__title">About</h2>
            <div className="folio-about">
              <p>{about}</p>
            </div>
          </section>
        )}

        {xp.length > 0 && (
          <section id="experience" className="folio-section">
            <h2 className="folio-section__title">Experience</h2>
            <div className="folio-experience">
              {xp.map((item, idx) => (
                <article className="xp-item" key={idx}>
                  <div className="xp-item__head">
                    <div className="xp-item__role">
                      {item.role}{" "}
                      <span className="xp-item__company">
                        — {item.link ? (
                          <a href={item.link} target="_blank" rel="noreferrer">{item.company}</a>
                        ) : (
                          item.company
                        )}
                      </span>
                    </div>
                    <div className="xp-item__meta">
                      {item.start} – {item.end || "Present"}
                      {item.location ? ` · ${item.location}` : ""}
                    </div>
                  </div>
                  {item.bullets?.length > 0 && (
                    <ul className="xp-item__bullets">
                      {item.bullets.map((b, i) => <li key={i}>{b}</li>)}
                    </ul>
                  )}
                </article>
              ))}
            </div>
          </section>
        )}

        {projects.length > 0 && (
          <section id="projects" className="folio-section">
            <h2 className="folio-section__title">Projects</h2>
            <div className="proj-grid">
              {projects.map((p, idx) => (
                <article className="proj-card" key={idx}>
                  <div
                    className="proj-card__thumb"
                    style={{
                      backgroundImage: p.image ? `url(${p.image})` : "linear-gradient(180deg,#eef2ff,#f8fafc)",
                    }}
                  />
                  <div className="proj-card__body">
                    <h3 className="proj-card__title">{p.title}</h3>
                    <p className="proj-card__desc">{p.summary}</p>

                    {p.tags?.length > 0 && (
                      <div className="proj-card__tags">
                        {p.tags.map((t, i) => (
                          <span key={i} className="proj-card__tag">{t}</span>
                        ))}
                      </div>
                    )}

                    {(p.liveUrl || p.repoUrl) && (
                      <div className="proj-card__links">
                        {p.liveUrl && (
                          <a className="proj-card__link" href={p.liveUrl} target="_blank" rel="noreferrer">View →</a>
                        )}
                        {p.repoUrl && (
                          <a className="proj-card__link" href={p.repoUrl} target="_blank" rel="noreferrer">Code</a>
                        )}
                      </div>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {edu.length > 0 && (
          <section id="education" className="folio-section">
            <h2 className="folio-section__title">Education</h2>
            {edu.map((e, i) => (
              <div className="edu-item" key={i}>
                <div className="edu-item__deg">{e.degree}</div>
                <div className="edu-item__meta">
                  {e.school}
                  {e.start || e.end ? ` · ${e.start || ""}${e.start && e.end ? " – " : ""}${e.end || ""}` : ""}
                </div>
              </div>
            ))}
          </section>
        )}

        <footer id="contact" className="folio-footer">
          <a className="folio-footer__cta" href={`mailto:${g.email || ""}`}>Contact Me</a>
          {g.linkedin && <a href={g.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>}
          <span>© {new Date().getFullYear()} · {g.name || "Your Name"}</span>
        </footer>
      </main>
    </div>
  );
}
