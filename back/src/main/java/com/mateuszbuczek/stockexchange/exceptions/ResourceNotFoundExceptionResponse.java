package com.mateuszbuczek.stockexchange.exceptions;

public class ResourceNotFoundExceptionResponse {

    private String message;

    public ResourceNotFoundExceptionResponse(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
