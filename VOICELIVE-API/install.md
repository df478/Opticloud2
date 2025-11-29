# Project Installation Guide

This document explains how to configure and run the project using Azure AI services and a full-stack environment.

---

## 🚀 Overview

This application uses:

- **Azure AI Foundry** (for AI processing)
- **Frontend:** Node.js / npm
- **Backend:** Python + Virtual environment

---

## 📌 1. Create the Environment File

Duplicate the template:

```bash
cp .env.template .env
```
Edit .env and fill in the required Azure variables
Make sure .env is added to .gitignore.

## 🌐 2. Install and Build the Frontend

Copy code
```bash
cd frontend
npm install
npm run build
```
Copy the generated static folder to the backend:
```bash
cp -r build/static ../backend/static
```
## 🐍 3. Setup and Run the Backend
From /backend folder:

```bash
cd ../backend
python3 -m venv .venv
source .venv/bin/activate   # macOS/Linux
# or: .venv\Scripts\Activate  # Windows PowerShell
```
Install dependencies:

```bash
pip install -r requirements.txt
```
Run the backend server:

```bash
python app.py
```