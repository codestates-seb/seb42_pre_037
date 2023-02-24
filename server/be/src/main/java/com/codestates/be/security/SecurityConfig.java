package com.codestates.be.security;


import com.codestates.be.member.mapper.MemberMapper;
import com.codestates.be.member.repository.MemberRepository;
import com.codestates.be.security.authentication.filter.JwtAuthenticationFilter;
import com.codestates.be.security.authentication.handler.MemberAuthenticationFailureHandler;
import com.codestates.be.security.authentication.handler.MemberAuthenticationSuccessfulHandler;
import com.codestates.be.security.jwt.JwtTokenizer;
import com.codestates.be.security.util.CustomAuthorityUtil;
import com.codestates.be.security.verification.filter.JwtVerificationFilter;
import com.codestates.be.security.verification.handler.MemberAccessDeniedHandler;
import com.codestates.be.security.verification.handler.MemberAuthenticationEntryPoint;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

import static org.springframework.security.config.Customizer.withDefaults;

@EnableWebSecurity
@Configuration
public class SecurityConfig {
    private final JwtTokenizer jwtTokenizer;
    private final CustomAuthorityUtil authorityUtil;
    private final MemberMapper mapper;
    private final MemberRepository repository;

    public SecurityConfig(JwtTokenizer jwtTokenizer, CustomAuthorityUtil authorityUtil, MemberMapper mapper, MemberRepository repository) {
        this.jwtTokenizer = jwtTokenizer;
        this.authorityUtil = authorityUtil;
        this.mapper = mapper;
        this.repository = repository;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception{

        http
                .csrf().disable()
                .headers().frameOptions().disable()
                .and()
                .cors(withDefaults())
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .formLogin().disable()
                .httpBasic().disable()
                .apply(new CustomFilterConfigurer())
                .and()
                .exceptionHandling(exp->{
                    exp
                            .authenticationEntryPoint(new MemberAuthenticationEntryPoint())
                            .accessDeniedHandler(new MemberAccessDeniedHandler());
                })
                .authorizeHttpRequests(auth->{
                    auth
                            .antMatchers(HttpMethod.POST, "/members/signup").permitAll()
                            .antMatchers(HttpMethod.POST, "/auth/login").permitAll()
                            .antMatchers(HttpMethod.GET,"/members/logout").permitAll()
                            .antMatchers(HttpMethod.PATCH, "/members/{member-id}").hasRole("USER")
                            .antMatchers(HttpMethod.POST, "/members/userInfo").hasRole("USER")
                            .antMatchers(HttpMethod.DELETE, "/members/{member-id}").hasRole("USER")
                            .antMatchers(HttpMethod.GET, "/members/**").permitAll()

                            .antMatchers(HttpMethod.POST, "/questions").hasRole("USER")
                            .antMatchers(HttpMethod.PATCH, "/questions/{question-id}").hasRole("USER")
                            .antMatchers(HttpMethod.GET, "/questions/{question-id}").permitAll()
                            .antMatchers(HttpMethod.GET, "/questions/**").permitAll()
                            .antMatchers(HttpMethod.DELETE, "/questions/{question-id}").hasRole("USER")

                            .antMatchers(HttpMethod.POST, "/answers/{question-id}").hasRole("USER")
                            .antMatchers(HttpMethod.PATCH, "/answers/{answer-id}").hasRole("USER")
                            .antMatchers(HttpMethod.GET, "/answers/{question-id}").permitAll()
                            .antMatchers(HttpMethod.DELETE, "/answers/{answer-id}").hasRole("USER")

                            .antMatchers("/", "/**").permitAll();
                });

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder(){
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource(){
        CorsConfiguration configuration = new CorsConfiguration();

        configuration.setAllowedOriginPatterns(Arrays.asList("http://localhost:3000")); //어디서 오는 요청을 허용할 것인지.


        configuration.setAllowedMethods(Arrays.asList("POST","PATCH","GET","DELETE", "OPTIONS")); //어떤 HTTP 메서드를 허용할 것인지.
        configuration.setExposedHeaders(Arrays.asList("*")); // 어떤 헤더값을 우리가 응답에 넣어서 보내줄지.
        configuration.setAllowedHeaders(Arrays.asList("*")); // 어떤 헤더값을 받아들이는데 성공할지.
        configuration.setAllowCredentials(true);
        //만일 AllowCredentials -> 클라이언트가 true인 요청을 주면 이것도 true
        //만일 Credential이 true라면 Allow-Origin은 와일드 카드를 쓰면 안된다.

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);

        return source;
    }

    public class CustomFilterConfigurer extends AbstractHttpConfigurer<CustomFilterConfigurer, HttpSecurity> {
        @Override
        public void configure(HttpSecurity builder) throws Exception {
            AuthenticationManager authenticationManager =
                    builder.getSharedObject(AuthenticationManager.class);

            JwtAuthenticationFilter customFilter = new JwtAuthenticationFilter(jwtTokenizer, authenticationManager, repository);
            customFilter.setFilterProcessesUrl("/auth/login");
            customFilter.setAuthenticationSuccessHandler(new MemberAuthenticationSuccessfulHandler());
            customFilter.setAuthenticationFailureHandler(new MemberAuthenticationFailureHandler());

            JwtVerificationFilter verificationFilter = new JwtVerificationFilter(jwtTokenizer, authorityUtil);

            builder.addFilter(customFilter)
                    .addFilterAfter(verificationFilter, JwtAuthenticationFilter.class);
        }
    }
}
