import React, { useState, useRef } from 'react'
import confetti from 'canvas-confetti'
import {
  Download,
  Mail,
  MapPin,
  ExternalLink,
  Copy,
  Check,
  FileText,
  Eye,
  QrCode,
  UserCheck
} from 'lucide-react'

// Official LinkedIn Icon SVG Component
function LinkedInIcon({ size = 17, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  )
}

export default function App() {
  const [activeTab, setActiveTab] = useState('overview')
  const [copiedText, setCopiedText] = useState('')
  const [toastMessage, setToastMessage] = useState('')
  const [showPreviewModal, setShowPreviewModal] = useState(false)
  const [showQrModal, setShowQrModal] = useState(false)

  // 3D Card tilt ref
  const cardRef = useRef(null)

  // Subtle interactive 3D card tilt
  const handleMouseMove = (e) => {
    if (!cardRef.current || window.innerWidth < 1024) return
    const card = cardRef.current
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    const rotateX = (-y / rect.height) * 4
    const rotateY = (x / rect.width) * 4
    card.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
  }

  const handleMouseLeave = () => {
    if (!cardRef.current) return
    cardRef.current.style.transform = `perspective(1200px) rotateX(0deg) rotateY(0deg)`
  }

  // Toast handler
  const triggerToast = (msg) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(''), 2600)
  }

  // Copy handler
  const handleCopy = (text, label) => {
    navigator.clipboard.writeText(text)
    setCopiedText(label)
    triggerToast(`Copied ${label} to clipboard`)
    setTimeout(() => setCopiedText(''), 2200)
  }

  // CV Download with gentle confetti
  const handleCvDownload = () => {
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.75 },
      colors: ['#2563eb', '#38bdf8', '#0f172a']
    })
    triggerToast('CV download initiated')
  }

  // vCard generator
  const handleDownloadVCard = () => {
    const vCardData = `BEGIN:VCARD
VERSION:3.0
FN:Omar Hassan Mahmoud Mohammed
N:Mohammed;Omar Hassan Mahmoud;;;
TITLE:Full Stack Developer
EMAIL;TYPE=INTERNET,WORK:omarhassan@asher-jobs.com
URL:https://www.linkedin.com/in/omar-hassan-mahmoud-a50bb9204/
ADR;TYPE=WORK:;;Cairo;Egypt;;;
NOTE:Specialized Diploma (AI Based software Development) - Software Engineer & Full Stack Developer
END:VCARD`

    const blob = new Blob([vCardData], { type: 'text/vcard;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', 'Omar_Hassan.vcf')
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
    triggerToast('Contact (.vcf) saved')
  }

  return (
    <>
      {/* Architectural Background */}
      <div className="canvas-grid" />

      {/* Main 3D Card Shell */}
      <div className="card-perspective-container">
        <main
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="executive-card"
        >
          <div className="card-layout">
            {/* ================= LEFT COLUMN ================= */}
            <aside className="left-col">
              <div className="monogram-watermark">OH</div>

              {/* Portrait & Status */}
              <div className="portrait-stage">
                <div className="portrait-halo">
                  <img
                    src="/profile.jpg"
                    alt="Omar Hassan Mahmoud Mohammed - Full Stack Developer"
                    className="portrait-img"
                  />
                </div>

                <div className="quick-meta">
                  <div>
                    <span className="meta-role-badge">Full Stack Developer</span>
                  </div>
                  <div className="location-snippet">
                    <MapPin size={13} />
                    <span>Cairo, Egypt • Remote Friendly</span>
                  </div>
                </div>
              </div>

              {/* Primary Direct Actions */}
              <div className="left-actions-group">
                <a
                  href="/Omar_Hassan_CV.pdf"
                  download="Omar_Hassan_CV.pdf"
                  onClick={handleCvDownload}
                  className="btn-primary-action"
                  title="Download unmodified official CV"
                >
                  <Download size={16} />
                  <span>Download CV (Official PDF)</span>
                </a>

                <button
                  onClick={() => setShowPreviewModal(true)}
                  className="btn-ghost-action"
                  title="Preview PDF CV directly"
                >
                  <Eye size={15} />
                  <span>Preview CV Online</span>
                </button>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                  <button
                    onClick={handleDownloadVCard}
                    className="btn-ghost-action"
                    style={{ padding: '0.65rem 0.5rem' }}
                    title="Add Omar to your phone contacts"
                  >
                    <UserCheck size={14} />
                    <span>Save Contact</span>
                  </button>

                  <button
                    onClick={() => setShowQrModal(true)}
                    className="btn-ghost-action"
                    style={{ padding: '0.65rem 0.5rem' }}
                    title="Mobile QR Code"
                  >
                    <QrCode size={14} />
                    <span>Scan QR</span>
                  </button>
                </div>
              </div>
            </aside>

            {/* ================= RIGHT COLUMN ================= */}
            <div className="right-col">
              {/* Header Details */}
              <div className="header-block">
                <span className="section-eyebrow">Professional Candidate Portfolio</span>
                <h1 className="candidate-name">Omar Hassan Mahmoud Mohammed</h1>
                <div className="primary-discipline">
                  <span>Full Stack Developer</span>
                  <span className="discipline-divider">•</span>
                  <span>Software Engineer</span>
                  <span className="discipline-divider">•</span>
                  <span>DevOps & AWS Cloud</span>
                </div>
              </div>

              {/* Highlighted Academic Credential */}
              <section className="diploma-card" aria-label="Academic Specialization">
                <div className="diploma-info">
                  <div className="diploma-kicker">Specialized Academic Program</div>
                  <div className="diploma-title">
                    Specialized Diploma (AI Based software Development)
                  </div>
                </div>
              </section>

              {/* Clean Contact Information Strips */}
              <section className="contact-strips" aria-label="Direct Contact Channels">
                {/* Email Address */}
                <div className="contact-strip-item">
                  <div className="strip-left">
                    <Mail size={16} className="strip-icon" />
                    <div className="strip-text">
                      <div className="strip-label">Direct Email</div>
                      <a
                        href="mailto:omarhassan@asher-jobs.com"
                        className="strip-value"
                        style={{ color: 'inherit', textDecoration: 'none' }}
                      >
                        omarhassan@asher-jobs.com
                      </a>
                    </div>
                  </div>
                  <button
                    onClick={() => handleCopy('omarhassan@asher-jobs.com', 'Email')}
                    style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', padding: 4 }}
                    title="Copy Email"
                    aria-label="Copy Email"
                  >
                    {copiedText === 'Email' ? <Check size={14} style={{ color: '#10b981' }} /> : <Copy size={14} />}
                  </button>
                </div>

                {/* LinkedIn Profile */}
                <a
                  href="https://www.linkedin.com/in/omar-hassan-mahmoud-a50bb9204/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-strip-item"
                  title="Open LinkedIn in new tab"
                >
                  <div className="strip-left">
                    <LinkedInIcon size={16} className="strip-icon" />
                    <div className="strip-text">
                      <div className="strip-label">LinkedIn Network</div>
                      <div className="strip-value">omar-hassan-mahmoud</div>
                    </div>
                  </div>
                  <ExternalLink size={14} style={{ opacity: 0.6 }} />
                </a>
              </section>

              {/* Editorial Navigation Tabs */}
              <nav className="editorial-tabs" aria-label="Sections">
                <button
                  className={`editorial-tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
                  onClick={() => setActiveTab('overview')}
                >
                  Overview & Credentials
                </button>
                <button
                  className={`editorial-tab-btn ${activeTab === 'stack' ? 'active' : ''}`}
                  onClick={() => setActiveTab('stack')}
                >
                  Technical Architecture
                </button>
                <button
                  className={`editorial-tab-btn ${activeTab === 'experience' ? 'active' : ''}`}
                  onClick={() => setActiveTab('experience')}
                >
                  Production Systems
                </button>
              </nav>

              {/* Tab Panel Display */}
              <div className="tab-panel-container">
                {activeTab === 'overview' && (
                  <div>
                    <p className="summary-lead" style={{ marginBottom: '1.1rem' }}>
                      Software Engineer and Full-Stack Developer with <strong>5 years of experience</strong> engineering responsive, resilient web platforms using <strong>React</strong>, <strong>Node.js</strong>, and <strong>Express.js</strong>. Solid foundation in cloud computing with <strong>AWS</strong>, <strong>Docker</strong> containerization, and <strong>Terraform</strong> Infrastructure as Code.
                    </p>
                    <div className="badges-wrap">
                      <span className="neat-badge featured">AWS Certified Cloud Practitioner</span>
                      <span className="neat-badge featured">Specialized Diploma in AI Development</span>
                      <span className="neat-badge">5 Years Engineering Exp.</span>
                      <span className="neat-badge">English (B2 CEFR)</span>
                      <span className="neat-badge">Arabic (Native)</span>
                    </div>
                  </div>
                )}

                {activeTab === 'stack' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                    <div>
                      <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: '0.4rem', fontWeight: 600 }}>
                        Frontend & UI
                      </div>
                      <div className="badges-wrap">
                        <span className="neat-badge featured">React.js</span>
                        <span className="neat-badge featured">Vite</span>
                        <span className="neat-badge">JavaScript (ES6+)</span>
                        <span className="neat-badge">HTML5 & CSS3</span>
                        <span className="neat-badge">Component Architecture</span>
                        <span className="neat-badge">Responsive Design</span>
                      </div>
                    </div>

                    <div>
                      <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: '0.4rem', fontWeight: 600 }}>
                        Backend, Cloud & DBs
                      </div>
                      <div className="badges-wrap">
                        <span className="neat-badge featured">Node.js</span>
                        <span className="neat-badge featured">Express.js</span>
                        <span className="neat-badge featured">AWS Cloud</span>
                        <span className="neat-badge featured">Docker</span>
                        <span className="neat-badge">Terraform</span>
                        <span className="neat-badge">PostgreSQL</span>
                        <span className="neat-badge">MongoDB</span>
                        <span className="neat-badge">Supabase</span>
                        <span className="neat-badge">REST APIs</span>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'experience' && (
                  <div>
                    <div className="compact-project">
                      <div className="compact-project-title">
                        <span>Full-Stack Web Applications</span>
                        <span style={{ fontSize: '0.74rem', fontFamily: 'var(--font-mono)', color: 'var(--accent)', fontWeight: 600 }}>React • Node.js</span>
                      </div>
                      <p className="compact-project-desc">
                        Built full-stack platforms with responsive interfaces, robust REST APIs, authentication, and database schemas.
                      </p>
                    </div>

                    <div className="compact-project">
                      <div className="compact-project-title">
                        <span>DevOps & Cloud Infrastructure</span>
                        <span style={{ fontSize: '0.74rem', fontFamily: 'var(--font-mono)', color: 'var(--accent)', fontWeight: 600 }}>AWS • Docker • Terraform</span>
                      </div>
                      <p className="compact-project-desc">
                        Containerized services, provisioned infrastructure with Terraform (IaC), and deployed high-availability workloads to AWS.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* CV Preview Modal */}
      {showPreviewModal && (
        <div className="modal-backdrop" onClick={() => setShowPreviewModal(false)}>
          <div className="modal-sheet" onClick={(e) => e.stopPropagation()}>
            <div className="modal-top">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600 }}>
                <FileText size={18} style={{ color: 'var(--accent)' }} />
                <span>Omar Hassan Mahmoud Mohammed — Official CV</span>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <a
                  href="/Omar_Hassan_CV.pdf"
                  download="Omar_Hassan_CV.pdf"
                  onClick={handleCvDownload}
                  className="btn-primary-action"
                  style={{ padding: '0.4rem 0.85rem', fontSize: '0.78rem' }}
                >
                  <Download size={14} />
                  <span>Download PDF</span>
                </a>
                <button
                  onClick={() => setShowPreviewModal(false)}
                  className="btn-ghost-action"
                  style={{ padding: '0.4rem 0.85rem', width: 'auto' }}
                >
                  ✕ Close
                </button>
              </div>
            </div>
            <iframe
              src="/Omar_Hassan_CV.pdf#toolbar=1"
              title="CV Document"
              className="modal-content-frame"
            />
          </div>
        </div>
      )}

      {/* Mobile QR Modal */}
      {showQrModal && (
        <div className="modal-backdrop" onClick={() => setShowQrModal(false)}>
          <div className="modal-sheet" style={{ maxWidth: '380px', height: 'auto', textAlign: 'center' }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-top">
              <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>Scan Contact Profile</span>
              <button
                onClick={() => setShowQrModal(false)}
                className="btn-ghost-action"
                style={{ padding: '0.3rem 0.6rem', width: 'auto' }}
              >
                ✕
              </button>
            </div>
            <div style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
              <div style={{ background: '#ffffff', padding: '14px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent('https://www.linkedin.com/in/omar-hassan-mahmoud-a50bb9204/')}`}
                  alt="LinkedIn QR Code"
                  style={{ width: '180px', height: '180px', display: 'block' }}
                />
              </div>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                Point your phone camera to open Omar Hassan's verified LinkedIn profile.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Minimal Toast Feedback */}
      {toastMessage && (
        <aside className="minimal-toast" role="status">
          <Check size={14} style={{ color: '#38bdf8' }} />
          <span>{toastMessage}</span>
        </aside>
      )}
    </>
  )
}
