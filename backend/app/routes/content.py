from fastapi import APIRouter, HTTPException

from ..db import db

router = APIRouter(prefix="/api")


def clean(doc):
    if not doc:
        return None
    doc = dict(doc)
    doc.pop("_id", None)
    return doc


@router.get("/services")
async def list_services():
    items = []
    async for doc in db.services.find({}):
        items.append(clean(doc))
    return {"items": items}


@router.get("/services/{slug}")
async def get_service(slug: str):
    doc = await db.services.find_one({"slug": slug})
    if not doc:
        raise HTTPException(status_code=404, detail="Service not found")
    return clean(doc)


@router.get("/testimonials")
async def list_testimonials():
    items = []
    async for doc in db.testimonials.find({}):
        items.append(clean(doc))
    return {"items": items}


@router.get("/team")
async def list_team():
    items = []
    async for doc in db.team.find({}):
        items.append(clean(doc))
    return {"items": items}


@router.get("/insights")
async def list_insights():
    items = []
    async for doc in db.insights.find({}):
        items.append(clean(doc))
    return {"items": items}


@router.get("/faqs")
async def list_faqs():
    items = []
    async for doc in db.faqs.find({}):
        items.append(clean(doc))
    return {"items": items}
