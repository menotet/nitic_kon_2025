from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from fastapi.middleware.cors import CORSMiddleware
import sqlite3
from pydantic import BaseModel
from contextlib import closing
from typing import Annotated
from datetime import timedelta

import auth

app = FastAPI()

origins = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def init_db():
    with closing(sqlite3.connect('data/timetable.db')) as conn:
        with closing(conn.cursor()) as cursor:
            # Create timetable table
            cursor.execute('''
                CREATE TABLE IF NOT EXISTS timetable (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    day INTEGER NOT NULL,
                    start_time TEXT NOT NULL,
                    end_time TEXT NOT NULL,
                    band_name TEXT NOT NULL,
                    song1 TEXT,
                    song2 TEXT,
                    song3 TEXT
                )
            ''')
            # Create users table
            cursor.execute('''
                CREATE TABLE IF NOT EXISTS users (
                    username TEXT PRIMARY KEY,
                    hashed_password TEXT NOT NULL
                )
            ''')
            # Add a default admin user if not exists
            cursor.execute("SELECT username FROM users WHERE username = 'admin'")
            if not cursor.fetchone():
                hashed_password = auth.get_password_hash("password")
                cursor.execute("INSERT INTO users (username, hashed_password) VALUES (?, ?)", ('admin', hashed_password))
            
            conn.commit()

@app.on_event("startup")
def on_startup():
    init_db()

class TimetableItem(BaseModel):
    id: int | None = None
    day: int
    start_time: str
    end_time: str
    band_name: str
    song1: str | None = None
    song2: str | None = None
    song3: str | None = None

def get_db_conn():
    conn = sqlite3.connect('data/timetable.db')
    conn.row_factory = sqlite3.Row
    return conn

@app.post("/token", response_model=auth.Token)
async def login_for_access_token(form_data: Annotated[OAuth2PasswordRequestForm, Depends()])-> dict:
    user = auth.get_user(form_data.username)
    if not user or not auth.verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=auth.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = auth.create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}


@app.get("/timetable", response_model=list[TimetableItem])
def get_timetable():
    with closing(get_db_conn()) as conn:
        with closing(conn.cursor()) as cursor:
            cursor.execute("SELECT * FROM timetable")
            rows = cursor.fetchall()
            return [dict(row) for row in rows]

@app.post("/timetable", response_model=TimetableItem)
def create_timetable_item(item: TimetableItem, user: Annotated[auth.UserInDB, Depends(auth.get_current_user)]):
    with closing(get_db_conn()) as conn:
        with closing(conn.cursor()) as cursor:
            cursor.execute(
                "INSERT INTO timetable (day, start_time, end_time, band_name, song1, song2, song3) VALUES (?, ?, ?, ?, ?, ?, ?)",
                (item.day, item.start_time, item.end_time, item.band_name, item.song1, item.song2, item.song3)
            )
            conn.commit()
            item.id = cursor.lastrowid
            return item

@app.put("/timetable/{item_id}", response_model=TimetableItem)
def update_timetable_item(item_id: int, item: TimetableItem, user: Annotated[auth.UserInDB, Depends(auth.get_current_user)]):
    with closing(get_db_conn()) as conn:
        with closing(conn.cursor()) as cursor:
            cursor.execute(
                "UPDATE timetable SET day=?, start_time=?, end_time=?, band_name=?, song1=?, song2=?, song3=? WHERE id=?",
                (item.day, item.start_time, item.end_time, item.band_name, item.song1, item.song2, item.song3, item_id)
            )
            conn.commit()
            item.id = item_id
            return item

@app.delete("/timetable/{item_id}")
def delete_timetable_item(item_id: int, user: Annotated[auth.UserInDB, Depends(auth.get_current_user)]):
    with closing(get_db_conn()) as conn:
        with closing(conn.cursor()) as cursor:
            cursor.execute("DELETE FROM timetable WHERE id=?", (item_id,))
            conn.commit()
            return {"message": "Item deleted successfully"}

class User(BaseModel):
    username: str

class UserCreate(User):
    password: str

@app.get("/users", response_model=list[User])
def get_users(user: Annotated[auth.UserInDB, Depends(auth.get_current_user)]):
    with closing(get_db_conn()) as conn:
        with closing(conn.cursor()) as cursor:
            cursor.execute("SELECT username FROM users")
            rows = cursor.fetchall()
            return [dict(row) for row in rows]

@app.post("/users", response_model=User)

def create_user(new_user: UserCreate, user: Annotated[auth.UserInDB, Depends(auth.get_current_user)]):
    hashed_password = auth.get_password_hash(new_user.password)
    with closing(get_db_conn()) as conn:
        with closing(conn.cursor()) as cursor:
            try:
                cursor.execute("INSERT INTO users (username, hashed_password) VALUES (?, ?)", (new_user.username, hashed_password))
                conn.commit()
            except sqlite3.IntegrityError:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="Username already registered",
                )
            return {"username": new_user.username}

@app.put("/users/{username}")
def update_user_password(username: str, new_user: UserCreate, user: Annotated[auth.UserInDB, Depends(auth.get_current_user)]):
    hashed_password = auth.get_password_hash(new_user.password)
    with closing(get_db_conn()) as conn:
        with closing(conn.cursor()) as cursor:
            cursor.execute("UPDATE users SET hashed_password=? WHERE username=?", (hashed_password, username))
            conn.commit()
            return {"message": "Password updated successfully"}

@app.delete("/users/{username}")
def delete_user(username: str, user: Annotated[auth.UserInDB, Depends(auth.get_current_user)]):
    with closing(get_db_conn()) as conn:
        with closing(conn.cursor()) as cursor:
            cursor.execute("DELETE FROM users WHERE username=?", (username,))
            conn.commit()
            return {"message": "User deleted successfully"}