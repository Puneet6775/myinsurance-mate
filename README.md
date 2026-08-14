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

## Stack

- **Frontend:** React (Vite) + React Router
- **Backend:** Python FastAPI (not Node)
- **Database:** MongoDB

## Run locally

MongoDB must be running on `127.0.0.1:27017`.

```bash
# backend
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000

# frontend (new terminal)
cd frontend
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173). Vite proxies `/api` to the FastAPI server.

## Replace demo contact details

Update phone, email and city in:

- `frontend/src/components/Footer.jsx`
- `frontend/src/pages/Contact.jsx`

Content for services, FAQs, team and testimonials is seeded into MongoDB on first API start (`backend/app/seed.py`).

Contact form, quote requests and newsletter signups are stored in MongoDB collections `contacts`, `quotes` and `subscribers`.
# myinsurance-mate
