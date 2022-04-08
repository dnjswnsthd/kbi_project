package com.wonjun.project_backend.model.repository;

import com.wonjun.project_backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {
	Optional<User> findByEmailAndPwd(String email, String pwd);

	Optional<User> findById(int id);

	List<User> findByIdIn(List<Integer> id);

	Optional<User> findByEmail(String email);

	Optional<User> findByNick(String nick);

	Optional<User> findByIdAndPwd(int parseInt, String legacyPwd);

}
