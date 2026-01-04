USE people;

DELIMITER $$
CREATE TRIGGER trg_validate_phonenumber
BEFORE UPDATE ON PersonPhone
FOR EACH ROW
BEGIN
  IF NEW.PhoneNumber NOT REGEXP '^[0-9]{10}$' THEN
    SIGNAL SQLSTATE '45000'
      SET MESSAGE_TEXT = 'Phone number must contain exactly 10 digits (0-9).';
  END IF;
END$$
DELIMITER ;
