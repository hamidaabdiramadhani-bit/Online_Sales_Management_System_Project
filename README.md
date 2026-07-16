ONLINE SALES MANAGEMENT SYSTEM

Quick run (backend + frontend)

 - Start backend (dev, H2 in-memory):

```powershell
.\mvnw.cmd "-Dspring-boot.run.profiles=dev" spring-boot:run
```

 - Serve frontend folder (examples):
	 - With VS Code Live Server: open `frontend` folder and start Live Server (default http://127.0.0.1:5500)
	 - Or with Python simple server:

```powershell
cd frontend
python -m http.server 5500
```

Verification

 - GET products: http://localhost:8080/api/products (public GET enabled in dev)
 - Login: POST http://localhost:8080/api/auth/login with JSON `{ "username":"user", "password":"user123" }` (seeds `user` and `admin` accounts in dev)

Notes

 - CORS has been configured to allow common dev origins and exposes `Authorization` header for JWT tokens.
 - A `dev` profile using H2 was added for local testing (`application-dev.properties`).

