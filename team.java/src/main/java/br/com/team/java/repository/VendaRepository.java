package br.com.team.java.repository;

import org.springframework.stereotype.Repository;

import br.com.team.java.model.Venda;

import org.springframework.data.jpa.repository.JpaRepository;


@Repository
public interface VendaRepository extends JpaRepository<Venda, Integer>{

}
