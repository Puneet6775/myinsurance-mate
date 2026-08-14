from datetime import datetime, timezone

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, EmailStr, Field

from ..db import db

router = APIRouter(prefix="/api")


class ContactIn(BaseModel):
    firstName: str = Field(min_length=1, max_length=80)
    lastName: str = Field(min_length=1, max_length=80)
    email: EmailStr
    phone: str = Field(min_length=8, max_length=20)
    subject: str = Field(min_length=1, max_length=160)
    message: str = Field(min_length=4, max_length=4000)


class QuoteIn(BaseModel):
    name: str = Field(min_length=1, max_length=120)
    email: EmailStr
    phone: str = Field(min_length=8, max_length=20)
    city: str = Field(min_length=1, max_length=80)
    insuranceType: str = Field(min_length=1, max_length=40)
    notes: str = Field(default="", max_length=2000)


class NewsletterIn(BaseModel):
    email: EmailStr


@router.post("/contact")
async def create_contact(payload: ContactIn):
    doc = payload.model_dump()
    doc["createdAt"] = datetime.now(timezone.utc)
    doc["status"] = "new"
    result = await db.contacts.insert_one(doc)
    return {"ok": True, "id": str(result.inserted_id)}


@router.post("/quote")
async def create_quote(payload: QuoteIn):
    allowed = {"motor", "health", "life"}
    if payload.insuranceType.lower() not in allowed:
        raise HTTPException(status_code=422, detail="Choose motor, health or life")
    doc = payload.model_dump()
    doc["insuranceType"] = payload.insuranceType.lower()
    doc["createdAt"] = datetime.now(timezone.utc)
    doc["status"] = "new"
    result = await db.quotes.insert_one(doc)
    return {"ok": True, "id": str(result.inserted_id)}


@router.post("/newsletter")
async def subscribe(payload: NewsletterIn):
    existing = await db.subscribers.find_one({"email": payload.email.lower()})
    if existing:
        return {"ok": True, "already": True}
    await db.subscribers.insert_one(
        {
            "email": payload.email.lower(),
            "createdAt": datetime.now(timezone.utc),
        }
    )
    return {"ok": True, "already": False}
