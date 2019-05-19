package com.mateuszbuczek.stockexchange.exceptions;


public class ResourceNotFoundException extends RuntimeException {

    public ResourceNotFoundException() {}

    public ResourceNotFoundException(String s) {
        super(s);
    }
}
