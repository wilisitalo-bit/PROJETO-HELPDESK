package com.helpdesk.api.exception;

import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

@ExceptionHandler(RecursoNaoEncontradoException.class)
public ResponseEntity<Map<String, String>> tratarRecursoNaoEncontrado(
        RecursoNaoEncontradoException ex) {

    Map<String, String> resposta = Map.of(
            "erro", "Recurso não encontrado",
            "mensagem", ex.getMessage()
    );

    return ResponseEntity.status(HttpStatus.NOT_FOUND)
            .body(resposta);
}

@ExceptionHandler(MethodArgumentNotValidException.class)
public ResponseEntity<Map<String, Object>> tratarDadosInvalidos(
        MethodArgumentNotValidException ex) {

    List<String> mensagens = ex.getBindingResult()
            .getFieldErrors()
            .stream()
            .map(erro -> erro.getDefaultMessage())
            .distinct()
            .toList();

    Map<String, Object> resposta = Map.of(
            "erro", "Dados inválidos",
            "mensagens", mensagens
    );

    return ResponseEntity.status(HttpStatus.BAD_REQUEST)
            .body(resposta);
}

}