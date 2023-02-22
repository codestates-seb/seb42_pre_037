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

        configuration.setAllowedOriginPatterns(Arrays.asList("*"));
        configuration.setAllowedMethods(Arrays.asList("GET","POST", "PATCH", "DELETE"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setAllowCredentials(true);

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
