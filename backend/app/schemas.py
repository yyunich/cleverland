# -*- coding: utf-8 -*-
"""Pydantic-схемы API."""
from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field, field_validator


class ApplicationCreate(BaseModel):
    """Тело запроса при создании заявки (форма на сайте)."""

    parent_name: str = Field(min_length=2, max_length=120)
    phone: str = Field(min_length=5, max_length=40)
    child_age: str | None = Field(default=None, max_length=40)
    course: str = Field(min_length=2, max_length=120)
    note: str | None = Field(default=None, max_length=1000)

    @field_validator("parent_name", "course")
    @classmethod
    def strip_text(cls, v: str) -> str:
        v = v.strip()
        if not v:
            raise ValueError("Поле не может быть пустым")
        return v

    @field_validator("phone")
    @classmethod
    def normalize_phone(cls, v: str) -> str:
        v = v.strip()
        if not v:
            raise ValueError("Телефон не может быть пустым")
        return v


class ApplicationRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    parent_name: str
    phone: str
    child_age: str | None = None
    course: str
    status: str
    note: str | None = None
    created_at: datetime


class ApplicationStatusUpdate(BaseModel):
    status: str = Field(pattern=r"^(new|contacted|closed)$")
