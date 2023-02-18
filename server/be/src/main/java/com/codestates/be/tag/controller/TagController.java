package com.codestates.be.tag.controller;


import com.codestates.be.responseDto.MultiResponseEntity;
import com.codestates.be.responseDto.PageInfo;
import com.codestates.be.responseDto.SingleResponseEntity;
import com.codestates.be.tag.entity.Tag;
import com.codestates.be.tag.mapper.TagMapper;
import com.codestates.be.tag.service.TagService;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@RequestMapping("/tags")
@Validated
public class TagController {
    private final TagService tagService;
    private final TagMapper mapper;

    public TagController(TagService tagService, TagMapper mapper) {
        this.tagService = tagService;
        this.mapper = mapper;
    }

    @GetMapping("/{tag-id}")
    public ResponseEntity getTag(@PathVariable("tag-id") @Positive long tagId){
        Tag tag = tagService.getTag(tagId);

        return new ResponseEntity(new SingleResponseEntity<>(tag), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity getTags(@RequestParam @Positive int page,
                                  @RequestParam @Positive int size){
        Page<Tag> tagPage = tagService.getTags(page, size);
        List<Tag> tags = tagPage.getContent();
        PageInfo pageInfo = new PageInfo(tagPage.getNumber(), tagPage.getSize(),
                                tagPage.getTotalPages(), tagPage.getTotalElements());
        return new ResponseEntity(new MultiResponseEntity<>(tags, pageInfo), HttpStatus.OK);
    }
}
