#!/bin/sh
set -e

URL=$(curl -s -L -w "%{url_effective}" -o /dev/null "https://en.wikipedia.org/wiki/Special:Random")

NEW_TODO="Read $URL"

curl -X POST http://project-todo-app-backend-service:2222/api/todos   -H "Content-Type: application/x-www-form-urlencoded"   -d "content=$NEW_TODO"

echo "Sent todo: $NEW_TODO"
