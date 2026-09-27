"""
ElectroKarma Backend — Advanced Network Security Monitor
Cross-platform: Windows (run as Administrator) / Linux (run as root) / Mac
"""

import asyncio
import ipaddress
import os
import platform
import re
import subprocess
import threading
import time
import uuid
from datetime import datetime, timezone
from pathlib import Path
from typing import Dict, List, Optional, Set

import netifaces
import psutil
import requests
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pydantic import BaseModel
