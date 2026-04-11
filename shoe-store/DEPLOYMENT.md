# StepUp Shoe Store — Deployment Guide

## Project Structure
```
shoe-store/
├── client/          ← React + Vite frontend
├── server/          ← Express backend
├── database/
│   └── schema.sql   ← MySQL schema
├── .env.example     ← Environment variables template
└── package.json
```

---

## Step 1 — Set Up MySQL Database

### Local (development)
```bash
# Login to MySQL
mysql -u root -p
# Enter password: xzvb

# Run the schema
mysql -u root -pxzvb < database/schema.sql
```

### Production (recommended: PlanetScale or Railway MySQL)
1. Create a MySQL database on your chosen platform
2. Copy the `database/schema.sql` contents and run it via their dashboard or CLI

---

## Step 2 — Set Up Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project → **APIs & Services** → **Credentials**
3. Click **Create Credentials** → **OAuth 2.0 Client ID**
4. Application type: **Web application**
5. Add Authorized redirect URIs:
   - Development: `http://localhost:3000/api/auth/google/callback`
   - Production: `https://your-domain.com/api/auth/google/callback`
6. Copy the **Client ID** and **Client Secret** into your `.env`

---

## Step 3 — Configure Environment Variables

```bash
cp .env.example .env
# Edit .env with your actual values
```

Required values:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=xzvb
DB_NAME=stepup_shoes
SESSION_SECRET=a-long-random-secret-string
GOOGLE_CLIENT_ID=xxxx.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-xxxxxx
GOOGLE_CALLBACK_URL=http://localhost:3000/api/auth/google/callback
```

---

## Step 4 — Run Locally

```bash
npm install
npm run dev        # Starts frontend on :5173 + backend on :3000
```

---

## DEPLOYING TO PRODUCTION

### Option A — Railway (Easiest — Recommended)

Railway hosts your backend + database together.

1. Install Railway CLI: `npm i -g @railway/cli`
2. Login: `railway login`
3. Create project: `railway new`
4. Add MySQL plugin in the Railway dashboard (one click)
5. Set environment variables in Railway dashboard
6. Deploy:
   ```bash
   railway up
   ```
7. Your backend URL will be like `https://shoe-store.up.railway.app`

**Frontend on Vercel:**
```bash
npm install -g vercel
cd shoe-store
vercel --prod
# Set VITE_API_URL=https://your-railway-backend.up.railway.app in Vercel env vars
```

---

### Option B — Render (Free tier available)

**Database:**
1. Create a free MySQL database on [PlanetScale](https://planetscale.com) (free tier)
2. Run `database/schema.sql` in their dashboard
3. Copy the connection string

**Backend:**
1. Push your code to GitHub
2. Go to [render.com](https://render.com) → New → Web Service
3. Connect your GitHub repo
4. Build command: `npm run build:server`
5. Start command: `node dist/server/node-build.mjs`
6. Add environment variables in Render dashboard

**Frontend:**
1. New → Static Site on Render
2. Build command: `npm run build:client`
3. Publish directory: `dist/spa`

---

### Option C — VPS (Ubuntu) — Full Control

```bash
# On your server (Ubuntu 22.04)
sudo apt update && sudo apt install -y nodejs npm mysql-server nginx

# Set up MySQL
sudo mysql_secure_installation
mysql -u root -p < database/schema.sql

# Clone & install
git clone https://github.com/yourname/shoe-store.git
cd shoe-store
npm install
npm run build

# Set up PM2 (process manager)
npm install -g pm2
pm2 start "node dist/server/node-build.mjs" --name stepup-api
pm2 startup && pm2 save

# Nginx config for /etc/nginx/sites-available/stepup
server {
  listen 80;
  server_name yourdomain.com;

  location /api/ {
    proxy_pass http://localhost:3000;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
  }

  location / {
    root /path/to/shoe-store/dist/spa;
    try_files $uri $uri/ /index.html;
  }
}

# Enable & SSL
sudo ln -s /etc/nginx/sites-available/stepup /etc/nginx/sites-enabled/
sudo certbot --nginx -d yourdomain.com
sudo systemctl restart nginx
```

---

## Quick Reference — API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Create account |
| POST | /api/auth/login | Email/password login |
| GET | /api/auth/google | Start Google OAuth |
| GET | /api/auth/google/callback | Google OAuth callback |
| POST | /api/auth/logout | Logout |
| GET | /api/me | Get current user |

---

## Summary — Which platform to pick?

| Platform | Cost | Difficulty | Best for |
|----------|------|------------|----------|
| Railway | ~$5/mo | ⭐ Easiest | Small/medium apps |
| Render | Free tier | ⭐⭐ Easy | Side projects |
| Vercel + PlanetScale | Free tier | ⭐⭐ Easy | Frontend-heavy apps |
| VPS (DigitalOcean) | ~$6/mo | ⭐⭐⭐ Moderate | Full control |
