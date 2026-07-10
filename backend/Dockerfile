# Use a ROCm base image if running natively on AMD GPU, or standard Python/CUDA if abstracting through API
# For AMD Notebooks, we often use official ROCm or standard PyTorch images with ROCm support.
FROM rocm/pytorch:rocm6.0_ubuntu20.04_py3.9 as base

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

# Copy the application
COPY . /app/backend

# Set environment variables
ENV PYTHONPATH=/app
ENV PORT=8000
ENV USE_LOCAL_HF=True

# Expose the API port
EXPOSE 8000

# Start the FastAPI server using Uvicorn
CMD ["uvicorn", "backend.main:app", "--host", "0.0.0.0", "--port", "8000"]
