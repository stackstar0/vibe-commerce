#!/bin/bash

# Vibe Commerce Deployment Script
# This script helps deploy the application to various platforms

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Functions
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Docker is installed
check_docker() {
    if ! command -v docker &> /dev/null; then
        log_error "Docker is not installed. Please install Docker first."
        exit 1
    fi
    log_success "Docker is installed"
}

# Check if Docker Compose is installed
check_docker_compose() {
    if ! command -v docker-compose &> /dev/null; then
        log_error "Docker Compose is not installed. Please install Docker Compose first."
        exit 1
    fi
    log_success "Docker Compose is installed"
}

# Build and run with Docker Compose
deploy_docker() {
    log_info "Starting Docker deployment..."

    check_docker
    check_docker_compose

    # Copy environment files if they don't exist
    if [ ! -f .env ]; then
        log_warning ".env file not found. Please create it from .env.example"
        exit 1
    fi

    # Build and start services
    log_info "Building and starting services..."
    docker-compose down --remove-orphans
    docker-compose up --build -d

    # Wait for services to be ready
    log_info "Waiting for services to be ready..."
    sleep 30

    # Health checks
    log_info "Performing health checks..."

    if curl -f http://localhost:5000/api/health > /dev/null 2>&1; then
        log_success "Backend is healthy"
    else
        log_error "Backend health check failed"
        exit 1
    fi

    if curl -f http://localhost:80 > /dev/null 2>&1; then
        log_success "Frontend is healthy"
    else
        log_error "Frontend health check failed"
        exit 1
    fi

    log_success "Deployment completed successfully!"
    log_info "Frontend: http://localhost:80"
    log_info "Backend API: http://localhost:5000/api"
    log_info "Health Check: http://localhost:5000/api/health"
}

# Deploy for development
deploy_dev() {
    log_info "Starting development deployment..."

    check_docker
    check_docker_compose

    # Build and start development services
    log_info "Building and starting development services..."
    docker-compose -f docker-compose.dev.yml down --remove-orphans
    docker-compose -f docker-compose.dev.yml up --build -d

    log_success "Development environment started!"
    log_info "Frontend: http://localhost:8080"
    log_info "Backend API: http://localhost:5000/api"
}

# Build production images
build_production() {
    log_info "Building production images..."

    check_docker

    # Build backend image
    log_info "Building backend image..."
    cd backend
    docker build -t vibe-commerce-backend:latest .
    cd ..

    # Build frontend image
    log_info "Building frontend image..."
    docker build -t vibe-commerce-frontend:latest .

    log_success "Production images built successfully!"
}

# Clean up Docker resources
cleanup() {
    log_info "Cleaning up Docker resources..."

    docker-compose down --remove-orphans --volumes
    docker system prune -f

    log_success "Cleanup completed!"
}

# Show logs
show_logs() {
    docker-compose logs -f
}

# Show usage
usage() {
    echo -e "${BLUE}Vibe Commerce Deployment Script${NC}"
    echo ""
    echo "Usage: $0 [OPTION]"
    echo ""
    echo "Options:"
    echo "  docker       Deploy using Docker Compose (production)"
    echo "  dev          Deploy development environment"
    echo "  build        Build production Docker images"
    echo "  cleanup      Clean up Docker resources"
    echo "  logs         Show container logs"
    echo "  help         Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0 docker        # Deploy production environment"
    echo "  $0 dev           # Deploy development environment"
    echo "  $0 build         # Build production images"
    echo "  $0 cleanup       # Clean up resources"
}

# Main script logic
case "${1:-help}" in
    "docker")
        deploy_docker
        ;;
    "dev")
        deploy_dev
        ;;
    "build")
        build_production
        ;;
    "cleanup")
        cleanup
        ;;
    "logs")
        show_logs
        ;;
    "help"|*)
        usage
        ;;
esac