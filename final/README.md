# Simon Dice

Trabajo Final Integrador - Introduccion a la Programacion Web (LGTI 2025)

**Autor:** Valentin Giarra

## Descripcion del Proyecto

Implementacion del clasico juego "Simon Dice" como aplicacion web interactiva. El juego presenta una secuencia de luces de colores que el jugador debe memorizar y reproducir correctamente para avanzar de nivel.

## Caracteristicas Implementadas

### Requerimientos Obligatorios

- Codigo desarrollado con HTML5, CSS3 y JavaScript ES5 estricto
- Diseno responsivo utilizando Flexbox
- Sistema de validacion de nombre de jugador
- Sistema de puntuacion por cada secuencia correcta
- Deteccion de errores con limite de 3 intentos fallidos
- Pantalla de Game Over al perder
- Formulario de contacto funcional con:
  - Validacion de nombre alfanumerico
  - Validacion de email con formato correcto
  - Validacion de mensaje (minimo 5 caracteres)
  - Integracion con cliente de email del sistema
- Enlace al repositorio de GitHub que se abre en nueva pestana

### Requerimientos Deseados

- Visualizacion del nivel/ronda actual en pantalla
- Temporizador que registra el tiempo de cada partida
- Sistema de penalizacion por tiempo (1 punto cada 10 segundos)
- Almacenamiento de resultados en LocalStorage incluyendo:
  - Nombre del jugador
  - Puntaje final (con penalizacion por tiempo)
  - Fecha y hora de la partida
  - Mayor puntuacion historica
- Tabla de clasificaciones con top 10 de jugadores
- Ordenamiento de clasificaciones por:
  - Puntaje (orden descendente)
  - Fecha (mas reciente primero)

## Tecnologias Utilizadas

- HTML5
- CSS3 (Flexbox)
- JavaScript ES5 (modo estricto)
- LocalStorage API
- Web Audio API

## Como Jugar

1. Ingresar nombre de jugador (minimo 3 caracteres)
2. Presionar el boton "Iniciar"
3. Observar y memorizar la secuencia de luces que se ilumina
4. Reproducir la secuencia haciendo clic en los botones en el orden correcto
5. Con cada ronda exitosa, se agrega un nuevo paso a la secuencia
6. El juego termina al cometer 3 errores

## Sistema de Puntuacion

- **Puntos base:** 1 punto por cada secuencia completada correctamente
- **Penalizacion:** Se resta 1 punto por cada 10 segundos transcurridos
- **Puntaje final:** Puntos base - Penalizacion (minimo 0)

## Caracteristicas Adicionales

- Efectos de sonido diferenciados para cada boton
- Efectos visuales (hover) al interactuar con los botones
- Contador de tiempo en formato MM:SS
- Persistencia de datos entre sesiones mediante LocalStorage
- Interfaz intuitiva con navegacion por secciones

## Enlaces

- [Codigo Fuente en GitHub](https://github.com/NogyJ0D/ipw_uai_25)
- [Juego Original de Referencia](https://www.memo-juegos.com/juegos-simon/juego-de-simon-online-gratis)

## Licencia

Proyecto academico desarrollado para la Universidad Abierta Interamericana (UAI).

**Profesor:** Ing. Maranes Dario
