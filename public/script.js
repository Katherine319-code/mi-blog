document.addEventListener('DOMContentLoaded', function() {
    const formulario = document.getElementById('formulario-comentario');
    const listaComentarios = document.getElementById('comentarios-lista');
    
    // Cargar comentarios existentes
    cargarComentarios();
    
    // Manejar envío de nuevo comentario
    formulario.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const nombre = document.getElementById('nombre').value;
        const comentario = document.getElementById('comentario').value;
        
        if (nombre && comentario) {
            enviarComentario(nombre, comentario);
        }
    });
    
    // Función para cargar comentarios
    function cargarComentarios() {
        fetch('/api/comentarios')
            .then(response => response.json())
            .then(data => {
                listaComentarios.innerHTML = '';
                data.forEach(comentario => {
                    const div = document.createElement('div');
                    div.className = 'comentario';
                    div.innerHTML = `
                        <h4>${comentario.nombre}</h4>
                        <p>${comentario.comentario}</p>
                        <small>${new Date(comentario.fecha).toLocaleDateString()}</small>
                    `;
                    listaComentarios.appendChild(div);
                });
            })
            .catch(error => console.error('Error:', error));
    }
    
    // Función para enviar comentario
    function enviarComentario(nombre, comentario) {
        fetch('/api/comentarios', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nombre, comentario })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                document.getElementById('nombre').value = '';
                document.getElementById('comentario').value = '';
                cargarComentarios();
            }
        })
        .catch(error => console.error('Error:', error));
    }
});