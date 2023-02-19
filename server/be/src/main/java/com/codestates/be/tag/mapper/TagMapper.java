package com.codestates.be.tag.mapper;


import com.codestates.be.tag.dto.TagDto;
import com.codestates.be.tag.entity.Tag;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface TagMapper {
    Tag TagPostDtoToTag(TagDto.Request requestTag);
    TagDto.Response TagToTagResponseDto(Tag tag);
    List<TagDto.Response> TagsToTagResponseDtos(List<Tag> tags);
}
