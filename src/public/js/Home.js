import RequestService from "./service/RequestService.js";

const req = new RequestService();

const dropFoodBtn = document.getElementById('dropFoodBtn').addEventListener('click', async () =>{
    try {
        const response = await req.get('/tank/dropFood');
        
        if(response.data.status === 'success') {
            Swal.fire({
                title: "Exito",
                text: err.response.data.msg,
                icon: "success",
                heightAuto: false,
                confirmButtonColor: "#007BFF",
            });
        }
    
    } catch (err) {
        console.log(err);
        modalSpinner.style.display = 'none';
        Swal.fire({
            title: "Error",
            text: err.response.data.error,
            icon: "error",
            heightAuto: false,
            confirmButtonColor: "#007BFF",
        });
    }
});



const video = document.getElementById("video");

const errorMessageDiv = document.getElementById('error-message');

// Función para mostrar el mensaje de error
function showError(message) {
    console.error(message);
    errorMessageDiv.textContent = message;
    errorMessageDiv.style.display = 'block';
    video.style.display = 'none';  // Oculta el video si hay un error
}

// Si hls.js es soportado (para navegadores como Firefox)
if (Hls.isSupported()) {
    var hls = new Hls({
        lowLatencyMode: true,          // Activa Low-Latency HLS
        liveSyncDuration: 1,           // Ajusta el buffer para sincronización en vivo
        liveMaxLatencyDuration: 2,     // Máxima latencia tolerable
        fragLoadingTimeOut: 2000       // Timeout más rápido para fragmentos
    });

    hls.loadSource('/hls/stream.m3u8');  // Ruta a tu archivo .m3u8
    hls.attachMedia(video);  // Adjuntar hls.js al video

    // Eventos de hls.js
    hls.on(Hls.Events.MANIFEST_PARSED, function () {
        video.play().catch(function (error) {
            showError("Error al intentar reproducir el video: " + error.message);
        });
    });

    // Manejo de errores de hls.js
    hls.on(Hls.Events.ERROR, function (event, data) {
        if (data.fatal) {
            switch (data.fatal) {
                case Hls.ErrorTypes.NETWORK_ERROR:
                    showError("Error de red al cargar el video.");
                    break;
                case Hls.ErrorTypes.MEDIA_ERROR:
                    showError("Error al procesar el medio.");
                    break;
                case Hls.ErrorTypes.OTHER_ERROR:
                    showError("Error desconocido al cargar el video.");
                    break;
                case Hls.ErrorTypes.INTERNAL_ERROR:
                    showError("Error interno en hls.js.");
                    break;
                default:
                    showError("Ha ocurrido un error fatal: " + data.error);
                    break;
            }
        }
    });

    // Evento para cuando el SourceBuffer no está listo
    hls.on(Hls.Events.BUFFER_CREATED, function (event, data) {
        console.log("Buffer creado:", data);
    });

    // Asegúrate de que el video está listo para recibir datos
    video.addEventListener('canplay', function () {
        console.log("Video listo para reproducir");
    });

}
// Si el navegador soporta HLS de manera nativa (Safari, algunos Android)
else if (video.canPlayType('application/vnd.apple.mpegurl')) {
    video.src = '/hls/stream.m3u8';  // Ruta a tu archivo .m3u8
    video.addEventListener('loadedmetadata', function () {
        video.play().catch(function (error) {
            showError("Error al intentar reproducir el video: " + error.message);
        });
    });

    // Manejo de errores en el video
    video.onerror = function () {
        showError("Hubo un error al cargar el video.");
    };
} else {
    showError("Este navegador no soporta HLS.");
}