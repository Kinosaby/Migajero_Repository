"""
🌻 Servidor Python - Girasol San Valentín
"""
import http.server
import socketserver
import webbrowser
import os

PORT = 8081
DIR = os.path.dirname(os.path.abspath(__file__))

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIR, **kwargs)
    
    def log_message(self, format, *args):
        print(f"🌻 {args[0]}")

def main():
    print("""
    ╔═══════════════════════════════════════════════╗
    ║     🌻 GIRASOL SAN VALENTÍN 🌻                ║
    ║     ¿Quieres ser mi San Valentín?             ║
    ╚═══════════════════════════════════════════════╝
    """)
    
    os.chdir(DIR)
    
    try:
        with socketserver.TCPServer(("", PORT), Handler) as httpd:
            url = f"http://localhost:{PORT}"
            print(f"    🌐 Servidor: {url}")
            print(f"    🛑 Presiona Ctrl+C para detener\n")
            
            try:
                webbrowser.open(url)
            except:
                pass
            
            httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n    👋 ¡Servidor detenido! 🌻\n")
    except OSError as e:
        print(f"\n    ⚠️ Puerto {PORT} en uso. Cierra otras aplicaciones.\n")

if __name__ == "__main__":
    main()
