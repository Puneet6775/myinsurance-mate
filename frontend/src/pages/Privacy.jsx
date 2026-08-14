import { Link } from 'react-router-dom'
import { useRef } from 'react'
import HeroIntro, { HeroItem } from '../components/HeroIntro.jsx'
import Reveal from '../components/Reveal.jsx'
import useHeroGsap from '../hooks/useHeroGsap.js'

const sections = [
  {
    title: 'Who we are',
    body: [
      'This website is operated by myInsurancemates, an insurance advisory helping families in India compare and place motor, health and life cover with IRDAI-registered insurers.',
      'Policies are issued by those insurers, not by us. This policy explains how we handle personal information collected through myinsurancemates.com and related forms.',
    ],
  },
  {
    title: 'Information we collect',
    body: [
      'When you write to us, request a review, or join the mailing list, we may collect your name, email, phone number, city, the type of cover you are interested in, and any notes you choose to share about your household or existing policies.',
      'We also receive technical data that your browser sends automatically, such as IP address, device type and pages visited, so we can keep the site working and understand how it is used.',
    ],
  },
  {
    title: 'How we use it',
    body: [
      'We use this information to respond to you, prepare a cover recommendation, follow up on a quote or claim, send notes you have asked for, and improve the website.',
      'We do not sell your personal information. We share what is needed with IRDAI-registered insurers and service partners only to place or service a policy you have asked us to work on.',
    ],
  },
  {
    title: 'Legal basis and Indian law',
    body: [
      'We process personal data to take steps at your request before a contract, to perform services you ask for, and where we have a legitimate interest in running an advisory practice.',
      'We aim to handle personal data in line with the Digital Personal Data Protection Act, 2023 and applicable IRDAI rules on customer information. Insurers who issue your policy will have their own privacy notices, which also apply once a proposal is submitted to them.',
    ],
  },
  {
    title: 'How long we keep it',
    body: [
      'Contact, quote and newsletter records are kept for as long as we need them to serve you, meet legal or regulatory requirements, or resolve a dispute. You can ask us to update or delete your details where the law allows.',
    ],
  },
  {
    title: 'Cookies and the site',
    body: [
      'This site uses only what is needed to run the pages and remember basic preferences. We do not run advertising trackers. You can block cookies in your browser; some features may then work less well.',
    ],
  },
  {
    title: 'Your choices',
    body: [
      'You may ask to see, correct or erase the information we hold about you, or withdraw consent for the newsletter. Write to hello@myinsurancemates.com and we will respond within a reasonable time.',
    ],
  },
  {
    title: 'Children',
    body: [
      'This website is meant for adults. We do not knowingly collect personal information from children. If a child is named on a policy, that information is collected from the parent or guardian.',
    ],
  },
  {
    title: 'Changes',
    body: [
      'We may update this page when our practice or the law changes. The date at the top will tell you when it was last revised.',
    ],
  },
]

export default function Privacy() {
  const heroRef = useRef(null)
  useHeroGsap(heroRef)

  return (
    <>
      <section className="page-hero" ref={heroRef}>
        <HeroIntro className="container">
          <HeroItem><div className="eyebrow">Legal</div></HeroItem>
          <HeroItem><h1>Privacy Policy</h1></HeroItem>
          <HeroItem>
            <p className="lead">
              How myInsurancemates collects, uses and looks after the information you share with us.
              Last updated 14 August 2026.
            </p>
          </HeroItem>
        </HeroIntro>
      </section>

      <section className="section section-cream" style={{ paddingTop: 20 }}>
        <div className="container legal">
          {sections.map((block, i) => (
            <Reveal key={block.title} delay={i * 0.04}>
              <article className="legal-block">
                <h2>{block.title}</h2>
                {block.body.map((p) => <p key={p}>{p}</p>)}
              </article>
            </Reveal>
          ))}
          <Reveal>
            <article className="legal-block">
              <h2>Contact</h2>
              <p>
                Questions about this policy: <a href="mailto:hello@myinsurancemates.com">hello@myinsurancemates.com</a>
                {' '}or the <Link to="/contact">Contact</Link> page. This website is powered by{' '}
                <a href="https://webnestmedia.in" target="_blank" rel="noreferrer">Webnest Media</a>.
              </p>
            </article>
          </Reveal>
        </div>
      </section>
    </>
  )
}
