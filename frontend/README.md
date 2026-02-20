 # Financial & Energy Impacts Dashboard (React + D3)

A dashboard UI inspired by Willow-style operational analytics.
Built with React (Vite + TS) and D3 for charts.

## Features
- KPI cards
- D3 stacked monthly bars
- D3 horizontal bar charts
- Energy-by-month donut with month switch
- (Optional) Willow Copilot drawer (mocked)

## Tech
- React + TypeScript (Vite)
- D3 (SVG-based charts)
- Docker: dev (hot reload) + prod (nginx)

## Run locally
```bash
npm install
npm run dev



docker compose down
docker compose up --build

cd frontend
npm run dev     //Then restart Vite:


curl -i -X POST http://localhost:8080/api/copilot/ask \
  -H "Content-Type: application/json" \
  -d "{\"question\":\"test\"}"                                      //Verify backend is actually listening


docker compose down
docker image prune -f
docker compose build --no-cache frontend
docker compose up						  //FORCE Docker to stop caching (this matters)


docker exec -it sql_springboot_react_dashboard-frontend-1 sh		//	Verify nginx config INSIDE the container (this is the
cat /etc/nginx/conf.d/default.conf

location /api/ {
  proxy_pass http://backend:8080/api/;
}									//You MUST see:


docker exec -it sql_springboot_react_dashboard-frontend-1 sh -lc "nginx -T | sed -n '1,200p'"		//Verification

curl -i http://localhost:5173/api/anything		//Test nginx (port 5173)

curl -i http://localhost:8080/api/anything		//Test backend direct (port 8080)

curl -i -X POST http://localhost:5173/api/INSIGHT_ENDPOINT_HERE \
  -H "Content-Type: application/json" \
  -d '{}'									//Check if other endpoints work via nginx with POST

docker exec -it sql_springboot_react_dashboard-ollama-1 ollama pull mistral   //Make sure the model exists inside Ollama

docker exec -it sql_springboot_react_dashboard-ollama-1 ollama list          //Then confirm:

docker compose logs -f backend			//Check backend logs immediately

docker exec -it sql_springboot_react_dashboard-db-1 psql -U energy -d energy -c "\d insights"   //Find the real column name in Postgres

docker compose up --build backend    //rebuild backend

docker exec -it sql_springboot_react_dashboard-db-1 psql -U energy -d energy -c "\d twins"
docker exec -it sql_springboot_react_dashboard-db-1 psql -U energy -d energy -c "\d creators"



========================================================================================================================

@CrossOrigin(origins = {"http://localhost:5173"})

GET    /api/insights           -> get all
GET    /api/insights/top       -> top by savings
POST   /api/insights           -> create
PUT    /api/insights/{id}      -> update
DELETE /api/insights/{id}      -> delete


no main manifest attribute, in /app/app.jar
Ensure your backend pom.xml has this plugin (exactly)
<build>
  <plugins>
    <plugin>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-maven-plugin</artifactId>
      <executions>
        <execution>
          <goals>
            <goal>repackage</goal>
          </goals>
        </execution>
      </executions>
    </plugin>
  </plugins>
</build>


Even better: use the Spring Boot parent (recommended)
<parent>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-parent</artifactId>
  <version>3.3.2</version>
  <relativePath/>
</parent>


Unsupported Database: PostgreSQL 16.11\

db:
  image: postgres:15
or

Upgrade Flyway manually (not recommended).
  <dependency>
  <groupId>org.flywaydb</groupId>
  <artifactId>flyway-core</artifactId>
  <version>10.10.0</version>
</dependency>

Unsupported Database: PostgreSQL 15.15

Remove any Flyway version override you added (like <version>10.10.0</version>), and just keep:
<dependency>
  <groupId>org.flywaydb</groupId>
  <artifactId>flyway-core</artifactId>
</dependency>

If you want to keep Flyway 10.10.0, do this:
<dependency>
  <groupId>org.flywaydb</groupId>
  <artifactId>flyway-core</artifactId>
  <version>10.10.0</version>
</dependency>

<dependency>
  <groupId>org.flywaydb</groupId>
  <artifactId>flyway-database-postgresql</artifactId>
  <version>10.10.0</version>
</dependency>

Schema-validation: missing table [insights]
Ensure the migration file names are correct
They must start with V and have two underscores:

docker exec -it <db_container_name> psql -U energy -d energy -c "\dt"
docker exec -it <db_container_name> psql -U energy -d energy -c "select * from insights;"


What a 500 here almost always means (in my case)
Jackson cannot serialize LocalDateTime fields

<dependency>
  <groupId>com.fasterxml.jackson.datatype</groupId>
  <artifactId>jackson-datatype-jsr310</artifactId>
</dependency>
spring:
  jackson:
    serialization:
      write-dates-as-timestamps: false

      
