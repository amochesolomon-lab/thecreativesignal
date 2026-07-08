require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-base');
const { Resend } = require('resend');

const app = express();
app.use(cors());
app.use(express.json());

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);
const resend = new Resend(process.env.RESEND_API_KEY);

// GET /api/issues
app.get('/api/issues', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('issues')
      .select('*')
      .order('published_at', { ascending: false });

    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/issues/:slug
app.get('/api/issues/:slug', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('issues')
      .select('*')
      .eq('slug', req.params.slug)
      .single();

    if (error || !data) return res.status(404).json({ error: 'Issue not encountered' });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/subscribe
app.post('/api/subscribe', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Email constraint violation' });

  try {
    const { data, error } = await supabase
      .from('subscribers')
      .insert([{ email }])
      .select();

    if (error) {
      if (error.code === '23505') { // Postgres code for duplicate unique value constraint
        return res.status(400).json({ error: 'Email already mapped to channel.' });
      }
      throw error;
    }

    // Fire welcome communication lifecycle asset through Resend
    await resend.emails.send({
      from: 'The Creative Signal <journal@yourdomain.com>',
      to: [email],
      subject: 'Loop Active: Welcome to The Creative Signal',
      html: `
        <div style="background:#000000; color:#ffffff; padding:40px; font-family:sans-serif; max-width:600px; margin:0 auto;">
          <p style="text-transform:uppercase; letter-spacing:0.2em; font-size:12px; color:rgba(255,255,255,0.4);">System Notification</p>
          <h2 style="text-transform:uppercase; font-size:24px; letter-spacing:0.05em; margin-top:10px;">Connection Established.</h2>
          <p style="color:rgba(255,255,255,0.7); font-size:16px; line-height:1.6; margin-top:20px;">
            Thank you for connecting to the node. The Creative Signal is officially running. Issue 001 is available on the main canvas dashboard interface.
          </p>
          <hr style="border:0; border-top:1px solid rgba(255,255,255,0.1); margin:30px 0;" />
          <a href="${process.env.FRONTEND_URL}" style="color:#ffffff; text-decoration:none; text-transform:uppercase; font-size:14px; font-weight:bold; letter-spacing:0.1em; border-bottom:1px solid #ffffff; padding-bottom:2px;">Go to Dashboard &rarr;</a>
        </div>
      `
    });

    res.status(201).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Signal API engine engaged on port ${PORT}`));