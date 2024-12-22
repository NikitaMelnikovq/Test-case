FROM python:3.12-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    postgresql-client \
    wget \
    && rm -rf /var/lib/apt/lists/*

# Download wait-for-it.sh script and set executable permission
RUN wget -q https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh -O /app/wait-for-it.sh && \
    chmod +x /app/wait-for-it.sh

# Copy Python dependencies file
COPY requirements.txt /app/
RUN pip install --upgrade pip && pip install -r requirements.txt

# Copy application source code
COPY . /app/

# Expose application port
EXPOSE 8000

# Command to run wait-for-it.sh and start Gunicorn
CMD ["sh", "-c", "./wait-for-it.sh db:5432 -- python manage.py makemigrations && python manage.py migrate && gunicorn backend.wsgi:application --bind 0.0.0.0:8000"]