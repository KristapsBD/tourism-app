package com.leduslaci.tourismapp.mapper;

import com.leduslaci.tourismapp.models.User;
import com.leduslaci.tourismapp.rest.dto.UserDto;

public interface UserMapper {

    UserDto toUserDto(User user);
}
