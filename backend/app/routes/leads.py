from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, EmailStr, Field
from pymysql.err import IntegrityError

from ..db import get_pool

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


async def _pool():
    try:
        return await get_pool()
    except RuntimeError:
        raise HTTPException(status_code=503, detail="MySQL is not connected") from None


@router.post("/contact")
async def create_contact(payload: ContactIn):
    pool = await _pool()
    async with pool.acquire() as conn:
        async with conn.cursor() as cur:
            await cur.execute(
                """
                INSERT INTO contacts
                  (first_name, last_name, email, phone, subject, message, status)
                VALUES (%s, %s, %s, %s, %s, %s, 'new')
                """,
                (
                    payload.firstName.strip(),
                    payload.lastName.strip(),
                    payload.email.lower(),
                    payload.phone.strip(),
                    payload.subject.strip(),
                    payload.message.strip(),
                ),
            )
            return {"ok": True, "id": cur.lastrowid}


@router.post("/quote")
async def create_quote(payload: QuoteIn):
    kind = payload.insuranceType.lower()
    if kind not in {"motor", "health", "life"}:
        raise HTTPException(status_code=422, detail="Choose motor, health or life")
    pool = await _pool()
    async with pool.acquire() as conn:
        async with conn.cursor() as cur:
            await cur.execute(
                """
                INSERT INTO quotes
                  (name, email, phone, city, insurance_type, notes, status)
                VALUES (%s, %s, %s, %s, %s, %s, 'new')
                """,
                (
                    payload.name.strip(),
                    payload.email.lower(),
                    payload.phone.strip(),
                    payload.city.strip(),
                    kind,
                    payload.notes.strip(),
                ),
            )
            return {"ok": True, "id": cur.lastrowid}


@router.post("/newsletter")
async def subscribe(payload: NewsletterIn):
    pool = await _pool()
    async with pool.acquire() as conn:
        async with conn.cursor() as cur:
            try:
                await cur.execute(
                    "INSERT INTO subscribers (email) VALUES (%s)",
                    (payload.email.lower(),),
                )
            except IntegrityError:
                return {"ok": True, "already": True}
            return {"ok": True, "already": False}
