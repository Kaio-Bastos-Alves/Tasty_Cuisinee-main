package com.tastycuisine.TastyCuisineV2.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tastycuisine.TastyCuisineV2.model.entity.Usuario;
import com.tastycuisine.TastyCuisineV2.model.repository.UsuarioRepository;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    // Listar todos os usuários
    public List<Usuario> findAll() { return usuarioRepository.findAll(); }

    // Salvar usuario
    public Usuario save(Usuario usuario) {
        return usuarioRepository.save(usuario);
    }

    // Listar usuario por Id
    public Usuario findById(long cod_user) {
        return usuarioRepository.findById(cod_user)
                .orElseThrow(()-> new RuntimeException("Usuario não encontrado com o código " + cod_user));
    }

    //atualizar usuario
    public Usuario update(long cod_user, Usuario usuario) {
        Usuario usuarioExistente = findById(cod_user);
        usuarioExistente.setNome_completo(usuario.getNome_completo());
        usuarioExistente.setNome_usuario(usuario.getNome_usuario());
        usuarioExistente.setGmail(usuario.getGmail());
        usuarioExistente.setIdade(usuario.getIdade());
        usuarioExistente.setSenha(usuario.getSenha());
        usuarioExistente.setRest_alimentar(usuario.getRest_alimentar());
        return usuarioRepository.save(usuarioExistente);
    }
    

    //excluir usuario
    public void delete (Long cod_user){
        Usuario usuarioExistente = findById(cod_user);
        usuarioRepository.delete(usuarioExistente);

    }




}
