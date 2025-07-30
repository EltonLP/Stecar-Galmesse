
function initLeafletMap() {
    // Coordenadas exatas da localização da empresa (extraídas do link do Google Maps)
    // 25°40'16.7"S 32°34'46.1"E = -25.671316, 32.579470
    const location = [-25.671316, 32.579470];

    // Criar o mapa
    const map = L.map('leaflet-map').setView(location, 15);

    // Adicionar camada de tiles do OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19
    }).addTo(map);
    
    const customIcon = L.divIcon({
        html: `
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="#eb5a0a"/>
            </svg>
        `,
        className: 'custom-div-icon',
        iconSize: [40, 40],
        iconAnchor: [20, 40],
        popupAnchor: [0, -40]
    });

    const marker = L.marker(location, { icon: customIcon }).addTo(map);

    const popupContent = `
        <div style="padding: 15px; max-width: 300px; font-family: Arial, sans-serif;">
            <h3 style="margin: 0 0 10px 0; color: #eb5a0a; font-size: 18px;">Stecar Galmesse</h3>
            <p style="margin: 5px 0; color: #333; font-size: 14px;">
                <strong>Endereço:</strong> Licasse, Matola, Moçambique
            </p>
            <p style="margin: 5px 0; color: #333; font-size: 14px;">
                <strong>Especialidade:</strong> Exploração de inertes de alta qualidade
            </p>
            <p style="margin: 5px 0; color: #333; font-size: 14px;">
                <strong>Telefone:</strong> +258 84 408 7180
            </p>
            <p style="margin: 5px 0; color: #333; font-size: 14px;">
                <strong>Email:</strong> stecarminasc@gmail.com
            </p>
            <div style="margin-top: 15px;">
                <a href="https://www.google.com/maps/search/?api=1&query=${location[0]},${location[1]}" 
                   target="_blank" 
                   style="background: #eb5a0a; color: white; padding: 8px 15px; text-decoration: none; border-radius: 5px; font-size: 12px; display: inline-block;">
                   Ver no Google Maps
                </a>
            </div>
        </div>
    `;

    marker.bindPopup(popupContent);

    map.zoomControl.setPosition('topright');
    
    map.on('click', function(e) {
        console.log(`Coordenadas clicadas: ${e.latlng.lat}, ${e.latlng.lng}`);
    });

    // Adicionar círculo para destacar a área da empresa
    const circle = L.circle(location, {
        color: '#eb5a0a',
        fillColor: '#eb5a0a',
        fillOpacity: 0.1,
        radius: 500 
    }).addTo(map);

    circle.bindTooltip("Área de operação da Stecar Galmesse", {
        permanent: false,
        direction: 'center'
    });

    console.log('Mapa Leaflet inicializado com sucesso!');
}

// Função para lidar com erros de carregamento
function handleMapError() {
    const mapElement = document.getElementById("leaflet-map");
    if (mapElement) {
        mapElement.innerHTML = `
            <div style="display: flex; align-items: center; justify-content: center; height: 100%; background: #f5f5f5; color: #666; text-align: center; padding: 20px;">
                <div>
                    <h3>Erro ao carregar o mapa</h3>
                    <p>Não foi possível carregar o mapa. Verifique sua conexão com a internet ou tente novamente mais tarde.</p>
                </div>
            </div>
        `;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    try {
        // Verificar se o Leaflet está disponível
        if (typeof L !== 'undefined') {
            initLeafletMap();
        } else {
            console.error('Leaflet não foi carregado');
            handleMapError();
        }
    } catch (error) {
        console.error('Erro ao inicializar o mapa:', error);
        handleMapError();
    }
});

const style = document.createElement('style');
style.textContent = `
    .custom-div-icon {
        background: none;
        border: none;
    }
    
    .leaflet-popup-content-wrapper {
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    }
    
    .leaflet-popup-tip {
        background: white;
    }
`;
document.head.appendChild(style);

