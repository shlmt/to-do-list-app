# ToDo List - API ניהול משימות

פרויקט Fullstack לניהול משימות עם .NET Minimal API ו-React, בנוי כ-MicroService רזה.

### טכנולוגיות

-   **Backend**: .NET 8, Minimal API, EF Core, MySQL
-   **Frontend**: React, Axios
-   **Tools**: Swagger, Dotnet CLI

### Endpoints

-   `GET /tasks` - קבלת כל המשימות
-   `POST /tasks` - יצירת משימה חדשה
-   `PUT /tasks/{id}?isComplete={true/false}` - עדכון משימה
-   `DELETE /tasks/{id}` - מחיקת משימה
