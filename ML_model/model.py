# requirements.txt contents:
# fastapi==0.68.1
# uvicorn==0.15.0
# python-multipart==0.0.5
# aiohttp==3.8.1
# pydantic==1.8.2
# python-jose==3.3.0
# rate-limiter==2.1.3

from fastapi import FastAPI, Request, WebSocket, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from datetime import datetime
import re
import json
import asyncio
from typing import List, Dict
import logging

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Store connected WebSocket clients
connected_clients: List[WebSocket] = []

class Alert(BaseModel):
    type: str
    description: str
    severity: str
    timestamp: str
    source_ip: str

class AttackDetector:
    def __init__(self):
        self.sql_injection_patterns = [
            r"(\%27)|(\')|(\-\-)|(\%23)|(#)",
            r"((\%3D)|(=))[^\n]*((\%27)|(\')|(\-\-)|(\%3B)|(;))",
            r"exec(\s|\+)+(s|x)p\w+",
        ]
        
        self.xss_patterns = [
            r"<[^>]*script",
            r"javascript:",
            r"onerror=",
            r"onload=",
        ]
        
        self.path_traversal_patterns = [
            r"\.\./",
            r"%2e%2e%2f",
            r"\.\.\\",
        ]

    def detect_sql_injection(self, data: str) -> bool:
        return any(re.search(pattern, data, re.IGNORECASE) for pattern in self.sql_injection_patterns)

    def detect_xss(self, data: str) -> bool:
        return any(re.search(pattern, data, re.IGNORECASE) for pattern in self.xss_patterns)

    def detect_path_traversal(self, data: str) -> bool:
        return any(re.search(pattern, data, re.IGNORECASE) for pattern in self.path_traversal_patterns)

detector = AttackDetector()

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    connected_clients.append(websocket)
    try:
        while True:
            await websocket.receive_text()
    except:
        connected_clients.remove(websocket)

async def broadcast_alert(alert: Alert):
    for client in connected_clients:
        try:
            await client.send_json(alert.dict())
        except:
            connected_clients.remove(client)

@app.middleware("http")
async def attack_detection_middleware(request: Request, call_next):
    # Get request details
    path = request.url.path
    headers = dict(request.headers)
    query_params = str(request.query_params)
    client_ip = request.client.host
    
    # Combine data for checking
    data_to_check = f"{path} {query_params} {json.dumps(headers)}"
    
    # Check for various attacks
    alerts = []
    
    if detector.detect_sql_injection(data_to_check):
        alerts.append(Alert(
            type="SQL Injection",
            description="Potential SQL injection attempt detected",
            severity="High",
            timestamp=datetime.now().isoformat(),
            source_ip=client_ip
        ))
    
    if detector.detect_xss(data_to_check):
        alerts.append(Alert(
            type="XSS",
            description="Potential Cross-site scripting attempt detected",
            severity="High",
            timestamp=datetime.now().isoformat(),
            source_ip=client_ip
        ))
    
    if detector.detect_path_traversal(data_to_check):
        alerts.append(Alert(
            type="Path Traversal",
            description="Potential directory traversal attempt detected",
            severity="Medium",
            timestamp=datetime.now().isoformat(),
            source_ip=client_ip
        ))
    
    # Broadcast alerts if any
    for alert in alerts:
        asyncio.create_task(broadcast_alert(alert))
    
    response = await call_next(request)
    return response

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)