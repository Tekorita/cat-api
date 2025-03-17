# Usamos una imagen oficial de Python como base
FROM python:3.11

# Establecer el directorio de trabajo en el contenedor
WORKDIR /app

ENV PYTHONUNBUFFERED 1

# Copiar el archivo de dependencias y luego instalarlas
COPY requirements.txt requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copiar el resto de la aplicación al contenedor
COPY . .

# Exponer el puerto en el que correrá la app
EXPOSE 8000

# Comando para producción (Elastic Beanstalk)
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "catApi.wsgi:application"]
