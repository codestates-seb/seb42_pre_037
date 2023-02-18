package com.codestates.be.tag.service;


import com.codestates.be.advice.BuissnessLogicException;
import com.codestates.be.advice.ExceptionCode;
import com.codestates.be.tag.entity.Tag;
import com.codestates.be.tag.repository.TagRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class TagService {
    private final TagRepository tagRepository;
    public TagService(TagRepository tagRepository) {
        this.tagRepository = tagRepository;
    }

    public Tag getTag(long tagId){
        return findVerifiedTag(tagId);
    }

    public Page<Tag> getTags(int page, int size){
        return tagRepository.findAll(PageRequest.of(page, size, Sort.by("tagId").descending()));
    }

    public Tag findVerifiedTag(long tagId){
        Optional<Tag> findTag = tagRepository.findById(tagId);

        return findTag.orElseThrow(() -> new BuissnessLogicException(ExceptionCode.TAG_NOT_EXISTS));
    }
}
