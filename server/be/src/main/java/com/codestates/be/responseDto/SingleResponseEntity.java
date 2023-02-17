package com.codestates.be.responseDto;

public class SingleResponseEntity <T>{
    private T data;

    public SingleResponseEntity(T data) {
        this.data = data;
    }
}
