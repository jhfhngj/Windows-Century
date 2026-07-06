import asyncio
import websockets
import os
import threading
from http.server import SimpleHTTPRequestHandler, HTTPServer

def is_root():
    """
    Check if the script is running with root privileges.
    Works on Unix/Linux systems.
    """
    try:
        return os.geteuid() == 0
    except AttributeError:
        # os.geteuid() is not available on Windows
        # On Windows, check for admin rights using ctypes
        try:
            import ctypes
            return ctypes.windll.shell32.IsUserAnAdmin() != 0
        except Exception:
            return False
        
port = 80

if not is_root():
    print("You're not root, starting on port 2080 instead of 80.")
    port = 2080

# HTTP server thread
def serve_http():
    os.makedirs("server", exist_ok=True)
    os.chdir("server")
    httpd = HTTPServer(("0.0.0.0", port), SimpleHTTPRequestHandler)
    print(f"HTTP server running on http://localhost{":2080" if port == 2080 else ""}")
    httpd.serve_forever()

# WebSocket handler
async def echo(websocket):
    try:
        async for message in websocket:
            if message:
                print("Received HTML from Century")
                html = message

                # Start HTTP server in background thread
                threading.Thread(target=serve_http, daemon=True).start()

                # Write HTML file
                with open("./server/index.html", "w") as f:
                    f.write(html)

                # Tell Century to load the HTTP server
                await websocket.send("start")
                break

    except Exception as e:
        await websocket.send(f"Error: {e}")

async def main():
    # Start WebSocket server
    async with websockets.serve(echo, "localhost", 8765):
        print("CenturyHTTP server on ws://localhost:8765")
        await asyncio.Future()  # run forever

if __name__ == "__main__":
    asyncio.run(main())
