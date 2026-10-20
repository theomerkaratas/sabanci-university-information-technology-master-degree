USE people;

DELIMITER $$

CREATE TRIGGER postalcheck
BEFORE INSERT ON Address
FOR EACH ROW
BEGIN
    -- Check if PostalCode is exactly 5 characters long
    IF CHAR_LENGTH(NEW.PostalCode) != 5 THEN
        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Postal code must be exactly 5 characters long.';
    END IF;
END$$

DELIMITER ;
