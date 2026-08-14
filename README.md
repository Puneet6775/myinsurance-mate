# myInsurancemates

Premium 5-page website for **myInsurancemates** — an Indian insurance advisory for Motor, Health and Life.

**Tagline:** *Har step pe, mates ka support*

Design language follows the Colabify consulting template: dark editorial layout, pill CTAs, large type, service cards, process steps, testimonials and contact form.

## Pages

| Route | Page |
| --- | --- |
| `/` | Home |
| `/about` | About |
| `/services` | Services overview |
| `/services/motor` | Motor insurance |
| `/services/health` | Health insurance |
| `/services/life` | Life insurance |
| `/contact` | Contact |
| `/privacy` | Privacy |

Service, team, testimonial, insight and FAQ copy is hardcoded in `frontend/src/data/content.js`. Those pages do not need a backend.

The contact form, quote form and newsletter write to **MySQL**.

## Stack

- **Frontend:** React (Vite) + React Router
- **Forms on Hostinger:** PHP + MySQL
- **Forms locally (optional):** Python FastAPI + MySQL
- **Database:** MySQL (`contacts`, `quotes`, `subscribers`)

## Run locally

Pages work with only the frontend:

```bash
cd frontend
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173). Motor, health and life pages load from the hardcoded content.

To also accept form submissions locally, run MySQL and the FastAPI app:

```bash
# MySQL must be running on 127.0.0.1:3306
# Copy backend/.env.example to backend/.env and set MYSQL_* credentials

cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000 --host 127.0.0.1
```

Vite proxies `/api` to that FastAPI process. Import `backend/schema.sql` if you prefer to create tables yourself — the API also creates them on startup.

Or from the repo root:

```bash
./start.sh
```

## Host on Hostinger

Hostinger shared hosting runs the static site plus the PHP form handlers against the MySQL database you create in hPanel.

1. Create a MySQL database, user and password in **hPanel → Databases**.
2. Import `backend/schema.sql` in phpMyAdmin (or let the PHP handlers create the tables on first submit). If Hostinger already created the database, skip the `CREATE DATABASE` line and run the `CREATE TABLE` statements only.
3. Edit `frontend/public/api/config.php` with the Hostinger host, database name, user and password. On most Hostinger plans the host is `localhost`.
4. Build the site:

```bash
cd frontend
npm install
npm run build
```

5. Upload the contents of `frontend/dist/` to `public_html` (include `.htaccess` and the `api/` folder).
6. Confirm `public_html/api/config.php` still has the live credentials after upload.

`.htaccess` sends `/api/contact`, `/api/quote` and `/api/newsletter` to the PHP scripts and falls unknown routes back to `index.html` so React Router works.

## Replace demo contact details

Update phone, email and city in:

- `frontend/src/components/Footer.jsx`
- `frontend/src/pages/Contact.jsx`

Form rows land in MySQL tables `contacts`, `quotes` and `subscribers`.
