package com.wonjun.project_backend.model.service;

import com.wonjun.project_backend.common.error.LoginErrorException;
import com.wonjun.project_backend.common.error.WrongFormException;
import com.wonjun.project_backend.common.error.WrongPasswordException;
import com.wonjun.project_backend.model.dto.UserDto;
import org.springframework.dao.DuplicateKeyException;

import java.security.Principal;

public interface UserService {
	public Integer login(com.wonjun.project_backend.model.dto.UserInfoDto loginUserInfoDto) throws LoginErrorException;

	public void join(com.wonjun.project_backend.model.dto.UserInfoDto signUpUserInfoDto) throws WrongFormException;

	public void modify(Principal loginId, com.wonjun.project_backend.model.dto.UserInfoDto modifyUserInfoDto) throws WrongPasswordException;

	public void delete(int id);

	public UserDto getUserInfo(String id) throws WrongFormException;

	public void checkEmail(String email) throws DuplicateKeyException;

	public void checkNick(String nick) throws DuplicateKeyException;

	public void changPwd(Principal userId, String legacyPwd, String newPwd) throws WrongPasswordException;
}
