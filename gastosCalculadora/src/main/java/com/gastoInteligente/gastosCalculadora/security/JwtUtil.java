package com.gastoInteligente.gastosCalculadora.security;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

import java.security.Key;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class JwtUtil {

	@Value("${jwt.secret}")
	private String secret;

	@Value("${jwt.expiration.ms}")
	private long expirationMs;

	public String generateToken(UserDetails userDetails) {
		Date now = new Date();
		Date expirationDate = new Date(now.getTime() + expirationMs);
		Key key = Keys.secretKeyFor(SignatureAlgorithm.HS256);

		return Jwts.builder().setSubject(userDetails.getUsername()).setIssuedAt(now).setExpiration(expirationDate)
				.signWith(key).compact();
	}
}
