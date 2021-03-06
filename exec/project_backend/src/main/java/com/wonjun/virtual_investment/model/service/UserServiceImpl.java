package com.wonjun.virtual_investment.model.service;

import com.wonjun.virtual_investment.common.error.LoginErrorException;
import com.wonjun.virtual_investment.common.error.WrongFormException;
import com.wonjun.virtual_investment.common.error.WrongPasswordException;
import com.wonjun.virtual_investment.model.User;
import com.wonjun.virtual_investment.model.dto.UserDto;
import com.wonjun.virtual_investment.model.repository.UserRepository;
import com.wonjun.virtual_investment.model.dto.UserInfoDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.Principal;

@Service
public class UserServiceImpl implements UserService, UserDetailsService {
	@Autowired
	private UserRepository userRepository;

	@Override
	@Transactional(readOnly = true)
	public Integer login(UserInfoDto loginUserInfoDto) throws LoginErrorException {
		User login = userRepository.findByEmailAndPwd(loginUserInfoDto.getEmail(), loginUserInfoDto.getPwd())
				.orElseThrow(() -> new LoginErrorException("ID 또는 비밀번호를 입력해주세요"));

		return login.getId();
	}

	@Override
	public void join(UserInfoDto signUpUserInfoDto) throws WrongFormException {
		if (signUpUserInfoDto.getEmail() == null || signUpUserInfoDto.getPwd() == null
				|| signUpUserInfoDto.getNick() == null)
			throw new WrongFormException();

		userRepository
				.save(new User(signUpUserInfoDto.getEmail(), signUpUserInfoDto.getPwd(), signUpUserInfoDto.getNick()));
	}

	@Override
	public void modify(Principal loginId, UserInfoDto modifyUserInfoDto) throws WrongPasswordException {
		User user = userRepository.findByIdAndPwd(Integer.parseInt(loginId.getName()), modifyUserInfoDto.getPwd())
				.orElseThrow(() -> new WrongPasswordException());

		userRepository.save(new User(user.getId(), modifyUserInfoDto.getEmail(),
				modifyUserInfoDto.getPwd(), modifyUserInfoDto.getNick()));
	}

	@Override
	public void delete(int id) {
		userRepository.deleteById(id);
	}

	@Override
	@Transactional(readOnly = true)
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User user = userRepository.findById(Integer.parseInt(username))
				.orElseThrow(() -> new UsernameNotFoundException("사용자를 찾을 수 없습니다."));

		return new com.wonjun.virtual_investment.model.CustomUserDetail(user);
	}

	@Override
	@Transactional(readOnly = true)
	public UserDto getUserInfo(String id) throws WrongFormException {
		User user = userRepository.findById(Integer.parseInt(id))
				.orElseThrow(() -> new WrongFormException("잘못 된 아이디 입니다."));

		UserDto userDto = new UserDto();
		userDto.setId(user.getId());
		userDto.setEmail(user.getEmail());
		userDto.setNick(user.getNick());

		return userDto;
	}

	@Override
	@Transactional(readOnly = true)
	public void checkEmail(String email) throws DuplicateKeyException {
		userRepository.findByEmail(email).ifPresent(user -> {
			throw new DuplicateKeyException(user.getEmail() + "는 이미 존재하는 이메일입니다.");
		});
	}

	@Override
	@Transactional(readOnly = true)
	public void checkNick(String nick) throws DuplicateKeyException {
		userRepository.findByNick(nick).ifPresent(user -> {
			throw new DuplicateKeyException("사용 중인 닉네임입니다.");
		});
	}

	@Override
	public void changPwd(Principal userId, String legacyPwd, String newPwd) throws WrongPasswordException {
		User user = userRepository.findByIdAndPwd(Integer.parseInt(userId.getName()), legacyPwd)
				.orElseThrow(() -> new WrongPasswordException());

		userRepository.save(new User(user.getId(), user.getEmail(), newPwd, user.getNick()));
	}

}
