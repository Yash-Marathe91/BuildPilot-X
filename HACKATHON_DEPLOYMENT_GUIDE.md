# BuildPilot X - AMD Hackathon Deployment Guide

This is a permanent backup of our deployment routine. If the chat gets cleared, follow these exact steps to reconnect your AMD GPU backend to your Next.js frontend before your presentation.

## Morning Re-Connection Routine (Takes 60 seconds)

When you wake up, your AMD notebook will likely be paused and the Cloudflare tunnel will be dead. Here is how to turn everything back on.

### Step 1: Start the AI Backend
1. Open your AMD Notebook in your browser.
2. Open a terminal and navigate to your project:
   ```bash
   cd /workspace/BuildPilot-X
   ```
3. Set the environment variable to force local inference:
   ```bash
   export USE_LOCAL_HF=True
   ```
4. Start the FastAPI server:
   ```bash
   uvicorn backend.main:app --host 0.0.0.0 --port 8000
   ```
*(Leave this terminal running!)*

### Step 2: Start the Cloudflare Tunnel
1. Open a **second terminal** in your AMD notebook.
2. Run the tunnel command:
   ```bash
   ./cloudflared tunnel --url http://127.0.0.1:8000
   ```
   *(If it says file not found, re-run: `curl -kL https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64 -o cloudflared && chmod +x cloudflared`)*
3. Wait a few seconds until it prints out a URL that looks like: `https://something-random.trycloudflare.com`
4. Copy that URL.

### Step 3: Update the Frontend
1. Open your Vercel Dashboard for BuildPilot X.
2. Go to **Settings > Environment Variables**.
3. Edit `NEXT_PUBLIC_AI_BACKEND_URL` and paste your new URL. **Make sure to add `/api/v1` to the end!**
   * Example: `https://something-random.trycloudflare.com/api/v1`
4. Save it, and click **Deployments -> Redeploy** so the live website gets the new URL.
5. If testing locally on your PC, update `.env.local` with the same URL and restart `npm run dev`.

### Step 4: The Hardware Flex (During the Presentation)
To impress the judges, open a third terminal in your AMD notebook while the agents are generating text and run:
```bash
rocm-smi
```
This will show live proof that your application is pushing the AMD GPU to 100% utilization!

Good luck with the presentation!
