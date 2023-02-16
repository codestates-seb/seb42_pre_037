package com.codestates.be.response;

public class SingleResponseEntity <T>{
    private T data;

    public SingleResponseEntity(T data) {
        this.data = data;
    }
}
