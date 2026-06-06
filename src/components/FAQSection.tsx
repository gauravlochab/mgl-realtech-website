"use client";

import { useState } from "react";

/* -- FAQ data -------------------------------------------------------- */

const faqs = [
  {
    question: "What types of properties does MGL Realtech develop?",
    answer:
      "MGL Realtech specializes in premium residential plots, luxury villa floors, and strategic commercial developments across North NCR, with a focus on the Kharkhoda-Sonipat corridor near NH-344P.",
  },
  {
    question: "What makes MGL Realtech different from other developers?",
    answer:
      "MGL Realtech combines 7+ years of real estate expertise with a commitment to quality construction, transparent dealings, and customer-first approach. Every project is built with premium materials and thoughtful planning.",
  },
  {
    question: "Where are MGL Realtech projects located?",
    answer:
      "Our projects are strategically located near NH-344P in Kharkhoda, Sonipat (Haryana), offering excellent connectivity to Delhi NCR while being surrounded by developing infrastructure and growth corridors.",
  },
  {
    question: "What support does MGL Realtech provide to buyers?",
    answer:
      "We provide end-to-end support including site visits, documentation assistance, financing guidance, and 24/7 customer service. Our team ensures a transparent and hassle-free buying experience from booking to possession.",
  },
];

/* -- inline styles ---------------------------------------------------- */

const styles = `
/* -- FAQ Section ------------------------------------------------------ */
.faq {
  padding: 10rem 0;
}

.faq-heading {
  margin-bottom: 4rem;
}

.faq-heading .caption {
  margin-bottom: 1rem;
}

.faq-heading h2 {
  font-family: var(--font-serif), ui-serif, Georgia, serif;
  font-size: 4.75rem;
  font-weight: 400;
  line-height: 118%;
  letter-spacing: -0.03em;
  color: var(--white);
}

/* -- FAQ List --------------------------------------------------------- */
.faq-list {
  list-style: none;
}

.faq-item {
  border-top: 1px solid rgba(255, 255, 255, 0.12);
  padding: 2.5rem 0;
  transition: background 0.3s ease;
}

.faq-item:hover {
  background: rgba(255, 255, 255, 0.02);
}

.faq-item-header {
  display: flex;
  align-items: center;
  gap: 2rem;
  width: 100%;
}

.faq-number {
  font-family: var(--font-inter), ui-sans-serif, system-ui, sans-serif;
  font-size: 1.125rem;
  opacity: 0.3;
  flex-shrink: 0;
  white-space: nowrap;
}

.faq-question {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex: 1;
  cursor: pointer;
  background: transparent;
  border: none;
  color: white;
  padding: 0;
  text-align: left;
}

.faq-question h3 {
  font-family: var(--font-serif), ui-serif, Georgia, serif;
  font-size: 1.75rem;
  font-weight: 400;
  line-height: 130%;
  color: var(--white);
}

.faq-icon {
  flex-shrink: 0;
  width: 1.25rem;
  height: 1.25rem;
  margin-left: 1.5rem;
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  opacity: 0.5;
}

.faq-icon.open {
  transform: rotate(45deg);
}

.faq-answer-wrap {
  overflow: hidden;
  max-height: 0;
  transition: max-height 0.5s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s ease;
  opacity: 0;
}

.faq-answer-wrap.open {
  max-height: 500px;
  opacity: 1;
}

.faq-answer-wrap p {
  font-family: var(--font-inter), ui-sans-serif, system-ui, sans-serif;
  font-size: 1.125rem;
  font-weight: 300;
  line-height: 170%;
  opacity: 0.65;
  padding-top: 1.5rem;
  max-width: 40rem;
  /* offset to align with question text (number width + gap) */
  margin-left: calc(1.125rem * 3.5 + 2rem);
}

/* -- Mobile ----------------------------------------------------------- */
@media (max-width: 479px) {
  .faq {
    padding: 5rem 0;
  }

  .faq-heading h2 {
    font-size: 2rem;
  }

  .faq-item-header {
    gap: 1rem;
  }

  .faq-number {
    font-size: 0.875rem;
  }

  .faq-question h3 {
    font-size: 1.25rem;
  }

  .faq-answer-wrap p {
    font-size: 1rem;
    margin-left: 0;
  }
}
`;

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <>
      <style>{styles}</style>

      <section className="faq">
        <div className="page-padding">
          <div className="container">
            <div className="wrap">
              {/* -- Heading ------------------------------------------- */}
              <div className="faq-heading">
                <div className="caption">(FAQ)</div>
                <h2>Your Questions, Answered</h2>
              </div>

              {/* -- FAQ List ----------------------------------------- */}
              <div className="faq-list">
                {faqs.map((faq, index) => {
                  const isOpen = openIndex === index;

                  return (
                    <div className="faq-item" key={index}>
                      <div className="faq-item-header">
                        <span className="faq-number">( {index + 1} )</span>
                        <button
                          className="faq-question"
                          onClick={() => toggle(index)}
                          aria-expanded={isOpen}
                        >
                          <h3>{faq.question}</h3>
                          <svg
                            className={`faq-icon${isOpen ? " open" : ""}`}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <line x1="12" y1="5" x2="12" y2="19" />
                            <line x1="5" y1="12" x2="19" y2="12" />
                          </svg>
                        </button>
                      </div>
                      <div
                        className={`faq-answer-wrap${isOpen ? " open" : ""}`}
                      >
                        <p>{faq.answer}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default FAQSection;
