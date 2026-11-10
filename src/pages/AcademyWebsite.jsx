import React from 'react';
import './academy-website.css';
import { academyModules, academyProgramme, formatRand, trackTotal } from '../../shared/academy-catalog';

export function AcademyWebsite() {
    const [course, setCourse] = React.useState(academyProgramme.name);
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [goal, setGoal] = React.useState('');
    const [status, setStatus] = React.useState('');
    const [moduleInterest, setModuleInterest] = React.useState('P1');
    const [reviewing, setReviewing] = React.useState(false);
    const [audioStatus, setAudioStatus] = React.useState('');
    const menuRef = React.useRef(null);
    const nameRef = React.useRef(null);
    const [activePad, setActivePad] = React.useState('');
    const audioRef = React.useRef(null);
    const formRef = React.useRef(null);
    function goToApply() { document.getElementById('apply')?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' }); nameRef.current?.focus({ preventScroll: true }); }
    function choose(value) { setCourse(value); setReviewing(false); goToApply(); }
    function closeMenu(event) { if (event.target.closest('a') && menuRef.current)
        menuRef.current.open = false; }
    React.useEffect(() => { function escape(event) { if (event.key === 'Escape' && menuRef.current?.open) {
        menuRef.current.open = false;
        menuRef.current.querySelector('summary')?.focus();
    } } document.addEventListener('keydown', escape); return () => document.removeEventListener('keydown', escape); }, []);
    function draft() {
        const module = academyModules.find(item => item.id === moduleInterest);
        return `Hello Lukulu Academy, I would like to enquire about enrolment.\nName: ${name.trim()}\nEmail: ${email.trim()}\nCourse: ${course}\n${course === 'Individual module' ? `Module: ${module.id} · ${module.name}\n` : ''}Software for production: FL Studio\nLearning goal: ${goal.trim() || 'Please help me choose a starting point.'}\nPlease confirm fees, access and the next steps.`;
    }
    function submit(event) { event.preventDefault(); setReviewing(true); setStatus('Review your application below. Nothing has been sent.'); }
    function downloadDraft() { const blob = new Blob([draft()], { type: 'text/plain;charset=utf-8' }); const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = 'Lukulu-Academy-Application.txt'; a.click(); setTimeout(() => URL.revokeObjectURL(url), 1000); setStatus('Application downloaded to your device. Nothing has been sent.'); }
    async function copy() { if (!formRef.current?.reportValidity())
        return; try {
        await navigator.clipboard.writeText(draft());
        setStatus('Application copied. Paste it into your preferred message app to send.');
    }
    catch {
        setReviewing(true);
        setStatus('Clipboard unavailable. Select the text in the review box or download your draft.');
    } }
    function play(kind) { try {
        const Ctx = window.AudioContext || window.webkitAudioContext;
        if (!Ctx)
            throw new Error();
        const ctx = audioRef.current || (audioRef.current = new Ctx());
        if (ctx.state === 'suspended')
            ctx.resume();
        const now = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        const tones = { Kick: [145, 48, .35], Bass: [110, 55, .6], Chord: [261.63, 261.63, .8], Pluck: [440, 330, .35] };
        const [start, end, duration] = tones[kind];
        osc.type = kind === 'Bass' ? 'triangle' : 'sine';
        osc.frequency.setValueAtTime(start, now);
        osc.frequency.exponentialRampToValueAtTime(end, now + duration);
        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(.22, now + .012);
        gain.gain.exponentialRampToValueAtTime(.001, now + duration);
        osc.start(now);
        osc.stop(now + duration + .02);
        setAudioStatus(`Playing ${kind.toLowerCase()} sound.`);
        setActivePad(kind);
        setTimeout(() => setActivePad(''), 400);
    }
    catch {
        setAudioStatus('Audio preview is unavailable in this browser. Please try opening this file in Chrome or another browser.');
    } }
    const subjects = academyModules.filter(item => item.track === 'production').map(item => item.name);
    const business = academyModules.filter(item => item.track === 'business').map(item => item.name);
    const plans = [
      { name: academyProgramme.name, price: formatRand(academyProgramme.price), period: ' / 90 days', desc: 'Music Production in FL Studio + Music Business.', features: ['8 modules across both courses', 'Suggested 12-week learning path', 'Remote, self-paced study'], cta: 'Enquire about full access', featured: true },
      { name: 'Music Production', price: formatRand(trackTotal('production')), period: ' / 4 modules', desc: 'Focus on creating and finishing music in FL Studio.', features: ['FL Studio essentials', 'Drums, melody and arrangement', 'Mixing and export'], cta: 'Enquire about production' },
      { name: 'Music Business', price: formatRand(trackTotal('business')), period: ' / 4 modules', desc: 'Understand your rights and build your release plan.', features: ['Copyright and royalties', 'Distribution and marketing', 'Artist business and release planning'], cta: 'Enquire about business' },
    ];
    return React.createElement("div", { className: "lc-app" },
        React.createElement("a", { href: "#main-content", className: "lc-skip" }, "Skip to content"),
        React.createElement("div", { className: "lc-top" }, "SOUTH AFRICAN ROOTS. LEARNING WITHOUT BORDERS."),
        React.createElement("header", { className: "lc-nav lc-shell" },
            React.createElement("a", { className: "lc-brand", href: "#home" },
                React.createElement("strong", null,
                    "LUKULU ",
                    React.createElement("small", null, "ACADEMY")),
                React.createElement("span", null, "MUSIC EDUCATION \u00B7 SOUTH AFRICA")),
            React.createElement("nav", { "aria-label": "Main navigation" },
                React.createElement("a", { href: "#courses" }, "Courses"),
                React.createElement("a", { href: "#how" }, "How it works"),
                React.createElement("a", { href: "#pricing" }, "Pricing"),
                React.createElement("a", { href: "/student/login" }, "Student portal \u2197")),
            React.createElement("a", { className: "lc-button lc-button-dark lc-nav-apply", href: "#apply" }, "Apply now \u2197"),
            React.createElement("details", { className: "lc-mobile", ref: menuRef, onClick: closeMenu },
                React.createElement("summary", null, "Menu"),
                React.createElement("nav", { "aria-label": "Mobile navigation" },
                    React.createElement("a", { href: "#courses" }, "Courses"),
                    React.createElement("a", { href: "#how" }, "How it works"),
                    React.createElement("a", { href: "#pricing" }, "Pricing"),
                    React.createElement("a", { href: "#apply" }, "Apply now"),
                    React.createElement("a", { href: "/student/login" }, "Student portal \u2197")))),
        React.createElement("main", { id: "main-content", tabIndex: -1 },
            React.createElement("section", { id: "home", className: "lc-hero lc-shell" },
                React.createElement("span", { className: "lc-pill" },
                    React.createElement("i", null),
                    " AFRO HOUSE CULTURE. BUILT FOR EDUCATION."),
                React.createElement("h1", null,
                    "MAKE MUSIC.",
                    React.createElement("br", null),
                    React.createElement("span", null, "BUILD YOUR FUTURE.")),
                React.createElement("p", null,
                    "Music Production and Music Business, made approachable.",
                    React.createElement("br", { className: "lc-desktop" }),
                    " Learn remotely, at your pace, wherever life takes you."),
                React.createElement("div", { className: "lc-actions" },
                    React.createElement("a", { className: "lc-button lc-button-dark", href: "#courses" }, "Explore the courses \u2193"),
                    React.createElement("a", { className: "lc-button lc-button-outline", href: "#apply" }, "Join the Academy \u2197")),
                React.createElement("div", { className: "lc-hero-notes" },
                    React.createElement("span", null, "Two focused courses"),
                    React.createElement("span", null, "Flexible learning"),
                    React.createElement("span", null, "Practical skills"))),
            React.createElement("section", { id: "courses", className: "lc-section lc-shell" },
                React.createElement("header", { className: "lc-section-head" },
                    React.createElement("p", { className: "lc-kicker" }, "01 / OUR COURSES"),
                    React.createElement("h2", null,
                        "ONE ACADEMY.",
                        React.createElement("br", null),
                        "TWO WAYS TO GROW."),
                    React.createElement("p", null, "Learn to create your sound. Understand the business behind it.")),
                React.createElement("div", { className: "lc-course-grid" },
                    React.createElement("article", { className: "lc-card" },
                        React.createElement("div", { className: "lc-card-top" },
                            React.createElement("span", { className: "lc-icon lc-orange" }, "\u266B"),
                            React.createElement("span", { className: "lc-kicker" }, "CREATE YOUR SOUND"),
                            React.createElement("span", { className: "lc-number" }, "01")),
                        React.createElement("h3", null, "Music Production"),
                        React.createElement("p", null, "From a first beat to a finished track. Start with FL Studio, with practical exercises rooted in Afro House culture."),
                        React.createElement("div", { className: "lc-callout" },
                            React.createElement("span", { className: "lc-kicker" }, "FL STUDIO FIRST"),
                            React.createElement("p", null, "One workflow, from your first groove to your final export. FL Studio software is purchased separately.")),
                        React.createElement("details", { className: "lc-subjects" },
                            React.createElement("summary", null,
                                "Explore the subjects ",
                                React.createElement("span", null, "+")),
                            React.createElement("ul", null, subjects.map(x => React.createElement("li", { key: x }, x)))),
                        React.createElement("div", { className: "lc-outcome" },
                            React.createElement("span", { className: "lc-kicker" }, "WORK TOWARDS"),
                            React.createElement("p", null, "A complete track, an organised project and export-ready audio.")),
                        React.createElement("button", { className: "lc-button lc-button-dark", onClick: () => choose('Music Production') }, "Apply for Music Production \u2197")),
                    React.createElement("article", { className: "lc-card" },
                        React.createElement("div", { className: "lc-card-top" },
                            React.createElement("span", { className: "lc-icon lc-gold" }, "\u2197"),
                            React.createElement("span", { className: "lc-kicker" }, "KNOW YOUR BUSINESS"),
                            React.createElement("span", { className: "lc-number" }, "02")),
                        React.createElement("h3", null, "Music Business"),
                        React.createElement("p", null, "Understand your rights, organise your music and plan your releases. Build practical knowledge for an independent music career."),
                        React.createElement("div", { className: "lc-callout" },
                            React.createElement("span", { className: "lc-kicker" }, "FOR ARTISTS, PRODUCERS & DJs"),
                            React.createElement("p", null, "Start with the essentials. Apply what you learn to your own music.")),
                        React.createElement("details", { className: "lc-subjects" },
                            React.createElement("summary", null,
                                "Explore the subjects ",
                                React.createElement("span", null, "+")),
                            React.createElement("ul", null, business.map(x => React.createElement("li", { key: x }, x)))),
                        React.createElement("div", { className: "lc-outcome" },
                            React.createElement("span", { className: "lc-kicker" }, "WORK TOWARDS"),
                            React.createElement("p", null, "Clear credits, organised metadata and a practical release plan.")),
                        React.createElement("button", { className: "lc-button lc-button-outline", onClick: () => choose('Music Business') }, "Apply for Music Business \u2197")))),
            React.createElement("section", { id: "how", className: "lc-dark lc-section" },
                React.createElement("div", { className: "lc-shell" },
                    React.createElement("header", { className: "lc-section-head" },
                        React.createElement("p", { className: "lc-kicker" }, "02 / MADE TO FIT YOUR LIFE"),
                        React.createElement("h2", null,
                            "YOUR PLACE.",
                            React.createElement("br", null),
                            "YOUR PACE."),
                        React.createElement("p", null, "A simple start, clear resources and room to practise in your own time.")),
                    React.createElement("div", { className: "lc-how-grid" }, [{ n: '01', title: 'Enrol simply', text: 'Choose your course and send a short application. We confirm your fees, access and next steps.' }, { n: '02', title: 'Bring the essentials', text: 'An email address, internet access, a computer and headphones. Read notes on your phone; use FL Studio for production exercises.' }, { n: '03', title: 'Learn around your life', text: 'Study remotely around work and home. Revisit notes, check your understanding and practise one subject at a time.' }].map(x => React.createElement("article", { key: x.n },
                        React.createElement("span", { className: "lc-number" }, x.n),
                        React.createElement("h3", null, x.title),
                        React.createElement("p", null, x.text)))),
                    React.createElement("div", { className: "lc-practice" },
                        React.createElement("div", null,
                            React.createElement("span", { className: "lc-pill" }, "PRACTICE AT YOUR CONVENIENCE"),
                            React.createElement("h3", null,
                                "Hear an idea.",
                                React.createElement("br", null),
                                "Try it yourself."),
                            React.createElement("p", null, "Try a sound below, then use the learning lab in the student hub to practise the workflow. The simulator is a learning tool still in development; it does not replace FL Studio."),
                            React.createElement("span", { className: "lc-status" }, "Full DAW simulator \u00B7 In development")),
                        React.createElement("div", { className: "lc-pads" },
                            React.createElement("p", { className: "lc-kicker" }, "SOUND DEMO \u00B7 TAP TO LISTEN"),
                            React.createElement("div", null, ['Kick', 'Bass', 'Chord', 'Pluck'].map((x, i) => React.createElement("button", { "aria-label": `Play ${x.toLowerCase()} tone`, className: activePad === x ? 'is-playing' : '', onClick: () => play(x), key: x },
                                React.createElement("span", { className: 'lc-pad-dot lc-pad-' + i }),
                                React.createElement("strong", null, x),
                                React.createElement("span", null, "Synthesised tone \u2197")))),
                            React.createElement("p", { className: "lc-small" }, "A small audio demonstration, not the full DAW simulator."),
                            React.createElement("p", { className: "lc-small", role: "status" }, audioStatus))))),
            React.createElement("section", { id: "pricing", className: "lc-section lc-shell" },
                React.createElement("header", { className: "lc-section-head" },
                    React.createElement("p", { className: "lc-kicker" }, "03 / COURSE OPTIONS · ZAR"),
                    React.createElement("h2", null, "ONE PROGRAMME.", React.createElement("br", null), "YOUR WAY TO LEARN."),
                    React.createElement("p", null, "Take both courses over a suggested three months, focus on one course, or start with a single module."),
                    React.createElement("p", { className: "lc-pricing-note" }, "Proposed pricing · We confirm fees, access and support before you enrol. No payment is taken here.")),
                React.createElement("div", { className: "lc-price-grid" }, plans.map(plan => React.createElement("article", { className: 'lc-price ' + (plan.featured ? 'lc-price-featured' : ''), key: plan.name },
                    React.createElement("p", { className: "lc-kicker" }, plan.featured ? 'FULL ACADEMY · BOTH COURSES' : plan.name),
                    React.createElement("h3", null, plan.price, React.createElement("small", null, plan.period)),
                    React.createElement("p", null, plan.desc),
                    React.createElement("ul", null, plan.features.map(feature => React.createElement("li", { key: feature }, feature))),
                    React.createElement("button", { className: 'lc-button ' + (plan.featured ? 'lc-button-light' : 'lc-button-dark'), onClick: () => choose(plan.name) }, plan.cta)))),
                React.createElement("p", { className: "lc-small lc-center" }, "The proposed full programme saves R700 compared with buying all eight modules separately. FL Studio licensing is separate."),
                React.createElement("details", { className: "lc-module-pricing" },
                    React.createElement("summary", null, "Prefer one module? View the proposed module prices"),
                    React.createElement("div", { className: "lc-module-list" }, academyModules.map(module => React.createElement("article", { key: module.id },
                        React.createElement("div", null,
                            React.createElement("span", { className: "lc-kicker" }, module.id + ' · ' + (module.track === 'production' ? 'FL STUDIO' : 'MUSIC BUSINESS')),
                            React.createElement("h3", null, module.name),
                            React.createElement("p", null, module.description)),
                        React.createElement("button", { className: "lc-button lc-button-outline", onClick: () => { setModuleInterest(module.id); choose('Individual module'); }, 'aria-label': `Enquire about ${module.name}, ${formatRand(module.price)}` }, formatRand(module.price))))),
                    React.createElement("p", { className: "lc-small" }, "Individual module access and extension policies will be confirmed before payment. The 12-week path is a suggested pace, not a deadline for assignments."))),
            React.createElement("section", { id: "questions", className: "lc-section lc-shell lc-faq" },
                React.createElement("header", { className: "lc-section-head" },
                    React.createElement("p", { className: "lc-kicker" }, "BEFORE YOU START"),
                    React.createElement("h2", null, "A FEW SIMPLE ANSWERS.")),
                [
                    ['Do I need experience?', 'You can start with the foundations. Tell us your experience when applying so we can suggest a suitable starting point.'],
                    ['Can I learn on my phone?', 'Use your phone for reading and reviewing notes. Practical production exercises need a computer, headphones and FL Studio.'],
                    ['Which software do I need?', 'We are starting with FL Studio for Music Production. A software licence is separate from course fees. Music Business does not require a DAW.'],
                    ['How do I use the student hub?', 'Enrol first, then sign in using your student email. Active enrolment is verified before the learning lab opens. The simulator is still in development and some tools are visual only.'],
                    ['Does applying take payment?', 'No. An application starts a conversation. We confirm the course, fees, access and available support before payment.'],
                    ['Can I learn around work?', 'The Academy approach is remote and self-paced. Confirm any scheduled sessions and support times before enrolling.']
                ].map(([question, answer]) => React.createElement("details", { key: question },
                    React.createElement("summary", null,
                        question,
                        React.createElement("span", { "aria-hidden": "true" }, "+")),
                    React.createElement("p", null, answer)))),
            React.createElement("section", { id: "apply", className: "lc-dark lc-section" },
                React.createElement("div", { className: "lc-shell lc-apply-grid" },
                    React.createElement("div", null,
                        React.createElement("p", { className: "lc-kicker" }, "04 / JOIN THE ACADEMY"),
                        React.createElement("h2", null,
                            "READY TO",
                            React.createElement("br", null),
                            "GET LEARNING?"),
                        React.createElement("p", null, "Tell us what interests you. We will help you choose a starting point and confirm the details."),
                        React.createElement("p", { className: "lc-small" }, "Your application stays on this page until you choose to copy it or open WhatsApp. Review and send it there to submit."),
                        React.createElement("a", { className: "lc-text-link", href: "/student/login" }, "Already enrolled? Student portal \u2197")),
                    React.createElement("form", { ref: formRef, onSubmit: submit, onChange: () => { setReviewing(false); setStatus(''); }, className: "lc-application" },
                        React.createElement("label", { className: "lc-label" },
                            "Your name",
                            React.createElement("input", { ref: nameRef, name: "studentName", maxLength: 100, autoComplete: "name", required: true, pattern: ".*\\S.*", value: name, onChange: e => setName(e.target.value) })),
                        React.createElement("label", { className: "lc-label" },
                            "Email address",
                            React.createElement("input", { name: "email", maxLength: 254, autoComplete: "email", type: "email", required: true, value: email, onChange: e => setEmail(e.target.value) })),
                        React.createElement("label", { className: "lc-label" },
                            "I am interested in",
                            React.createElement("select", { value: course, onChange: e => setCourse(e.target.value) },
                                [academyProgramme.name, 'Music Production', 'Music Business', 'Individual module', 'Help me choose'].map(value => React.createElement("option", { key: value }, value)))),
                        course === 'Individual module' && React.createElement("label", { className: "lc-label" },
                            "Module",
                            React.createElement("select", { value: moduleInterest, onChange: e => setModuleInterest(e.target.value) },
                                academyModules.map(module => React.createElement("option", { key: module.id, value: module.id }, `${module.id} · ${module.name}`)))),
                        React.createElement("label", { className: "lc-label" },
                            "What would you like to learn? (optional)",
                            React.createElement("textarea", { maxLength: 1500, value: goal, onChange: e => setGoal(e.target.value), placeholder: "Your first beat, finishing a track, understanding royalties\u2026" })),
                        React.createElement("button", { className: "lc-button lc-button-gold", type: "submit" }, "Review my application \u2192"),
                        React.createElement("button", { className: "lc-button lc-button-light", type: "button", onClick: copy }, "Copy application"),
                        React.createElement("p", { role: "status", className: "lc-small" }, status),
                        reviewing && React.createElement("div", { className: "lc-review" },
                            React.createElement("h3", null, "Check your application"),
                            React.createElement("p", { className: "lc-small" }, "Review these details before sharing. WhatsApp receives them only when you open the draft below; press Send in WhatsApp to submit."),
                            React.createElement("textarea", { "aria-label": "Application draft", readOnly: true, value: draft(), rows: 9 }),
                            React.createElement("a", { className: "lc-button lc-button-gold", href: `https://wa.me/27730933554?text=${encodeURIComponent(draft())}`, target: "_blank", rel: "noopener noreferrer" }, "Open WhatsApp draft \u2197"),
                            React.createElement("button", { className: "lc-button lc-button-light", type: "button", onClick: downloadDraft }, "Download draft (.txt)")))))),
        React.createElement("footer", { className: "lc-footer lc-shell" },
            React.createElement("strong", null, "LUKULU ACADEMY"),
            React.createElement("p", null, "Music Production \u00B7 Music Business \u00B7 South Africa"),
            React.createElement("span", null, "\u00A9 2026 Lukulu Academy & Recordings")));
}
