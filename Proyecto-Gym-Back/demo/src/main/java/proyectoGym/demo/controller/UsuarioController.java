package proyectoGym.demo.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import proyectoGym.demo.entidad.Clase;
import proyectoGym.demo.entidad.Usuario;
import proyectoGym.demo.service.UsuarioService;
import java.util.Map; // <-- ESTE es el único Map que tiene que quedar
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "*")
public class UsuarioController {

    private final UsuarioService usuarioService;

    // Inyección por constructor (siguiendo la misma buena práctica que en el Service)
    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    // 1. REGISTRO / CREAR (El que ya tenías, perfecto)
    @PostMapping("/registrar")
    public ResponseEntity<?> registrarUsuario(@RequestBody Usuario usuario) {
        try {
            Usuario nuevoUsuario = usuarioService.guardarUsuario(usuario);
            return ResponseEntity.ok(nuevoUsuario);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("{\"error\": \"" + e.getMessage() + "\"}");
        }
    }

    // 2. LEER TODOS (Para la tabla del Administrador)
    @GetMapping
    public ResponseEntity<List<Usuario>> obtenerTodos() {
        List<Usuario> usuarios = usuarioService.obtenerTodos();
        return ResponseEntity.ok(usuarios);
    }

    // 3. LEER POR ID (Por si querés consultar un socio específico)
    @GetMapping("/{id}")
    public ResponseEntity<?> obtenerPorId(@PathVariable Long id) {
        return usuarioService.obtenerPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // 4. ACTUALIZAR (Para el editar del Administrador)
    @PutMapping("/{id}")
    public ResponseEntity<?> actualizarUsuario(@PathVariable Long id, @RequestBody Usuario datosNuevos) {
        try {
            Usuario usuarioActualizado = usuarioService.actualizarUsuario(id, datosNuevos);
            return ResponseEntity.ok(usuarioActualizado);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("{\"error\": \"" + e.getMessage() + "\"}");
        }
    }

    // 5. BORRADO LÓGICO (Para el eliminar booleano del Administrador)
    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminarUsuario(@PathVariable Long id) {
        try {
            usuarioService.eliminarUsuario(id);
            return ResponseEntity.ok().body("{\"message\": \"Usuario desactivado correctamente\"}");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("{\"error\": \"" + e.getMessage() + "\"}");
        }
    }

    // 6. VER CLASES DEL SOCIO (Para el perfil del alumno)
    @GetMapping("/{id}/clases")
    public ResponseEntity<?> obtenerMisClases(@PathVariable Long id) {
        try {
            List<Clase> clases = usuarioService.obtenerMisClases(id);
            return ResponseEntity.ok(clases);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("{\"error\": \"" + e.getMessage() + "\"}");
        }
    }
    // 7. ENDPOINT DE LOGIN (Optimizado y delegando la lógica al Service)
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credenciales) {
        try {
            String nombre = credenciales.get("nombre");
            String password = credenciales.get("contrasena");

            // Consultamos al servicio si las credenciales son válidas
            Optional<Usuario> usuarioOpt = usuarioService.validarLogin(nombre, password);

            if (usuarioOpt.isPresent()) {
                return ResponseEntity.ok(usuarioOpt.get());
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body("{\"error\": \"Nombre de usuario o contraseña incorrectos.\"}");
            }

        } catch (Exception e) {
            return ResponseEntity.badRequest().body("{\"error\": \"" + e.getMessage() + "\"}");
        }
    }
}
