package com.tastycuisine.TastyCuisineV2.controller;

import com.tastycuisine.TastyCuisineV2.model.entity.Usuario;
import com.tastycuisine.TastyCuisineV2.model.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/usuario")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    //listando usuarios
    @GetMapping("/findAll")
    public ResponseEntity<List<Usuario>> findAll() {
        return ResponseEntity.ok(usuarioService.findAll());

    }

    //salvando ou cadastrando um usuario
    @PostMapping
    public ResponseEntity<Usuario> save(@RequestBody Usuario usuario) {
        Usuario novoUsuario = usuarioService.save(usuario);
        return ResponseEntity.status(HttpStatus.CREATED).body(novoUsuario);

    }

    //procurando usuario por ID
    @GetMapping("/{Cod_user}")
    public ResponseEntity<Object> findById(@PathVariable String Cod_user) {
        try {
            return ResponseEntity.ok(usuarioService.findById(Long.parseLong(Cod_user)));
        } catch (NumberFormatException e) {
            return ResponseEntity.badRequest().body(Map.of(
                            "status", 400,
                            "error", "bad request",
                            "message", "o id informado não é válido" + Cod_user
                    )
            );
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(
                    Map.of("status", 404,
                            "error", "not found",
                            "message", "usuario não encontrado com o id: " + Cod_user
                    )
            );
        }
    }

    //atualizar um usuario
    @PutMapping("/{Cod_user}")
    public ResponseEntity<Object> update(@RequestBody Usuario usuario, @PathVariable String Cod_user) {
        try{
            return ResponseEntity.ok(usuarioService.update(Long.parseLong(Cod_user), usuario));
        }catch (NumberFormatException e) {
            return ResponseEntity.badRequest().body(Map.of(
                            "status", 400,
                            "error", "bad request",
                            "message", "o id informado não é válido" + Cod_user
                    )
            );
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(
                    Map.of("status", 404,
                            "error", "not found",
                            "message", "usuario não encontrado com o id: " + Cod_user
                    )
            );
        }
    }

    //excluir um usuario
    @DeleteMapping("/{Cod_user}")
    public ResponseEntity<Object> deleteUsuario(@PathVariable String Cod_user) {
        try {
            usuarioService.delete(Long.parseLong(Cod_user));
            return ResponseEntity.ok().body("Usuario com o id " + Cod_user + " foi removido com sucesso");
        } catch (NumberFormatException e) {
            return ResponseEntity.badRequest().body(Map.of(
                            "status", 400,
                            "error", "bad request",
                            "message", "o id informado não é válido" + Cod_user
                    )
            );
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(
                    Map.of("status", 404,
                            "error", "not found",
                            "message", "usuario não encontrado com o id: " + Cod_user
                    )
            );
        }
    }

}
