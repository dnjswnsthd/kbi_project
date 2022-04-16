package com.wonjun.virtual_investment.model.service;

import com.wonjun.virtual_investment.common.error.LoginErrorException;
import com.wonjun.virtual_investment.common.error.WrongFormException;
import com.wonjun.virtual_investment.common.error.WrongPasswordException;
import com.wonjun.virtual_investment.model.dto.UserDto;
import org.springframework.dao.DuplicateKeyException;

import java.security.Principal;

public interface UserService {
	public Integer login(com.wonjun.virtual_investment.model.dto.UserInfoDto loginUserInfoDto) throws LoginErrorException;

	public void join(com.wonjun.virtual_investment.model.dto.UserInfoDto signUpUserInfoDto) throws WrongFormException;

	public void modify(Principal loginId, com.wonjun.virtual_investment.model.dto.UserInfoDto modifyUserInfoDto) throws WrongPasswordException;

	public void delete(int id);

	public UserDto getUserInfo(String id) throws WrongFormException;

	public void checkEmail(String email) throws DuplicateKeyException;

	public void checkNick(String nick) throws DuplicateKeyException;

	public void changPwd(Principal userId, String legacyPwd, String newPwd) throws WrongPasswordException;
}
