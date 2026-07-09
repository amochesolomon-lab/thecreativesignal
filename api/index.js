import express from 'express';
import cors from 'cors';
import { createClient } from '@supabase/supabase-js';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// Only attempt to load a local file if we aren't running inside production Vercel
if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}
const app = express();

// 2. Production-Optimized CORS Configuration
const allowedOrigins = [
  'http://localhost:5173',                 // Local Vite development server
  'http://localhost:3000',                 // Alternative local fallback port
  'https://thecreativesignal.vercel.app'   // Your future live production Vercel domain
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like server-to-server, curl, or Postman)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));

app.use(express.json());

// 3. Resource Initializations & Fail-safes
// Replace the old process.exit(1) check with this:
const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;

// Fail gracefully per-request rather than killing the serverless instance
const isSupabaseConfigured = !!(supabaseUrl && supabaseKey);
let supabase;

if (isSupabaseConfigured) {
  supabase = createClient(supabaseUrl, supabaseKey);
} else {
  console.error('CRITICAL: Supabase credentials missing from production environment configurations.');
}

const supabase = createClient(supabaseUrl, supabaseKey);

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

// Diagnostic Startup Logs
console.log('// --- ENVIRONMENT CORE DIAGNOSTIC ---');
console.log('SUPABASE_URL:', process.env.SUPABASE_URL ? 'ONLINE' : 'MISSING');
console.log('GMAIL_USER:', process.env.GMAIL_USER ? 'ONLINE' : 'MISSING');
console.log('GMAIL_APP_PASSWORD:', process.env.GMAIL_APP_PASSWORD ? 'ONLINE' : 'MISSING');
console.log('CRON_SECRET:', process.env.CRON_SECRET ? 'SECURED' : 'UNSET (Local Only)');
console.log('// ------------------------------------');


// ==========================================================
// ENDPOINT 1: USER SUBSCRIPTION PIPELINE (POST /api/subscribe)
// ==========================================================
app.post('/api/subscribe', async (req, res) => {
  const { email } = req.body;

  console.log(`\n// ---> INCOMING REQUEST FOR COORDINATE: ${email}`);
if (!isSupabaseConfigured) {
  return res.status(500).json({ error: 'Database environment misconfigured on host.' });
}
  if (!email) {
    return res.status(400).json({ error: 'Email coordinate required.' });
  }

  try {
    // 1. Check/Insert data into Supabase table
    const { error: dbError } = await supabase
      .from('subscribers')
      .insert([{ email }]);

    // Catch duplicate Postgres entries elegantly
    if (dbError && dbError.code === '23505') {
      console.log(`// NOTICE: ${email} already exists in database. Skipping email transmission.`);
      return res.status(200).json({ message: '// Node already linked to the feed.' });
    } else if (dbError) {
      throw dbError;
    }

    // 2. Dispatch Instant Welcome Email via Gmail Mailbox
    await transporter.sendMail({
      from: `"The Creative Signal" <${process.env.GMAIL_USER}>`, 
      to: email,
      subject: '// SIGNAL_INITIALIZED',
      text: `Connection established.\n\nYou have successfully synchronized with The Creative Signal telemetry.\nPrior transmissions, architectural layouts, and autonomous dev workflows will hit this coordinate weekly.\n\n/// Transmission Complete.`,
    });
    
    console.log('/// WELCOME EMAIL DISPATCHED TO:', email);
    return res.status(201).json({ success: true });

  } catch (error) {
    console.error('Subscription Pipeline Failure:', error);
    return res.status(500).json({ error: 'Internal pipeline connection failure.' });
  }
});


// ==========================================================
// ENDPOINT 2: SECURED AUTOMATED CRON BROADCASTER (GET /api/cron/broadcast)
// ==========================================================
app.get('/api/cron/broadcast', async (req, res) => {
  const authHeader = req.headers.authorization;

  // Protect path against unauthorized external URL hits
  if (!authHeader || authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    console.error('// CRON ACCESS DENIED: Missing or completely invalid token.');
    return res.status(401).json({ error: 'Unauthorized system access.' });
  }

  try {
    // 1. Fetch the single oldest scheduled issue waiting in the queue
    const { data: queuedIssue, error: issueError } = await supabase
      .from('issues')
      .select('*')
      .eq('status', 'scheduled')
      .order('id', { ascending: true })
      .limit(1)
      .maybeSingle();

    if (issueError) throw issueError;

    if (!queuedIssue) {
      console.log('// CRON CHECK: No transmissions queued for release.');
      return res.status(200).json({ message: 'No releases scheduled.' });
    }

    // 2. Gather all subscriber mailing targets
    const { data: subscribers, error: subError } = await supabase
      .from('subscribers')
      .select('email');

    if (subError) throw subError;

    if (!subscribers || subscribers.length === 0) {
      console.log('// CRON CHECK: Active issue queued, but subscriber pool is empty.');
      return res.status(200).json({ message: 'Zero subscriber coordinates found.' });
    }

    console.log(`// CRON EXECUTION: Firing "${queuedIssue.title}" to ${subscribers.length} targets.`);

    // 3. Loop through subscribers and dispatch issues sequentially
    for (const sub of subscribers) {
      try {
        await transporter.sendMail({
          from: `"The Creative Signal" <${process.env.GMAIL_USER}>`,
          to: sub.email,
          subject: queuedIssue.title,
          text: queuedIssue.content,
        });
      } catch (sendErr) {
        console.error(`Failed automated transmission delivery to: ${sub.email}`, sendErr);
      }
    }

    // 4. Update row status to 'sent' (instantly opening access on your frontend web archive)
    const { error: updateError } = await supabase
      .from('issues')
      .update({ status: 'sent' })
      .eq('id', queuedIssue.id);

    if (updateError) throw updateError;

    console.log('/// CRON EXECUTION SUMMARY: Weekly broadcast sequence successfully delivered.');
    return res.status(200).json({ success: true, deliveredCount: subscribers.length });

  } catch (error) {
    console.error('CRON System Pipeline Failure:', error);
    return res.status(500).json({ error: 'Internal automation execution failure.' });
  }
});


// Local server fallback container (ignored by Vercel serverless layer automatically)
const PORT = process.env.PORT || 5001; 
app.listen(PORT, () => console.log(`// Terminal core executing cleanly on port ${PORT}`));

// Export the Express instance for Vercel Serverless Runtime Environment handling
export default app;