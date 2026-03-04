package com.tastycuisine.TastyCuisineV2.model.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table (name = "Usuario")
@Entity
public class Usuario {
    
    @Id
    @Column(length = 3, nullable = false)
    private long Cod_user;

    @Column(length = 300, nullable = false)
    private String nome_completo; 

    @Column(length = 60, nullable = false)
    private String nome_de_usuario;

    @Column(length = 3, nullable = false)
    private int idade;

    @Column(length = 255, nullable = false, unique = true)
    private String gmail;

    @Column(length = 250, nullable = false)
    private String senha;

    @Column(length = 100, nullable = true)
    private String Restricoes_alimentares;

    public long getCod_user() {
        return Cod_user;
    }

    public void setCod_user(long cod_user) {
        this.Cod_user = cod_user;
    }

    public String getNome_completo() {
        return nome_completo;
    }

    public void setNome_completo(String nome_completo) {
        this.nome_completo = nome_completo;
    }

    public String getNome_usuario() {
        return nome_de_usuario;
    }

    public void setNome_usuario(String nome_usuario) {
        this.nome_de_usuario= nome_usuario;
    }

    public int getIdade() {
        return idade;
    }

    public void setIdade(int idade) {
        this.idade = idade;
    }

    public String getGmail() {
        return gmail;
    }

    public void setGmail(String gmail) {
        this.gmail = gmail;
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    public String getRest_alimentar() {
        return Restricoes_alimentares;
    }

    public void setRest_alimentar(String rest_alimentar) {
        this.Restricoes_alimentares = rest_alimentar;
    }
}
