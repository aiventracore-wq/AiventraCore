import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Loader2, CheckCircle2, AlertOctagon } from 'lucide-react';

interface FormState {
  name: string;
  email: string;
  organization: string;
  message: string;
}

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormState>({
    name: '',
    email: '',
    organization: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [statusMsg, setStatusMsg] = useState('');
  const [fieldErrors, setFieldErrors] = useState<{ field: string; message: string }[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors.length > 0) {
      setFieldErrors((prev) => prev.filter((err) => err.field !== name));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setStatus('idle');
    setStatusMsg('');
    setFieldErrors([]);

    const apiEndpoint = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
      ? 'http://localhost:5000/api/contact'
      : '/api/contact';

    try {
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setStatusMsg(data.message || 'Inquiry successfully processed.');
        setFormData({ name: '', email: '', organization: '', message: '' }); 
      } else {
        setStatus('error');
        if (data.errors) {
          setFieldErrors(data.errors);
          setStatusMsg('Validation errors occurred. Please check the inputs below.');
        } else {
          setStatusMsg(data.message || 'Failed to submit enquiry.');
        }
      }
    } catch (err) {
      console.error('Contact Form Submission Error:', err);
      setStatus('error');
      setStatusMsg('Network error. Unable to establish contact with the api server.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-36 bg-white border-t border-brand-grey/25 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Company Details (Left - 5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between text-left">
            <div>
              <span className="text-brand-brown font-mono text-xs uppercase tracking-widest font-semibold block mb-3">
                [ Contact Directory ]
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-brand-teal tracking-tight mb-6">
                Connect with our Systems Architect Team
              </h2>
              <p className="text-slate-500 font-sans text-sm md:text-base leading-relaxed mb-8">
                Ready to review your cloud infrastructure or data pipelines? 
                Provide your structural requirements and we will compile a diagnostic proposal.
              </p>

              {/* Info Items */}
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 border border-brand-teal/20 flex items-center justify-center bg-brand-teal/5 text-brand-teal">
                    <Mail size={18} />
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase tracking-wider text-slate-400 font-bold">Secure Mail</span>
                    <a href="mailto:solutions@aiventracore.com" className="text-sm font-semibold text-brand-teal hover:underline">
                      solutions@aiventracore.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 border border-brand-teal/20 flex items-center justify-center bg-brand-teal/5 text-brand-teal">
                    <Phone size={18} />
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase tracking-wider text-slate-400 font-bold">Secure Telephony</span>
                    <a href="tel:+18005550199" className="text-sm font-semibold text-brand-teal hover:underline">
                      +1 (800) 555-0199 (Ext 4)
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 border border-brand-teal/20 flex items-center justify-center bg-brand-teal/5 text-brand-teal">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase tracking-wider text-slate-400 font-bold">Command Office</span>
                    <span className="text-sm font-semibold text-brand-teal">
                      Suite 900, Tech Gateway, Silicon Valley, CA
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Operating Model Note */}
            <div className="mt-12 p-4 bg-brand-offwhite/50 border border-brand-grey/20 font-sans text-xs text-slate-500 leading-relaxed">
              <span className="font-bold text-brand-teal block mb-1">Operating Model SLA:</span>
              Our response engine operates 24/7. System analysis proposals are scheduled and delivered within 1 business day of ingest validation.
            </div>
          </div>

          {/* Contact Form Container (Right - 7 Cols) */}
          <div className="lg:col-span-7 bg-brand-offwhite/20 border border-brand-grey/30 p-8 md:p-10">
            <div className="mb-6">
              <h3 className="font-heading font-bold text-lg text-brand-teal">
                Enter Ingestion Payload
              </h3>
              <p className="text-slate-500 text-xs font-sans mt-1">
                Tell us about your project or data pipeline requirements.
              </p>
            </div>

            {/* Success and Error Banner Feedbacks */}
            {status === 'success' && (
              <div className="mb-8 p-4 bg-emerald-50 border border-emerald-400 text-emerald-800 text-xs font-sans flex items-start gap-3">
                <CheckCircle2 size={16} className="text-emerald-600 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-bold block">Transmission Verified</span>
                  {statusMsg}
                </div>
              </div>
            )}

            {status === 'error' && (
              <div className="mb-8 p-4 bg-rose-50 border border-rose-400 text-rose-800 text-xs font-sans flex items-start gap-3">
                <AlertOctagon size={16} className="text-rose-600 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-bold block">Transmission Rejected</span>
                  {statusMsg}
                </div>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Name field */}
                <div className="relative group">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder=" "
                    className="w-full bg-transparent border-b border-brand-grey focus:border-brand-teal outline-none py-3 text-sm transition-all duration-300 font-sans focus:placeholder-transparent placeholder-slate-400"
                  />
                  <label 
                    htmlFor="name" 
                    className="absolute left-0 top-3 text-slate-400 text-sm pointer-events-none transition-all duration-300 transform -translate-y-6 scale-75 origin-left group-focus-within:-translate-y-6 group-focus-within:scale-75 group-focus-within:text-brand-teal peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 font-medium"
                  >
                    Name
                  </label>
                  {fieldErrors.find(e => e.field === 'name') && (
                    <span className="text-[10px] text-rose-500 font-mono mt-1 block">
                      * {fieldErrors.find(e => e.field === 'name')?.message}
                    </span>
                  )}
                </div>

                {/* Email field */}
                <div className="relative group">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder=" "
                    className="w-full bg-transparent border-b border-brand-grey focus:border-brand-teal outline-none py-3 text-sm transition-all duration-300 font-sans focus:placeholder-transparent placeholder-slate-400"
                  />
                  <label 
                    htmlFor="email" 
                    className="absolute left-0 top-3 text-slate-400 text-sm pointer-events-none transition-all duration-300 transform -translate-y-6 scale-75 origin-left group-focus-within:-translate-y-6 group-focus-within:scale-75 group-focus-within:text-brand-teal peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 font-medium"
                  >
                    Email Address
                  </label>
                  {fieldErrors.find(e => e.field === 'email') && (
                    <span className="text-[10px] text-rose-500 font-mono mt-1 block">
                      * {fieldErrors.find(e => e.field === 'email')?.message}
                    </span>
                  )}
                </div>
              </div>

              {/* Organization field */}
              <div className="relative group">
                <input
                  type="text"
                  id="organization"
                  name="organization"
                  value={formData.organization}
                  onChange={handleChange}
                  placeholder=" "
                  className="w-full bg-transparent border-b border-brand-grey focus:border-brand-teal outline-none py-3 text-sm transition-all duration-300 font-sans focus:placeholder-transparent placeholder-slate-400"
                />
                <label 
                  htmlFor="organization" 
                  className="absolute left-0 top-3 text-slate-400 text-sm pointer-events-none transition-all duration-300 transform -translate-y-6 scale-75 origin-left group-focus-within:-translate-y-6 group-focus-within:scale-75 group-focus-within:text-brand-teal peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 font-medium"
                >
                  Organization / Enterprise
                </label>
                {fieldErrors.find(e => e.field === 'organization') && (
                  <span className="text-[10px] text-rose-500 font-mono mt-1 block">
                    * {fieldErrors.find(e => e.field === 'organization')?.message}
                  </span>
                )}
              </div>

              {/* Message field */}
              <div className="relative group">
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  placeholder=" "
                  className="w-full bg-transparent border-b border-brand-grey focus:border-brand-teal outline-none py-3 text-sm transition-all duration-300 font-sans resize-none focus:placeholder-transparent placeholder-slate-400"
                />
                <label 
                  htmlFor="message" 
                  className="absolute left-0 top-3 text-slate-400 text-sm pointer-events-none transition-all duration-300 transform -translate-y-6 scale-75 origin-left group-focus-within:-translate-y-6 group-focus-within:scale-75 group-focus-within:text-brand-teal peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 font-medium"
                >
                  Brief Technical Requirements (Min 10 characters)
                </label>
                {fieldErrors.find(e => e.field === 'message') && (
                  <span className="text-[10px] text-rose-500 font-mono mt-1 block">
                    * {fieldErrors.find(e => e.field === 'message')?.message}
                  </span>
                )}
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-brand-brown hover:bg-brand-brown/95 disabled:bg-brand-brown/70 text-brand-offwhite py-4 font-bold text-xs uppercase tracking-widest transition-all duration-300 ease-in-out border-2 border-brand-brown flex items-center justify-center gap-3 rounded-none cursor-pointer"
              >
                {submitting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    <span>Validating Payload...</span>
                  </>
                ) : (
                  <>
                    <Send size={14} />
                    <span>Submit Ingest Request</span>
                  </>
                )}
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};
