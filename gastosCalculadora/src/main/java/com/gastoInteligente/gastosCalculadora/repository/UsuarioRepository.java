package com.gastoInteligente.gastosCalculadora.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.gastoInteligente.gastosCalculadora.model.Usuario;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Integer>{
	Usuario findByEmail(String email);
	
	Usuario findByNombre(String nombre);

	


}
