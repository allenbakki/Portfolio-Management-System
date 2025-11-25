import React from "react";
import "./template_01.css";

const mockData = {
  general: {
    name: "Your Name",
    professionalTitle: "Your Professional Title",
    email: "Your Email",
    location: "Your Location",
    linkedIn: "Your LinkedIn",
  },
  bio: {
    about: "A short introduction about yourself...",
  },
  workExperience: [
    {
      title: "Role",
      company: "Company",
      duration: "Start Year - End Year",
      description: "A short description...",
    },
  ],
  projects: [
    {
      title: "Better Bioinformatics",
      description:
        "Training A Bioinformatics Specific LLM",
      link: "https://google.com",
    },
  ],
  education: [
    { 
      degree: "Your Degree", 
      university: "Your University", 
      duration: "Start Year - End Year" 
    },
  ],
};

export default function Template01({ data }) {

  const finalData = data?.portfolio || {};

  const g = {
    ...mockData.general,
    ...finalData.general,
    professionalTitle:
      finalData.general?.professionalTitle || mockData.general.professionalTitle,
    linkedIn: finalData.general?.linkedIn || mockData.general.linkedIn,
  };

  const about = finalData.general?.aboutMe || mockData.bio.about;

  const xp = finalData.workExperience?.length > 0 ? finalData.workExperience : mockData.workExperience;

  const projects = finalData.projects?.length > 0 ? finalData.projects : mockData.projects;

  const edu = finalData.education?.length > 0 ? finalData.education : mockData.education;

  return (
    <div className="folio-template">
      <main className="folio-shell">
        <section className="folio-hero">
          <div>
            <h1 className="folio-hero__name">{g.name || "Your Name"}</h1>
            {g.professionalTitle && <p className="folio-hero__title">{g.professionalTitle}</p>}
            <div className="folio-hero__meta" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {g.location && <span className="folio-hero__location">{g.location}</span>}
              {g.linkedIn && (
                <div>
                  <span style={{ color: "blue", fontWeight: "600" }}>LinkedIn: </span>
                  <span>{g.linkedIn}</span>
                </div>
              )}
              {g.email && (
                <div>
                  <span style={{ color: "blue", fontWeight: "600" }}>Email: </span>
                  <span>{g.email}</span>
                </div>
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
                      {item.title}{" "}
                      <span className="xp-item__company">
                        — {item.company}
                      </span>
                    </div>
                    <div className="xp-item__meta">
                      {item.duration}
                    </div>
                  </div>
                  {item.description && (
                    <p style={{ marginTop: '8px' }}>{item.description}</p>
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
                      backgroundImage: p.image
                        ? `url(${p.image})`
                        : "linear-gradient(180deg,#eef2ff,#f8fafc)",
                    }}
                  />
                  <div className="proj-card__body">
                    <h3 className="proj-card__title">{p.title}</h3>
                    <p className="proj-card__desc">{p.description}</p>

                    {(p.link) && (
                      <div className="proj-card__links">
                        <a className="proj-card__link" href={p.link} target="_blank" rel="noreferrer">View →</a>
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
                  {e.university}
                  {e.duration ? ` · ${e.duration}` : ""}
                </div>
              </div>
            ))}
          </section>
        )}
      </main>
    </div>
  );
}
