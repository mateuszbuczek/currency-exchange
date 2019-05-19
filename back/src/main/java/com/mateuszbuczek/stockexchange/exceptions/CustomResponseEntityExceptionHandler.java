package com.mateuszbuczek.stockexchange.exceptions;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.WebRequest;

@ControllerAdvice
@RestController
public class CustomResponseEntityExceptionHandler {

    @ExceptionHandler({ResourceNotFoundException.class})
    public ResponseEntity<Object> handleResourceNotFoundException(Exception exception, WebRequest req) {
        ResourceNotFoundExceptionResponse exceptionResponse = new ResourceNotFoundExceptionResponse(exception.getMessage());

        return new ResponseEntity<Object>(exceptionResponse,HttpStatus.NOT_FOUND);
    }
}
