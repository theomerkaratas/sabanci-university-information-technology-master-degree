USE reservations_system;
CREATE TABLE IF NOT EXISTS Boats (
    bid INT PRIMARY KEY,
    bname VARCHAR(255),
    color VARCHAR(255)
);


INSERT INTO Boats (bid, bname, color) VALUES
(101, 'Sea Serpent', 'blue'),(102, 'Ocean Whisper', 'white'),(103, 'Crimson Tide', 'red'),(104, 'Emerald Dream', 'green'),(105, 'Golden Dawn', 'yellow'),(106, 'Blue Wave', 'blue'),(107, 'White Pearl', 'white'),(108, 'Red Dragon', 'red'),(109, 'Green Flash', 'green'),(110, 'Sunny Days', 'yellow'),(111, 'Deep Blue', 'blue'),(112, 'Cloud Nine', 'white'),(113, 'Scarlet Lady', 'red'),(114, 'Forest Breeze', 'green'),(115, 'Sunshine Ray', 'yellow'),(116, 'Aqua Queen', 'blue'),(117, 'Arctic Fox', 'white'),(118, 'Fiery Spirit', 'red'),(119, 'Jade Star', 'green'),(120, 'Marigold Bliss', 'yellow'),(121, 'Sapphire Sky', 'blue'),(122, 'Snowflake', 'white'),(123, 'Ruby Gem', 'red'),(124, 'Ivy Bloom', 'green'),(125, 'Amber Glow', 'yellow'),(126, 'Cobalt Charm', 'blue'),(127, 'Ivory Quest', 'white'),(128, 'Blaze Runner', 'red'),(129, 'Peridot Shine', 'green'),(130, 'Topaz Dream', 'yellow'),(131, 'Azure Crest', 'blue'),(132, 'Ghost Rider', 'white'),(133, 'Magma Flow', 'red'),(134, 'Moss Wanderer', 'green'),(135, 'Buttercup Joy', 'yellow'),(136, 'Indigo Bloom', 'blue'),(137, 'Frost Bite', 'white'),(138, 'Cinnabar Soul', 'red'),(139, 'Pistachio Glide', 'green'),(140, 'Honey Boat', 'yellow'),(141, 'Cerulean Bolt', 'blue'),(142, 'Purity Cruise', 'white'),(143, 'Vermilion Voyager', 'red'),(144, 'Olive Drifter', 'green'),(145, 'Lemon Drop', 'yellow'),(146, 'Denim Wave', 'blue'),(147, 'Angel Wing', 'white'),(148, 'Cherry Kiss', 'red'),(149, 'Minty Fresh', 'green'),(150, 'Tangerine Dream', 'yellow');
