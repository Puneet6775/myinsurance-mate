import logging
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .config import CORS_ORIGINS
from .db import close_pool, init_pool
from .routes.leads import router as leads_router

log = logging.getLogger("uvicorn.error")


@asynccontextmanager
async def lifespan(_: FastAPI):
    try:
        await init_pool()
    except Exception:
        log.exception("MySQL connection failed. Pages still work; forms will return 503.")
    yield
    await close_pool()


app = FastAPI(title="myInsurancemates API", lifespan=lifespan)
app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(leads_router)


@app.get("/api/health")
async def health():
    from .db import pool

    return {"ok": True, "service": "myInsurancemates", "mysql": pool is not None}
