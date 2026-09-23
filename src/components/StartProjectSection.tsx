import React, { useState } from 'react';
import { playTick, playChime } from '../utils/sound';
import { 
  ArrowRight, 
  Check, 
  RotateCcw, 
  Send, 
  Mail, 
  CheckCircle2, 
  AlertCircle,
  Loader2,
  Copy,
  ExternalLink
} from 'lucide-react';

interface StartProjectSectionProps {
  accentColor?: string;
  onNavigateHome?: () => void;
}

export const StartProjectSection: React.FC<StartProjectSectionProps> = ({
  accentColor = '#818cf8',
  onNavigateHome
}) => {
  // Required and optional fields
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [buildType, setBuildType] = useState<string>('Prototype / MVP');
  const [idea, setIdea] = useState<string>('');
  const [timeline, setTimeline] = useState<string>('');

  // Submission state
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copiedEmail, setCopiedEmail] = useState<boolean>(false);

  // Exact build type options specified by user:
  // Website, Web app, Prototype / MVP, Interactive learning tool, Digital publication, AI-enabled experience, Something else
  const buildOptions = [
    'Website',
    'Web app',
    'Prototype / MVP',
    'Interactive learning tool',
    'Digital publication',
    'AI-enabled experience',
    'Something else'
  ];

  const timelineOptions = [
    '1–2 Weeks (Rapid Prototype)',
    '3–4 Weeks (Working MVP)',
    '1–2 Months',
    'Flexible / Exploratory'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !idea.trim()) {
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);
    playTick(720, 'sine', 0.04, 0.03);

    try {
      // Dispatches actual email delivery to onlinefirst2026@gmail.com via FormSubmit AJAX service
      const response = await fetch('https://formsubmit.co/ajax/onlinefirst2026@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          whatWouldYouLikeToBuild: buildType,
          tellUsAboutYourIdea: idea.trim(),
          preferredTimeline: timeline || 'Flexible',
          _subject: `New OnlineFirst Idea Brief: ${buildType} from ${name}`,
          _replyto: email.trim(),
          _template: 'table',
          _captcha: 'false'
        })
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      playChime(accentColor);
      setIsSubmitted(true);
    } catch (err: unknown) {
      console.warn('Direct email transmission notice:', err);
      // Even if network fails or CORS block happens, allow graceful display and fallback
      // Try backup dispatch or display email fallback
      setErrorMessage(
        'We encountered an issue transmitting your message directly. You can also send your brief directly to onlinefirst2026@gmail.com.'
      );
      // Still show success if response was actually sent or let them retry
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    playTick(600, 'sine', 0.03, 0.02);
    setIsSubmitted(false);
    setName('');
    setEmail('');
    setIdea('');
    setTimeline('');
    setBuildType('Prototype / MVP');
    setErrorMessage(null);
  };

  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText('onlinefirst2026@gmail.com');
    setCopiedEmail(true);
    playTick(800, 'sine', 0.02, 0.02);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  // Prefilled mailto link as direct email backup
  const mailtoLink = `mailto:onlinefirst2026@gmail.com?subject=${encodeURIComponent(
    `Project Brief: ${buildType} from ${name || 'Founder'}`
  )}&body=${encodeURIComponent(
    `Name: ${name}\nEmail: ${email}\nBuilding: ${buildType}\nTimeline: ${timeline || 'Flexible'}\n\nIdea Brief:\n${idea}`
  )}`;

  return (
    <section 
      id="start-project-intake-funnel"
      className="relative min-h-[92vh] px-4 sm:px-8 py-32 max-w-4xl mx-auto flex flex-col justify-center"
    >
      {/* Intro Header */}
      <div className="mb-12 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-[#121319]/80 text-[13px] font-['JetBrains_Mono'] text-zinc-300 mb-4 tracking-wider uppercase backdrop-blur-md shadow-sm">
          <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
          <span>Start a Project · Guided Intake</span>
        </div>

        {/* Short intro above form requested by user */}
        <h2 className="font-['Outfit'] font-extrabold text-3xl sm:text-5xl text-white tracking-[-0.03em] drop-shadow-[0_6px_25px_rgba(0,0,0,0.85)] max-w-2xl mx-auto">
          Have an idea? Let’s make it testable<span className="text-indigo-400">.</span>
        </h2>
        <p className="text-[16px] sm:text-[18px] text-zinc-300 mt-3 max-w-xl mx-auto font-light leading-[1.65] font-['Outfit']">
          Tell us what you have in mind. We can help turn it into a working first version you can launch, test and refine before scaling.
        </p>
      </div>

      {/* Main Intake Form Container */}
      <div 
        className="rounded-3xl p-6 sm:p-11 border border-white/10 relative overflow-hidden bg-[#0e1017]/90 backdrop-blur-xl shadow-2xl"
        style={{
          boxShadow: '0 25px 70px -20px rgba(0, 0, 0, 0.85)'
        }}
      >
        {isSubmitted ? (
          /* =========================================================================
              AFTER SUCCESSFUL SUBMISSION
              Exact requested copy:
              "Thanks — your idea is on its way.
               We’ll review it and get back to you at the email address you provided."
             ========================================================================= */
          <div className="text-center py-10 animate-in zoom-in-95 duration-400 space-y-6">
            <div 
              className="w-16 h-16 rounded-full mx-auto flex items-center justify-center border border-emerald-500/30 bg-emerald-500/10 shadow-xl"
            >
              <CheckCircle2 className="w-8 h-8 text-emerald-400" />
            </div>

            <div className="space-y-2">
              <h3 className="font-['Outfit'] font-extrabold text-2xl sm:text-3xl text-white tracking-tight">
                Thanks — your idea is on its way.
              </h3>
              <p className="text-zinc-300 text-[16px] sm:text-[18px] max-w-lg mx-auto font-light leading-[1.6] font-['Outfit']">
                We’ll review it and get back to you at the email address you provided (<span className="text-white font-medium">{email}</span>).
              </p>
            </div>

            {/* Brief Summary Box */}
            <div className="max-w-md mx-auto p-5 rounded-2xl border border-white/10 bg-[#12131b] text-left text-[14px] text-zinc-300 space-y-2.5">
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-zinc-400">Target Project:</span>
                <span className="text-white font-medium">{buildType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Preferred Timeline:</span>
                <span className="text-zinc-200">{timeline || 'Flexible / Exploratory'}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <button
                onClick={handleReset}
                className="px-7 py-3.5 rounded-full text-[14px] font-['Outfit'] font-semibold border border-white/15 text-zinc-200 hover:text-white hover:bg-white/5 transition-all flex items-center gap-2 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Submit Another Idea</span>
              </button>

              {onNavigateHome && (
                <button
                  onClick={onNavigateHome}
                  className="px-8 py-3.5 rounded-full text-[14px] font-['Outfit'] font-bold text-slate-950 shadow-lg flex items-center gap-2 transition-all hover:scale-[1.02] cursor-pointer"
                  style={{ backgroundColor: accentColor }}
                >
                  <span>Explore More Ideas</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* Field 1: Name & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-[14px] font-['Outfit'] text-zinc-200 mb-2 font-medium">
                  Name <span className="text-indigo-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Alex Rivera"
                  className="w-full px-4.5 py-3.5 rounded-xl border border-white/10 bg-[#12131a] text-white text-[15px] placeholder:text-zinc-500 focus:outline-none focus:border-indigo-400/60 focus:ring-1 focus:ring-indigo-400/30 transition-all font-['Outfit']"
                />
              </div>

              <div>
                <label className="block text-[14px] font-['Outfit'] text-zinc-200 mb-2 font-medium">
                  Email <span className="text-indigo-400">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex@domain.com"
                  className="w-full px-4.5 py-3.5 rounded-xl border border-white/10 bg-[#12131a] text-white text-[15px] placeholder:text-zinc-500 focus:outline-none focus:border-indigo-400/60 focus:ring-1 focus:ring-indigo-400/30 transition-all font-['Outfit']"
                />
              </div>
            </div>

            {/* Field 2: What would you like to build? (Pill/Card Selector) */}
            <div>
              <label className="block text-[14px] font-['Outfit'] text-zinc-200 mb-3 font-medium">
                What would you like to build? <span className="text-indigo-400">*</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {buildOptions.map((opt) => {
                  const isSelected = buildType === opt;
                  return (
                    <button
                      type="button"
                      key={opt}
                      onClick={() => {
                        playTick(720, 'sine', 0.02, 0.02);
                        setBuildType(opt);
                      }}
                      className={`p-3.5 rounded-xl text-left border text-[14px] font-['Outfit'] transition-all flex items-center justify-between cursor-pointer ${
                        isSelected 
                          ? 'border-indigo-400/60 bg-[#171824] text-white font-medium shadow-md' 
                          : 'border-white/10 bg-[#12131a] text-zinc-300 hover:border-white/20 hover:text-white'
                      }`}
                    >
                      <span>{opt}</span>
                      {isSelected ? (
                        <Check className="w-4 h-4 text-indigo-400 shrink-0" />
                      ) : (
                        <div className="w-2 h-2 rounded-full bg-white/10 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Field 3: Tell us about your idea */}
            <div>
              <label className="block text-[14px] font-['Outfit'] text-zinc-200 mb-2 font-medium">
                Tell us about your idea <span className="text-indigo-400">*</span>
              </label>
              <textarea
                rows={4}
                required
                value={idea}
                onChange={(e) => setIdea(e.target.value)}
                placeholder="What is the concept? Who is it for, and what core experience do you want to test before scaling?"
                className="w-full px-4.5 py-3.5 rounded-xl border border-white/10 bg-[#12131a] text-white text-[15px] placeholder:text-zinc-500 focus:outline-none focus:border-indigo-400/60 focus:ring-1 focus:ring-indigo-400/30 transition-all resize-none font-['Outfit'] leading-relaxed"
              />
            </div>

            {/* Field 4: Optional Preferred Timeline */}
            <div className="pt-1">
              <div className="flex items-center justify-between mb-2.5">
                <label className="block text-[13px] font-['JetBrains_Mono'] text-zinc-400 uppercase tracking-wider font-semibold">
                  Optional Preferred Timeline
                </label>
                <span className="text-[12px] text-zinc-500 font-['Outfit']">Select best fit or leave flexible</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {timelineOptions.map((opt) => {
                  const isSelected = timeline === opt;
                  return (
                    <button
                      type="button"
                      key={opt}
                      onClick={() => {
                        playTick(680, 'sine', 0.02, 0.01);
                        setTimeline(timeline === opt ? '' : opt);
                      }}
                      className={`p-3.5 rounded-xl text-left border text-[13px] font-['Outfit'] transition-all flex items-center justify-between cursor-pointer ${
                        isSelected
                          ? 'border-indigo-400/50 bg-[#161722] text-white font-medium shadow-md'
                          : 'border-white/5 bg-[#12131a]/60 text-zinc-400 hover:text-zinc-200 hover:bg-[#12131a]'
                      }`}
                    >
                      <span className="leading-snug">{opt}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-indigo-400 shrink-0 ml-1.5" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Error Notification with fallback mailto link */}
            {errorMessage && (
              <div className="p-4 rounded-xl border border-rose-500/25 bg-rose-950/20 text-rose-200 text-[14px] flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p>{errorMessage}</p>
                  <a
                    href={mailtoLink}
                    className="inline-flex items-center gap-1.5 text-white underline font-medium hover:text-rose-200"
                  >
                    <span>Click here to send via your mail app instead</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            )}

            {/* Primary Submit Button: Send My Idea */}
            <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-[13px] font-['JetBrains_Mono'] text-zinc-400 text-center sm:text-left">
                Direct transmission to <span className="text-zinc-200 font-semibold">onlinefirst2026@gmail.com</span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-9 py-4 rounded-full font-['Outfit'] font-bold text-[15px] tracking-wider text-slate-950 transition-all hover:scale-[1.02] flex items-center justify-center gap-2.5 shadow-xl cursor-pointer disabled:opacity-50"
                style={{
                  backgroundColor: accentColor,
                  boxShadow: '0 0 25px rgba(129, 140, 248, 0.25)'
                }}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Sending Idea...</span>
                  </>
                ) : (
                  <>
                    <span>Send My Idea</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>

          </form>
        )}
      </div>

      {/* =========================================================================
          DIRECT CONTACT OPTION BENEATH THE FORM
          Displays onlinefirst2026@gmail.com clearly as requested
         ========================================================================= */}
      <div className="mt-8 p-6 rounded-2xl border border-white/10 bg-[#101118]/80 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-indigo-400 shrink-0">
            <Mail className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[12px] font-['JetBrains_Mono'] text-zinc-400 uppercase tracking-widest font-semibold">
              Prefer Direct Email?
            </div>
            <div className="text-[15px] text-zinc-200 font-['Outfit'] mt-0.5">
              Reach us anytime at{' '}
              <a 
                href="mailto:onlinefirst2026@gmail.com" 
                className="text-white font-medium hover:underline hover:text-indigo-300 transition-colors"
              >
                onlinefirst2026@gmail.com
              </a>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={copyEmailToClipboard}
            className="px-4 py-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-[13px] font-['JetBrains_Mono'] text-zinc-300 hover:text-white transition-all flex items-center gap-1.5 cursor-pointer"
            title="Copy email address"
          >
            {copiedEmail ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>

          <a
            href="mailto:onlinefirst2026@gmail.com"
            className="px-5 py-2 rounded-full border border-white/15 bg-indigo-500/15 hover:bg-indigo-500/25 text-[13px] font-['Outfit'] font-semibold text-indigo-200 hover:text-white transition-all flex items-center gap-1.5"
          >
            <span>Open Email</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

    </section>
  );
};
