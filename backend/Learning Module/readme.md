# SP-GPT Learning Module

A Flask application serving as the backend for the Learning Module. It handles image processing and provides a chatbot interface capable of analyzing YouTube videos and images.

---

## 🚀 Features

### **In-Memory Processing**
- Handles file uploads using `io.BytesIO` to avoid disk I/O.

### **Chatbot API**
- Specialized endpoint for querying **YouTube content** with optional **image context**.

---

## 🧩 API Endpoints

### `POST /chatbot`
**Content-Type:** `multipart/form-data`  
**Description:**  
Main endpoint for the learning assistant. Accepts:
- A YouTube video URL  
- A textual query  
- An optional image  

#### **Parameters**
| Name    | Type   | Description |
|---------|--------|-------------|
| `yt_url` | string | The YouTube video URL to analyze |
| `query` | string | The user’s question regarding the video |
| `image` | file (optional) | Additional image context |

---

## 🛠 Installation

Ensure you have Python3.12.12 installed. Install the required dependencies:

For ubuntu
```bash
python3 -m venv venv
source venv/bin/activate
```
For windows
```bash
python3.12 -m venv venv
venv\Scripts\activate
```

```bash
pip install -r requirements.txt
```

▶️ Running the Application

Navigate to the project directory:

```bash
cd "SP-GPT/backend/Learning Module/"
```

Start the Flask server:
```bash
python3 app.py
```

Open your browser and visit:
```bash
http://127.0.0.1:5000
```