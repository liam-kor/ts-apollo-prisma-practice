# Migration `20201012024225-init`

This migration has been generated at 10/12/2020, 11:42:25 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "public"."users" (
"id" SERIAL,
"email" text   NOT NULL ,
"password" text   NOT NULL ,
"nickname" text   ,
"created_at" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updated_at" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
PRIMARY KEY ("id")
)

CREATE UNIQUE INDEX "users.email_unique" ON "public"."users"("email")
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20201012024225-init
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,22 @@
+// This is your Prisma schema file,
+// learn more about it in the docs: https://pris.ly/d/prisma-schema
+
+datasource db {
+  provider = "postgresql"
+  url = "***"
+}
+
+generator client {
+  provider = "prisma-client-js"
+}
+
+model User {
+  id                 Int                  @id @default(autoincrement())
+  email              String               @unique
+  password           String
+  nickname           String?
+  created_at         DateTime             @default(now())
+  updated_at         DateTime             @default(now())
+
+  @@map(name: "users")
+}
```


