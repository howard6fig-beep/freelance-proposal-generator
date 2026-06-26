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

    // Rule-based Copywriting Engine
    const proposal = `Hi ${clientName},

I read through your project details regarding: "${projectDetails}". 

Most freelancers will just bid on this without understanding the underlying business goal. I understand that your real objective here is to get a solution that works reliably so you don't have to micromanage it. 

Here is exactly how I would approach this:
 ${yourSolution}

By partnering with me, you aren't just getting a task done; you are getting a partner who cares about the end result. 

My bid for this project is $${price}. 

I can start immediately. Let's hop on a quick chat to align on the details.`;

    // The High-Value Locked Content (Scope of Work)
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
    <div style={{ maxWidth: '800px', margin: '0 auto', fontFamily: 'Arial, sans-serif', padding: '20px' }}>
      <h1 style={{ color: '#2c3e50', textAlign: 'center' }}>Freelance Proposal & SOW Generator</h1>
      <p style={{ color: '#7f8c8d', textAlign: 'center' }}>Win more clients and protect yourself from scope creep. Instantly generate persuasive proposals and legal SOWs.</p>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '30px' }}>
        <input 
          type="text" 
          placeholder="Client Name (e.g., John)" 
          value={clientName} 
          onChange={(e) => setClientName(e.target.value)} 
          style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
        />
        <textarea 
          placeholder="Client's Project Details (Copy/paste their job description here)" 
          value={projectDetails} 
          onChange={(e) => setProjectDetails(e.target.value)} 
          style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc', minHeight: '100px' }}
        />
        <textarea 
          placeholder="Your Proposed Solution (What will you actually do for them?)" 
          value={yourSolution} 
          onChange={(e) => setYourSolution(e.target.value)} 
          style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc', minHeight: '100px' }}
        />
        <input 
          type="text" 
          placeholder="Your Price (e.g., 500)" 
          value={price} 
          onChange={(e) => setPrice(e.target.value)} 
          style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
        />
        <button 
          onClick={generateProposal} 
          style={{ padding: '15px', background: '#27ae60', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px' }}
        >
          Generate Proposal & Contract
        </button>
      </div>

      {result && (
        <div style={{ marginTop: '30px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* PROPOSAL (Free) */}
          <div style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', position: 'relative' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <h3 style={{ margin: 0, color: '#2c3e50' }}>The Proposal (Free)</h3>
              <button onClick={() => copyToClipboard(result.proposal)} style={{ padding: '5px 10px', background: '#2c3e50', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit', color: '#333', lineHeight: '1.6' }}>
              {result.proposal}
            </pre>
          </div>

          {/* SOW (Locked) */}
          <div style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', position: 'relative', border: '2px solid #e74c3c' }}>
            <h3 style={{ margin: 0, color: '#e74c3c', marginBottom: '10px' }}>Scope of Work Contract (Protects You)</h3>
            <div style={{ filter: isUnlocked ? 'none' : 'blur(6px)', pointerEvents: isUnlocked ? 'auto' : 'none' }}>
              <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit', color: '#333', lineHeight: '1.6' }}>
                {result.sow}
              </pre>
              {isUnlocked && (
                <button onClick={() => copyToClipboard(result.sow)} style={{ marginTop: '10px', padding: '5px 10px', background: '#e74c3c', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                  Copy SOW
                </button>
              )}
            </div>
            
            {!isUnlocked && (
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: 'white', padding: '25px', border: '2px solid #e74c3c', borderRadius: '10px', textAlign: 'center', width: '320px', boxShadow: '0 10px 15px rgba(0,0,0,0.1)' }}>
                <p style={{ fontWeight: 'bold', marginBottom: '10px', fontSize: '18px' }}>Don't Get Scammed By Clients</p>
                <p style={{ fontSize: '14px', marginBottom: '20px', color: '#666' }}>Unlock the legal Scope of Work contract to prevent unpaid revisions and scope creep. Pay once, use forever.</p>
                <a href="STRIPE_PAYMENT_LINK_HERE" style={{ background: '#635bff', color: 'white', padding: '12px 25px', textDecoration: 'none', borderRadius: '5px', fontWeight: 'bold', display: 'inline-block' }}>
                  Unlock Contract for $9
                </a>
              </div>
            )}
          </div>

        </div>
      )}
    </div>
  );
}
