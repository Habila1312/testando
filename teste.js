function enviarLocalizacao() {
  const mensagem = document.getElementById('mensagem');
  mensagem.textContent = "Obtendo localização...";
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      fetch('http://127.0.0.1:3000/localizacao', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          horario: new Date().toISOString()
        })
      })
      .then(response => response.text())
      .then(data => mensagem.textContent = data)
      .catch(error => mensagem.textContent = 'Erro ao enviar localização');
    }, function() {
      mensagem.textContent = 'Permissão de localização negada.';
    });
  } else {
    mensagem.textContent = 'Geolocalização não suportada pelo navegador.';
  }
}