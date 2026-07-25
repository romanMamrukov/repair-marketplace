import { useMemo, useState } from 'react'
import { ArrowLeft, ArrowRight, BadgeCheck, Check, ChevronRight, Clock3, Euro, Filter, LocateFixed, MapPin, Menu, MessageSquareText, Search, ShieldCheck, Sparkles, Star, Upload, UserRound, Wrench, X } from 'lucide-react'
import { categories, initialRequests, offers, providers } from './data/mockData'
import { CategoryIcon } from './components/Icon'
import { loadFeedback, loadRequests, saveFeedback, saveRequests } from './lib/storage'
import type { Budget, CategoryId, RepairRequest, Urgency, WizardDraft } from './types'
import './styles.css'

type View = 'home' | 'wizard' | 'success' | 'providers' | 'provider' | 'customer' | 'providerDashboard' | 'validate'

const emptyDraft: WizardDraft = {
  categoryId: '', title: '', description: '', location: 'Riga, Latvia', urgency: 'This week', budget: 'Need estimate', photoNames: [],
}

function App() {
  const [view, setView] = useState<View>('home')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [wizardStep, setWizardStep] = useState(1)
  const [draft, setDraft] = useState<WizardDraft>(emptyDraft)
  const [requests, setRequests] = useState<RepairRequest[]>(loadRequests)
  const [selectedProviderId, setSelectedProviderId] = useState('p1')
  const [selectedCategory, setSelectedCategory] = useState<CategoryId | 'all'>('all')
  const [feedbackSaved, setFeedbackSaved] = useState(false)

  const navigate = (next: View) => {
    setView(next)
    setMobileOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const matchingProviders = useMemo(() => selectedCategory === 'all' ? providers : providers.filter((provider) => provider.categoryIds.includes(selectedCategory)), [selectedCategory])

  const submitRequest = () => {
    if (!draft.categoryId) return
    const newRequest: RepairRequest = {
      id: `req-${Date.now()}`,
      categoryId: draft.categoryId,
      title: draft.title || 'Repair request',
      description: draft.description,
      location: draft.location,
      urgency: draft.urgency,
      budget: draft.budget,
      createdAt: new Date().toISOString(),
      status: 'matching',
      offerIds: [],
    }
    const next = [newRequest, ...requests]
    setRequests(next)
    saveRequests(next)
    navigate('success')
  }

  return (
    <div className="app-shell">
      <header className="site-header">
        <button className="brand" onClick={() => navigate('home')} aria-label="FixNear home">
          <span className="brand-mark"><Wrench size={20} /></span><span>FixNear</span>
        </button>
        <nav className="desktop-nav" aria-label="Main navigation">
          <button onClick={() => navigate('providers')}>Find specialists</button>
          <button onClick={() => navigate('customer')}>Customer demo</button>
          <button onClick={() => navigate('providerDashboard')}>Provider demo</button>
          <button onClick={() => navigate('validate')}>Validate the idea</button>
        </nav>
        <div className="header-actions">
          <button className="button button-ghost desktop-only" onClick={() => navigate('providerDashboard')}>For providers</button>
          <button className="button button-primary desktop-only" onClick={() => { setWizardStep(1); setDraft(emptyDraft); navigate('wizard') }}>Post a repair</button>
          <button className="icon-button mobile-only" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Open navigation">{mobileOpen ? <X /> : <Menu />}</button>
        </div>
        {mobileOpen && <nav className="mobile-nav"><button onClick={() => navigate('providers')}>Find specialists</button><button onClick={() => navigate('customer')}>Customer demo</button><button onClick={() => navigate('providerDashboard')}>Provider demo</button><button onClick={() => navigate('validate')}>Validate the idea</button><button className="button button-primary" onClick={() => navigate('wizard')}>Post a repair</button></nav>}
      </header>

      <main>
        {view === 'home' && <Home onNavigate={navigate} startRequest={() => { setWizardStep(1); setDraft(emptyDraft); navigate('wizard') }} />}
        {view === 'wizard' && <RequestWizard step={wizardStep} setStep={setWizardStep} draft={draft} setDraft={setDraft} submit={submitRequest} close={() => navigate('home')} />}
        {view === 'success' && <Success request={requests[0]} onNavigate={navigate} />}
        {view === 'providers' && <ProviderMarketplace selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} matchingProviders={matchingProviders} openProvider={(id) => { setSelectedProviderId(id); navigate('provider') }} />}
        {view === 'provider' && <ProviderProfile providerId={selectedProviderId} back={() => navigate('providers')} />}
        {view === 'customer' && <CustomerDashboard requests={requests.length ? requests : initialRequests} acceptOffer={(requestId, offerId) => { const next = requests.map((request) => request.id === requestId ? { ...request, status: 'accepted' as const, offerIds: [offerId] } : request); setRequests(next); saveRequests(next) }} newRequest={() => navigate('wizard')} />}
        {view === 'providerDashboard' && <ProviderDashboard />}
        {view === 'validate' && <ValidationPage feedbackSaved={feedbackSaved} save={(data) => { saveFeedback({ id: crypto.randomUUID(), ...data, createdAt: new Date().toISOString() }); setFeedbackSaved(true) }} count={loadFeedback().length} />}
      </main>

      <footer className="site-footer">
        <div><div className="brand footer-brand"><span className="brand-mark"><Wrench size={18} /></span><span>FixNear</span></div><p>Phase 0 validation and Phase 1 interactive marketplace demo.</p></div>
        <div><strong>Demo paths</strong><button onClick={() => navigate('wizard')}>Post request</button><button onClick={() => navigate('providers')}>Browse providers</button></div>
        <div><strong>Validation</strong><button onClick={() => navigate('validate')}>Give feedback</button><span>Latvia-first concept</span></div>
      </footer>
    </div>
  )
}

function Home({ onNavigate, startRequest }: { onNavigate: (view: View) => void; startRequest: () => void }) {
  return <>
    <section className="hero section-grid">
      <div className="hero-copy">
        <span className="eyebrow"><Sparkles size={16} /> One request. Multiple nearby specialists.</span>
        <h1>Describe the problem.<br /><span>Let repair experts compete for the job.</span></h1>
        <p className="lead">FixNear turns unclear repair problems into structured requests, matches them with nearby providers, and helps customers compare offers without searching across dozens of channels.</p>
        <div className="hero-actions"><button className="button button-primary button-large" onClick={startRequest}>Post a repair request <ArrowRight size={18} /></button><button className="button button-secondary button-large" onClick={() => onNavigate('providers')}>Explore providers</button></div>
        <div className="trust-row"><span><ShieldCheck size={18} /> Verified profiles</span><span><MessageSquareText size={18} /> Comparable offers</span><span><MapPin size={18} /> Local matching</span></div>
      </div>
      <div className="hero-visual">
        <div className="map-panel">
          <div className="map-grid-lines" />
          <div className="map-label label-one">Riga Centre</div><div className="map-label label-two">Āgenskalns</div><div className="map-label label-three">Teika</div>
          <div className="map-pin pin-one"><Wrench size={16} /></div><div className="map-pin pin-two"><Wrench size={16} /></div><div className="map-pin pin-three"><Wrench size={16} /></div>
          <div className="request-float"><span className="status-dot" /><div><strong>Laptop will not start</strong><small>3 matching specialists nearby</small></div></div>
          <div className="offer-float"><BadgeCheck size={20} /><div><strong>Offer received</strong><small>€45 · arrival in 90 min</small></div></div>
        </div>
      </div>
    </section>

    <section className="metric-strip"><div><strong>6</strong><span>launch categories</span></div><div><strong>3 min</strong><span>to publish a request</span></div><div><strong>1 place</strong><span>to compare offers</span></div><div><strong>0 apps</strong><span>required for customers</span></div></section>

    <section className="section"><div className="section-heading"><span className="eyebrow">Repair categories</span><h2>Start with the problem, not the provider directory.</h2><p>Each category uses a structured request flow that gives specialists enough information to make a useful first offer.</p></div><div className="category-grid">{categories.map((category) => <button className="category-card" key={category.id} onClick={startRequest}><span className="category-icon"><CategoryIcon name={category.icon} /></span><h3>{category.name}</h3><p>{category.description}</p><span className="text-link">Create request <ChevronRight size={16} /></span></button>)}</div></section>

    <section className="section section-muted"><div className="section-heading"><span className="eyebrow">How it works</span><h2>A repair workflow built for decisions.</h2></div><div className="steps-grid">{[['01','Publish the problem','Select a category, describe symptoms, add photos and choose urgency.'],['02','Receive relevant offers','Nearby specialists respond with price, timing, warranty and a short plan.'],['03','Choose with context','Compare distance, ratings, experience and offer terms before accepting.']].map(([n,t,d]) => <article className="step-card" key={n}><span>{n}</span><h3>{t}</h3><p>{d}</p></article>)}</div></section>

    <section className="section two-column"><div><span className="eyebrow">For professionals</span><h2>Replace broad advertising with qualified local demand.</h2><p className="lead compact">Providers configure categories and service radius, review structured jobs, and respond only where the fit is commercially useful.</p><ul className="check-list"><li><Check /> Category and location matching</li><li><Check /> Better context before the first call</li><li><Check /> Track offers, accepted work and conversion</li><li><Check /> Build portable reputation and proof of work</li></ul><button className="button button-secondary" onClick={() => onNavigate('providerDashboard')}>Open provider demo</button></div><div className="provider-preview"><div className="preview-top"><span>Provider workspace</span><span className="live-badge">Live demo</span></div><div className="mini-stats"><div><strong>12</strong><span>new matches</span></div><div><strong>31%</strong><span>offer conversion</span></div><div><strong>€1,840</strong><span>mock revenue</span></div></div><div className="mini-job"><span className="category-icon small"><CategoryIcon name="Laptop" size={18} /></span><div><strong>Office Wi-Fi drops repeatedly</strong><small>Riga centre · 2.1 km · this week</small></div><button>View</button></div><div className="mini-job"><span className="category-icon small"><CategoryIcon name="Smartphone" size={18} /></span><div><strong>Phone charging port intermittent</strong><small>Teika · 4.7 km · within 48h</small></div><button>View</button></div></div></section>

    <section className="cta-section"><div><span className="eyebrow light">Phase 0 market validation</span><h2>Would you use or pay for this marketplace?</h2><p>Review the demo, then leave structured customer or provider feedback. Responses stay in this browser during the prototype phase.</p></div><button className="button button-light button-large" onClick={() => onNavigate('validate')}>Validate the idea</button></section>
  </>
}

function RequestWizard({ step, setStep, draft, setDraft, submit, close }: { step: number; setStep: (n: number) => void; draft: WizardDraft; setDraft: (draft: WizardDraft) => void; submit: () => void; close: () => void }) {
  const canContinue = step === 1 ? !!draft.categoryId : step === 2 ? draft.title.trim().length >= 5 && draft.description.trim().length >= 10 : step === 4 ? draft.location.trim().length >= 3 : true
  return <section className="wizard-page"><div className="wizard-header"><div><span className="eyebrow">New repair request</span><h1>Tell specialists what needs fixing.</h1></div><button className="icon-button" onClick={close}><X /></button></div><div className="progress-row">{[1,2,3,4,5,6].map((n) => <div className={`progress-item ${n <= step ? 'active' : ''}`} key={n}><span>{n < step ? <Check size={14} /> : n}</span><small>{['Category','Problem','Photos','Location','Timing','Review'][n-1]}</small></div>)}</div><div className="wizard-card">
    {step === 1 && <div><h2>What type of repair is this?</h2><p>Select the closest category. A provider can refine the diagnosis later.</p><div className="wizard-category-grid">{categories.map((category) => <button key={category.id} className={`wizard-category ${draft.categoryId === category.id ? 'selected' : ''}`} onClick={() => setDraft({ ...draft, categoryId: category.id })}><CategoryIcon name={category.icon} /><span><strong>{category.name}</strong><small>{category.examples.join(' · ')}</small></span>{draft.categoryId === category.id && <Check />}</button>)}</div></div>}
    {step === 2 && <div><h2>Describe the problem.</h2><p>Focus on symptoms, when it started, and anything already attempted.</p><label className="field-label">Short title<input value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} placeholder="Example: Washing machine will not drain" /></label><label className="field-label">Details<textarea rows={6} value={draft.description} onChange={(e) => setDraft({ ...draft, description: e.target.value })} placeholder="What happens, when did it start, and is the item still usable?" /></label><div className="tip-box"><Sparkles size={18} /><span>Better detail produces more accurate offers and reduces unnecessary calls.</span></div></div>}
    {step === 3 && <div><h2>Add photos or screenshots.</h2><p>Prototype upload stores filenames only. No image leaves your device.</p><label className="upload-zone"><Upload size={30} /><strong>Choose files</strong><span>JPG, PNG or screenshots</span><input type="file" multiple accept="image/*" onChange={(e) => setDraft({ ...draft, photoNames: Array.from(e.target.files ?? []).map((file) => file.name) })} /></label>{draft.photoNames.length > 0 && <div className="file-list">{draft.photoNames.map((name) => <span key={name}><Check size={14} /> {name}</span>)}</div>}</div>}
    {step === 4 && <div><h2>Where is the repair needed?</h2><p>Use an approximate area for the demo. Exact addresses should only be shared after accepting a provider.</p><label className="field-label">City or neighbourhood<div className="input-with-icon"><MapPin size={18} /><input value={draft.location} onChange={(e) => setDraft({ ...draft, location: e.target.value })} /></div></label><div className="small-map"><div className="map-grid-lines" /><div className="map-pin current"><LocateFixed size={17} /></div><span>{draft.location || 'Select an area'}</span></div></div>}
    {step === 5 && <div><h2>Set timing and budget context.</h2><p>This helps providers decide whether they can deliver a realistic offer.</p><div className="split-fields"><label className="field-label">Urgency<select value={draft.urgency} onChange={(e) => setDraft({ ...draft, urgency: e.target.value as Urgency })}>{['Today','Within 48 hours','This week','Flexible'].map((x) => <option key={x}>{x}</option>)}</select></label><label className="field-label">Budget<select value={draft.budget} onChange={(e) => setDraft({ ...draft, budget: e.target.value as Budget })}>{['Need estimate','Under €50','€50–150','€150–400','€400+'].map((x) => <option key={x}>{x}</option>)}</select></label></div><div className="privacy-box"><ShieldCheck /><div><strong>No payment is required in this demo.</strong><span>Phase 1 validates the workflow before introducing commercial transactions.</span></div></div></div>}
    {step === 6 && <div><h2>Review before publishing.</h2><p>The request will be stored only in this browser.</p><div className="review-grid"><ReviewItem label="Category" value={categories.find((x) => x.id === draft.categoryId)?.name ?? 'Not selected'} /><ReviewItem label="Problem" value={draft.title} /><ReviewItem label="Location" value={draft.location} /><ReviewItem label="Urgency" value={draft.urgency} /><ReviewItem label="Budget" value={draft.budget} /><ReviewItem label="Photos" value={`${draft.photoNames.length} selected`} /></div><div className="description-review"><strong>Description</strong><p>{draft.description}</p></div></div>}
    <div className="wizard-footer"><button className="button button-ghost" onClick={() => step === 1 ? close() : setStep(step - 1)}><ArrowLeft size={17} /> {step === 1 ? 'Cancel' : 'Back'}</button>{step < 6 ? <button className="button button-primary" disabled={!canContinue} onClick={() => setStep(step + 1)}>Continue <ArrowRight size={17} /></button> : <button className="button button-primary" onClick={submit}>Publish request <Check size={17} /></button>}</div>
  </div></section>
}

function ReviewItem({ label, value }: { label: string; value: string }) { return <div className="review-item"><span>{label}</span><strong>{value || '—'}</strong></div> }

function Success({ request, onNavigate }: { request: RepairRequest; onNavigate: (view: View) => void }) {
  return <section className="success-page"><div className="success-card"><div className="success-icon"><Check /></div><span className="eyebrow">Request published locally</span><h1>Matching specialists near {request?.location || 'your area'}.</h1><p>This prototype simulates matching. In the functional MVP, eligible providers would receive real-time notifications and submit actual offers.</p><div className="matching-box"><div className="pulse-ring"><Wrench /></div><div><strong>Scanning relevant provider profiles</strong><span>Category · distance · availability · rating</span></div></div><div className="fake-match-row"><span><BadgeCheck /> 6 eligible profiles</span><span><MapPin /> nearest 2.4 km</span><span><Clock3 /> expected first reply 12 min</span></div><div className="hero-actions centered"><button className="button button-primary" onClick={() => onNavigate('providers')}>View simulated matches</button><button className="button button-secondary" onClick={() => onNavigate('customer')}>Open customer dashboard</button></div></div></section>
}

function ProviderMarketplace({ selectedCategory, setSelectedCategory, matchingProviders, openProvider }: { selectedCategory: CategoryId | 'all'; setSelectedCategory: (id: CategoryId | 'all') => void; matchingProviders: typeof providers; openProvider: (id: string) => void }) {
  return <section className="marketplace-page"><div className="page-heading"><span className="eyebrow">Provider marketplace</span><h1>Compare repair specialists.</h1><p>Mock profiles demonstrate the information customers need before choosing whom to contact.</p></div><div className="marketplace-toolbar"><div className="search-box"><Search size={18} /><input placeholder="Search specialties or provider name" /></div><div className="filter-chip"><Filter size={17} /> Riga · within 10 km</div></div><div className="filter-tabs"><button className={selectedCategory === 'all' ? 'active' : ''} onClick={() => setSelectedCategory('all')}>All</button>{categories.map((category) => <button className={selectedCategory === category.id ? 'active' : ''} onClick={() => setSelectedCategory(category.id)} key={category.id}>{category.name}</button>)}</div><div className="marketplace-layout"><div className="providers-list">{matchingProviders.map((provider) => <article className="provider-card" key={provider.id}><div className="provider-avatar">{provider.name.split(' ').map((part) => part[0]).join('').slice(0,2)}</div><div className="provider-main"><div className="provider-title"><h3>{provider.name}</h3>{provider.verified && <span><BadgeCheck size={16} /> Verified</span>}</div><div className="rating-line"><Star size={16} fill="currentColor" /> <strong>{provider.rating}</strong> ({provider.reviewCount}) · {provider.completedJobs} completed jobs</div><p>{provider.description}</p><div className="tag-row">{provider.specialties.map((tag) => <span key={tag}>{tag}</span>)}</div><div className="provider-meta"><span><MapPin size={16} /> {provider.distanceKm} km</span><span><Clock3 size={16} /> {provider.eta}</span><span><Euro size={16} /> From €{provider.startingPrice}</span></div></div><button className="button button-secondary" onClick={() => openProvider(provider.id)}>View profile</button></article>)}</div><div className="market-map"><div className="map-grid-lines" /><div className="map-pin pin-one"><Wrench size={15} /></div><div className="map-pin pin-two"><Wrench size={15} /></div><div className="map-pin pin-three"><Wrench size={15} /></div><div className="map-pin pin-four"><Wrench size={15} /></div><div className="map-center"><LocateFixed size={18} /></div><div className="map-legend">Demo map · Riga</div></div></div></section>
}

function ProviderProfile({ providerId, back }: { providerId: string; back: () => void }) {
  const provider = providers.find((item) => item.id === providerId) ?? providers[0]
  return <section className="profile-page"><button className="back-link" onClick={back}><ArrowLeft size={17} /> Back to providers</button><div className="profile-hero"><div className="large-avatar">{provider.name.split(' ').map((part) => part[0]).join('').slice(0,2)}</div><div><div className="provider-title"><h1>{provider.name}</h1>{provider.verified && <span><BadgeCheck size={16} /> Verified business</span>}</div><p>{provider.description}</p><div className="rating-line"><Star size={17} fill="currentColor" /> <strong>{provider.rating}</strong> from {provider.reviewCount} reviews · {provider.completedJobs} jobs</div></div><button className="button button-primary">Request an offer</button></div><div className="profile-layout"><div><article className="content-card"><h2>Specialties</h2><div className="specialty-grid">{provider.specialties.map((specialty) => <div key={specialty}><Check /><span><strong>{specialty}</strong><small>Diagnostics and repair</small></span></div>)}</div></article><article className="content-card"><h2>Recent customer feedback</h2>{['Clear explanation before starting work and no unexpected cost.','Fast response and arrived within the agreed window.','Professional repair with useful advice for preventing recurrence.'].map((review, index) => <div className="review-row" key={review}><div className="review-avatar">{['AK','JM','LS'][index]}</div><div><div className="rating-line"><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /></div><p>{review}</p></div></div>)}</article></div><aside className="profile-sidebar"><div className="content-card"><h3>Service snapshot</h3><dl><div><dt>Starting price</dt><dd>€{provider.startingPrice}</dd></div><div><dt>Distance</dt><dd>{provider.distanceKm} km</dd></div><div><dt>Next opening</dt><dd>{provider.eta}</dd></div><div><dt>Response time</dt><dd>{provider.responseTime}</dd></div></dl><button className="button button-primary full">Request an offer</button></div><div className="content-card trust-card"><ShieldCheck /><div><strong>Prototype trust model</strong><p>Future verification may include company registration, identity, insurance, certifications and completed-job evidence.</p></div></div></aside></div></section>
}

function CustomerDashboard({ requests, acceptOffer, newRequest }: { requests: RepairRequest[]; acceptOffer: (requestId: string, offerId: string) => void; newRequest: () => void }) {
  const request = requests[0] ?? initialRequests[0]
  const requestOffers = request.offerIds.length ? offers.filter((offer) => request.offerIds.includes(offer.id)) : offers.slice(0,2)
  return <section className="dashboard-page"><div className="dashboard-top"><div><span className="eyebrow">Customer workspace</span><h1>Your repair requests.</h1></div><button className="button button-primary" onClick={newRequest}>New request</button></div><div className="dashboard-grid"><aside className="dashboard-sidebar"><button className="active">Active requests <span>{requests.length}</span></button><button>Completed <span>3</span></button><button>Saved providers <span>2</span></button><button>Messages <span>4</span></button></aside><div className="dashboard-content"><article className="request-detail"><div className="request-status"><span className={`status-pill ${request.status}`}>{request.status.replace('_',' ')}</span><small>Published {new Date(request.createdAt).toLocaleDateString()}</small></div><h2>{request.title}</h2><p>{request.description}</p><div className="request-meta"><span><MapPin /> {request.location}</span><span><Clock3 /> {request.urgency}</span><span><Euro /> {request.budget}</span></div></article><div className="section-title-row"><div><h2>{requestOffers.length} provider offers</h2><p>Compare complete terms, not only the lowest price.</p></div><select><option>Best match</option><option>Lowest price</option><option>Earliest arrival</option></select></div><div className="offers-grid">{requestOffers.map((offer) => { const provider = providers.find((item) => item.id === offer.providerId)!; return <article className="offer-card" key={offer.id}><div className="offer-head"><div className="provider-avatar small-avatar">{provider.name.split(' ').map((x) => x[0]).join('').slice(0,2)}</div><div><h3>{provider.name}</h3><div className="rating-line"><Star size={14} fill="currentColor" /> {provider.rating} · {provider.distanceKm} km</div></div><strong>€{offer.price}</strong></div><p>{offer.message}</p><div className="offer-terms"><span><Clock3 /> {offer.arrival}</span><span><ShieldCheck /> {offer.warranty}</span></div><button className="button button-primary full" onClick={() => acceptOffer(request.id, offer.id)}>{request.status === 'accepted' && request.offerIds.includes(offer.id) ? 'Offer accepted' : 'Accept offer'}</button></article> })}</div></div></div></section>
}

function ProviderDashboard() {
  const jobs = [
    { category: 'computer', title: 'Laptop shuts down under load', location: 'Riga Centre', distance: '2.6 km', urgency: 'Within 48 hours', budget: '€50–150' },
    { category: 'mobile', title: 'Phone microphone not working', location: 'Teika', distance: '4.2 km', urgency: 'This week', budget: 'Need estimate' },
    { category: 'computer', title: 'Small office network setup', location: 'Āgenskalns', distance: '5.1 km', urgency: 'Flexible', budget: '€150–400' },
  ]
  return <section className="dashboard-page provider-dashboard"><div className="dashboard-top"><div><span className="eyebrow">Provider workspace</span><h1>Qualified jobs near you.</h1></div><div className="availability"><span className="status-dot" /> Available for new work</div></div><div className="provider-stats"><article><span>New matches</span><strong>12</strong><small>+4 this week</small></article><article><span>Offers sent</span><strong>9</strong><small>31% accepted</small></article><article><span>Completed jobs</span><strong>24</strong><small>this month</small></article><article><span>Mock revenue</span><strong>€1,840</strong><small>this month</small></article></div><div className="dashboard-grid"><aside className="dashboard-sidebar"><button className="active">New matches <span>12</span></button><button>My offers <span>9</span></button><button>Accepted jobs <span>4</span></button><button>Completed <span>24</span></button></aside><div className="dashboard-content"><div className="section-title-row"><div><h2>Recommended repair requests</h2><p>Matched by category, radius and provider availability.</p></div><button className="button button-secondary"><Filter size={16} /> Filters</button></div><div className="jobs-list">{jobs.map((job) => <article className="job-card" key={job.title}><span className="category-icon"><CategoryIcon name={categories.find((c) => c.id === job.category)?.icon ?? 'Wrench'} /></span><div className="job-main"><h3>{job.title}</h3><div className="job-meta"><span><MapPin /> {job.location} · {job.distance}</span><span><Clock3 /> {job.urgency}</span><span><Euro /> {job.budget}</span></div><p>Customer supplied a structured description and two diagnostic photos.</p></div><div className="job-actions"><span className="match-score">92% match</span><button className="button button-primary">Send offer</button></div></article>)}</div></div></div></section>
}

function ValidationPage({ feedbackSaved, save, count }: { feedbackSaved: boolean; save: (data: { role: 'Customer' | 'Provider' | 'Other'; score: number; useful: string; missing: string; email: string }) => void; count: number }) {
  const [role, setRole] = useState<'Customer' | 'Provider' | 'Other'>('Customer')
  const [score, setScore] = useState(8)
  const [useful, setUseful] = useState('')
  const [missing, setMissing] = useState('')
  const [email, setEmail] = useState('')
  if (feedbackSaved) return <section className="success-page"><div className="success-card"><div className="success-icon"><Check /></div><h1>Feedback saved in this browser.</h1><p>Export or connect a real form endpoint before external validation at scale.</p><div className="metric-strip compact-strip"><div><strong>{count + 1}</strong><span>local responses</span></div><div><strong>{score}/10</strong><span>your likelihood score</span></div></div></div></section>
  return <section className="validation-page"><div className="page-heading"><span className="eyebrow">Phase 0 validation</span><h1>Test the market assumptions before building the backend.</h1><p>This page captures the minimum evidence needed to decide whether the marketplace deserves Phase 2 investment.</p></div><div className="validation-layout"><div className="validation-plan"><article className="content-card"><h2>Core hypotheses</h2><ol className="hypothesis-list"><li><span>H1</span><div><strong>Customers will publish a structured repair request.</strong><p>Evidence: completed request wizard and interview intent.</p></div></li><li><span>H2</span><div><strong>Providers will respond to qualified nearby jobs.</strong><p>Evidence: provider interviews, waitlist and willingness-to-pay.</p></div></li><li><span>H3</span><div><strong>Comparable offers create more trust than directory search.</strong><p>Evidence: usability feedback and offer-selection behaviour.</p></div></li></ol></article><article className="content-card"><h2>Phase 0 decision thresholds</h2><div className="threshold-grid"><div><strong>20+</strong><span>customer interviews</span></div><div><strong>15+</strong><span>provider interviews</span></div><div><strong>30%</strong><span>customer request intent</span></div><div><strong>5+</strong><span>provider pilot commitments</span></div></div><p className="muted-note">Thresholds are initial operating assumptions. Revise them after the first ten interviews, not after seeing the final result.</p></article></div><form className="feedback-form content-card" onSubmit={(e) => { e.preventDefault(); save({ role, score, useful, missing, email }) }}><span className="eyebrow">Prototype feedback</span><h2>Would this solve a real problem?</h2><label className="field-label">I am reviewing this as<select value={role} onChange={(e) => setRole(e.target.value as typeof role)}><option>Customer</option><option>Provider</option><option>Other</option></select></label><label className="field-label">Likelihood to use or test: {score}/10<input className="range" type="range" min="0" max="10" value={score} onChange={(e) => setScore(Number(e.target.value))} /></label><label className="field-label">What is useful?<textarea rows={4} value={useful} onChange={(e) => setUseful(e.target.value)} placeholder="Describe the specific workflow or outcome that matters." /></label><label className="field-label">What is missing or unclear?<textarea rows={4} value={missing} onChange={(e) => setMissing(e.target.value)} placeholder="Identify trust, pricing, location, category or process gaps." /></label><label className="field-label">Optional contact for pilot research<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@example.com" /></label><button className="button button-primary full" type="submit">Save feedback locally</button><small className="form-note">Prototype notice: data remains in this browser's localStorage.</small></form></div></section>
}

export default App
