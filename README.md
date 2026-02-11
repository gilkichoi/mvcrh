
# Moi Voi County Referral Hospital Portal - Local Launch Guide

This project consists of a **React (Vite)** frontend and a **Laravel** backend. Follow these steps to run the application locally.

## Prerequisites
- **Node.js** (v18 or higher)
- **PHP** (v8.2 or higher)
- **Composer**
- **MySQL** or **SQLite** (for the Laravel database)

## 1. Frontend Setup
Navigate to the project root and perform the following:

```bash
# Install dependencies
npm install

# Create environment file
echo "VITE_API_KEY=your_gemini_api_key_here" > .env

# Start the React development server
npm run dev
```
The portal should now be accessible at `http://localhost:5173`.

## 2. Backend Setup (Laravel)
Assuming you have a standard Laravel project structure in place:

1.  **Migrations**: Ensure you have run the migrations provided in `database/migrations/`.
    ```bash
    php artisan migrate
    ```
2.  **Logic**: Ensure `HospitalApiController.php` is in `app/Http/Controllers/Api/` and routes are in `routes/api.php`.
3.  **Start Server**:
    ```bash
    php artisan serve
    ```
    This launches the API at `http://localhost:8000`. The Vite proxy in `vite.config.ts` will automatically forward `/api` requests to this port.

## 3. WordPress Integration (Optional)
If you wish to run this as a WordPress theme:
1. Copy all files to `wp-content/themes/moi-voi-hospital/`.
2. Activate the theme from the WordPress Dashboard.
3. Ensure your local WordPress environment (e.g., LocalWP, XAMPP) is running.
4. The `functions.php` file handles enqueuing the React assets.

## Troubleshooting
- **API Errors**: Ensure the Laravel server is running on port 8000.
- **Gemini Chat**: Verify your API key is correctly set in the `.env` file.
- **Port Conflicts**: If port 5173 or 8000 is occupied, update the port in `vite.config.ts` or run `php artisan serve --port=XXXX`.
