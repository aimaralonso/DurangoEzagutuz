-- Crear tabla Location
CREATE TABLE IF NOT EXISTS Location (
    id INT PRIMARY KEY,
    name VARCHAR(255),
    description TEXT,
    explanation TEXT,
    lat DECIMAL(10, 6),
    lon DECIMAL(10, 6),
    img VARCHAR(255),
    audio VARCHAR(255),
    video VARCHAR(255),
    time INT,
    activity VARCHAR(255)
);

-- Crear tabla Quiz
CREATE TABLE IF NOT EXISTS Quiz (
    id INT PRIMARY KEY,
    sentence TEXT,
    img VARCHAR(255),
    answer VARCHAR(255)
);

-- Crear tabla Match-img
CREATE TABLE IF NOT EXISTS Match_img (
    id INT PRIMARY KEY,
    img_before VARCHAR(255),
    img_after VARCHAR(255)
);

-- Crear tabla Match-pair
CREATE TABLE IF NOT EXISTS Match_pair (
    id INT PRIMARY KEY,
    name VARCHAR(255),
    img VARCHAR(255)
);

-- Crear tabla Progress
CREATE TABLE IF NOT EXISTS Progress (
    location_id INT,
    completed BOOL,
    FOREIGN KEY (location_id) REFERENCES Location(id)
);

-- Insertar datos en Location

INSERT or IGNORE INTO Location (id,name, description, explanation, lat, lon, img, audio, video, time, activity)
VALUES 
(1,'Landako Gunea', 'Un espacio amplio para eventos y reuniones.', 'Ubicación clave en Durango para actividades culturales.', 43.171111, -2.630917, '../../assets/images/punto1.png', '../../assets/audio/parque.mp3', '../../assets/videos/parque.mp4', 30, 'caminar'),

(2,'Andra Mari Kalea', 'Calle histórica cerca de la iglesia.', 'Zona emblemática con arquitectura tradicional.', 43.167972, -2.631639, '../../assets/images/punto2.png', '../../assets/audio/museo.mp3', '../../assets/videos/museo.mp4', 45, 'explorar'),

(3,'Durangoko Udala', 'Ayuntamiento de Durango.', 'Centro administrativo de la ciudad.', 43.166806, -2.631861, '../../assets/images/punto3.png', '../../assets/audio/ayuntamiento.mp3', '../../assets/videos/ayuntamiento.mp4', 40, 'visitar'),

(4,'Santa Anako Arkua', 'Arco histórico de Santa Ana.', 'Uno de los monumentos más representativos de Durango.', 43.165750, -2.632083, '../../assets/images/punto4.png', '../../assets/audio/arco.mp3', '../../assets/videos/arco.mp4', 35, 'descubrir'),

(5,'Pinondo Plaza', 'Plaza céntrica y punto de encuentro.', 'Lugar perfecto para descansar y disfrutar del ambiente.', 43.165028, -2.632528, '../../assets/images/punto5.png', '../../assets/audio/plaza.mp3', '../../assets/videos/plaza.mp4', 25, 'relajarse');

-- Insertar datos en Quiz
INSERT or IGNORE INTO Quiz (id, sentence, img, answer)
VALUES
(1, '¿Cuál es la capital de Francia?', '../../assets/images/paris.png', 'París'),
(2, '¿Quién pintó la Mona Lisa?', '../../assets/images/mona_lisa.png', 'Leonardo da Vinci');

-- Insertar datos en Match-img
INSERT or IGNORE INTO Match_img (id, img_before, img_after)
VALUES
(1, '../../assets/images/pasoAntes.png', '../../assets/images/pasoDespues.png'),
(2, '../../assets/images/puenteAntes.png', '../../assets/images/puenteDespues.png');

-- Insertar datos en Match-pair
INSERT or IGNORE INTO Match_pair (id, name, img)
VALUES
(1, 'Elefante', '../../assets/images/elefante.png'),
(2, 'León', '../../assets/images/leon.png');

-- Insertar datos en Progress
INSERT or IGNORE INTO Progress (location_id, completed)
VALUES
(1, TRUE),
(2, FALSE);
