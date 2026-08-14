from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .config import CORS_ORIGINS
from .db import db
from .routes.content import router as content_router
from .routes.leads import router as leads_router
from .seed import seed_if_empty


@asynccontextmanager
async def lifespan(_: FastAPI):
    await seed_if_empty(db)
    yield


app = FastAPI(title="myInsurancemates API", lifespan=lifespan)
app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(content_router)
app.include_router(leads_router)


@app.get("/api/health")
async def health():
    return {"ok": True, "service": "myInsurancemates"}
