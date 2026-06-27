import { useState, useEffect } from 'react';

export default function Home() {
  const [clientName, setClientName] = useState('');
  const [projectDetails, setProjectDetails] = useState('');
  const [yourSolution, setYourSolution] = useState('');
  const [price, setPrice] = useState('');
  const [result, setResult] = useState(null);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('unlocked') === 'true') {
      setIsUnlocked(true);
    }
  }, []);

  const generateProposal = () => {
    if (!clientName || !projectDetails || !yourSolution || !price) {
      alert('Please fill out all fields.');
      return;
    }

    const proposal = `Hi ${clientName},

I read through your project details regarding: "${projectDetails}". 

Most freelancers will just bid on this without understanding the underlying business goal. I understand that your real objective here is to get a solution that works reliably so you don't have to micromanage it. 

Here is exactly how I would approach this:
 ${yourSolution}

By partnering with me, you aren't just getting a task done; you are getting a partner who cares about the end result. 

My bid for this project is $${price}. 

I can start immediately. Let's hop on a quick chat to align on the details.`;

    const sow = `SCOPE OF WORK AGREEMENT

Project: ${projectDetails}
Client: ${clientName}
Agreed Price: $${price}

1. SCOPE: The freelancer agrees to provide the following services: ${yourSolution}. Any features or tasks not explicitly listed here will be considered out of scope and subject to a separate quote.

2. REVISIONS: The client is entitled to 2 rounds of revisions. Additional revisions will be billed at an hourly rate of $50/hr.

3. PAYMENT TERMS: 50% upfront deposit required before work commences. 50% due upon delivery of the final files.

4. INTELLECTUAL PROPERTY: Final deliverables will become the property of the client upon receipt of final payment. The freelancer retains the right to display the work in their portfolio.

5. TIMELINE: Estimated delivery is 7 days from project commencement, contingent upon timely client feedback.`;

    setResult({ proposal, sow });
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: '#09090b', 
      color: '#e4e4e7', 
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      padding: '40px 20px'
    }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: '800', letterSpacing: '-0.02em', background: 'linear-gradient(to right, #e4e4e7, #a1a1aa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Freelance Proposal Generator
          </h1>
          <p style={{ color: '#71717a', marginTop: '10px', fontSize: '1.1rem' }}>
            Win high-ticket clients and protect yourself from scope creep.
          </p>
        </div>
        
        <div style={{ background: 'rgba(24, 24, 27, 0.8)', border: '1px solid #27272a', borderRadius: '12px', padding: '24px', backdropFilter: 'blur(10px)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', gap: '16px' }}>
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: '0.875rem', color: '#a1a1aa', marginBottom: '6px', display: 'block' }}>Client Name</label>
              <input 
                type="text" 
                placeholder="John Doe" 
                value={clientName} 
                onChange={(e) => setClientName(e.target.value)} 
                style={{ width: '100%', background: '#09090b', border: '1px solid #3f3f46', borderRadius: '8px', padding: '12px', color: '#fff', outline: 'none', boxSizing: 'border-box' }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: '0.875rem', color: '#a1a1aa', marginBottom: '6px', display: 'block' }}>Your Price ($)</label>
              <input 
                type="text" 
                placeholder="1500" 
                value={price} 
                onChange={(e) => setPrice(e.target.value)} 
                style={{ width: '100%', background: '#09090b', border: '1px solid #3f3f46', borderRadius: '8px', padding: '12px', color: '#fff', outline: 'none', boxSizing: 'border-box' }}
              />
            </div>
          </div>
          <div>
            <label style={{ fontSize: '0.875rem', color: '#a1a1aa', marginBottom: '6px', display: 'block' }}>Client's Project Details</label>
            <textarea 
              placeholder="Copy/paste the client's job description or problem here..." 
              value={projectDetails} 
              onChange={(e) => setProjectDetails(e.target.value)} 
              style={{ width: '100%', background: '#09090b', border: '1px solid #3f3f46', borderRadius: '8px', padding: '12px', color: '#fff', outline: 'none', minHeight: '80px', boxSizing: 'border-box' }}
            />
          </div>
          <div>
            <label style={{ fontSize: '0.875rem', color: '#a1a1aa', marginBottom: '6px', display: 'block' }}>Your Proposed Solution</label>
            <textarea 
              placeholder="Explain exactly what you will do for them..." 
              value={yourSolution} 
              onChange={(e) => setYourSolution(e.target.value)} 
              style={{ width: '100%', background: '#09090b', border: '1px solid #3f3f46', borderRadius: '8px', padding: '12px', color: '#fff', outline: 'none', minHeight: '80px', boxSizing: 'border-box' }}
            />
          </div>
          <button 
            onClick={generateProposal} 
            style={{ marginTop: '8px', padding: '16px', background: '#fff', color: '#000', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '700', fontSize: '1rem', transition: 'opacity 0.2s' }}
          >
            Generate Documents Instantly
          </button>
        </div>

        {result && (
          <div style={{ marginTop: '30px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {/* PROPOSAL (Free) */}
            <div style={{ background: 'rgba(24, 24, 27, 0.8)', border: '1px solid #27272a', borderRadius: '12px', padding: '24px', backdropFilter: 'blur(10px)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 style={{ margin: 0, color: '#fff', fontSize: '1.2rem' }}>The Proposal</h3>
                <button onClick={() => copyToClipboard(result.proposal)} style={{ padding: '8px 16px', background: '#27272a', color: '#fff', border: '1px solid #3f3f46', borderRadius: '6px', cursor: 'pointer', fontSize: '0.875rem' }}>
                  {copied ? 'Copied!' : 'Copy Text'}
                </button>
              </div>
              <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit', color: '#d4d4d8', lineHeight: '1.6', margin: 0 }}>
                {result.proposal}
              </pre>
            </div>

            {/* SOW (Locked) */}
            <div style={{ 
              background: 'rgba(24, 24, 27, 0.8)', 
              border: '1px solid #27272a', 
              borderRadius: '12px', 
              padding: '24px', 
              backdropFilter: 'blur(10px)', 
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 0 40px rgba(0,0,0,0.5)'
            }}>
              <h3 style={{ margin: '0 0 16px 0', color: '#fff', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '8px', height: '8px', background: '#fbbf24', borderRadius: '50%', display: 'inline-block' }}></span>
                Scope of Work Contract
              </h3>
              <div style={{ filter: isUnlocked ? 'none' : 'blur(6px)', pointerEvents: isUnlocked ? 'auto' : 'none' }}>
                <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit', color: '#d4d4d8', lineHeight: '1.6', margin: 0 }}>
                  {result.sow}
                </pre>
                {isUnlocked && (
                  <button onClick={() => copyToClipboard(result.sow)} style={{ marginTop: '16px', padding: '8px 16px', background: '#fbbf24', color: '#000', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '0.875rem', fontWeight: 'bold' }}>
                    Copy Contract
                  </button>
                )}
              </div>
              
              {!isUnlocked && (
                <div style={{ 
                  position: 'absolute', 
                  top: '50%', 
                  left: '50%', 
                  transform: 'translate(-50%, -50%)', 
                  background: '#09090b', 
                  padding: '32px', 
                  border: '1px solid #fbbf24', 
                  borderRadius: '12px', 
                  textAlign: 'center', 
                  width: '340px',
                  boxShadow: '0 0 30px rgba(251, 191, 36, 0.1)'
                }}>
                  <p style={{ fontWeight: 'bold', marginBottom: '8px', fontSize: '1.1rem', color: '#fbbf24' }}>Unlock Legal Protection</p>
                  <p style={{ fontSize: '0.9rem', marginBottom: '24px', color: '#a1a1aa', lineHeight: '1.4' }}>
                    Don't lose money to scope creep. Generate the official Scope of Work contract to lock in your terms.
                  </p>
                  <a href="https://buy.stripe.com/7sY7sN77v2YK2gp1EI1B605" style={{ background: '#fbbf24', color: '#000', padding: '12px 24px', textDecoration: 'none', borderRadius: '8px', fontWeight: '700', display: 'inline-block', fontSize: '0.95rem' }}>
                    Unlock Contract for $9
                  </a>
                </div>
              )}
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
