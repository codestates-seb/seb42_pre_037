package com.codestates.be.util;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class StringToDate {
    public static Date getDateFrom(String createdAt) throws ParseException {
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy MM dd HH mm");

        Date date = formatter.parse(createdAt);

        return date;
    }
}
