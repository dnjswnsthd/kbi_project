package com.wonjun.virtual_investment.config.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

	private String[] securityURL = { "/user/info", "/user/modify", "/user/delete", "/fridge/**", "/post/upload",
			"/post/modify", "/post/like", "/post/mylist", "/post/delete", "/subscribe/**", "/kafka/**" };

	@Autowired
	private JwtTokenProvider jwtTokenProvider;

	// 암호화에 필요한 PasswordEncoder를 Bean 등록
	@Bean
	public PasswordEncoder passwordEncoder() {
		return PasswordEncoderFactories.createDelegatingPasswordEncoder();
	}

	// authenticationManager를 Bean 등록
	@Bean
	@Override
	public AuthenticationManager authenticationManagerBean() throws Exception {
		return super.authenticationManagerBean();
	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.httpBasic().disable().cors().and().csrf().disable().sessionManagement()
				.sessionCreationPolicy(SessionCreationPolicy.STATELESS) // 토큰 인증 기반이므로 세션 역시 사용 X
				.and().authorizeRequests() // 요청에 대한 사용권한 체크
				.antMatchers(securityURL).authenticated()
				.anyRequest().permitAll() // 그 외 나머지 요청은 누구나 접근 가능
				.and().addFilterBefore(new JwtAuthenticationFilter(jwtTokenProvider),
						UsernamePasswordAuthenticationFilter.class);
	}
}
